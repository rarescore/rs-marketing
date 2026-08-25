"use client";

export default function ErrorState({reset}:{error:Error&{digest?:string};reset:()=>void}){
  return <main id="injury-main" className="il-form-shell"><section className="il-prose"><h1>Something interrupted this page.</h1><p>Your request has not been confirmed. Try again, or call (818) 913-6158 for immediate help.</p><button className="il-button il-button--ink" type="button" onClick={reset}>Try again</button></section></main>;
}
