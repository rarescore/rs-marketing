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
      <div className="hero-audit-shell">
        <div className="eyebrow">Free website audit</div>
        <h1>Check your current website.</h1>
        <p>See what customers and Google see before you spend another dollar driving traffic to it.</p>
        <AuditLaunch/>
        <div className="hero-audit-proof" aria-label="What the audit checks">
          <span>Speed</span><span>SEO</span><span>Mobile</span><span>Content</span><span>Conversion</span>
        </div>
      </div>
    </section>
  </>
}

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

function Transformation(){
  const ref=useRef(null);
  useEffect(()=>{
    const update=()=>{const el=ref.current;if(!el)return;const r=el.getBoundingClientRect();const p=Math.max(0,Math.min(1,(window.innerHeight*.8-r.top)/(r.height+window.innerHeight*.35)));el.style.setProperty('--transform-progress',String(p))};
    update();addEventListener('scroll',update,{passive:true});addEventListener('resize',update,{passive:true});return()=>{removeEventListener('scroll',update);removeEventListener('resize',update)};
  },[]);
  return <section ref={ref} className="section transformation black">
    <div className="eyebrow">Before → rebuilt</div>
    <ScrollReveal dark>Watch the structure change.</ScrollReveal>
    <p className="section-intro">Not a color swap. Hierarchy, clarity, conversion and search structure rebuilt as one system.</p>
    <div className="transformation-stage">
      <div className="transformation-column"><span className="transform-label">Current state</span><WebsiteMock/></div>
      <div className="transform-arrow" aria-hidden="true"><i/><b>→</b></div>
      <div className="transformation-column"><span className="transform-label">Rebuilt experience</span><WebsiteMock after/></div>
    </div>
    <div className="transformation-proof"><span>Hierarchy</span><span>CTA placement</span><span>Mobile clarity</span><span>Trust</span><span>SEO structure</span></div>
  </section>
}

function Process(){
  return <section id="process" className="section process red">
    <div className="process-copy">
      <div className="eyebrow">From idea to growth</div>
      <h2>One team. One system. No handoff maze.</h2>
      <p className="section-intro">We find the bottleneck, build what fixes it, launch it cleanly, then use real performance to decide what happens next.</p>
    </div>
    <div className="timeline">
      {[
        ['01','Diagnose','Audit the website, search visibility, traffic path, and conversion friction.'],
        ['02','Prioritize','Choose the few changes most likely to move the business forward first.'],
        ['03','Build','Design, write, develop, connect tracking, and launch the new experience.'],
        ['04','Compound','Use search, ads, content, and conversion data to keep improving the system.']
      ].map(([n,t,p])=><article key={n}><span>{n}</span><div><h3>{t}</h3><p>{p}</p></div></article>)}
    </div>
  </section>
}

function ReviewRail(){return <div className="review-rail" aria-label="Review layout preview"><div className="review-track">{[...featuredReviews,...featuredReviews].map((r,i)=><article key={`${r.name}-${i}`}><div className="stars">★★★★★</div><p>“{r.text}”</p><strong>{r.name}</strong><small>{r.service}</small></article>)}</div></div>}

