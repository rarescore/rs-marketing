import { useEffect, useMemo, useState } from 'react';
import Lenis from 'lenis';
import PomegranateSequence from './components/PomegranateSequence';
import ScrollReveal from './components/ScrollReveal';
import AccordionGallery from './components/AccordionGallery';
import { plans } from './data/site';
import useReducedMotion from './hooks/useReducedMotion';

const scanSteps=['Reading the public page','Running Lighthouse mobile tests','Checking search structure','Reviewing trust signals','Mapping conversion problems','Preparing recommendations'];
const sampleReviews=[
  ['A•••••• G.','The new website finally feels like the quality of our business. The process was clear from start to finish.','Website redesign'],
  ['M•••••• S.','We knew what was being worked on, why it mattered and what came next.','SEO'],
  ['R•••••• K.','The site is faster, cleaner and customers understand what to do immediately.','Website + growth']
];

function Audit(){
  const[url,setUrl]=useState('');const[status,setStatus]=useState('idle');const[step,setStep]=useState(0);const[result,setResult]=useState(null);const[error,setError]=useState('');
  const run=async()=>{
    if(!url.trim()){setError('Enter your website address.');return}
    setError('');setResult(null);setStatus('scanning');setStep(0);
    const timer=setInterval(()=>setStep(v=>Math.min(scanSteps.length-1,v+1)),800);
    try{
      const response=await fetch('/api/audit',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({url})});
      const data=await response.json();
      if(!response.ok) throw new Error(data.error||'We could not audit that website.');
      clearInterval(timer);setStep(scanSteps.length-1);
      setTimeout(()=>{setResult(data);setStatus('done')},260);
    }catch(e){clearInterval(timer);setError(e.message||'We could not audit that website.');setStatus('idle')}
  };
  const tone=result?result.score<40?'critical':result.score<65?'warning':result.score<85?'healthy':'excellent':'';
  return <section id="audit" className="section audit white">
    <div className="audit-intro"><div className="eyebrow">Free website audit</div><h2>See how your website performs.</h2><p>A real mobile Lighthouse test plus technical SEO, search visibility, trust and conversion checks.</p></div>
    <div className={`audit-console ${status}`}>
      {status==='idle'&&<><label htmlFor="audit-url">Your website</label><div className="audit-input"><input id="audit-url" value={url} onChange={e=>setUrl(e.target.value)} onKeyDown={e=>e.key==='Enter'&&run()} placeholder="yourwebsite.com"/><button onClick={run}>Analyze website</button></div><small>Real public-page analysis. Usually 15–30 seconds.</small>{error&&<p className="form-error">{error}</p>}</>}
      {status==='scanning'&&<div className="scan-state"><span className="scan-line"/><h3>Analyzing your website</h3><ul>{scanSteps.map((s,i)=><li key={s} className={i<=step?'active':''}><span>{i<step?'✓':i===step?'●':'○'}</span>{s}</li>)}</ul></div>}
      {status==='done'&&result&&<div className="audit-result">
        <div className={`score ${tone}`}><span>{result.score}</span><small>/100</small><b>{result.score<40?'Critical':result.score<65?'Needs improvement':result.score<85?'Healthy':'Excellent'}</b></div>
        <div className="category-grid">{Object.entries(result.categories||{}).slice(0,8).map(([k,v])=><div key={k}><span>{k}</span><strong>{v}</strong><i><em style={{width:`${v}%`}}/></i></div>)}</div>
        <div className="issue-list"><h3>Priority problems</h3>{(result.issues||[]).slice(0,4).map((x,i)=><article key={`${x.title}-${i}`}><span>0{i+1}</span><div><h4>{x.title}</h4><p>{x.detail}</p><small><b>Fix:</b> {x.fix}</small></div></article>)}</div>
        <p className="audit-note">{result.summary}</p><a className="button red" href="#transformation">See how we would improve it</a>
      </div>}
    </div>
  </section>
}

