"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSystemLens } from "@/features/system-lens/system-lens-store";
import { ConsultationForm } from "./consultation-form.client";
import { evaluateIncidentReview, type ReviewAnswers } from "./evaluate-review";
import { demoLawPhoneHref } from "./data";

type Question = {
  key: string;
  legend: string;
  mode: "radio" | "checkbox";
  optional?: boolean;
  options: [string, string][];
};

type Step = {
  title: string;
  short: string;
  intro: string;
  note: string;
  questions: Question[];
};

const steps: Step[] = [
  {
    title: "Start with what happened.",
    short: "What happened",
    intro: "A few broad facts are enough. You do not need to tell the whole story here.",
    note: "Timing and location can affect which records and legal questions matter. This review never calculates a deadline.",
    questions: [
      {
        key: "incident-type",
        legend: "What kind of incident was it?",
        mode: "radio",
        options: [["vehicle", "Vehicle collision"], ["pedestrian", "Pedestrian incident"], ["cyclist", "Cyclist or mobility-device incident"], ["property", "Unsafe property condition or fall"], ["other", "Something else"], ["not-sure", "I am not sure"]],
      },
      {
        key: "incident-age",
        legend: "About how long ago did it happen?",
        mode: "radio",
        options: [["days-weeks", "Days or weeks ago"], ["months", "Several months ago"], ["year-plus", "A year or more ago"], ["not-sure", "I am not sure"]],
      },
      {
        key: "jurisdiction",
        legend: "Where did it happen?",
        mode: "radio",
        options: [["california", "California"], ["other-us", "Another U.S. state"], ["outside-us", "Outside the United States"], ["not-sure", "I am not sure"]],
      },
    ],
  },
  {
    title: "How are you doing right now?",
    short: "Injuries & care",
    intro: "Health and safety come before legal questions. Broad answers are enough.",
    note: "This interface cannot assess medical urgency, diagnose an injury, or recommend treatment.",
    questions: [
      {
        key: "safety",
        legend: "Which statement fits best right now?",
        mode: "radio",
        options: [["danger", "Someone may be in immediate danger"], ["urgent-care", "There are severe, new, or worsening symptoms that may need prompt care"], ["stable", "There is no immediate danger I know of"], ["not-sure", "I am not sure"]],
      },
      {
        key: "care",
        legend: "What medical attention has happened so far? Select any that fit.",
        mode: "checkbox",
        options: [["emergency", "Emergency or urgent care"], ["doctor", "Doctor or clinic"], ["specialist", "Specialist"], ["therapy", "Physical, occupational, or other therapy"], ["other-care", "Another kind of care"], ["none", "No care yet"], ["prefer-not", "Prefer not to answer"]],
      },
      {
        key: "pain",
        legend: "How would you describe the physical change since the incident?",
        mode: "checkbox",
        options: [["worsening", "Symptoms are worsening"], ["new-symptoms", "New symptoms appeared"], ["stable", "Symptoms are present but stable"], ["improving", "Symptoms are improving"], ["none", "No physical symptoms"], ["not-sure", "I am not sure"], ["prefer-not", "Prefer not to answer"]],
      },
    ],
  },
  {
    title: "What is still harder physically?",
    short: "Physical impact",
    intro: "Think about ordinary tasks rather than legal or medical labels.",
    note: "Concrete changes can be easier to document than trying to explain severity in abstract terms.",
    questions: [
      {
        key: "daily",
        legend: "Where are you noticing an ongoing physical impact? Select any that fit.",
        mode: "checkbox",
        options: [["mobility", "Walking, stairs, movement, or transportation"], ["self-care", "Personal care"], ["household", "Household tasks"], ["caregiving", "Caregiving or family responsibilities"], ["driving", "Driving or traveling"], ["sleep-limit", "Sleep because of physical symptoms"], ["none", "No ongoing physical limitation"], ["prefer-not", "Prefer not to answer"]],
      },
    ],
  },
  {
    title: "Has this changed the rest of your routine?",
    short: "Life impact",
    intro: "Work, responsibilities, and emotional changes can all matter. Keep it general.",
    note: "The emotional question is optional. It is not a diagnosis and has no effect on whether you can ask for human help.",
    questions: [
      {
        key: "work",
        legend: "Has work, money, or household support changed? Select any that fit.",
        mode: "checkbox",
        options: [["missed", "Missed work"], ["reduced", "Reduced hours or duties"], ["job-change", "Job status or role changed"], ["expenses", "New incident-related expenses"], ["household-help", "Needed paid or unpaid household help"], ["none", "No work or financial change"], ["not-applicable", "Not applicable"], ["prefer-not", "Prefer not to answer"]],
      },
      {
        key: "psych",
        legend: "Optional: have you noticed emotional, sleep, concentration, or travel changes?",
        mode: "checkbox",
        optional: true,
        options: [["anxiety", "Anxiety or heightened worry"], ["sleep", "Sleep changes"], ["avoidance", "Driving or travel avoidance"], ["concentration", "Concentration changes"], ["distress", "Emotional distress"], ["none", "No change noticed"], ["prefer-not", "Prefer not to answer"]],
      },
    ],
  },
  {
    title: "What already exists on paper or in a file?",
    short: "Evidence & insurance",
    intro: "You do not need to upload anything. Just identify the categories that already exist.",
    note: "Do not enter claim numbers, adjuster names, policy details, exact addresses, message text, or documents.",
    questions: [
      {
        key: "evidence",
        legend: "What evidence or documentation do you have or know about?",
        mode: "checkbox",
        options: [["photos", "Original photos or video"], ["report", "Incident or police report information"], ["witness", "Witness information"], ["medical", "Care or medical records"], ["work", "Work or expense records"], ["camera-risk", "A camera or digital record that may be overwritten"], ["physical-item", "A physical item that may matter"], ["none", "None of these yet"], ["not-sure", "I am not sure"]],
      },
      {
        key: "insurance",
        legend: "Has an insurer asked for or offered anything yet?",
        mode: "checkbox",
        options: [["contact-only", "Basic contact or claim setup only"], ["statement", "A recorded or detailed statement was requested"], ["release", "A release or broad authorization was provided"], ["offer", "An offer was made"], ["deadline-mentioned", "Someone mentioned a deadline or scheduled proceeding"], ["none", "No insurer communication"], ["not-sure", "I am not sure"]],
      },
    ],
  },
  {
    title: "What would feel useful next?",
    short: "Next step",
    intro: "You can take the general guidance and stop, or decide whether a human conversation would help.",
    note: "Choosing a call does not send this review. Contact details are handled separately after you see the result.",
    questions: [
      {
        key: "contact-readiness",
        legend: "After you see the guidance, what would you prefer?",
        mode: "radio",
        options: [["call-soon", "I would like to prepare a callback"], ["maybe-later", "I may want to speak with someone later"], ["guidance-only", "I only want the general guidance for now"]],
      },
    ],
  },
];

