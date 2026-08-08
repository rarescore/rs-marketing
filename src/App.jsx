import { useEffect, useMemo, useRef, useState } from 'react';
import Lenis from 'lenis';
import PomegranateSequence from './components/PomegranateSequence';
import ScrollReveal from './components/ScrollReveal';
import AccordionGallery from './components/AccordionGallery';
import { plans } from './data/site';
import useReducedMotion from './hooks/useReducedMotion';

const scanSteps=[
  'Connecting to the website',
  'Reading the homepage',
  'Testing mobile performance',
  'Checking Core Web Vitals',
  'Inspecting technical SEO',
  'Reading titles and metadata',
  'Checking crawl and index signals',
  'Reviewing content depth',
  'Checking conversion paths',
  'Looking for trust signals',
  'Reviewing website modernity',
  'Building recommendations'
];

const featuredReviews=[
  {name:'A•••••• G.',service:'Website redesign',text:'The new website finally feels like the quality of our business. The process was clear from start to finish.'},
  {name:'M•••••• S.',service:'SEO + local growth',text:'We knew what was being worked on, why it mattered, and what came next.'},
  {name:'R•••••• K.',service:'Website + growth',text:'The site is faster, cleaner, and customers understand what to do immediately.'},
  {name:'D•••••• M.',service:'Paid growth',text:'The biggest difference was clarity. We stopped guessing and could finally see what was working.'},
  {name:'S•••••• A.',service:'Website',text:'The new site looks substantially more professional and is much easier to use on a phone.'},
  {name:'J•••••• T.',service:'SEO',text:'Simple communication, clear priorities, and no confusing reports.'},
];

const reviewPhrases=[
  'The website finally looks like the business we actually run.',
  'Everything was explained clearly and the project stayed organized.',
  'Our mobile site is dramatically easier to use now.',
  'The new pages make it obvious what customers should do next.',
  'We stopped guessing about SEO and started working from a real plan.',
  'The communication was straightforward and the work felt intentional.',
  'The redesign gave us a much more credible first impression.',
  'Our website is faster, cleaner, and much easier to understand.',
  'The process was simple from the audit through launch.',
  'We finally have reporting we can actually understand.',
  'They focused on the important problems instead of sending a giant task list.',
  'The new structure makes our services much easier to find.',
  'It feels custom instead of like another template.',
  'The project moved quickly without feeling rushed.',
  'We now have a website we are comfortable sending customers to.',
  'The audit showed us problems we had never noticed.',
  'Our call-to-action flow is much stronger now.',
  'The work was polished and the handoff was easy.',
  'The difference in mobile performance was immediately noticeable.',
  'Clear work, clear updates, and a much better finished product.'
];
const services=['Website','SEO','Website + growth','Local visibility','Paid growth'];
const generatedReviews=Array.from({length:200},(_,i)=>({
  id:i+1,
  name:`${String.fromCharCode(65+(i%20))}•••••• ${String.fromCharCode(65+((i*7)%20))}.`,
  service:services[i%services.length],
  text:reviewPhrases[i%reviewPhrases.length],
  date:new Date(2026,6-(i%6),Math.max(1,28-(i%25))).toLocaleDateString('en-US',{month:'short',year:'numeric'})
}));

function go(path){ window.location.href=path; }
function scoreTone(score){if(score<40)return ['critical','Critical'];if(score<65)return ['warning','Needs improvement'];if(score<85)return ['healthy','Healthy'];return ['excellent','Excellent'];}

function SiteHeader({dark=false}){
  return <header className={dark?'solid-header':''}>
    <a className="brand" href="/"><img src="/lg-growth-studio-logo.png" alt="LG Growth Studio"/></a>
    <nav><a href="/audit">Audit</a><a href="/#process">Process</a><a href="/reviews">Reviews</a><a href="/#pricing">Pricing</a></nav>
    <a className="top-cta" href="/build-website">Start</a>
  </header>
}

