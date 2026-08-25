"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import { ConsultationForm } from "./consultation-form.client";
import { lawPhoneDisplay, lawPhoneHref } from "./data";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Step = "fault" | "injury" | "when" | "contact";
type Answers = {
  faultAnswer: "yes" | "no" | "not-sure";
  injuryAnswer: "yes" | "no" | "not-sure";
  accidentWhen: "today" | "yesterday" | "last-7-days" | "more-than-week" | "exact-date" | "not-sure";
  accidentDate?: string;
};

const stepNumber: Record<Exclude<Step, "contact">, number> = { fault: 1, injury: 2, when: 3 };
const answerLabel = { yes: "Yes", no: "No", "not-sure": "Not sure" } as const;
const whenLabel = {
  today: "Today",
  yesterday: "Yesterday",
  "last-7-days": "Within the last 7 days",
  "more-than-week": "More than a week ago",
  "exact-date": "Date selected",
  "not-sure": "Not sure",
} as const;

export function InjuryHero({ onlineReady }: { onlineReady: boolean }) {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLLegendElement>(null);
  const contactRef = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();
  const progress = useRef(0);
  const pendingSeek = useRef(0);
  const seekFrame = useRef<number | null>(null);
  const lastSeekAt = useRef(0);
  const [step, setStep] = useState<Step>("fault");
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const [showDate, setShowDate] = useState(false);
  const [today] = useState(() => new Date().toISOString().slice(0, 10));

  useEffect(() => {
    if (step !== "fault") (step === "contact" ? contactRef : titleRef).current?.focus({ preventScroll: true });
  }, [step]);

  const commitSeek = (timestamp: number) => {
    seekFrame.current = null;
    if (timestamp - lastSeekAt.current < 34) {
      seekFrame.current = requestAnimationFrame(commitSeek);
      return;
    }
    const element = video.current;
    if (!element || !Number.isFinite(element.duration)) return;
    const scene = Math.min(pendingSeek.current / 0.7, 1);
    const target = gsap.parseEase("power1.inOut")(scene) * Math.max(element.duration - 0.04, 0);
    if (Math.abs(element.currentTime - target) > 0.035) element.currentTime = target;
    lastSeekAt.current = timestamp;
  };

  const seek = (position: number, immediate = false) => {
    progress.current = position;
    pendingSeek.current = position;
    if (immediate) {
      if (seekFrame.current !== null) cancelAnimationFrame(seekFrame.current);
      lastSeekAt.current = 0;
      commitSeek(performance.now());
    } else if (seekFrame.current === null) {
      seekFrame.current = requestAnimationFrame(commitSeek);
    }
  };

  useEffect(() => () => {
    if (seekFrame.current !== null) cancelAnimationFrame(seekFrame.current);
  }, []);

  useGSAP(() => {
    if (!root.current) return;
    if (reduced) {
      gsap.set(".il-cinematic__question", { autoAlpha: 1 });
      seek(1, true);
      return;
    }
    const timeline = gsap.timeline({ scrollTrigger: {
      trigger: root.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.55,
      onUpdate: (state) => seek(state.progress),
      onLeave: () => seek(1, true),
    } });
    timeline.to(".il-cinematic__shade", { opacity: 0.9, duration: 0.12 }, 0.62)
      .fromTo(".il-cinematic__question", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.15 }, 0.7);
    "ACCIDENT?".split("").forEach((_, index) => {
      timeline.fromTo(`.il-cinematic__char:nth-child(${index + 1})`, { opacity: 0 }, { opacity: 1, duration: 0.014 }, 0.73 + index * 0.008);
    });
    return () => timeline.scrollTrigger?.kill();
  }, { scope: root, dependencies: [reduced] });

  const chooseFault = (value: Answers["faultAnswer"]) => {
    setAnswers((current) => ({ ...current, faultAnswer: value }));
    setStep("injury");
  };
  const chooseInjury = (value: Answers["injuryAnswer"]) => {
    setAnswers((current) => ({ ...current, injuryAnswer: value }));
    setStep("when");
  };
  const chooseWhen = (value: Answers["accidentWhen"]) => {
    if (value === "exact-date") {
      setAnswers((current) => ({ ...current, accidentWhen: value }));
      setShowDate(true);
      return;
    }
    setAnswers((current) => ({ ...current, accidentWhen: value, accidentDate: undefined }));
    setShowDate(false);
    setStep("contact");
  };
  const goBack = () => {
    if (step === "contact") {
      setShowDate(answers.accidentWhen === "exact-date");
      setStep("when");
    } else if (step === "when" && showDate) {
      setShowDate(false);
    } else if (step === "when") {
      setStep("injury");
    } else if (step === "injury") {
      setStep("fault");
    }
  };
  const restart = () => {
    setAnswers({});
    setShowDate(false);
    setStep("fault");
  };

  const ready = Boolean(answers.faultAnswer && answers.injuryAnswer && answers.accidentWhen);
  const selectedWhen = answers.accidentWhen === "exact-date" && answers.accidentDate
    ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${answers.accidentDate}T00:00:00Z`))
    : answers.accidentWhen ? whenLabel[answers.accidentWhen] : "Not answered";

  return <section ref={root} className={`il-cinematic ${reduced ? "il-cinematic--reduced" : ""} ${step === "contact" ? "il-cinematic--contact" : ""}`} aria-label="Free accident case review">
    <div className="il-cinematic__sticky">
      <div className="il-cinematic__visual" aria-hidden="true">
        <div className="il-cinematic__fallback" />
        <video ref={video} className="il-cinematic__video" muted playsInline preload={reduced ? "metadata" : "auto"} poster="/media/injury-aftermath-desktop.jpg" tabIndex={-1} disablePictureInPicture onLoadedMetadata={() => seek(reduced ? 1 : progress.current, true)}>
          <source src="/video/injury-law/accident-sequence-desktop.m4v" type="video/mp4" media="(min-width: 761px)" />
          <source src="/video/injury-law/accident-sequence-mobile.m4v" type="video/mp4" />
        </video>
      </div>
      <div className="il-cinematic__shade" aria-hidden="true" />
      <div id="free-case-review" className="il-cinematic__question">
        <p className="il-cinematic__progress" aria-live="polite">{step === "contact" ? "Your answers and contact details" : `Question ${stepNumber[step]} of 3`}</p>
        <h1 className="il-cinematic__headline">Recently been in an <span aria-label="accident">{[..."ACCIDENT?"].map((character, index) => <span className="il-cinematic__char" aria-hidden="true" key={index}>{character}</span>)}</span></h1>
        {step === "fault" && <fieldset>
          <legend ref={titleRef} tabIndex={-1}>Do you think someone else may have caused the accident?</legend>
          <p>Choose the closest answer. Uncertainty is completely normal at this stage.</p>
          <div className="il-cinematic__choices"><button type="button" onClick={() => chooseFault("yes")}>Yes</button><button type="button" onClick={() => chooseFault("no")}>No</button><button type="button" onClick={() => chooseFault("not-sure")}>I’m not sure</button></div>
        </fieldset>}
        {step === "injury" && <fieldset>
          <legend ref={titleRef} tabIndex={-1}>Were you hurt?</legend>
          <p>Symptoms can change after a crash. If anything feels severe or is getting worse, seek medical care now.</p>
          <div className="il-cinematic__choices"><button type="button" onClick={() => chooseInjury("yes")}>Yes</button><button type="button" onClick={() => chooseInjury("no")}>No</button><button type="button" onClick={() => chooseInjury("not-sure")}>I’m not sure</button></div>
        </fieldset>}
        {step === "when" && <fieldset>
          <legend ref={titleRef} tabIndex={-1}>When did it happen?</legend>
          <p>An estimate is enough. You can change this answer before sending your request.</p>
          {!showDate ? <div className="il-cinematic__choices il-cinematic__choices--dates">
            <button type="button" onClick={() => chooseWhen("today")}>Today</button><button type="button" onClick={() => chooseWhen("yesterday")}>Yesterday</button><button type="button" onClick={() => chooseWhen("last-7-days")}>Within 7 days</button><button type="button" onClick={() => chooseWhen("more-than-week")}>More than a week ago</button><button type="button" onClick={() => chooseWhen("exact-date")}>Choose a date</button><button type="button" onClick={() => chooseWhen("not-sure")}>I’m not sure</button>
          </div> : <div className="il-cinematic__date"><label htmlFor="accident-date">Accident date</label><input id="accident-date" type="date" max={today} value={answers.accidentDate ?? ""} onChange={(event) => setAnswers((current) => ({ ...current, accidentWhen: "exact-date", accidentDate: event.currentTarget.value }))} /><button className="il-button il-button--paper" type="button" disabled={!answers.accidentDate} onClick={() => setStep("contact")}>Continue</button></div>}
        </fieldset>}
        {step === "contact" && ready && <div className="il-cinematic__contact">
          <div className="il-cinematic__contact-head"><div><h2 ref={contactRef} tabIndex={-1}>Where should we reach you?</h2><p>Review your answers, then share only what we need to return your call.</p></div><button className="il-text-button" type="button" onClick={() => setStep("fault")}>Edit answers</button></div>
          <dl className="il-answer-summary">
            <div><dt>Someone else may be responsible</dt><dd>{answerLabel[answers.faultAnswer!]}</dd><button type="button" onClick={() => setStep("fault")}>Change</button></div>
            <div><dt>Injured</dt><dd>{answerLabel[answers.injuryAnswer!]}</dd><button type="button" onClick={() => setStep("injury")}>Change</button></div>
            <div><dt>When it happened</dt><dd>{selectedWhen}</dd><button type="button" onClick={() => { setShowDate(answers.accidentWhen === "exact-date"); setStep("when"); }}>Change</button></div>
          </dl>
          <ConsultationForm answers={answers as Answers} source="hero-questionnaire" compact onlineReady={onlineReady} />
        </div>}
        {step !== "fault" && <div className="il-question-controls"><button type="button" onClick={goBack}>← Back</button><button type="button" onClick={restart}>Restart</button></div>}
        <p className="il-cinematic__legal">No fee to request a review. Sending this form does not create an attorney-client relationship. Prefer to speak now? <a href={lawPhoneHref}>{lawPhoneDisplay}</a></p>
      </div>
      {!reduced && <div className="il-cinematic__scroll" aria-hidden="true"><span /> Scroll to the moment after</div>}
    </div>
  </section>;
}