const exclusiveCheckboxValues = new Set(["none", "not-sure", "prefer-not", "not-applicable"]);

function selected(answers: ReviewAnswers, key: string, value: string) {
  return answers[key]?.includes(value) ?? false;
}

export function IncidentReview() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<ReviewAnswers>({});
  const [error, setError] = useState("");
  const [result, setResult] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const record = useSystemLens((state) => state.record);
  const current = steps[step]!;
  const urgent = selected(answers, "safety", "danger") || selected(answers, "safety", "urgent-care");

  useEffect(() => {
    titleRef.current?.focus();
  }, [step, result]);

  const change = (question: Question, value: string, checked: boolean) => {
    setAnswers((existing) => {
      const before = existing[question.key] ?? [];
      if (question.mode === "radio") return { ...existing, [question.key]: [value] };
      if (!checked) return { ...existing, [question.key]: before.filter((item) => item !== value) };
      if (exclusiveCheckboxValues.has(value)) return { ...existing, [question.key]: [value] };
      return {
        ...existing,
        [question.key]: [...before.filter((item) => item !== value && !exclusiveCheckboxValues.has(item)), value],
      };
    });
  };

  const valid = () => current.questions.every((question) => question.optional || (answers[question.key]?.length ?? 0) > 0);

  const next = () => {
    if (!valid()) {
      setError("Choose the answer that fits best before continuing. Optional questions can be skipped.");
      return;
    }
    setError("");
    if (step < steps.length - 1) {
      setStep(step + 1);
      return;
    }

    setResult(true);
    const guidance = evaluateIncidentReview(answers);
    record({ scope: "injury-law", type: "case_review_completed", signal: "The six-stage guided review was completed", response: "A non-scoring action plan was prepared", value: "Value delivered before lead capture", status: "derived" });
    record({ scope: "injury-law", type: "evidence_plan_created", signal: "Evidence categories were reviewed", response: "Preservation actions and broad documentation gaps were organized", value: "A more prepared human conversation", status: "derived" });
    if (guidance.documentationGaps.length) record({ scope: "injury-law", type: "documentation_gaps_identified", signal: "Documentation gaps were identified", response: "General missing-record categories surfaced without private details", value: "A clearer follow-up plan", status: "derived" });
    record({ scope: "injury-law", type: "attorney_review_prompted", signal: "Human review remained available", response: "Jurisdiction-specific review was recommended without an eligibility conclusion", value: "A safe escalation path", status: "demo-preview" });
  };

  const clear = () => {
    setAnswers({});
    setStep(0);
    setResult(false);
    setError("");
    router.push("/showroom/injury-law");
  };

  if (result) {
    const guidance = evaluateIncidentReview(answers);
    const wantsCall = selected(answers, "contact-readiness", "call-soon");
    const download = () => {
      const text = [
        "Lev & On Injury Counsel demonstration — General action plan",
        "",
        ...guidance.safetyActions,
        "",
        `Human review: ${guidance.reviewTiming}`,
        "",
        "Evidence preservation",
        ...guidance.evidenceActions.map((item) => `- ${item}`),
        "",
        "Documentation gaps",
        ...(guidance.documentationGaps.length ? guidance.documentationGaps : ["No broad gap was identified from the selected categories."]).map((item) => `- ${item}`),
        "",
        "General next steps",
        ...guidance.generalNextSteps.map((item) => `- ${item}`),
        "",
        "Limits",
        ...guidance.assumptions.map((item) => `- ${item}`),
      ].join("\n");
      const url = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "general-next-step-plan.txt";
      anchor.click();
      URL.revokeObjectURL(url);
    };

    return (
      <div className="il-review__body">
        <section className="il-review__panel il-result">
          <p className="il-review__step-label">Review complete</p>
          <h1 ref={titleRef} tabIndex={-1}>Here’s the short version.</h1>
          <p className="il-review__intro">This is general orientation—not a case score, legal conclusion, medical assessment, deadline calculation, or promise of representation.</p>
          <div className="il-result__banner"><strong>Human review timing</strong><p>{guidance.reviewTiming}</p></div>
          <div className="il-result__summary-grid">
            <ResultSection title="Right now" items={[...guidance.safetyActions, ...guidance.generalNextSteps].slice(0, 2)} />
            <ResultSection title="Preserve" items={guidance.evidenceActions.slice(0, 2)} />
            <ResultSection title="Bring to a conversation" items={(guidance.documentationGaps.length ? guidance.documentationGaps : ["Keep the broad timeline, care history, and insurer communication together."]).slice(0, 3)} />
          </div>
          <details className="il-result__limits">
            <summary>Assumptions and limits</summary>
            {guidance.assumptions.map((item) => <p key={item}>{item}</p>)}
          </details>
          <div className="il-review__actions">
            <button className="il-button il-button--line" type="button" onClick={() => { setResult(false); setStep(steps.length - 1); }}>Back and edit</button>
            <div>
              <button className="il-button il-button--line" type="button" onClick={download}>Download detailed plan</button>
              <button className="il-button il-button--ink" type="button" onClick={() => window.print()}>Print</button>
            </div>
          </div>
          <section className="il-result__contact">
            <p className="il-eyebrow" style={{ color: "#d5a9b1" }}>{wantsCall ? "Prepare the callback" : "Optional human follow-up"}</p>
            <h2>{wantsCall ? "You said a call would help." : "Would a human conversation help?"}</h2>
            <p>Your review answers stay on this page only. If you choose to continue, the separate contact fields below produce a no-send confirmation preview and are not attached to your review.</p>
            <ConsultationForm source="case-review-result" compact />
          </section>
        </section>
        <ReviewRail step={steps.length} />
      </div>
    );
  }

  return (
    <div className="il-review__body">
      <section className="il-review__panel">
        <p className="il-review__step-label">{current.short} · {step + 1} of {steps.length}</p>
        <h1 ref={titleRef} tabIndex={-1}>{current.title}</h1>
        <p className="il-review__intro">{current.intro}</p>
        <p className="il-review__why"><strong>A note: </strong>{current.note}</p>
        {urgent && (
          <div className="il-result__banner" role="alert">
            <strong>Safety and care come first.</strong>
            <p>Call 911 for immediate danger. Seek appropriate medical evaluation for severe, new, or worsening symptoms. You can also <a href={demoLawPhoneHref} style={{ borderBottom: "1px solid" }}>use the human-help path</a> without finishing this review.</p>
          </div>
        )}
        {error && <div className="il-review__error" role="alert" tabIndex={-1}>{error}</div>}
        {current.questions.map((question) => (
          <fieldset key={question.key} className="il-review__question">
            <legend>{question.legend}</legend>
            <div className="il-choice-list">
              {question.options.map(([value, label]) => (
                <label className="il-choice" key={value}>
                  <input type={question.mode} name={question.key} value={value} checked={selected(answers, question.key, value)} onChange={(event) => change(question, value, event.currentTarget.checked)} />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}
        <div className="il-review__actions">
          <button className="il-button il-button--line" type="button" onClick={clear}>Exit &amp; clear</button>
          <div>
            {step > 0 && <button className="il-button il-button--line" type="button" onClick={() => { setError(""); setStep(step - 1); }}>Back</button>}
            <button className="il-button il-button--ink" type="button" onClick={next}>{step === steps.length - 1 ? "Show my guidance" : "Continue"}</button>
          </div>
        </div>
      </section>
      <ReviewRail step={step} />
    </div>
  );
}

function ReviewRail({ step }: { step: number }) {
  const complete = step >= steps.length;
  return (
    <aside className="il-review__rail">
      <h2>Your review</h2>
      <p>{complete ? "Complete" : `Step ${step + 1} of ${steps.length}`}</p>
      <ol>
        {steps.map((item, index) => <li key={item.short} aria-current={!complete && index === step ? "step" : undefined} data-complete={complete || index < step}>{item.short}</li>)}
      </ol>
    </aside>
  );
}

function ResultSection({ title, items }: { title: string; items: string[] }) {
  return <section className="il-result__section"><h2>{title}</h2><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></section>;
}