function AuditLaunch({compact=false}){
  const[url,setUrl]=useState('');
  const submit=e=>{e.preventDefault();if(!url.trim())return;go(`/audit?url=${encodeURIComponent(url.trim())}`)};
  return <form className={`audit-launch ${compact?'compact':''}`} onSubmit={submit}>
    <label htmlFor={compact?'audit-small':'audit-hero'}>{compact?'Website address':'See how your website performs'}</label>
    <div><input id={compact?'audit-small':'audit-hero'} value={url} onChange={e=>setUrl(e.target.value)} placeholder="yourwebsite.com" inputMode="url"/><button>Analyze website</button></div>
    <small>Free. No email required. Your report opens on a separate page.</small>
  </form>
}

function HeroStory(){
  return <>
    <PomegranateSequence/>
    <section className="hero-story black" id="story">
      <div className="hero-story-grid">
        <div>
          <div className="eyebrow">LG Growth Studio</div>
          <h1>They’re already looking.<br/><em>Will they find you?</em></h1>
          <p>A few seconds to explain what you do, earn trust, and make the next step obvious.</p>
        </div>
        <AuditLaunch/>
      </div>
    </section>
  </>
}

function DecisionSection(){return <section className="section decision white">
  <div className="eyebrow">The first impression test</div>
  <ScrollReveal>Three questions. A few seconds.</ScrollReveal>
  <div className="decision-editorial">
    <article><span>01</span><h3>Do I understand it?</h3></article>
    <article><span>02</span><h3>Do I trust it?</h3></article>
    <article><span>03</span><h3>Do I know what to do next?</h3></article>
  </div>
  <div className="decision-note"><strong>If any answer is unclear, the website is working too hard.</strong><a href="/audit">Check yours →</a></div>
</section>}

function WebsiteMock({after=false}){
  return <div className={`site-mock ${after?'after':''}`}>
    <div className="mock-browser"><i/><i/><i/><span>{after?'yourbusiness.com':'current-site.com'}</span></div>
    <div className="mock-nav"><b>{after?'YOUR BUSINESS':'LOGO'}</b><span/><span/><span/><button>{after?'GET A QUOTE':'LEARN MORE'}</button></div>
    <div className="mock-body">
      <div className="mock-copy">
        <small>{after?'LOCAL SERVICE · LOS ANGELES':'WELCOME TO OUR WEBSITE'}</small>
        <strong>{after?'The service you need.\nThe next step is clear.':'Quality. Service.\nSolutions.'}</strong>
        <p>{after?'One useful sentence that tells people exactly what you do and where you do it.':'We are a full-service company committed to exceeding expectations and providing solutions.'}</p>
        <button>{after?'REQUEST A QUOTE':'CLICK HERE'}</button>
      </div>
      <div className="mock-visual"><span/><span/><span/></div>
    </div>
    <div className="mock-signals">{(after?['Clear headline','Proof near CTA','Mobile first']:['Generic headline','Competing actions','Weak hierarchy']).map(x=><span key={x}>{x}</span>)}</div>
  </div>
}

function Transformation(){return <section className="section transformation black">
  <div className="eyebrow">Before → better</div>
  <ScrollReveal dark>A better website is not just a redesign.</ScrollReveal>
  <p className="section-intro">The difference should be visible before someone reads a case study.</p>
  <div className="transformation-stage">
    <div className="transformation-column"><span className="transform-label">Before</span><WebsiteMock/></div>
    <div className="transform-arrow" aria-hidden="true"><i/><b>→</b></div>
    <div className="transformation-column"><span className="transform-label">After the right problems are fixed</span><WebsiteMock after/></div>
  </div>
  <div className="transformation-proof"><span>Hierarchy</span><span>CTA placement</span><span>Mobile clarity</span><span>Trust</span><span>SEO structure</span></div>
</section>}