function InfiniteReviewMenu(){
  const items=featuredReviews;
  const wrap=useRef(null);
  const cards=useRef([]);
  const rot=useRef(0);
  const target=useRef(0);
  const dragging=useRef(false);
  const lastX=useRef(0);
  const velocity=useRef(.018);
  const raf=useRef(0);
  useEffect(()=>{
    const render=()=>{
      const count=items.length; const step=(Math.PI*2)/count;
      cards.current.forEach((el,i)=>{if(!el)return;const a=i*step+rot.current;const depth=(Math.cos(a)+1)/2;const x=Math.sin(a)*Math.min(430,innerWidth*.33);const z=Math.cos(a)*290;const scale=.78+depth*.22;el.style.transform=`translate3d(calc(-50% + ${x}px),-50%,${z}px) rotateY(${-a}rad) scale(${scale})`;el.style.opacity=String(.24+depth*.76);el.style.zIndex=String(Math.round(depth*100));});
    };
    const tick=()=>{if(!dragging.current){target.current+=velocity.current;velocity.current*=.994;if(Math.abs(velocity.current)<.008)velocity.current=.008}rot.current+=(target.current-rot.current)*.075;render();raf.current=requestAnimationFrame(tick)};
    raf.current=requestAnimationFrame(tick);return()=>cancelAnimationFrame(raf.current);
  },[]);
  const onDown=e=>{dragging.current=true;lastX.current=e.clientX;velocity.current=0;e.currentTarget.setPointerCapture?.(e.pointerId)};
  const onMove=e=>{if(!dragging.current)return;const dx=e.clientX-lastX.current;lastX.current=e.clientX;target.current+=dx*.007;velocity.current=dx*.0009};
  const onUp=()=>{dragging.current=false};
  const onWheel=e=>{target.current+=e.deltaY*.0018;velocity.current=e.deltaY*.00015};
  return <div className="infinite-review-menu" ref={wrap} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} onWheel={onWheel} aria-label="Drag through featured reviews">
    <div className="review-hud"><span>DRAG / SCROLL</span><i/><span>CLIENT FEEDBACK</span></div>
    <div className="review-cylinder">
      {items.map((r,i)=><article ref={el=>cards.current[i]=el} className="infinite-review-card" key={`${r.name}-${i}`}>
        <div className="review-card-top"><span className="stars">★★★★★</span><small>{String(i+1).padStart(2,'0')}</small></div>
        <p>“{r.text}”</p>
        <footer><div><strong>{r.name}</strong><small>{r.service}</small></div><a href="/reviews">Read more ↗</a></footer>
      </article>)}
    </div>
  </div>
}

function BuiltDifferently(){return <section className="built-different" aria-label="LG capabilities showcase"><div className="built-stage"><div className="built-grid"/><span className="built-word">Web Design</span><span className="built-word">SEO</span><span className="built-word">Paid Growth</span><span className="built-word">AI Automation</span><span className="built-word">Development</span><div className="built-core"><div className="eyebrow">Built differently</div><h2>Make it<br/><em>felt.</em></h2></div></div></section>}

function ClickSpark(){
  const canvas=useRef(null);const sparks=useRef([]);const raf=useRef(0);
  useEffect(()=>{
    const c=canvas.current,ctx=c.getContext('2d');
    const resize=()=>{const d=Math.min(devicePixelRatio||1,2);c.width=innerWidth*d;c.height=innerHeight*d;c.style.width=`${innerWidth}px`;c.style.height=`${innerHeight}px`;ctx.setTransform(d,0,0,d,0,0)};resize();addEventListener('resize',resize);
    const click=e=>{const count=8;for(let i=0;i<count;i++){const a=i/count*Math.PI*2; sparks.current.push({x:e.clientX,y:e.clientY,a,born:performance.now(),len:7+Math.random()*7,speed:42+Math.random()*34})}};
    addEventListener('pointerdown',click,{passive:true});
    const draw=t=>{ctx.clearRect(0,0,innerWidth,innerHeight);sparks.current=sparks.current.filter(s=>t-s.born<420);ctx.lineCap='round';ctx.lineWidth=1.6;ctx.strokeStyle='#ff1a28';for(const s of sparks.current){const p=(t-s.born)/420;const d=s.speed*p;const fade=1-p;const x=s.x+Math.cos(s.a)*d,y=s.y+Math.sin(s.a)*d;ctx.globalAlpha=fade;ctx.beginPath();ctx.moveTo(x-Math.cos(s.a)*s.len*.5,y-Math.sin(s.a)*s.len*.5);ctx.lineTo(x+Math.cos(s.a)*s.len*.5,y+Math.sin(s.a)*s.len*.5);ctx.stroke()}ctx.globalAlpha=1;raf.current=requestAnimationFrame(draw)};raf.current=requestAnimationFrame(draw);
    return()=>{cancelAnimationFrame(raf.current);removeEventListener('resize',resize);removeEventListener('pointerdown',click)}
  },[]);
  return <canvas ref={canvas} className="click-spark-canvas" aria-hidden="true"/>;
}