function Configurator(){
  const[open,setOpen]=useState(false);const[step,setStep]=useState(0);const[choices,setChoices]=useState({});const[submitted,setSubmitted]=useState(false);const[sending,setSending]=useState(false);const[message,setMessage]=useState('');
  const screens=[
    ['What are you building?',['Local service business','Professional practice','E-commerce','Personal brand','Other']],
    ['Choose a visual direction',['Minimal','Bold','Editorial','Cinematic','Professional','Recommend one for me']],
    ['How animated should it feel?',['Clean','Interactive','Cinematic']],
    ['Choose a color direction',['Light and minimal','Dark and premium','Bright and vivid','Warm and natural','Use my brand colors']],
    ['Choose a layout',['Conversion focused','Story driven','Information focused','Product focused']],
    ['Important features',['Online booking','Quote request form','Reviews','Blog or resources','Multilingual pages','Advanced animation','SEO setup']]
  ];
  const choose=v=>{setChoices(prev=>({...prev,[step]:v}));if(step<screens.length-1)setStep(step+1)};
  const summary=screens.map((s,i)=>`${s[0]}: ${choices[i]||'Not selected'}`).join('\n');
  const submit=async()=>{
    setSending(true);setMessage('');
    try{
      const r=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:'Website configurator lead',email:'website-plan@lggrowthstudio.com',company:'Website project',details:summary,need:'Professional Website',source:'Website configurator'})});
      const d=await r.json();
      if(!r.ok) throw new Error(d.error||'Could not submit plan.');
      setSubmitted(true);
    }catch(e){setMessage('Your plan is ready. Use the email button below to send it directly.');}
    finally{setSending(false)}
  };
  const mail=`mailto:hello@lggrowthstudio.com?subject=${encodeURIComponent('My LG Growth Studio Website Plan')}&body=${encodeURIComponent(summary)}`;
  const reset=()=>{setStep(0);setChoices({});setSubmitted(false);setMessage('')};
  return <section id="website-builder" className="section builder black"><div><div className="eyebrow">Professional website</div><ScrollReveal dark>Start with a clear direction, not a blank form.</ScrollReveal><p>Choose the style, motion, colors and features you like. We turn it into a clear project plan.</p></div><button className="button red" onClick={()=>setOpen(true)}>Start your website</button>{open&&<div className="modal" role="dialog" aria-modal="true" aria-label="Website project configurator"><div className="modal-card"><button className="modal-close" onClick={()=>setOpen(false)}>Close</button>{!submitted?<><span className="modal-step">0{Math.min(step+1,screens.length)} / 0{screens.length}</span><h3>{screens[step][0]}</h3><div className="option-grid">{screens[step][1].map(v=><button className={choices[step]===v?'selected':''} key={v} onClick={()=>choose(v)}>{v}</button>)}</div><div className="modal-nav">{step>0&&<button className="back" onClick={()=>setStep(step-1)}>Back</button>}{step===screens.length-1&&choices[step]&&<button className="button red" onClick={submit} disabled={sending}>{sending?'Submitting…':'Build my website plan'}</button>}</div>{step===screens.length-1&&choices[step]&&<div className="plan-summary"><h4>Your selections</h4>{screens.map((s,i)=><p key={s[0]}><b>{s[0]}</b><span>{choices[i]}</span></p>)}</div>}</>:<div className="completion"><span>Website plan complete</span><h3>Your direction is ready.</h3><p>We will confirm scope, timeline and final pricing before any work begins.</p><div className="completion-actions"><a className="button red" href={mail}>Email my plan</a><a className="button line" href="mailto:hello@lggrowthstudio.com?subject=Reserve%20my%20website%20project">Reserve with $250</a></div><button className="back" onClick={reset}>Create another plan</button></div>}{message&&<p className="form-error">{message}</p>}</div></div>}</section>
}