function Process(){
  const ref=useRef(null);
  useEffect(()=>{
    const update=()=>{const el=ref.current;if(!el)return;const r=el.getBoundingClientRect();const span=Math.max(1,r.height-window.innerHeight);const p=Math.max(0,Math.min(1,(window.innerHeight-r.top)/(window.innerHeight+span)));el.style.setProperty('--process-progress',String(p))};
    update();addEventListener('scroll',update,{passive:true});addEventListener('resize',update,{passive:true});return()=>{removeEventListener('scroll',update);removeEventListener('resize',update)};
  },[]);
  return <section ref={ref} id="process" className="section process red">
    <div className="eyebrow">What happens next</div>
    <h2>Audit. Plan. Build. Improve.</h2>
    <p className="section-intro">One clear process. No guessing what happens after you say yes.</p>
    <div className="process-line"><i/></div>
    <div className="timeline">
      {[
        ['01','Audit','Find the problems that matter most.'],
        ['02','Plan','Decide what gets fixed first.'],
        ['03','Build','Design, write, develop, and connect.'],
        ['04','Improve','Measure what happens and keep improving.']
      ].map(([n,t,p],i)=><article key={n} style={{'--step':i}}><span>{n}</span><h3>{t}</h3><p>{p}</p></article>)}
    </div>
  </section>
}

function ReviewRail(){return <div className="review-rail" aria-label="Review layout preview"><div className="review-track">{[...featuredReviews,...featuredReviews].map((r,i)=><article key={`${r.name}-${i}`}><div className="stars">★★★★★</div><p>“{r.text}”</p><strong>{r.name}</strong><small>{r.service}</small></article>)}</div></div>}

function Results(){return <section id="results" className="section results black">
  <div className="results-heading"><div><div className="eyebrow">Review experience</div><h2>Proof should be easy to find.</h2><p className="section-intro">Featured feedback here. The full review library gets its own page.</p></div><div className="review-score"><strong>200</strong><span>review slots</span><small>Development content — replace with verified client reviews before launch.</small></div></div>
  <ReviewRail/>
  <a className="button line light" href="/reviews">Open the full review page</a>
</section>}

function Pricing(){
  const items=useMemo(()=>plans,[]);
  return <section id="pricing" className="section pricing red"><div className="eyebrow">Pricing</div><h2>Choose what fits now.</h2><p className="section-intro">Website projects are one-time. Growth plans are ongoing. Exact scope is confirmed before work starts.</p><AccordionGallery items={items}/></section>
}

function Faq(){const q=[
  ['What is included in the $1,500 website?','A custom mobile-friendly website with core pages, contact forms, analytics, basic SEO setup, and standard motion. Advanced tools, e-commerce, portals, or cinematic production are quoted separately.'],
  ['How long does a website take?','Most standard projects take around 2–4 weeks after content, branding, and approvals are received.'],
  ['What happens after the $250 reservation?','The reservation is applied to the project. We review your selections, confirm scope and timeline, then schedule the kickoff.'],
  ['Do I own the website?','Yes. After the project is paid in full, the agreed website files and approved project content are yours.'],
  ['Can you improve my current website?','Yes. The audit helps determine whether targeted improvements or a rebuild is the better investment.'],
  ['Is advertising spend included?','No. Media spend is paid to the advertising platform and is separate from management fees.'],
  ['How long does SEO take?','SEO is gradual. Technical fixes can happen quickly, while rankings and organic demand usually require consistent work over time.'],
  ['Are results guaranteed?','No responsible agency can guarantee a specific ranking, lead count, or revenue number. We can guarantee clear work, measurement, and transparency about what is being done.']
];return <section className="section faq white"><div><div className="eyebrow">Questions before you start</div><h2>Know what you’re buying.</h2></div><div className="faq-list">{q.map(([a,b])=><details key={a}><summary>{a}<span>+</span></summary><p>{b}</p></details>)}</div></section>}

