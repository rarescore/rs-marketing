import { useEffect, useMemo, useState } from 'react';
import Lenis from 'lenis';
import PomegranateSequence from './components/PomegranateSequence';
import ScrollReveal from './components/ScrollReveal';
import AccordionGallery from './components/AccordionGallery';
import { plans } from './data/site';
import useReducedMotion from './hooks/useReducedMotion';

const scanSteps=['Reading your website','Checking mobile experience','Testing search structure','Reviewing trust signals','Mapping conversion problems','Preparing recommendations'];
const sampleReviews=[
  ['A•••••• G.','The new website finally feels like the quality of our business. The process was clear from start to finish.','Website redesign'],
  ['M•••••• S.','We knew what was being worked on, why it mattered, and what came next.','SEO'],
  ['R•••••• K.','The site is faster, cleaner, and customers understand what to do immediately.','Website + growth']
];

function Audit(){
  const [url,setUrl]=useState(''); const [status,setStatus]=useState('idle'); const [step,setStep]=useState(0); const [result,setResult]=useState(null); const [error,setError]=useState('');
  const run=async()=>{
    if(!url.trim()){setError('Enter your website address.');return}
    setError('');setResult(null);setStatus('scanning');setStep(0);
    const timer=setInterval(()=>setStep(v=>Math.min(scanSteps.length-1,v+1)),520);
    try{
      const response=await fetch('/api/audit',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({url})});
      const data=await response.json(); if(!response.ok)throw new Error(data.error||'We could not audit that website.');
      clearInterval(timer);setStep(scanSteps.length-1);setTimeout(()=>{setResult(data);setStatus('done')},350);
    }catch(e){
      clearInterval(timer);
      const demo={score:58,categories:{Metadata:62,Structure:55,Crawlability:71,Mobile:49,Media:64,Trust:58},issues:[
        {severity:'high',title:'Your homepage message is difficult to understand quickly',detail:'Visitors may not know what you do or what action to take.',fix:'Use one clear headline and one primary call to action.'},
        {severity:'medium',title:'Mobile performance needs attention',detail:'The page may feel slow or crowded on smaller screens.',fix:'Reduce page weight and simplify the mobile layout.'},
        {severity:'medium',title:'Search visibility can be improved',detail:'Important service and location signals are not clear enough.',fix:'Strengthen page titles, headings and local relevance.'}
      ],summary:'Preview analysis shown because the live audit service is not available in this local build.'};
      setTimeout(()=>{setResult(demo);setStatus('done')},350);
    }
  };
  const tone=result?result.score<40?'critical':result.score<65?'warning':result.score<85?'healthy':'excellent':'';
  return <section id="audit" className="section audit white">
    <div className="audit-intro"><div className="eyebrow">Free website audit</div><h2>See how your website performs.</h2><p>We check speed, mobile usability, search visibility, trust signals and conversion structure.</p></div>
    <div className={`audit-console ${status}`}>
      {status==='idle'&&<><label htmlFor="audit-url">Your website</label><div className="audit-input"><input id="audit-url" value={url} onChange={e=>setUrl(e.target.value)} onKeyDown={e=>e.key==='Enter'&&run()} placeholder="yourwebsite.com"/><button onClick={run}>Analyze website</button></div><small>Free. Takes about 20 seconds.</small>{error&&<p className="form-error">{error}</p>}</>}
      {status==='scanning'&&<div className="scan-state"><span className="scan-line"/><h3>Analyzing your website</h3><ul>{scanSteps.map((s,i)=><li key={s} className={i<=step?'active':''}><span>{i<step?'✓':i===step?'●':'○'}</span>{s}</li>)}</ul></div>}
      {status==='done'&&result&&<div className="audit-result">
        <div className={`score ${tone}`}><span>{result.score}</span><small>/100</small><b>{result.score<40?'Critical':result.score<65?'Needs improvement':result.score<85?'Healthy':'Excellent'}</b></div>
        <div className="category-grid">{Object.entries(result.categories||{}).slice(0,6).map(([k,v])=><div key={k}><span>{k}</span><strong>{v}</strong><i><em style={{width:`${v}%`}}/></i></div>)}</div>
        <div className="issue-list"><h3>What is costing you customers</h3>{(result.issues||[]).slice(0,3).map((x,i)=><article key={x.title}><span>0{i+1}</span><div><h4>{x.title}</h4><p>{x.detail}</p><small>{x.fix}</small></div></article>)}</div>
        <p className="audit-note">{result.summary}</p><a className="button red" href="#transformation">Show me how</a>
      </div>}
    </div>
  </section>
}

function Configurator(){const[open,setOpen]=useState(false);const[step,setStep]=useState(0);const[choices,setChoices]=useState({});const screens=[
['What are you building?',['Local service business','Professional practice','E-commerce','Personal brand','Other']],
['Choose a visual direction',['Minimal','Bold','Editorial','Cinematic','Professional','Recommend one for me']],
['How animated should it feel?',['Clean','Interactive','Cinematic']],
['Choose a color direction',['Light and minimal','Dark and premium','Bright and vivid','Warm and natural','Use my brand colors']],
['Choose a layout',['Conversion focused','Story driven','Information focused','Product focused']],
['Important features',['Online booking','Quote request form','Reviews','Blog or resources','Multilingual pages','Advanced animation','SEO setup']]
];
const select=v=>{setChoices({...choices,[step]:v}); if(step<screens.length-1)setStep(step+1)};
return <section id="website-builder" className="section builder black"><div><div className="eyebrow">Professional website</div><ScrollReveal dark>Start with a clear direction, not a blank form.</ScrollReveal><p>Choose the style, motion, colors and features you like. We turn it into a clear project plan.</p></div><button className="button red" onClick={()=>setOpen(true)}>Start your website</button>{open&&<div className="modal" role="dialog" aria-modal="true"><div className="modal-card"><button className="modal-close" onClick={()=>setOpen(false)}>Close</button><span className="modal-step">0{step+1} / 0{screens.length}</span><h3>{screens[step][0]}</h3><div className="option-grid">{screens[step][1].map(v=><button key={v} onClick={()=>select(v)}>{v}</button>)}</div>{step>0&&<button className="back" onClick={()=>setStep(step-1)}>Back</button>}{step===screens.length-1&&choices[step]&&<div/>}</div></div>}</section>}

export default function App(){
  const reduced=useReducedMotion();
  useEffect(()=>{if(reduced)return;const lenis=new Lenis({duration:1.05,smoothWheel:true});let id;const raf=t=>{lenis.raf(t);id=requestAnimationFrame(raf)};id=requestAnimationFrame(raf);return()=>{cancelAnimationFrame(id);lenis.destroy()}},[reduced]);
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
    <aside className="activity" aria-label="Recent activity"><b>A•••••• G.</b><span>reserved a website project</span><small>Sample activity</small></aside>
    <footer><img src="/lg-growth-studio-logo.svg" alt="LG Growth Studio"/><span>Websites · Search · Growth</span></footer>
  </>;
}