export default function App(){
  const reduced=useReducedMotion();
  useEffect(()=>{if(reduced)return;const lenis=new Lenis({duration:.9,smoothWheel:true,wheelMultiplier:.92});let id;const raf=t=>{lenis.raf(t);id=requestAnimationFrame(raf)};id=requestAnimationFrame(raf);return()=>{cancelAnimationFrame(id);lenis.destroy()}},[reduced]);
  const items=useMemo(()=>plans,[]);
  return <>
    <header><a className="brand" href="#top"><img src="/lg-growth-studio-logo.svg" alt="LG Growth Studio"/></a><nav><a href="#audit">Audit</a><a href="#process">Process</a><a href="#results">Results</a><a href="#pricing">Pricing</a></nav><a className="top-cta" href="#website-builder">Start</a></header>
    <main id="top"><PomegranateSequence/>
      <section className="hero white"><div className="eyebrow">LG Growth Studio</div><h1>They’re already looking.<br/><em>Will they find you?</em></h1><p>Websites, search and advertising built to make your business easier to find, trust and choose.</p><div className="actions"><a className="button red" href="#audit">Check your website</a><a className="button line" href="#pricing">See pricing</a></div></section>
      <Audit/>
      <section id="transformation" className="section transformation black"><div className="eyebrow">What changes</div><ScrollReveal dark>A better website is not just a redesign.</ScrollReveal><p className="section-intro">We improve what people see, how quickly they understand it and how easily they take action.</p><div className="compare"><article><span>Your website now</span><strong>58</strong><ul><li>Unclear message</li><li>Slow mobile experience</li><li>Weak search structure</li></ul></article><div className="transform-arrow">→</div><article className="after"><span>After improvement</span><strong>92</strong><ul><li>Clear offer</li><li>Fast, focused experience</li><li>Built for search and action</li></ul></article></div><a className="button line" href="#process">See how we work</a></section>
      <section id="process" className="section process white"><div className="eyebrow">What happens next</div><h2>We find the problem, build the right solution and improve it over time.</h2><div className="timeline">{[['01','Audit','We identify what is slowing down growth.'],['02','Plan','We decide what should be fixed first.'],['03','Build','We design, write and develop the solution.'],['04','Improve','We measure performance and keep improving it.']].map(x=><article key={x[0]}><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p></article>)}</div></section>
      <section id="results" className="section results red"><div><div className="eyebrow">Proof</div><ScrollReveal>Clear work. Visible progress. Better decisions.</ScrollReveal></div><div className="reviews-preview">{sampleReviews.map(r=><article key={r[0]}><div>★★★★★</div><p>“{r[1]}”</p><strong>{r[0]}</strong><small>{r[2]}</small></article>)}<a href="/reviews.html">Read all reviews</a></div></section>
      <Configurator/>
      <section id="pricing" className="section red pricing"><div className="eyebrow">Pricing</div><ScrollReveal>Choose what fits your business now.</ScrollReveal><p className="section-intro">Start with a website, ongoing growth or a custom plan.</p><AccordionGallery items={items}/></section>
      <section className="section faq white"><div><div className="eyebrow">Questions</div><h2>Before you start.</h2></div><div className="faq-list">{[
        ['What is included in the $1,500 website?','A custom, mobile-friendly website with core pages, contact forms, analytics, basic SEO setup and standard animation. Advanced features are quoted separately.'],
        ['How long does a website take?','Most standard websites take about 2–4 weeks after content, branding and approvals are received.'],
        ['What happens after I reserve my project?','A $250 deposit is applied to the final price. We confirm scope and schedule a kickoff call before development begins.'],
        ['Do I own the website?','Yes. After the project is paid in full, you own the website and approved project files.'],
        ['What is included in Foundation?','Local visibility, website improvements, Google Business optimization, reporting and ongoing support. Paid ads are not included.'],
        ['Are results guaranteed?','No responsible agency can guarantee rankings, leads or revenue. We provide measurable work, clear reporting and continuous improvement.']
      ].map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>
      <section id="contact" className="section contact black"><div><div className="eyebrow">Next step</div><h2>Ready when you are.</h2><p>Choose the path that fits where your business is today.</p></div><div className="contact-actions"><a className="button red" href="#website-builder">Start your website</a><a className="button line" href="#audit">Run another audit</a><a className="button line" href="mailto:hello@lggrowthstudio.com">Schedule a strategy call</a></div></section>
    </main>
    <footer><img src="/lg-growth-studio-logo.svg" alt="LG Growth Studio"/><span>Websites · Search · Growth</span></footer>
  </>;
}
