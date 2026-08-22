"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { useSystemLens } from "@/features/system-lens/system-lens-store";
import { injuryBase } from "./data";

const ClarityScene = dynamic(() => import("./clarity-scene.client").then((module) => module.ClarityScene), { ssr: false });
const openingMessage = "After an accident, the next step should be clear.";

export function InjuryHero() {
  const record = useSystemLens((state) => state.record);
  const reducedMotion = useReducedMotion();
  const [canUseScene, setCanUseScene] = useState(false);
  const [resolved, setResolved] = useState(false);
  let characterIndex = 0;

  useEffect(() => {
    record({ scope: "injury-law", type: "safety_path_shown", signal: "Visitor entered the injury guidance system", response: "Immediate care and human-help paths surfaced before marketing", value: "A calmer first decision", status: "observed" });
  }, [record]);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const update = () => { setCanUseScene(query.matches); if (!query.matches) setResolved(true); };
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <section className="il-hero" aria-labelledby="injury-hero-title">
      <div className="il-hero__visual" aria-hidden="true"><div className="il-hero__fallback" />{canUseScene && !reducedMotion ? <ClarityScene onResolved={() => setResolved(true)} /> : null}</div>
      <div className={`il-hero__content${resolved || reducedMotion ? " is-resolved" : ""}`}>
        <div className="il-hero__copy">
          <p className="il-eyebrow il-hero__follow" style={{ color: "#d5a9b1" }}>Personal injury guidance · California demonstration</p>
          <h1 id="injury-hero-title" className="il-hero__typed" aria-label={openingMessage}>
            {openingMessage.split(" ").map((word, wordIndex) => (
              <span className="il-hero__typed-word" aria-hidden="true" key={`${word}-${wordIndex}`}>
                {Array.from(word).map((character) => {
                  const index = characterIndex++;
                  return <span className="il-hero__typed-char" style={{ animationDelay: `${80 + index * 31}ms` }} key={`${index}-${character}`}>{character}</span>;
                })}
              </span>
            ))}
          </h1>
          <p className="il-hero__lead il-hero__follow">Understand what matters, protect your options, and speak with a lawyer when you are ready. This is a complete guidance and client-intake system—not just a law-firm website.</p>
          <div className="il-hero__actions il-hero__follow">
            <Link className="il-button il-button--paper" href={`${injuryBase}/case-review`} onClick={() => record({ scope: "injury-law", type: "case_review_started", signal: "Incident review selected", response: "A private, result-first orientation begins", value: "A useful action plan before contact", status: "observed" })}>Start Incident Review <span aria-hidden="true">→</span></Link>
            <Link className="il-button il-button--line" href={`${injuryBase}/after-an-accident`}>What To Do Now</Link>
          </div>
        </div>
        <aside className="il-hero__aside il-hero__follow">
          <strong>The Clear Record</strong>
          <p>Scattered information becomes an ordered plan: stabilize, preserve, document, understand, decide.</p>
        </aside>
      </div>
    </section>
  );
}