function FinalCTA(){return <section className="section final-cta black"><div className="eyebrow">Next step</div><h2>Ready when you are.</h2><div className="final-actions"><a className="button red" href="/build-website">Start your website</a><a className="button line light" href="/audit">Run another audit</a><a className="button line light" href="mailto:hello.rarescore@gmail.com?subject=LG%20Growth%20Studio%20Strategy%20Call">Schedule a strategy call</a></div></section>}

function HomePage(){
  const reduced=useReducedMotion();
  useEffect(()=>{if(reduced)return;const lenis=new Lenis({duration:.82,smoothWheel:true,wheelMultiplier:.92});let id;const raf=t=>{lenis.raf(t);id=requestAnimationFrame(raf)};id=requestAnimationFrame(raf);return()=>{cancelAnimationFrame(id);lenis.destroy()}},[reduced]);
  return <><SiteHeader/><main><HeroStory/><DecisionSection/><Transformation/><Process/><Results/><Pricing/><Faq/><FinalCTA/></main><Footer/></>
}

function AuditPage(){
  const initial=new URLSearchParams(window.location.search).get('url')||'';
  const[url,setUrl]=useState(initial);const[status,setStatus]=useState('idle');const[step,setStep]=useState(0);const[result,setResult]=useState(null);const[error,setError]=useState('');
  useEffect(()=>{if(initial)runAudit(initial)},[]); // eslint-disable-line react-hooks/exhaustive-deps
  async function runAudit(value=url){
    if(!value.trim()){setError('Enter a website address.');return}
    setError('');setResult(null);setStatus('scanning');setStep(0);
    const started=Date.now();
    const timer=setInterval(()=>setStep(v=>Math.min(scanSteps.length-1,v+1)),900);
    try{
      const response=await fetch('/api/audit',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({url:value})});
      const data=await response.json();
      if(!response.ok)throw new Error(data.error||'We could not audit that website.');
      const minimum=11500;const elapsed=Date.now()-started;if(elapsed<minimum)await new Promise(r=>setTimeout(r,minimum-elapsed));
      clearInterval(timer);setStep(scanSteps.length-1);await new Promise(r=>setTimeout(r,650));setResult(data);setStatus('done');
    }catch(e){clearInterval(timer);setError(e.message||'We could not audit that website.');setStatus('idle')}
  }
  const tone=result?scoreTone(result.score):['',''];
  const progress=((step+1)/scanSteps.length)*100;
  return <><SiteHeader dark/><main className="audit-page">
    {status==='idle'&&<section className="audit-page-start"><div className="eyebrow">LG Website Analyzer</div><h1>Find out what is<br/><em>holding the site back.</em></h1><p>We inspect performance, technical SEO, content, mobile usability, trust signals and website modernity. Then we translate the findings into what matters first.</p><form onSubmit={e=>{e.preventDefault();runAudit()}}><input value={url} onChange={e=>setUrl(e.target.value)} placeholder="yourwebsite.com"/><button>Analyze website</button></form><small>No email required. Public information only.</small>{error&&<p className="form-error">{error}</p>}</section>}
    {status==='scanning'&&<section className="audit-scanning"><div className="scan-progress"><i style={{width:`${progress}%`}}/></div><div className="eyebrow">Analyzing {url.replace(/^https?:\/\//,'')}</div><h1>{scanSteps[step]}<span className="scan-dots">…</span></h1><p className="scan-count">{String(step+1).padStart(2,'0')} / {String(scanSteps.length).padStart(2,'0')}</p><div className="scan-history">{scanSteps.slice(0,step).slice(-4).map(s=><span key={s}>✓ {s}</span>)}</div></section>}
    {status==='done'&&result&&<AuditResults result={result} tone={tone}/>} 
  </main><Footer/></>
}

function AuditContact({result}){
  const[open,setOpen]=useState(false);const[sent,setSent]=useState(false);const[error,setError]=useState('');const[form,setForm]=useState({name:'',email:'',phone:'',company:''});
  const send=async(e)=>{e.preventDefault();setError('');
    const details=`Please review my website audit.\n\nAudit URL: ${result.url}\nScore: ${result.score}/100\nRecommendation: ${result.recommendation?.label||'Review requested'}\nTop issues:\n${(result.issues||[]).slice(0,6).map(x=>`- ${x.title}: ${x.detail}`).join('\n')}`;
    try{const r=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...form,website:result.url,need:'Website audit review',source:'LG Website Analyzer',details})});const d=await r.json();if(!r.ok)throw new Error(d.error||'Could not send the audit.');if(d.needsSetup){location.href=`mailto:hello.rarescore@gmail.com?subject=${encodeURIComponent('Please review my website audit')}&body=${encodeURIComponent(details+'\n\nName: '+form.name+'\nEmail: '+form.email)}`;return}setSent(true)}catch(e){setError(e.message||'Could not send the audit.')}
  };
  return <div className="audit-contact-wrap"><button className="button dark" onClick={()=>setOpen(v=>!v)}>Send this audit to LG</button>{open&&<form className="audit-contact-form" onSubmit={send}>{sent?<div className="sent-state"><strong>Audit sent.</strong><span>We have the URL, score and findings. We will review what should happen first.</span></div>:<><div className="contact-grid"><input required placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/><input required type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/><input placeholder="Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/><input required placeholder="Business name" value={form.company} onChange={e=>setForm({...form,company:e.target.value})}/></div><button>Send audit for review</button>{error&&<p className="form-error">{error}</p>}</>}</form>}</div>
}

function AuditResults({result,tone}){
  const [toneClass,label]=tone;
  const issues=result.issues||[];
  const mustFix=issues.filter(x=>x.severity==='high');
  const highImpact=issues.filter(x=>x.severity==='medium');
  const opportunities=issues.filter(x=>x.severity==='low');
  const strengths=Object.entries(result.categories||{}).filter(([,v])=>v>=85).slice(0,4);
  const weightText=result.weights?Object.entries(result.weights).map(([k,v])=>`${k} ${Math.round(v*100)}%`).join(' · '):'Performance, SEO, accessibility, technical health and trust signals';
  const renderIssueGroup=(title,subtitle,list,toneName)=> <section className={`audit-issue-band ${toneName}`}><div className="issue-band-heading"><div className="eyebrow">{title}</div><h2>{subtitle}</h2></div><div className="issue-list">{list.length?list.slice(0,6).map((x,i)=><article key={`${x.title}-${i}`}><span>{String(i+1).padStart(2,'0')}</span><div><h3>{x.title}</h3><p>{x.detail}</p><div className="fix"><b>What would make a difference</b><p>{x.fix}</p></div></div></article>):<article className="positive"><span>✓</span><div><h3>No issues in this priority group.</h3><p>The public signals measured here did not flag a problem at this level.</p></div></article>}</div></section>;
  const rec=result.recommendation||{label:'Optimize',detail:'Keep the current foundation and address the highest-impact issues first.'};
  const modernity=result.modernity||{};const content=result.content||{};
  return <div className="audit-report">
    <section className="audit-score-hero"><div><div className="eyebrow">Analysis complete</div><h1>{new URL(result.url).hostname}</h1><p>{result.source}</p><small className="score-method">Score combines {weightText}.</small></div><div className={`score-orbit ${toneClass}`}><strong>{result.score}</strong><span>/100</span><b>{label}</b></div></section>
    <section className="audit-verdict white"><div><div className="eyebrow">The short version</div><h2>{result.verdict||'The site works, but there is room to make it more competitive.'}</h2></div><div className="verdict-note"><span>LG recommendation</span><strong>{rec.label}</strong><p>{rec.detail}</p></div></section>
    {renderIssueGroup('Must fix','These should be addressed first.',mustFix,'must')}
    {renderIssueGroup('High impact','These changes can materially improve the site.',highImpact,'impact')}
    {renderIssueGroup('Opportunity','Good next moves after the fundamentals.',opportunities,'opportunity')}
    <section className="audit-metrics section black"><div className="eyebrow">How the score breaks down</div><h2>See the signals behind the number.</h2><div className="metric-grid">{Object.entries(result.categories||{}).map(([k,v])=><article key={k}><div><span>{k}</span><strong>{v}</strong></div><i><b style={{width:`${v}%`}}/></i></article>)}</div></section>
    <section className="audit-modernity section white"><div className="modernity-head"><div><div className="eyebrow">Website modernity</div><h2>{modernity.score??'—'} / 100</h2><p>{modernity.summary||'We compare public implementation signals with current web practices.'}</p></div><div className="modernity-signals">{(modernity.signals||[]).map((x,i)=><article key={i}><span>{x.status==='good'?'✓':'!'}</span><p>{x.text}</p></article>)}</div></div><div className="retire-note"><span>Repair or replace?</span><strong>{rec.label}</strong><p>{rec.detail}</p></div></section>
    <section className="audit-seo section black"><div><div className="eyebrow">SEO deep dive</div><h2>What Google has to work with.</h2></div><div className="seo-columns"><article><span>Technical SEO</span><strong>{result.categories?.SEO??result.categories?.Technical??'—'}</strong><p>{result.seo?.technical||'We checked metadata, headings, crawl signals, canonical setup, structured data and mobile fundamentals.'}</p></article><article><span>Content depth</span><strong>{content.score??'—'}</strong><p>{content.summary||'We reviewed visible homepage copy and links to service, location and article-style content.'}</p></article><article><span>Search coverage</span><strong>{content.indexableUrls??'—'}</strong><p>{content.indexableUrls!=null?`${content.indexableUrls} URLs were visible in the confirmed XML sitemap. More useful pages can create more ways to be discovered.`:'A confirmed sitemap was not available to estimate public page coverage.'}</p></article></div></section>
    <section className="audit-content-gaps section white"><div className="eyebrow">Content opportunities</div><h2>What are you not answering yet?</h2><div className="content-gap-grid">{(content.opportunities||['Dedicated service pages','Useful customer questions','Location-specific pages','Case studies and proof']).map((x,i)=><article key={i}><span>0{i+1}</span><h3>{x}</h3></article>)}</div><p className="section-intro">The goal is not to publish articles for the sake of publishing. It is to create useful pages that match real customer questions and services.</p></section>
    <section className="audit-impact red"><div><div className="eyebrow">What would make the biggest difference?</div><h2>{rec.label==='Rebuild recommended'?'A cleaner foundation may cost less than continuing to patch the old one.':'Fix the highest-impact problems before adding more marketing.'}</h2></div><div className="impact-list">{issues.slice(0,3).map((x,i)=><article key={i}><span>0{i+1}</span><div><h3>{x.fix}</h3><p>{x.detail}</p></div></article>)}</div></section>
    <section className="audit-do-nothing black"><div className="eyebrow">Leaving it as-is</div><h2>Nothing breaks tomorrow.<br/><em>But nothing improves either.</em></h2><p>Existing speed, SEO, content and conversion limitations remain in place while competitors continue improving theirs.</p></section>
    <section className="audit-strengths section white"><div><div className="eyebrow">What is already helping</div><h2>Keep the good parts.</h2></div><div>{strengths.length?strengths.map(([k,v])=><article key={k}><span>✓</span><div><h3>{k}</h3><p>{v}/100 — a strong signal in this scan.</p></div></article>):<p>No measured category scored above 85. That does not mean the site has no strengths; it means the public signals measured here have room to improve.</p>}</div></section>
    <section className="audit-next red"><div><div className="eyebrow">Choose your next step</div><h2>Use the audit. Don't let it sit in a tab.</h2><p>Send it to us for a human review, improve the current site, or plan a cleaner rebuild.</p><AuditContact result={result}/></div><div className="audit-actions"><a className="button dark" href="/build-website">Build me a new website</a><a className="button line light" href="mailto:hello.rarescore@gmail.com?subject=Improve%20My%20Existing%20Website">Improve this website</a><a className="button line light" href="mailto:hello.rarescore@gmail.com?subject=Website%20Audit%20Strategy%20Call">Schedule a strategy call</a><a className="button line light" href="mailto:hello.rarescore@gmail.com?subject=Website%20Audit%20Question">Contact us</a><a className="button line light" href={`mailto:?subject=${encodeURIComponent('My LG Growth Studio website audit')}&body=${encodeURIComponent(`Website: ${result.url}\nScore: ${result.score}/100\nRecommendation: ${rec.label}`)}`}>Email me this audit</a></div></section>
    <div className="audit-disclaimer">This report analyzes public signals from the homepage, Google PageSpeed Insights when available, and confirmed crawl files. Website age and business impact cannot be known exactly from public HTML alone; “modernity” and LG recommendations are heuristic guidance, not guarantees.</div>
  </div>
}

function ReviewsPage(){
  const params=new URLSearchParams(window.location.search);const requested=Math.max(1,Number(params.get('page'))||1);const perPage=20;const pages=Math.ceil(generatedReviews.length/perPage);const page=Math.min(requested,pages);const start=(page-1)*perPage;const list=generatedReviews.slice(start,start+perPage);
  return <><SiteHeader dark/><main className="reviews-page"><section className="reviews-hero black"><div className="eyebrow">Review experience preview</div><h1>200 review slots.<br/><em>20 at a time.</em></h1><p>This page is wired for 200 reviews with clean pagination. The current text is sample development content and must be replaced with verified customer reviews before the site is published.</p><ReviewRail/></section><section className="review-feature white"><div><span className="stars">★★★★★</span><blockquote>“Your strongest verified customer story belongs here — larger, calmer, and easy to read.”</blockquote></div><small>Featured review position</small></section><section className="review-page-grid white">{list.map(r=><article key={r.id}><div className="stars">★★★★★</div><p>“{r.text}”</p><footer><div><strong>{r.name}</strong><small>{r.service}</small></div><span>{r.date}</span></footer></article>)}</section><nav className="pagination" aria-label="Review pages">{page>1&&<a href={`/reviews?page=${page-1}`}>← Previous</a>}<span>Page {page} of {pages}</span>{page<pages&&<a href={`/reviews?page=${page+1}`}>Next →</a>}</nav></main><Footer/></>
}

const buildScreens=[
  {title:'What are you building?',type:'type',options:['Local service business','Professional practice','E-commerce','Personal brand','Other']},
  {title:'Choose a visual direction',type:'style',options:['Minimal','Bold','Editorial','Cinematic','Professional','Recommend one for me']},
  {title:'How animated should it feel?',type:'motion',options:['Clean','Interactive','Cinematic']},
  {title:'Choose a color direction',type:'color',options:['Light and minimal','Dark and premium','Bright and vivid','Warm and natural','Use my brand colors']},
  {title:'Choose a layout',type:'layout',options:['Conversion focused','Story driven','Information focused','Product focused']},
  {title:'Which features matter?',type:'features',multi:true,options:['Online booking','Quote request form','Reviews','Blog or resources','Multilingual pages','Advanced animation','SEO setup']}
];

function OptionPreview({type,label}){
  if(type==='color')return <div className={`color-preview c-${label.toLowerCase().replace(/[^a-z]+/g,'-')}`}><i/><i/><i/><i/></div>;
  if(type==='layout')return <div className={`layout-preview l-${label.toLowerCase().split(' ')[0]}`}><i/><i/><i/><i/></div>;
  if(type==='motion')return <div className={`motion-preview m-${label.toLowerCase()}`}><i/><i/><i/></div>;
  if(type==='style')return <div className={`style-preview s-${label.toLowerCase().split(' ')[0]}`}><strong>Ag</strong><i/><i/></div>;
  return <div className="type-preview"><i/><b/><span/></div>;
}

function BuildWebsitePage(){
  const[step,setStep]=useState(0);const[choices,setChoices]=useState({});const[done,setDone]=useState(false);const screen=buildScreens[step];
  const selected=choices[step];
  const choose=v=>{
    if(screen.multi){setChoices(x=>{const current=Array.isArray(x[step])?x[step]:[];return {...x,[step]:current.includes(v)?current.filter(a=>a!==v):[...current,v]}});return}
    setChoices(x=>({...x,[step]:v}));if(step<buildScreens.length-1)setTimeout(()=>setStep(step+1),110);
  };
  const printable=(value)=>Array.isArray(value)?value.join(', '):value||'Not selected';
  const summary=buildScreens.map((s,i)=>`${s.title}: ${printable(choices[i])}`).join('\n');const mail=`mailto:hello.rarescore@gmail.com?subject=${encodeURIComponent('My LG Growth Studio Website Plan')}&body=${encodeURIComponent(summary)}`;
  const reserve=async()=>{try{const r=await fetch('/api/create-checkout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({plan:'deposit'})});const d=await r.json();if(d.url){location.href=d.url;return}location.href='mailto:hello.rarescore@gmail.com?subject=Reserve%20My%20Website%20Project%20-%20$250'}catch{location.href='mailto:hello.rarescore@gmail.com?subject=Reserve%20My%20Website%20Project%20-%20$250'}};
  const canContinue=screen.multi?Array.isArray(selected)&&selected.length>0:Boolean(selected);
  return <><SiteHeader dark/><main className="builder-page"><section className="builder-shell">{!done?<><div className="builder-progress"><span>0{step+1}</span><i><b style={{width:`${((step+1)/buildScreens.length)*100}%`}}/></i><span>0{buildScreens.length}</span></div><div className="eyebrow">Professional website configurator</div><h1>{screen.title}</h1><div className={`builder-options visual-options ${screen.multi?'multi':''}`}>{screen.options.map(v=><button key={v} className={(Array.isArray(selected)?selected.includes(v):selected===v)?'selected':''} onClick={()=>choose(v)}><OptionPreview type={screen.type} label={v}/><div><b>{v}</b><span>{screen.multi?'Select':'Choose'} →</span></div></button>)}</div><div className="builder-nav">{step>0?<button onClick={()=>setStep(step-1)}>← Back</button>:<span/>}{screen.multi&&canContinue&&<button className="button red" onClick={()=>setDone(true)}>Build my website plan</button>}</div></>:<div className="builder-complete"><div className="eyebrow">Your website direction</div><h1>Clear enough to build from.</h1><div className="builder-summary-grid">{buildScreens.map((s,i)=><article key={s.title}><span>{s.title}</span><b>{printable(choices[i])}</b></article>)}</div><div className="estimate"><span>Estimated starting investment</span><strong>From $1,500</strong><small>Final price depends on pages, integrations, content and animation scope.</small></div><div className="builder-final-actions"><a className="button red" href={mail}>Submit my website plan</a><button className="button dark" onClick={reserve}>Reserve project — $250</button></div><small>The $250 reservation is intended to be applied to the agreed project total after scope is confirmed. Stripe checkout activates when STRIPE_PRICE_DEPOSIT is configured; otherwise the button opens an email reservation.</small></div>}</section></main><Footer/></>
}

function Footer(){return <footer className="site-footer-simple"><img src="/lg-growth-studio-logo.png" alt="LG Growth Studio"/><span>Performance Marketing · Web Design · SEO · Paid Advertising · AI Automation</span><div><a href="/audit">Audit</a><a href="/reviews">Reviews</a><a href="/#pricing">Pricing</a></div></footer>}

export default function App(){
  const path=window.location.pathname.replace(/\/+$/,'')||'/';
  if(path==='/audit')return <AuditPage/>;
  if(path==='/reviews')return <ReviewsPage/>;
  if(path==='/build-website')return <BuildWebsitePage/>;
  return <HomePage/>;
}
