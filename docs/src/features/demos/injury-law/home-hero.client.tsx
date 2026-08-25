"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import { useSystemLens } from "@/features/system-lens/system-lens-store";
import { demoLawPhoneHref, injuryBase } from "./data";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const firstQuestion = "Were you at fault?";
type HeroStep = "fault" | "injury" | "date" | "ready";

export function InjuryHero() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const scrollProgress = useRef(0);
  const record = useSystemLens((state) => state.record);
  const reducedMotion = useReducedMotion();
  const [step, setStep] = useState<HeroStep>("fault");
  const [date, setDate] = useState("");

  const seekVideo = (progress: number) => {
    scrollProgress.current = progress;
    if (!video.current) return;
    const duration = video.current.duration;
    if (!Number.isFinite(duration) || duration <= 0) return;

    // Finish the scene before the questionnaire enters so the wide aftermath
    // frame remains in place while the visitor answers.
    const sceneProgress = Math.min(progress / 0.69, 1);
    const eased = gsap.parseEase("power1.inOut")(sceneProgress);
    const target = eased * Math.max(duration - 0.04, 0);
    if (Math.abs(video.current.currentTime - target) > 0.025) {
      video.current.currentTime = target;
    }
  };

  useGSAP(() => {
    if (!root.current) return;

    if (reducedMotion) {
      gsap.set([".il-cinematic__opening", ".il-cinematic__question"], { autoAlpha: 1 });
      return;
    }

    const isMobile = window.matchMedia("(max-width: 760px)").matches;
    const timeline = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: root.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.55,
        onUpdate: (self) => seekVideo(self.progress),
        onLeave: () => seekVideo(1),
        onEnterBack: () => seekVideo(0.999),
      },
    });

    timeline
      .fromTo(
        ".il-cinematic__opening",
        { autoAlpha: 1, yPercent: isMobile ? 0 : -48 },
        { autoAlpha: 0, yPercent: isMobile ? -8 : -60, duration: 0.17 },
        0.12,
      )
      .fromTo(".il-cinematic__chapter", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.08 }, 0.36)
      .to(".il-cinematic__chapter", { autoAlpha: 0, duration: 0.09 }, 0.55)
      .fromTo(
        ".il-cinematic__video",
        { scale: 1.06, xPercent: -1.2 },
        { scale: 1, xPercent: 0, duration: 0.24 },
        0.46,
      )
      .to(".il-cinematic__shade", { opacity: 0.94, duration: 0.12 }, 0.62)
      .fromTo(
        ".il-cinematic__question",
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.14 },
        0.7,
      );

    firstQuestion.split("").forEach((_, index) => {
      timeline.fromTo(
        `.il-cinematic__char:nth-child(${index + 1})`,
        { opacity: 0 },
        { opacity: 1, duration: 0.014 },
        0.74 + index * 0.008,
      );
    });

    return () => timeline.scrollTrigger?.kill();
  }, { scope: root, dependencies: [reducedMotion] });

  const answerFault = () => {
    setStep("injury");
  };

  const answerInjury = () => {
    setStep("date");
  };

  const finish = () => {
    setStep("ready");
    record({
      scope: "injury-law",
      type: "case_review_started",
      signal: "Three-question accident orientation completed",
      response: "Contact form and immediate call paths surfaced",
      value: "Answers remain local to the questionnaire and are not recorded",
      status: "observed",
    });
  };

  const restart = () => {
    setStep("fault");
    setDate("");
  };

  return (
    <section ref={root} className="il-cinematic" aria-labelledby="injury-hero-title">
      <div className="il-cinematic__sticky">
        <div className="il-cinematic__visual" aria-hidden="true">
          <div className="il-cinematic__fallback" />
          <video
            ref={video}
            className="il-cinematic__video"
            muted
            playsInline
            preload="auto"
            tabIndex={-1}
            onLoadedMetadata={(event) => {
              if (reducedMotion) {
                event.currentTarget.currentTime = Math.max(event.currentTarget.duration - 0.04, 0);
              } else {
                seekVideo(scrollProgress.current);
              }
            }}
          >
            <source src="/video/injury-law/accident-sequence.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="il-cinematic__shade" aria-hidden="true" />

        <div className="il-cinematic__opening">
          <p className="il-eyebrow">Morrow &amp; Vale · Personal injury guidance</p>
          <h1 id="injury-hero-title">The moment after changes everything.</h1>
          <p>Scroll through the moment. When everything stops, we’ll ask three simple questions to help you choose what happens next.</p>
          <div className="il-cinematic__opening-actions">
            <Link className="il-button il-button--paper" href={`${injuryBase}/after-an-accident`}>What to do now</Link>
            <a className="il-button il-button--line" href={demoLawPhoneHref}>Human help</a>
          </div>
        </div>

        <div className="il-cinematic__chapter" aria-hidden="true">
          <small>01 / Impact</small>
          <span />
          <p>One second changes the road ahead. The next step is simply to understand where you are now.</p>
        </div>

        <div className="il-cinematic__question" aria-live="polite">
          <p className="il-cinematic__privacy">Private orientation · three questions · answers stay in this demonstration</p>

          {step === "fault" && (
            <fieldset>
              <legend aria-label={firstQuestion}>
                {firstQuestion.split("").map((char, index) => (
                  <span className="il-cinematic__char" aria-hidden="true" key={`${char}-${index}`}>
                    {char === " " ? "\u00a0" : char}
                  </span>
                ))}
              </legend>
              <p>Choose the closest answer. This does not decide whether you have a case.</p>
              <div className="il-cinematic__choices">
                <button type="button" onClick={answerFault}>Yes</button>
                <button type="button" onClick={answerFault}>No</button>
                <button type="button" onClick={answerFault}>Not sure</button>
              </div>
            </fieldset>
          )}

          {step === "injury" && (
            <fieldset>
              <legend>Are you injured?</legend>
              <p>If symptoms are severe or getting worse, seek appropriate medical care now. This page cannot assess medical urgency.</p>
              <div className="il-cinematic__choices">
                <button type="button" onClick={answerInjury}>Yes</button>
                <button type="button" onClick={answerInjury}>No</button>
                <button type="button" onClick={answerInjury}>Not sure</button>
              </div>
            </fieldset>
          )}

          {step === "date" && (
            <fieldset>
              <legend>Date of accident</legend>
              <p>An approximate date is enough for now. You can also continue if you are not sure.</p>
              <label className="il-cinematic__date">
                <span>Accident date</span>
                <input
                  type="date"
                  value={date}
                  max={new Date().toISOString().slice(0, 10)}
                  onChange={(event) => setDate(event.currentTarget.value)}
                />
              </label>
              <div className="il-cinematic__choices il-cinematic__choices--continue">
                <button type="button" disabled={!date} onClick={finish}>Continue</button>
                <button type="button" onClick={finish}>I’m not sure</button>
              </div>
            </fieldset>
          )}

          {step === "ready" && (
            <div className="il-cinematic__ready">
              <p className="il-eyebrow">Your next step</p>
              <h2>Talk to someone now.</h2>
              <p>Choose the contact form to share more detail, or call now to speak with a person.</p>
              <div className="il-cinematic__final-actions">
                <Link className="il-button il-button--paper" href={`${injuryBase}/consultation`}>Open contact form <span aria-hidden="true">→</span></Link>
                <a className="il-button il-button--line" href={demoLawPhoneHref}>Call us now</a>
              </div>
              <button className="il-cinematic__restart" type="button" onClick={restart}>Start over</button>
            </div>
          )}

          <p className="il-cinematic__legal">Demonstration only. General information—not legal or medical advice. A contact request does not create representation. Production privacy, retention, consent, advertising, and jurisdiction language requires attorney review.</p>
        </div>

        {!reducedMotion && (
          <div className="il-cinematic__scroll" aria-hidden="true"><span /> Scroll through the moment</div>
        )}
      </div>
    </section>
  );
}