function FuturisticShell(){return <ClickSpark/>}

const activityItems=[
  {icon:'↗',title:'A•••••• Plumbing ran a website audit',meta:'Los Angeles · recent',demo:true},
  {icon:'✓',title:'M•••••• Dental opened a website plan',meta:'Phoenix · recent',demo:true},
  {icon:'$',title:'R•••••• Law Group reserved a project',meta:'Las Vegas · recent',demo:true},
  {icon:'↗',title:'S•••••• Roofing ran a website audit',meta:'Dallas · recent',demo:true}
];
function ActivityPopups(){
  const[index,setIndex]=useState(-1);const[out,setOut]=useState(false);
  useEffect(()=>{let show,hide,next;const schedule=()=>{next=setTimeout(()=>{setOut(false);setIndex(i=>(i+1)%activityItems.length);hide=setTimeout(()=>{setOut(true);show=setTimeout(schedule,450)},5200)},18000+Math.random()*18000)};show=setTimeout(schedule,7000);return()=>{clearTimeout(show);clearTimeout(hide);clearTimeout(next)}},[]);
  if(index<0)return null;const x=activityItems[index];return <div className="activity-stack"><div className={`activity-toast ${out?'out':''}`}><div className="activity-icon">{x.icon}</div><div className="activity-copy"><strong>{x.title}</strong><span>{x.meta}</span></div><div className="activity-badge">Demo activity</div></div></div>;
}

function Results(){return <section id="results" className="section results black">
  <div className="results-heading"><div><div className="eyebrow">Client feedback</div><h2>Good work should be easy to recognize.</h2><p className="section-intro">A few reactions to better websites, clearer strategy, and marketing people can actually understand.</p></div><a className="results-link" href="/reviews">Read all reviews →</a></div>
  <InfiniteReviewMenu/>
  <a className="button line light" href="/reviews">Read more reviews</a>
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
  return <><FuturisticShell/><ActivityPopups/><SiteHeader/><main><HeroStory/><Transformation/><Process/><Results/><BuiltDifferently/><Pricing/><Faq/><FinalCTA/></main><Footer/></>
}

