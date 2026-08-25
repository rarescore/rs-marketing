"use client";

export default function ErrorState({reset}:{error:Error&{digest?:string};reset:()=>void}){
  return <main id="injury-main" className="il-form-shell"><div className="il-content-grid"><aside className="il-annotation"><strong>Nothing was submitted</strong>If you were in the guided review, its page-memory answers have not been transmitted.</aside><section className="il-prose"><h1>We could not prepare this page.</h1><p>Refresh the route or return to the Injury Law home. If this happened during a contact preview, review the form again; no information is retained by this demonstration.</p><button className="il-button il-button--ink" type="button" onClick={reset}>Try again</button></section></div></main>;
}
