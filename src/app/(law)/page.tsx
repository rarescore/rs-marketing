import Link from "next/link";
import { InjuryHero } from "@/features/demos/injury-law/home-hero.client";
import { EvidenceBoard } from "@/features/demos/injury-law/evidence-board.client";
import { CallbackIntake } from "@/features/demos/injury-law/callback-intake.client";
import { DirectContact } from "@/features/demos/injury-law/direct-contact.client";
import { lawPhoneDisplay, lawPhoneHref, processStages } from "@/features/demos/injury-law/data";
import { pipelineConfigured } from "@/lib/intake/security";

export default function Page() {
  const onlineReady = pipelineConfigured();
  return <main id="injury-main">
    <InjuryHero onlineReady={onlineReady} />
    <section className="il-guidance" aria-labelledby="immediate-guidance-heading">
      <div className="il-shell il-guidance__layout">
        <div className="il-guidance__intro">
          <p className="il-eyebrow">If this just happened</p>
          <h2 id="immediate-guidance-heading">Take care of yourself first. Protect the record second.</h2>
          <p className="il-guidance__emergency">For an emergency or immediate danger, call <a href="tel:911">911</a>.</p>
        </div>
        <ol className="il-guidance__steps">
          <li><span>01</span><p>Get appropriate medical help.</p></li>
          <li><span>02</span><p>Photograph the scene and damage.</p></li>
          <li><span>03</span><p>Save witness and camera information.</p></li>
          <li><span>04</span><p>Keep reports, bills, and insurance messages.</p></li>
        </ol>
        <Link className="il-guidance__cta" href="/after-an-accident">
          <span>Open the Complete Accident Checklist</span><span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>

    <section className="il-reassurance" aria-labelledby="reassurance-heading">
      <div className="il-shell il-reassurance__layout">
        <div className="il-reassurance__image" role="img" aria-label="A quiet view of the roadway after an accident" />
        <div className="il-reassurance__copy">
          <p className="il-eyebrow">After the moment of impact</p>
          <h2 id="reassurance-heading">The accident may be over. <em>The effects are not.</em></h2>
          <p>You may be dealing with pain, transportation problems, medical appointments, insurance calls, missed work, or uncertainty about what happens next. You do not need to solve every part of this alone.</p>
          <strong>We help put the next steps in order.</strong>
        </div>
      </div>
    </section>

    <EvidenceBoard />

    <section className="il-insurance" aria-labelledby="insurance-heading"><div className="il-shell il-insurance__layout">
      <p className="il-insurance__label">Before you sign or accept</p>
      <div><h2 id="insurance-heading">An early offer can arrive before the full impact is known.</h2><p>A settlement offer may arrive before treatment is complete, missed income is fully documented, or the long-term effect on work and daily life is clear. Before making a final decision, make sure the available evidence reflects what the accident has actually changed.</p></div>
      <aside><strong>You deserve to understand what an offer includes—and what it may leave out.</strong><Link className="il-button il-button--paper" href="/case-review">Let Us Review What Happened</Link><Link href="/resources/insurance-adjuster-call">What to Know Before Speaking With an Adjuster →</Link></aside>
    </div></section>

    <section className="il-recovery" aria-labelledby="recovery-heading"><div className="il-shell">
      <header className="il-recovery__head"><p className="il-eyebrow">The complete impact</p><h2 id="recovery-heading">Recovery is more than a repair bill.</h2></header>
      <div className="il-recovery__map">
        <article><span>Care</span><h3>Medical Care</h3><p>Emergency care, follow-up appointments, treatment, rehabilitation, medication, and medically supported future needs.</p></article>
        <article><span>Work</span><h3>Income and Work</h3><p>Missed work, reduced hours, job limitations, and documented effects on earning ability.</p></article>
        <article><span>Mobility</span><h3>Property and Transportation</h3><p>Vehicle damage, replacement transportation, repair expenses, and other documented costs.</p></article>
        <article><span>Home</span><h3>Daily Life</h3><p>Mobility, sleep, family responsibilities, household tasks, and activities the person can no longer perform in the same way.</p></article>
        <article><span>Future</span><h3>Long-Term Effects</h3><p>Ongoing symptoms, future care, accommodations, and other professionally supported consequences.</p></article>
      </div>
      <p className="il-recovery__disclaimer">Available compensation depends on the facts, evidence, insurance, applicable law, and circumstances of each matter. No specific outcome is promised.</p>
    </div></section>

    <section className="il-help" aria-labelledby="help-heading"><div className="il-shell">
      <header className="il-help__head"><p className="il-eyebrow">How the firm helps</p><h2 id="help-heading">From the first call to the final decision, you should know what is happening.</h2></header>
      <ol className="il-help__timeline">{processStages.map(([heading, copy], index) => <li key={heading}><b>{String(index + 1).padStart(2, "0")}</b><div><h3>{heading}</h3><p>{copy}</p></div></li>)}</ol>
    </div></section>

    <section className="il-trust" aria-labelledby="trust-heading"><div className="il-shell il-trust__layout">
      <div className="il-trust__portrait" aria-hidden="true"><span>LEV<br />&amp; ON</span></div>
      <div className="il-trust__copy"><p className="il-eyebrow">Human review, clearly explained</p><h2 id="trust-heading">You should know who is standing beside you.</h2><p>When you request a call, your information goes to the Lev &amp; On Law Firm intake team. The team gathers the basic facts needed for an attorney to evaluate whether the firm may be able to help.</p><dl><div><dt>First contact</dt><dd>Lev &amp; On Law Firm intake team</dd></div><div><dt>Legal evaluation</dt><dd>A California-licensed attorney</dd></div><div><dt>Service focus</dt><dd>California personal-injury matters</dd></div><div><dt>Call directly</dt><dd><a href={lawPhoneHref}>{lawPhoneDisplay}</a></dd></div></dl><p className="il-trust__verification">Attorney names, portraits, Bar numbers, education, languages, memberships, office details, and credentials will be published only after the firm supplies and verifies them. No testimonials, results, awards, or statistics have been invented.</p></div>
    </div></section>

    <section className="il-primary-contact" id="tell-us" aria-labelledby="tell-us-heading"><div className="il-shell il-primary-contact__layout">
      <div><p className="il-eyebrow">Request a callback</p><h2 id="tell-us-heading">Tell us what happened. We will call you.</h2><p>You do not need to write the entire story. Share the basic information needed for our intake team to return your call.</p><p className="il-primary-contact__direct">Prefer to speak now? <a href={lawPhoneHref}>Call {lawPhoneDisplay}</a>.</p></div>
      <CallbackIntake onlineReady={onlineReady} />
    </div></section>

    <section className="il-articles" aria-labelledby="articles-heading"><div className="il-shell">
      <header className="il-articles__head"><div><p className="il-eyebrow">Practical articles</p><h2 id="articles-heading">Answers for the decisions in front of you.</h2></div><Link href="/resources">Browse all resources →</Link></header>
      <div className="il-articles__list">
        <article><span>First 24 hours</span><h3>What to Do in the First 24 Hours After an Accident</h3><p>Safety, medical attention, reporting, scene records, and the information worth preserving before it changes.</p><small>Lev &amp; On Law Firm editorial team · Attorney reviewer and review date required before publication</small><Link href="/resources/after-car-accident-california">Read the article →</Link></article>
        <article><span>Insurance decisions</span><h3>What to Know Before Accepting an Insurance Settlement</h3><p>Questions to ask before signing a release or accepting an offer while treatment, work loss, and daily effects may still be developing.</p><small>Lev &amp; On Law Firm editorial team · Attorney reviewer and review date required before publication</small><Link href="/resources/insurance-adjuster-call">Read the article →</Link></article>
        <article><span>Evidence preservation</span><h3>What Evidence Can Disappear After a Collision?</h3><p>A focused guide to camera footage, witness details, vehicle data, scene conditions, and other records that may not remain available.</p><small>Lev &amp; On Law Firm editorial team · Attorney reviewer and review date required before publication</small><Link href="/resources/evidence-after-accident">Read the article →</Link></article>
      </div>
      <nav className="il-articles__topics" aria-label="Article categories"><span>Insurance Questions</span><span>Medical Documentation</span><span>Evidence Preservation</span><span>Accident Checklists</span><span>Understanding the Legal Process</span><span>Work and Wage Documentation</span><span>Questions to Ask an Attorney</span></nav>
    </div></section>

    <section className="il-afraid-faq" aria-labelledby="faq-heading"><div className="il-shell il-afraid-faq__layout">
      <header><p className="il-eyebrow">Questions people are afraid to ask</p><h2 id="faq-heading">Uncertainty is a reasonable place to begin.</h2><p>These general answers should be reviewed by a licensed California attorney before publication.</p></header>
      <div className="il-afraid-faq__questions">
        <details><summary>What if I am not sure who caused the accident?</summary><p>You do not need to decide fault before asking questions. Preserve what you can and avoid guessing; responsibility depends on the facts, evidence, and applicable law.</p></details>
        <details><summary>What if I may have been partially responsible?</summary><p>Partial responsibility does not automatically end every option. An attorney can review how the available evidence and California law may apply.</p></details>
        <details><summary>What if I do not have health insurance?</summary><p>Do not ignore urgent medical needs. Ask providers about available payment options and speak with the firm about questions tied to the accident.</p></details>
        <details><summary>What if the other driver is uninsured?</summary><p>Your own policy or another applicable policy may provide coverage. The answer depends on the policies and circumstances involved.</p></details>
        <details><summary>Should I accept the insurance company’s offer?</summary><p>Understand the release, what the offer covers, and whether the full impact is documented before making a final decision.</p></details>
        <details><summary>Do I need to finish treatment before calling?</summary><p>No. You can request a call while treatment is ongoing. Medical decisions should remain between you and qualified healthcare professionals.</p></details>
        <details><summary>How much does it cost to request a case review?</summary><p>There is no charge to request an initial case review. Any fee arrangement must be explained before representation begins.</p></details>
        <details><summary>Does submitting the form make me a client?</summary><p>No. Representation begins only after conflicts review, an offer of representation, and a written agreement signed by both sides.</p></details>
        <details><summary>What information should I preserve?</summary><p>Keep original photographs, video, witness details, reports, bills, repair records, work records, and insurance communications that relate to what happened.</p></details>
        <details><summary>What happens after I call?</summary><p>The intake team gathers basic information for attorney evaluation and explains the next step. A call does not guarantee that representation will be offered.</p></details>
      </div>
    </div></section>

    <section className="il-alternate-contact" aria-labelledby="direct-heading"><div className="il-shell">
      <header><p className="il-eyebrow">Another way to reach us</p><h2 id="direct-heading">Prefer a direct conversation?</h2></header>
      <div className="il-alternate-contact__split">
        <div className="il-call-now"><span>Call Now</span><h3>Speak directly with the intake team.</h3><a href={lawPhoneHref}>{lawPhoneDisplay}</a><dl><div><dt>Intake hours</dt><dd>Call to confirm current availability</dd></div><div><dt>Languages</dt><dd>Ask the intake team about language assistance</dd></div></dl><strong>What to have ready</strong><ul><li>Your preferred callback number</li><li>The approximate date and location</li><li>The basic facts you already know</li></ul></div>
        <div className="il-send-message"><span>Send a Message</span><h3>Leave a short note.</h3><DirectContact onlineReady={onlineReady} /></div>
      </div>
    </div></section>

    <section className="il-final-reassurance" aria-labelledby="final-reassurance-heading"><div className="il-shell il-final-reassurance__layout">
      <div><p className="il-eyebrow">Start where you are</p><h2 id="final-reassurance-heading">You do not need every answer before you call.</h2></div>
      <div><p>Start with the facts you have. We will listen, explain the next step, and tell you whether the firm may be able to help.</p><div className="il-final-reassurance__actions"><Link className="il-button il-button--oxblood" href="/#tell-us">Request a Free Case Review</Link><a className="il-button il-button--line" href={lawPhoneHref}>Call Now</a></div></div>
    </div></section>
  </main>;
}