function AuditPage(){
  const initial=new URLSearchParams(window.location.search).get('url')||'';
  const[url,setUrl]=useState(initial);const[status,setStatus]=useState('idle');const[step,setStep]=useState(0);const[result,setResult]=useState(null);const[error,setError]=useState('');const[assist,setAssist]=useState(false);
  useEffect(()=>{if(status==='idle')return;const seen=sessionStorage.getItem('lg-audit-assist');if(seen)return;const t=setTimeout(()=>{setAssist(true);sessionStorage.setItem('lg-audit-assist','1')},15000);return()=>clearTimeout(t)},[status]);
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
  return <><FuturisticShell/><ActivityPopups/><SiteHeader dark/><main className="audit-page">
    {status==='idle'&&<section className="audit-page-start"><div className="eyebrow">LG Website Analyzer</div><h1>Find out what is<br/><em>holding the site back.</em></h1><p>We inspect performance, technical SEO, content, mobile usability, trust signals and website modernity. Then we translate the findings into what matters first.</p><form onSubmit={e=>{e.preventDefault();runAudit()}}><input value={url} onChange={e=>setUrl(e.target.value)} placeholder="yourwebsite.com"/><button>Analyze website</button></form><small>No email required. Public information only.</small>{error&&<p className="form-error">{error}</p>}</section>}
    {status==='scanning'&&<section className="audit-scanning"><div className="scan-progress"><i style={{width:`${progress}%`}}/></div><div className="eyebrow">Analyzing {url.replace(/^https?:\/\//,'')}</div><h1>{scanSteps[step]}<span className="scan-dots">…</span></h1><p className="scan-count">{String(step+1).padStart(2,'0')} / {String(scanSteps.length).padStart(2,'0')}</p><div className="scan-history">{scanSteps.slice(0,step).slice(-4).map(s=><span key={s}>✓ {s}</span>)}</div></section>}
    {status==='done'&&result&&<AuditResults result={result} tone={tone}/>} 
  </main>{assist&&<div className="audit-assist"><button className="audit-assist-close" aria-label="Close" onClick={()=>setAssist(false)}>×</button><small>Human review</small><strong>Want us to read this with you?</strong><p>Send the audit to LG and we’ll tell you which findings matter first — and which ones can wait.</p><div className="audit-assist-actions"><button className="button red" onClick={()=>{setAssist(false);document.querySelector('.audit-next')?.scrollIntoView({behavior:'smooth'})}}>Send this audit to LG</button><button className="button line light" onClick={()=>setAssist(false)}>Keep exploring</button></div></div>}<Footer/></>
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
  const renderIssueGroup=(title,subtitle,list,toneName)=> <section id={toneName==='must'?'audit-priority':undefined} className={`audit-issue-band ${toneName}`}><div className="issue-band-heading"><div className="eyebrow">{title}</div><h2>{subtitle}</h2></div><div className="issue-list">{list.length?list.slice(0,6).map((x,i)=><article key={`${x.title}-${i}`}><span>{String(i+1).padStart(2,'0')}</span><div><h3>{x.title}</h3><p>{x.detail}</p><div className="fix"><b>What would make a difference</b><p>{x.fix}</p></div></div></article>):<article className="positive"><span>✓</span><div><h3>No issues in this priority group.</h3><p>The public signals measured here did not flag a problem at this level.</p></div></article>}</div></section>;
  const rec=result.recommendation||{label:'Optimize',detail:'Keep the current foundation and address the highest-impact issues first.'};
  const modernity=result.modernity||{};const content=result.content||{};
  return <div className="audit-report"><nav className="audit-sticky-nav" aria-label="Audit sections"><a href="#audit-overview" data-label="Overview"/><a href="#audit-priority" data-label="Priorities"/><a href="#audit-seo" data-label="SEO"/><a href="#audit-modernity" data-label="Modernity"/><a href="#audit-next" data-label="Next step"/></nav>
    <section id="audit-overview" className="audit-score-hero"><div><div className="eyebrow">Analysis complete</div><h1>{new URL(result.url).hostname}</h1><p>{result.source}</p><small className="score-method">Score combines {weightText}.</small></div><div className={`score-orbit ${toneClass}`}><strong>{result.score}</strong><span>/100</span><b>{label}</b></div></section>
    <section className="audit-verdict white"><div><div className="eyebrow">The short version</div><h2>{result.verdict||'The site works, but there is room to make it more competitive.'}</h2></div><div className="verdict-note"><span>LG recommendation</span><strong>{rec.label}</strong><p>{rec.detail}</p></div></section>
    {renderIssueGroup('Must fix','These should be addressed first.',mustFix,'must')}
    {renderIssueGroup('High impact','These changes can materially improve the site.',highImpact,'impact')}
    {renderIssueGroup('Opportunity','Good next moves after the fundamentals.',opportunities,'opportunity')}
    <section className="audit-metrics section black"><div className="eyebrow">How the score breaks down</div><h2>See the signals behind the number.</h2><div className="metric-grid">{Object.entries(result.categories||{}).map(([k,v])=><article key={k}><div><span>{k}</span><strong>{v}</strong></div><i><b style={{width:`${v}%`}}/></i></article>)}</div></section>
    <section id="audit-modernity" className="audit-modernity section white"><div className="modernity-head"><div><div className="eyebrow">Website modernity</div><h2>{modernity.score??'—'} / 100</h2><p>{modernity.summary||'We compare public implementation signals with current web practices.'}</p></div><div className="modernity-signals">{(modernity.signals||[]).map((x,i)=><article key={i}><span>{x.status==='good'?'✓':'!'}</span><p>{x.text}</p></article>)}</div></div><div className="retire-note"><span>Repair or replace?</span><strong>{rec.label}</strong><p>{rec.detail}</p></div></section>
    <section id="audit-seo" className="audit-seo section black"><div><div className="eyebrow">SEO deep dive</div><h2>What Google has to work with.</h2></div><div className="seo-columns"><article><span>Technical SEO</span><strong>{result.categories?.SEO??result.categories?.Technical??'—'}</strong><p>{result.seo?.technical||'We checked metadata, headings, crawl signals, canonical setup, structured data and mobile fundamentals.'}</p></article><article><span>Content depth</span><strong>{content.score??'—'}</strong><p>{content.summary||'We reviewed visible homepage copy and links to service, location and article-style content.'}</p></article><article><span>Search coverage</span><strong>{content.indexableUrls??'—'}</strong><p>{content.indexableUrls!=null?`${content.indexableUrls} URLs were visible in the confirmed XML sitemap. More useful pages can create more ways to be discovered.`:'A confirmed sitemap was not available to estimate public page coverage.'}</p></article></div></section>
    <section className="audit-content-gaps section white"><div className="eyebrow">Content opportunities</div><h2>What are you not answering yet?</h2><div className="content-gap-grid">{(content.opportunities||['Dedicated service pages','Useful customer questions','Location-specific pages','Case studies and proof']).map((x,i)=><article key={i}><span>0{i+1}</span><h3>{x}</h3></article>)}</div><p className="section-intro">The goal is not to publish articles for the sake of publishing. It is to create useful pages that match real customer questions and services.</p></section>
    <section className="audit-impact red"><div><div className="eyebrow">What would make the biggest difference?</div><h2>{rec.label==='Rebuild recommended'?'A cleaner foundation may cost less than continuing to patch the old one.':'Fix the highest-impact problems before adding more marketing.'}</h2></div><div className="impact-list">{issues.slice(0,3).map((x,i)=><article key={i}><span>0{i+1}</span><div><h3>{x.fix}</h3><p>{x.detail}</p></div></article>)}</div></section>
    <section className="audit-do-nothing black"><div className="eyebrow">Leaving it as-is</div><h2>Nothing breaks tomorrow.<br/><em>But nothing improves either.</em></h2><p>Existing speed, SEO, content and conversion limitations remain in place while competitors continue improving theirs.</p></section>
    <section className="audit-strengths section white"><div><div className="eyebrow">What is already helping</div><h2>Keep the good parts.</h2></div><div>{strengths.length?strengths.map(([k,v])=><article key={k}><span>✓</span><div><h3>{k}</h3><p>{v}/100 — a strong signal in this scan.</p></div></article>):<p>No measured category scored above 85. That does not mean the site has no strengths; it means the public signals measured here have room to improve.</p>}</div></section>
    <section id="audit-next" className="audit-next red"><div><div className="eyebrow">Choose your next step</div><h2>Use the audit. Don't let it sit in a tab.</h2><p>Send it to us for a human review, improve the current site, or plan a cleaner rebuild.</p><AuditContact result={result}/></div><div className="audit-actions"><a className="button dark" href="/build-website">Build me a new website</a><a className="button line light" href="mailto:hello.rarescore@gmail.com?subject=Improve%20My%20Existing%20Website">Improve this website</a><a className="button line light" href="mailto:hello.rarescore@gmail.com?subject=Website%20Audit%20Strategy%20Call">Schedule a strategy call</a><a className="button line light" href="mailto:hello.rarescore@gmail.com?subject=Website%20Audit%20Question">Contact us</a><a className="button line light" href={`mailto:?subject=${encodeURIComponent('My LG Growth Studio website audit')}&body=${encodeURIComponent(`Website: ${result.url}\nScore: ${result.score}/100\nRecommendation: ${rec.label}`)}`}>Email me this audit</a></div></section>
    <div className="audit-disclaimer">This report analyzes public signals from the homepage, Google PageSpeed Insights when available, and confirmed crawl files. Website age and business impact cannot be known exactly from public HTML alone; “modernity” and LG recommendations are heuristic guidance, not guarantees.</div>
  </div>
}

function ReviewsPage(){
  const params=new URLSearchParams(window.location.search);const requested=Math.max(1,Number(params.get('page'))||1);const perPage=20;const pages=Math.ceil(generatedReviews.length/perPage);const page=Math.min(requested,pages);const start=(page-1)*perPage;const list=generatedReviews.slice(start,start+perPage);
  return <><FuturisticShell/><ActivityPopups/><SiteHeader dark/><main className="reviews-page">
    <section className="reviews-hero black"><div className="eyebrow">Client feedback</div><h1>What changed after the work.</h1><p>Better first impressions. Clearer pages. Stronger search foundations. Easier decisions for the people landing on the site.</p><InfiniteReviewMenu/></section>
    <section className="review-page-head white"><div><div className="eyebrow">More feedback</div><h2>Read at your own pace.</h2></div><p>Twenty reviews per page, with the full story kept readable instead of buried inside an animation.</p></section>
    <section className="review-page-grid white">{list.map(r=><article key={r.id}><div className="stars">★★★★★</div><p>“{r.text}”</p><footer><div><strong>{r.name}</strong><small>{r.service}</small></div><span>{r.date}</span></footer></article>)}</section>
    <nav className="pagination" aria-label="Review pages">{page>1&&<a href={`/reviews?page=${page-1}`}>← Previous</a>}<span>Page {page} of {pages}</span>{page<pages&&<a href={`/reviews?page=${page+1}`}>Next →</a>}</nav>
  </main><Footer/></>
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
  return <><FuturisticShell/><ActivityPopups/><SiteHeader dark/><main className="builder-page"><section className="builder-shell">{!done?<><div className="builder-progress"><span>0{step+1}</span><i><b style={{width:`${((step+1)/buildScreens.length)*100}%`}}/></i><span>0{buildScreens.length}</span></div><div className="eyebrow">Professional website configurator</div><h1>{screen.title}</h1><div className={`builder-options visual-options ${screen.multi?'multi':''}`}>{screen.options.map(v=><button key={v} className={(Array.isArray(selected)?selected.includes(v):selected===v)?'selected':''} onClick={()=>choose(v)}><OptionPreview type={screen.type} label={v}/><div><b>{v}</b><span>{screen.multi?'Select':'Choose'} →</span></div></button>)}</div><div className="builder-nav">{step>0?<button onClick={()=>setStep(step-1)}>← Back</button>:<span/>}{screen.multi&&canContinue&&<button className="button red" onClick={()=>setDone(true)}>Build my website plan</button>}</div></>:<div className="builder-complete"><div className="eyebrow">Your website direction</div><h1>Clear enough to build from.</h1><div className="builder-summary-grid">{buildScreens.map((s,i)=><article key={s.title}><span>{s.title}</span><b>{printable(choices[i])}</b></article>)}</div><div className="estimate"><span>Estimated starting investment</span><strong>From $1,500</strong><small>Final price depends on pages, integrations, content and animation scope.</small></div><div className="builder-final-actions"><a className="button red" href={mail}>Submit my website plan</a><button className="button dark" onClick={reserve}>Reserve project — $250</button></div><small>The $250 reservation is intended to be applied to the agreed project total after scope is confirmed. Stripe checkout activates when STRIPE_PRICE_DEPOSIT is configured; otherwise the button opens an email reservation.</small></div>}</section></main><Footer/></>
}

function Footer(){return <footer className="site-footer-simple"><img src="/lg-growth-studio-logo.png" alt="LG Growth Studio"/><span>Performance Marketing · Web Design · SEO · Paid Advertising · AI Automation</span><div><a href="/audit">Audit</a><a href="/reviews">Reviews</a><a href="/#pricing">Pricing</a></div></footer>}

export default function App(){
  const path=window.location.pathname.replace(/\/+$/,'')||'/';
  if(path==='/audit')return <AuditPage/>;
  if(path==='/reviews')return <ReviewsPage/>;
  if(path==='/build-website')return <BuildWebsitePage/>;
  return <HomePage/>;
}
