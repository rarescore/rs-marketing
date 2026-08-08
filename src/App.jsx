import { useEffect, useMemo, useRef, useState } from 'react';
import Lenis from 'lenis';
import PomegranateSequence from './components/PomegranateSequence';
import ScrollReveal from './components/ScrollReveal';
import AccordionGallery from './components/AccordionGallery';
import { plans } from './data/site';
import { articles, articleBySlug } from './articles';
import { sampleReviewFixtures } from './reviewFixtures';
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

const showSampleReviews = import.meta.env.DEV || import.meta.env.VITE_SHOW_SAMPLE_REVIEWS === 'true';
const verifiedReviews = [];
const generatedReviews = showSampleReviews ? sampleReviewFixtures : verifiedReviews;
const featuredReviews = generatedReviews.filter(r=>r.text.split(/\s+/).length<122).slice(0,6);


function go(path){ window.location.href=path; }
function scoreTone(score){if(score<40)return ['critical','Critical'];if(score<65)return ['warning','Needs improvement'];if(score<85)return ['healthy','Healthy'];return ['excellent','Excellent'];}

const SITE_URL = import.meta.env.VITE_SITE_URL || (typeof window!=='undefined' ? window.location.origin : 'https://lggrowthstudio.com');
function usePageSeo({title='LG Growth Studio',description='LG Growth Studio builds websites, search visibility and growth systems for businesses that want to be easier to find, trust and choose.',image='/assets/growth-engine.webp',noindex=false,schema=null,keywords=[]}={}){
  useEffect(()=>{
    const upsert=(selector,attrs)=>{let el=document.head.querySelector(selector);if(!el){el=document.createElement('meta');document.head.appendChild(el)}Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,v));return el};
    document.title=title;
    upsert('meta[name="description"]',{name:'description',content:description});
    upsert('meta[name="robots"]',{name:'robots',content:noindex?'noindex,nofollow':'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'});
    upsert('meta[property="og:title"]',{property:'og:title',content:title});
    upsert('meta[property="og:description"]',{property:'og:description',content:description});
    upsert('meta[property="og:type"]',{property:'og:type',content:schema?'article':'website'});
    upsert('meta[property="og:image"]',{property:'og:image',content:image.startsWith('http')?image:`${SITE_URL}${image}`});
    upsert('meta[name="twitter:card"]',{name:'twitter:card',content:'summary_large_image'});
    if(keywords.length) upsert('meta[name="keywords"]',{name:'keywords',content:keywords.join(', ')});
    let canonical=document.head.querySelector('link[rel="canonical"]');if(!canonical){canonical=document.createElement('link');canonical.rel='canonical';document.head.appendChild(canonical)}
    canonical.href=`${SITE_URL}${window.location.pathname}`;
    document.querySelectorAll('script[data-lg-schema]').forEach(x=>x.remove());
    if(schema){const script=document.createElement('script');script.type='application/ld+json';script.dataset.lgSchema='1';script.text=JSON.stringify(schema);document.head.appendChild(script)}
    return()=>{};
  },[title,description,image,noindex,JSON.stringify(schema),keywords.join('|')]);
}

function SiteHeader({dark=false}){
  const[menuOpen,setMenuOpen]=useState(false);
  const current=typeof window!=='undefined'?(window.location.pathname.replace(/\/+$/,'')||'/'):'/';
  const navClass=href=>current===href?'current':'';
  useEffect(()=>{document.body.style.overflow=menuOpen?'hidden':'';return()=>{document.body.style.overflow=''}},[menuOpen]);
  return <header className={dark?'solid-header':''}>
    <a className="brand" href="/"><img src="/lg-growth-studio-logo.png" alt="LG Growth Studio"/></a>
    <nav><a className={navClass('/contact')} href="/contact">Contact</a><a className={navClass('/audit')} href="/audit">Audit</a><a className={navClass('/process')} href="/process">Process</a><a className={navClass('/reviews')} href="/reviews">Reviews</a><a className={navClass('/pricing')} href="/pricing">Pricing</a><a className={current.startsWith('/articles')?'current':''} href="/articles">Articles</a></nav>
    <a className={`top-cta ${navClass('/build-website')}`} href="/build-website">Start</a>
    <button className="menu-toggle" aria-expanded={menuOpen} aria-label={menuOpen?'Close menu':'Open menu'} onClick={()=>setMenuOpen(v=>!v)}><span>{menuOpen?'Close':'Menu'}</span><i/><i/></button>
    <div className={`mobile-menu ${menuOpen?'open':''}`}><a className={navClass('/contact')} href="/contact"><span>01</span>Contact</a><a className={navClass('/audit')} href="/audit"><span>02</span>Audit</a><a className={navClass('/process')} href="/process"><span>03</span>Process</a><a className={navClass('/reviews')} href="/reviews"><span>04</span>Reviews</a><a className={navClass('/pricing')} href="/pricing"><span>05</span>Pricing</a><a className={current.startsWith('/articles')?'current':''} href="/articles"><span>06</span>Articles</a><a className={navClass('/build-website')} href="/build-website"><span>07</span>Start a project</a></div>
    <div className="mobile-dock" aria-label="Quick navigation"><a className={navClass('/audit')} href="/audit"><span>◎</span>Audit</a><a className={current.startsWith('/articles')?'current':''} href="/articles"><span>▤</span>Read</a><a className={navClass('/pricing')} href="/pricing"><span>$</span>Pricing</a><a className={navClass('/build-website')} href="/build-website"><span>＋</span>Start</a></div>
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
        <h1>Check your <em>current website.</em></h1>
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
  const[phase,setPhase]=useState(0);
  useEffect(()=>{
    let ticking=false;
    const update=()=>{
      ticking=false;
      const el=ref.current;if(!el)return;
      const r=el.getBoundingClientRect();
      const total=Math.max(1,r.height-window.innerHeight*.45);
      const p=Math.max(0,Math.min(1,(window.innerHeight*.72-r.top)/total));
      const ease=p*p*(3-2*p);
      el.style.setProperty('--rebuild',String(ease));
      el.style.setProperty('--scene-ry',`${-14+ease*14}deg`);
      el.style.setProperty('--scene-rx',`${7-ease*7}deg`);
      el.style.setProperty('--scan-x',`${Math.max(-18,Math.min(118,(p-.18)*165))}%`);
      el.style.setProperty('--old-opacity',String(Math.max(0,1-p*1.55)));
      el.style.setProperty('--new-opacity',String(Math.max(.12,Math.min(1,(p-.28)*1.75))));
      el.style.setProperty('--z-nav',`${(1-ease)*175}px`);
      el.style.setProperty('--z-hero',`${(1-ease)*125}px`);
      el.style.setProperty('--z-proof',`${(1-ease)*78}px`);
      el.style.setProperty('--z-cta',`${(1-ease)*220}px`);
      el.style.setProperty('--y-nav',`${(1-ease)*-58}px`);
      el.style.setProperty('--y-hero',`${(1-ease)*18}px`);
      el.style.setProperty('--y-proof',`${(1-ease)*68}px`);
      el.style.setProperty('--y-cta',`${(1-ease)*112}px`);
      const next=p<.28?0:p<.58?1:p<.82?2:3;
      setPhase(v=>v===next?v:next);
    };
    const onScroll=()=>{if(!ticking){ticking=true;requestAnimationFrame(update)}};
    update();addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll,{passive:true});
    return()=>{removeEventListener('scroll',onScroll);removeEventListener('resize',onScroll)};
  },[]);
  const phases=[
    ['01','Strip the noise','Remove the competing messages and weak hierarchy.'],
    ['02','Rebuild the structure','Put the offer, proof and next action where people expect them.'],
    ['03','Connect search + conversion','Give Google clearer pages and customers clearer reasons to act.'],
    ['04','Lock the system','Everything settles into one fast, intentional experience.']
  ];
  return <section ref={ref} className="section transformation red award-rebuild">
    <div className="rebuild-copy">
      <div className="eyebrow">Live rebuild</div>
      <ScrollReveal dark>A website should feel engineered.</ScrollReveal>
      <p className="section-intro">Scroll through the rebuild. We separate the pieces, fix the hierarchy, then lock them back together as one system.</p>
      <div className="rebuild-phases">{phases.map(([n,t,d],i)=><article className={phase===i?'active':''} key={n}><span>{n}</span><div><strong>{t}</strong><p>{d}</p></div></article>)}</div>
    </div>
    <div className="rebuild-visual" aria-label="Interactive website rebuild demonstration">
      <div className="rebuild-orbit orbit-a"/><div className="rebuild-orbit orbit-b"/>
      <div className="rebuild-browser-3d">
        <div className="rebuild-chrome"><i/><i/><i/><span>yourbusiness.com</span><b>LIVE</b></div>
        <div className="rebuild-surface">
          <div className="old-ghost"><span>WELCOME TO OUR WEBSITE</span><h3>Quality. Service. Solutions.</h3><p>Generic copy. Too many choices. Nothing feels urgent or specific.</p><button>LEARN MORE</button></div>
          <div className="rebuild-layer layer-nav"><b>YOUR BUSINESS</b><span>Services</span><span>Reviews</span><span>Areas</span><button>GET A QUOTE</button></div>
          <div className="rebuild-layer layer-hero"><small>LOCAL SERVICE · LOS ANGELES</small><h3>The service you need.<br/><em>The next step is clear.</em></h3><p>One useful sentence that explains what you do, where you do it, and why the visitor should keep going.</p></div>
          <div className="rebuild-layer layer-proof"><span>★★★★★ 4.9</span><span>Licensed & insured</span><span>Same-day response</span></div>
          <div className="rebuild-layer layer-cta"><button>REQUEST A QUOTE</button><small>Clear action. No guessing.</small></div>
          <div className="rebuild-scan"/>
        </div>
      </div>
      <div className="rebuild-status"><span>STRUCTURE</span><i/><span>CLARITY</span><i/><span>CONVERSION</span><i/><span>SEARCH</span></div>
    </div>
  </section>
}

function WebsiteAutopsy(){
  const ref=useRef(null);const[activeLayer,setActiveLayer]=useState(0);
  useEffect(()=>{
    const el=ref.current;if(!el)return;
    let ticking=false;
    const update=()=>{
      ticking=false;
      const r=el.getBoundingClientRect();
      const travel=Math.max(1,r.height-innerHeight);
      const p=Math.max(0,Math.min(1,-r.top/travel));
      const spreadBase=Math.sin(Math.min(1,p/.78)*Math.PI/2);
      const returnPhase=Math.max(0,Math.min(1,(p-.82)/.14));
      const spread=spreadBase*(1-returnPhase);
      const handoff=Math.max(0,Math.min(1,(p-.95)/.05));
      const nextLayer=Math.min(3,Math.floor(Math.min(.999,p)*4));
      setActiveLayer(v=>v===nextLayer?v:nextLayer);
      el.style.setProperty('--autopsy-p',String(p));
      el.style.setProperty('--autopsy-spread',String(spread));
      el.style.setProperty('--autopsy-handoff',String(handoff));
      const offsets=[[-26,-76,165],[30,-26,118],[-20,36,82],[16,82,44]];
      offsets.forEach(([x,y,z],i)=>el.style.setProperty(`--al${i+1}`,`translate3d(${x*spread}px,${y*spread}px,${z*spread}px)`));
    };
    const onScroll=()=>{if(!ticking){ticking=true;requestAnimationFrame(update)}};
    update();addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll,{passive:true});
    return()=>{removeEventListener('scroll',onScroll);removeEventListener('resize',onScroll)};
  },[]);
  const layers=[
    ['01','First impression','What people understand before they decide to keep scrolling.'],
    ['02','Search structure','How clearly pages map to services, locations and search intent.'],
    ['03','Conversion path','Where proof appears and how obvious the next action feels.'],
    ['04','Performance','How quickly and smoothly the experience responds on real devices.']
  ];
  return <section ref={ref} className="website-autopsy white">
    <div className="autopsy-sticky">
      <div className="autopsy-copy">
        <div className="eyebrow">Under the surface</div>
        <h2>What you see is only<br/>the <em>surface.</em></h2>
        <p>Pull the page apart and the real system shows up: attention, search, proof and performance working together.</p>
        <div className="autopsy-steps">{layers.map(([n,t,d],i)=><article className={activeLayer===i?'active':''} key={n}><span>{n}</span><div><strong>{t}</strong><small>{d}</small></div></article>)}</div>
      </div>
      <div className="autopsy-stage" aria-hidden="true">
        <div className="autopsy-frame">
          <div className="autopsy-chrome"><i/><i/><i/><span>yourbusiness.com</span></div>
          <div className="autopsy-layer al-1"><b>FIRST IMPRESSION</b><strong>Do they get it?</strong><span>Offer · proof · action</span></div>
          <div className="autopsy-layer al-2"><b>SEARCH STRUCTURE</b><strong>Can they find it?</strong><span>Services · locations · intent</span></div>
          <div className="autopsy-layer al-3"><b>CONVERSION PATH</b><strong>Why act now?</strong><span>Trust · clarity · response path</span></div>
          <div className="autopsy-layer al-4"><b>PERFORMANCE</b><strong>Does it feel fast?</strong><span>Speed · stability · mobile</span></div>
        </div>
        <div className="autopsy-depth-label"><span>SURFACE</span><i/><span>SYSTEM</span></div>
      </div>
    </div>
  </section>
}

function Process(){
  const ref=useRef(null);const[active,setActive]=useState(0);
  const steps=[
    ['01','Diagnose','Find the friction across the website, search visibility, traffic path and conversion.'],
    ['02','Prioritize','Choose the few changes most likely to move the business first.'],
    ['03','Build','Design, write, develop, connect tracking and launch the new experience.'],
    ['04','Compound','Use search, ads, content and conversion data to keep improving what already works.']
  ];
  useEffect(()=>{
    const el=ref.current;if(!el)return;let ticking=false;
    const update=()=>{ticking=false;const r=el.getBoundingClientRect();const travel=Math.max(1,r.height-innerHeight);const p=Math.max(0,Math.min(1,-r.top/travel));el.style.setProperty('--process-p',String(p));const next=Math.min(3,Math.floor(Math.min(.999,p)*4));setActive(v=>v===next?v:next)};
    const onScroll=()=>{if(!ticking){ticking=true;requestAnimationFrame(update)}};update();addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll,{passive:true});return()=>{removeEventListener('scroll',onScroll);removeEventListener('resize',onScroll)};
  },[]);
  const [n,t,d]=steps[active];
  return <section ref={ref} id="process" className="process process-journey red">
    <div className="process-sticky">
      <div className="process-copy">
        <div className="eyebrow">From idea to growth</div>
        <h2>One team.<br/><em>One system.</em><br/>No handoff maze.</h2>
      </div>
      <div className="process-focus" key={n}>
        <span className="process-ghost">{n}</span>
        <div><span>{n} / 04</span><h3>{t}</h3><p>{d}</p></div>
      </div>
      <div className="process-control" aria-label="Four stage process">
        <div className="process-track"><i/><b/></div>
        <div className="process-labels">{steps.map(([num,title],i)=><span className={active===i?'active':''} key={num}>{num}<strong>{title}</strong></span>)}</div>
      </div>
    </div>
  </section>
}

function ReviewRail(){return <div className="review-rail" aria-label="Review layout preview"><div className="review-track">{[...featuredReviews,...featuredReviews].map((r,i)=><article key={`${r.name}-${i}`}><div className="stars">★★★★★</div><p>“{r.text}”</p><strong>{r.name}</strong><small>{r.service}</small></article>)}</div></div>}

function InfiniteReviewMenu(){
  const items=featuredReviews;
  const track=useRef(null);const numberRef=useRef(null);const raf=useRef(0);const resetting=useRef(false);
  const repeated=useMemo(()=>[...items,...items,...items],[items]);
  useEffect(()=>{
    const el=track.current;if(!el)return;
    const cards=[...el.querySelectorAll('.infinite-review-card')];
    if(!cards.length)return;
    const group=items.length;
    let drag=null;
    const centerCard=(index,behavior='auto')=>{
      const card=cards[index];if(!card)return;
      el.scrollTo({left:card.offsetLeft-(el.clientWidth-card.clientWidth)/2,behavior});
    };
    const render=()=>{
      raf.current=0;
      const viewCenter=el.scrollLeft+el.clientWidth/2;
      let closest=group,best=Infinity;
      cards.forEach((card,i)=>{
        const cardCenter=card.offsetLeft+card.clientWidth/2;
        const d=(cardCenter-viewCenter)/Math.max(320,el.clientWidth*.52);
        const ad=Math.min(1.5,Math.abs(d));
        const scale=1-Math.min(.11,ad*.075);
        const rotate=Math.max(-9,Math.min(9,-d*7));
        const lift=Math.min(16,ad*11);
        card.style.transform=`translate3d(0,${lift}px,0) rotateY(${rotate}deg) scale(${scale})`;
        card.style.opacity=String(Math.max(.46,1-ad*.34));
        card.classList.toggle('is-focused',ad<.24);
        if(ad<best){best=ad;closest=i}
      });
      if(numberRef.current){
        const logical=((closest%group)+group)%group;
        numberRef.current.textContent=`${String(logical+1).padStart(2,'0')} / ${String(group).padStart(2,'0')}`;
      }
      if(!resetting.current){
        const groupWidth=cards[group].offsetLeft-cards[0].offsetLeft;
        if(groupWidth>0){
          if(el.scrollLeft<groupWidth*.42){resetting.current=true;el.scrollLeft+=groupWidth;resetting.current=false}
          else if(el.scrollLeft>groupWidth*1.58){resetting.current=true;el.scrollLeft-=groupWidth;resetting.current=false}
        }
      }
    };
    const request=()=>{if(!raf.current)raf.current=requestAnimationFrame(render)};
    const onResize=()=>{centerCard(group);request()};
    const onPointerDown=e=>{
      if(e.pointerType!=='mouse'||e.button!==0)return;
      drag={id:e.pointerId,x:e.clientX,left:el.scrollLeft};
      el.setPointerCapture?.(e.pointerId);el.classList.add('is-dragging');
    };
    const onPointerMove=e=>{
      if(!drag||drag.id!==e.pointerId)return;
      el.scrollLeft=drag.left-(e.clientX-drag.x)*1.08;request();
    };
    const endDrag=e=>{
      if(!drag||drag.id!==e.pointerId)return;
      el.releasePointerCapture?.(e.pointerId);el.classList.remove('is-dragging');drag=null;
      clearTimeout(el._lgSnapTimer);el._lgSnapTimer=setTimeout(()=>{
        const vc=el.scrollLeft+el.clientWidth/2;
        let nearest=cards[group],dist=Infinity;
        cards.forEach(card=>{const d=Math.abs(card.offsetLeft+card.clientWidth/2-vc);if(d<dist){dist=d;nearest=card}});
        if(nearest)el.scrollTo({left:nearest.offsetLeft-(el.clientWidth-nearest.clientWidth)/2,behavior:'smooth'});
      },90);
    };
    requestAnimationFrame(()=>{centerCard(group);request()});
    el.addEventListener('scroll',request,{passive:true});
    el.addEventListener('pointerdown',onPointerDown);
    el.addEventListener('pointermove',onPointerMove);
    el.addEventListener('pointerup',endDrag);
    el.addEventListener('pointercancel',endDrag);
    addEventListener('resize',onResize,{passive:true});
    return()=>{
      cancelAnimationFrame(raf.current);clearTimeout(el._lgSnapTimer);
      el.removeEventListener('scroll',request);el.removeEventListener('pointerdown',onPointerDown);
      el.removeEventListener('pointermove',onPointerMove);el.removeEventListener('pointerup',endDrag);
      el.removeEventListener('pointercancel',endDrag);removeEventListener('resize',onResize);
    };
  },[items]);
  const nudge=dir=>{
    const el=track.current;if(!el)return;
    const cards=[...el.querySelectorAll('.infinite-review-card')];
    const vc=el.scrollLeft+el.clientWidth/2;
    let nearestIndex=0,dist=Infinity;
    cards.forEach((card,i)=>{const d=Math.abs(card.offsetLeft+card.clientWidth/2-vc);if(d<dist){dist=d;nearestIndex=i}});
    const target=cards[Math.max(0,Math.min(cards.length-1,nearestIndex+dir))];if(!target)return;
    el.scrollTo({left:target.offsetLeft-(el.clientWidth-target.clientWidth)/2,behavior:'smooth'});
  };
  if(!items.length)return <div className="review-verification-empty dark"><div className="eyebrow">Verified feedback</div><h3>Client feedback will appear here after verification.</h3><p>LG Growth Studio does not publish invented testimonials as customer reviews.</p></div>;
  return <div className="infinite-review-menu spatial-reviews native-swipe-reviews" aria-label="Featured client feedback">
    <div className="review-hud"><span>SELECTED FEEDBACK</span><i/><span ref={numberRef}>01 / {String(items.length).padStart(2,'0')}</span></div>
    <button className="review-nav prev" aria-label="Previous review" onClick={()=>nudge(-1)}>←</button>
    <button className="review-nav next" aria-label="Next review" onClick={()=>nudge(1)}>→</button>
    <div ref={track} className="review-native-track">
      {repeated.map((r,i)=><article className="infinite-review-card" key={`${r.name}-${i}`}>
        <div className="review-card-top"><span className="stars">★★★★★</span><small>{String((i%items.length)+1).padStart(2,'0')}</small></div>
        <p>“{r.text}”</p>
        <footer><div><strong>{r.name}</strong><small>{r.service}</small></div><a href="/reviews">All reviews ↗</a></footer>
      </article>)}
    </div>
  </div>
}

function BuiltDifferently(){
  const ref=useRef(null);const cards=useRef([]);const paths=useRef([]);const[active,setActive]=useState(0);
  const modules=[
    {label:'Website',kicker:'CONVERT',title:'Turn attention into a clear next step.',body:'The website carries the offer, proof, speed and interaction quality. Everything else sends people here.'},
    {label:'Search',kicker:'DISCOVER',title:'Meet demand that already exists.',body:'Technical structure, service pages and useful research create more ways for qualified customers to find the business.'},
    {label:'Content',kicker:'EXPLAIN',title:'Make expertise visible before the sales call.',body:'Research, case evidence and decision content answer the questions people ask while they are still deciding who to trust.'},
    {label:'Paid Growth',kicker:'AMPLIFY',title:'Buy reach without buying confusion.',body:'Paid media works when the message, landing page and tracking agree on the audience and the action.'},
    {label:'Automation',kicker:'FOLLOW THROUGH',title:'Keep the next action moving.',body:'Routing, CRM context and follow-up reduce the leads lost between a click and an actual conversation.'}
  ];
  useEffect(()=>{
    const el=ref.current;if(!el)return;let raf=0;
    const update=()=>{raf=0;const r=el.getBoundingClientRect();const travel=Math.max(1,r.height-innerHeight);const p=Math.max(0,Math.min(1,-r.top/travel));el.style.setProperty('--engine-p',String(p));
      const idx=Math.min(modules.length-1,Math.floor(Math.min(.999,p)*modules.length));setActive(v=>v===idx?v:idx);
      const phase=(p*modules.length)-idx;
      cards.current.forEach((card,i)=>{if(!card)return;const delta=i-idx;const angle=(i/modules.length)*Math.PI*2-Math.PI/2+p*.9;const radius=Math.max(190,Math.min(340,innerWidth*.19));const x=Math.cos(angle)*radius;const y=Math.sin(angle)*radius*.62;const focus=Math.max(0,1-Math.abs(delta));const z=(focus*210)-Math.abs(delta)*42;const scale=.84+focus*.2;card.style.transform=`translate3d(${x}px,${y}px,${z}px) rotateY(${x/55}deg) scale(${scale})`;card.style.opacity=String(.34+focus*.66);card.style.filter=focus?`blur(0px)`:`blur(${Math.min(2.2,Math.abs(delta)*.7)}px)`});
      paths.current.forEach((path,i)=>{if(!path)return;path.style.strokeDashoffset=String(1-Math.max(0,Math.min(1,p*modules.length-i)))});
    };
    const onScroll=()=>{if(!raf)raf=requestAnimationFrame(update)};update();addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll,{passive:true});return()=>{cancelAnimationFrame(raf);removeEventListener('scroll',onScroll);removeEventListener('resize',onScroll)};
  },[]);
  const current=modules[active];
  return <section ref={ref} className="growth-engine-section black" aria-label="Connected growth engine">
    <div className="growth-engine-sticky">
      <div className="engine-copy">
        <div className="eyebrow">Nothing works alone</div>
        <h2>One signal.<br/><em>Five systems.</em></h2>
        <div className="engine-active-copy" key={current.label}><span>{current.kicker} · 0{active+1}</span><h3>{current.title}</h3><p>{current.body}</p></div>
        <a href="/process">See how the process works →</a>
      </div>
      <div className="engine-scene" aria-hidden="true">
        <div className="engine-floor"/>
        <svg className="engine-lines" viewBox="0 0 1000 760" preserveAspectRatio="none">
          {modules.map((m,i)=><path ref={el=>paths.current[i]=el} key={m.label} pathLength="1" d={`M 500 380 C ${i%2?780:220} ${110+i*105}, ${i%2?780:220} ${170+i*85}, 500 380`} />)}
        </svg>
        <div className="engine-reactor"><i/><i/><i/><b/></div>
        <div className="engine-card-field">
          {modules.map((m,i)=><article ref={el=>cards.current[i]=el} className={`engine-module ${active===i?'active':''}`} key={m.label}><span>0{i+1}</span><strong>{m.label}</strong><small>{m.kicker}</small></article>)}
        </div>
        <div className="engine-scan"/>
      </div>
      <div className="engine-stage-nav">{modules.map((m,i)=><button className={active===i?'active':''} key={m.label} onClick={()=>{const el=ref.current;if(!el)return;const travel=Math.max(1,el.offsetHeight-innerHeight);const top=scrollY+el.getBoundingClientRect().top+(i/(modules.length-1))*travel;scrollTo({top,behavior:'smooth'})}}><span>0{i+1}</span>{m.label}</button>)}</div>
    </div>
  </section>
}

function ClickSpark(){
  const canvas=useRef(null);const sparks=useRef([]);const raf=useRef(0);const running=useRef(false);
  useEffect(()=>{
    const c=canvas.current,ctx=c.getContext('2d');
    const resize=()=>{const d=Math.min(devicePixelRatio||1,2);c.width=innerWidth*d;c.height=innerHeight*d;c.style.width=`${innerWidth}px`;c.style.height=`${innerHeight}px`;ctx.setTransform(d,0,0,d,0,0)};
    const draw=t=>{
      ctx.clearRect(0,0,innerWidth,innerHeight);
      sparks.current=sparks.current.filter(s=>t-s.born<420);
      ctx.lineCap='round';ctx.lineWidth=1.6;ctx.strokeStyle='#ff1a28';
      for(const s of sparks.current){const p=(t-s.born)/420;const d=s.speed*p;const fade=1-p;const x=s.x+Math.cos(s.a)*d,y=s.y+Math.sin(s.a)*d;ctx.globalAlpha=fade;ctx.beginPath();ctx.moveTo(x-Math.cos(s.a)*s.len*.5,y-Math.sin(s.a)*s.len*.5);ctx.lineTo(x+Math.cos(s.a)*s.len*.5,y+Math.sin(s.a)*s.len*.5);ctx.stroke()}
      ctx.globalAlpha=1;
      if(sparks.current.length){raf.current=requestAnimationFrame(draw)}else{running.current=false;raf.current=0}
    };
    const click=e=>{const count=8;for(let i=0;i<count;i++){const a=i/count*Math.PI*2;sparks.current.push({x:e.clientX,y:e.clientY,a,born:performance.now(),len:7+Math.random()*7,speed:42+Math.random()*34})}if(!running.current){running.current=true;raf.current=requestAnimationFrame(draw)}};
    resize();addEventListener('resize',resize,{passive:true});addEventListener('pointerdown',click,{passive:true});
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
  <div className="results-heading">
    <div className="results-copy"><div className="eyebrow">Selected feedback</div><h2>The difference should <em>feel obvious.</em></h2><p>Cleaner pages. Clearer decisions. A stronger first impression.</p></div>
    <a className="results-link" href="/reviews">Read all reviews →</a>
  </div>
  {featuredReviews.length?<InfiniteReviewMenu/>:<div className="review-verification-empty dark"><div className="eyebrow">Verified feedback</div><h3>Client proof is being verified for publication.</h3><p>We do not publish invented testimonials as customer reviews.</p></div>}
</section>}

function Pricing(){
  const items=useMemo(()=>plans,[]);
  return <section id="pricing" className="section pricing red">
    <div className="pricing-head"><div><div className="eyebrow">Pricing</div><h2>Choose what <em>fits now.</em></h2></div><p>Website projects are one-time. Growth plans are ongoing. Pick a plan to see exactly what is included.</p></div>
    <AccordionGallery items={items}/>
  </section>
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
];return <section className="section faq white"><div><div className="eyebrow">Questions before you start</div><h2>Know what <em>you’re buying.</em></h2></div><div className="faq-list">{q.map(([a,b])=><details key={a}><summary>{a}<span>+</span></summary><p>{b}</p></details>)}</div></section>}

function FinalCTA(){return <section className="section final-cta final-cta-red red"><div className="eyebrow">Next step</div><h2>Ready when <em>you are.</em></h2><div className="final-actions"><a className="button dark" href="/build-website">Start your website</a><a className="button line dark-line" href="/audit">Run another audit</a><a className="button line dark-line" href="/contact">Schedule a strategy call</a></div></section>}

function HomePage(){
  usePageSeo({title:'LG Growth Studio | Web Design, SEO, Paid Growth & Automation',description:'LG Growth Studio builds high-performance websites, SEO systems, paid growth campaigns and automation for businesses that want clearer digital growth.',image:'/assets/growth-engine.webp'});
  const reduced=useReducedMotion();
  useEffect(()=>{if(reduced)return;const lenis=new Lenis({duration:.82,smoothWheel:true,wheelMultiplier:.92});let id;const raf=t=>{lenis.raf(t);id=requestAnimationFrame(raf)};id=requestAnimationFrame(raf);return()=>{cancelAnimationFrame(id);lenis.destroy()}},[reduced]);
  return <><FuturisticShell/><ActivityPopups/><SiteHeader/><main><HeroStory/><Transformation/><WebsiteAutopsy/><Process/><Results/><BuiltDifferently/><ArticlesPreview/><Pricing/><Faq/><FinalCTA/></main><Footer/></>
}

function AuditPage(){
  usePageSeo({title:'Free Website Audit | LG Growth Studio',description:'Analyze website performance, SEO, mobile experience, content depth and technical health with the LG Growth Studio website audit.'});
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
    {status==='scanning'&&<section className="audit-scanning award-scanner"><div className="scan-progress"><i style={{width:`${progress}%`}}/></div><div className="scanner-grid"><div className="scanner-copy"><div className="eyebrow">Analyzing {url.replace(/^https?:\/\//,'')}</div><h1>{scanSteps[step]}<span className="scan-dots">…</span></h1><p className="scan-count">{String(step+1).padStart(2,'0')} / {String(scanSteps.length).padStart(2,'0')}</p><div className="scan-history">{scanSteps.slice(0,step).slice(-4).map(s=><span key={s}>✓ {s}</span>)}</div></div><div className="holo-scanner" aria-hidden="true"><div className="holo-ring r1"/><div className="holo-ring r2"/><div className="holo-ring r3"/><div className="holo-browser"><div className="holo-chrome"><i/><i/><i/></div><div className="holo-content"><b/><span/><span/><span/><em/></div><div className="holo-sweep"/></div><div className="holo-readout"><span>SEO</span><b>{Math.min(99,42+step*4)}</b><span>PERF</span><b>{Math.min(99,38+step*5)}</b></div></div></div></section>}
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
  usePageSeo({title:'Client Reviews | LG Growth Studio',description:'Read verified client feedback about website design, SEO, local growth and digital strategy from LG Growth Studio.'});
  const params=new URLSearchParams(window.location.search);const requested=Math.max(1,Number(params.get('page'))||1);const perPage=20;const pages=Math.max(1,Math.ceil(generatedReviews.length/perPage));const page=Math.min(requested,pages);const start=(page-1)*perPage;const list=generatedReviews.slice(start,start+perPage);
  return <><FuturisticShell/><ActivityPopups/><SiteHeader dark/><main className="reviews-page">
    <section className="reviews-hero black"><div className="reviews-hero-copy"><div className="eyebrow">Client feedback</div><h1>The work should<br/><em>speak for itself.</em></h1></div><InfiniteReviewMenu/></section>
    <section className="review-page-head white"><div><div className="eyebrow">More feedback</div><h2>What changed<br/>after the work.</h2></div><p>Clarity, speed, search structure and a better experience for the people landing on the site.</p></section>
    <section className="review-page-grid white">{!list.length&&<div className="review-verification-empty"><div className="eyebrow">Verified feedback</div><h2>Real client reviews will appear here after verification.</h2><p>Development builds can enable sample review fixtures with VITE_SHOW_SAMPLE_REVIEWS=true. Production does not publish invented testimonials.</p></div>}{list.map(r=><article key={r.id}><div className="stars">★★★★★</div><p>“{r.text}”</p><footer><div><strong>{r.name}</strong><small>{r.service}</small></div><span>{r.date}</span></footer></article>)}</section>
    <nav className="pagination" aria-label="Review pages">{page>1&&<a href={`/reviews?page=${page-1}`}>← Previous</a>}<span>Page {page} of {pages}</span>{page<pages&&<a href={`/reviews?page=${page+1}`}>Next →</a>}</nav>
  </main><Footer/></>
}

const buildScreens=[
  {title:'What are you building?',type:'type',options:['Local service business','Professional practice','E-commerce','Personal brand','Startup / product','Other']},
  {title:'What should the website do first?',type:'goal',options:['Generate calls','Book appointments','Sell products','Build authority','Launch something new']},
  {title:'Choose a visual direction',type:'style',options:['Minimal','Bold','Editorial','Cinematic','Technical','Recommend one for me']},
  {title:'How should it move?',type:'motion',options:['Essential','Interactive','Cinematic','Immersive 3D']},
  {title:'Choose a color direction',type:'color',options:['Light and minimal','Dark and premium','Bright and vivid','Warm and natural','Monochrome + accent','Use my brand colors']},
  {title:'Choose the typography feel',type:'typeface',options:['Clean sans','Editorial serif','Mixed display','Technical condensed']},
  {title:'Choose a layout',type:'layout',options:['Conversion focused','Story driven','Information focused','Product focused']},
  {title:'Which features matter?',type:'features',multi:true,options:['Online booking','Quote request form','Reviews','Blog or resources','Multilingual pages','Advanced animation','SEO setup','E-commerce','CRM / forms','Custom calculator']}
];

function OptionPreview({type,label}){
  if(type==='color')return <div className={`color-preview c-${label.toLowerCase().replace(/[^a-z]+/g,'-')}`}><i/><i/><i/><i/></div>;
  if(type==='layout')return <div className={`layout-preview l-${label.toLowerCase().split(' ')[0]}`}><i/><i/><i/><i/></div>;
  if(type==='motion')return <div className={`motion-preview m-${label.toLowerCase().replace(/[^a-z]+/g,'-')}`}><i/><i/><i/></div>;
  if(type==='style')return <div className={`style-preview s-${label.toLowerCase().split(' ')[0]}`}><strong>Ag</strong><i/><i/></div>;
  if(type==='typeface')return <div className={`typeface-preview tf-${label.toLowerCase().replace(/[^a-z]+/g,'-')}`}><strong>Aa</strong><span>Brand typography</span></div>;
  if(type==='goal')return <div className="goal-preview"><i/><b/><span/></div>;
  return <div className="type-preview"><i/><b/><span/></div>;
}

function BuilderLivePreview({choices,accent='#ef101d'}){
  const val=i=>Array.isArray(choices[i])?choices[i]:choices[i]||'';
  const business=val(0)||'Your business';const goal=val(1)||'Generate calls';const style=val(2)||'Minimal';const motion=val(3)||'Essential';const color=val(4)||'Light and minimal';const typeface=val(5)||'Clean sans';const layout=val(6)||'Conversion focused';const features=Array.isArray(choices[7])?choices[7]:[];
  const slug=x=>String(x).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const headline=business.includes('E-commerce')?'Make the product impossible to ignore.':business.includes('Professional')?'Make the first impression feel established.':business.includes('Personal')?'Make the name feel bigger than a profile.':business.includes('Startup')?'Make the idea feel real before the pitch ends.':'Make the next call easier to earn.';
  const motionCost=motion==='Interactive'?350:motion==='Cinematic'?900:motion==='Immersive 3D'?1800:0;
  const featureCost=features.reduce((sum,f)=>sum+({'Advanced animation':650,'E-commerce':800,'Multilingual pages':350,'Custom calculator':500,'Online booking':150,'CRM / forms':250}[f]||0),0);
  const estimate=1500+motionCost+featureCost;
  return <aside style={{'--preview-accent':accent}} className={`builder-live preview-${slug(style)} preview-${slug(color)} preview-${slug(typeface)} motion-${slug(motion)} layout-${slug(layout)}`}>
    <div className="builder-live-top"><span>LIVE DIRECTION</span><b>{style} / {motion}</b></div>
    <div className="builder-browser" style={{'--preview-accent':accent}}>
      <div className="builder-browser-chrome"><i/><i/><i/><span>preview.site</span></div>
      <div className="builder-browser-nav"><strong>{business==='Your business'?'YOUR BUSINESS':business.toUpperCase()}</strong><span>Work</span><span>About</span><button>{goal.replace('Generate','Get').replace('Book','Book')}</button></div>
      <div className="builder-browser-hero"><small>{goal.toUpperCase()}</small><h3>{headline}</h3><p>Clear hierarchy, useful proof and one obvious next action.</p><button>START HERE</button></div>
      <div className="builder-browser-grid"><i/><i/><i/></div>
      <div className="builder-browser-signal"><span>{layout}</span><b>{typeface}</b></div>
    </div>
    <div className="builder-live-meta"><div><span>Current estimate</span><strong>${estimate.toLocaleString()}+</strong></div><div><span>Selected features</span><strong>{features.length||0}</strong></div></div>
  </aside>
}

function BuildWebsitePage(){
  usePageSeo({title:'Design Your Website | LG Growth Studio',description:'Build a custom website direction with visual style, motion, color, layout and feature choices, then send the project brief to LG Growth Studio.'});
  const[step,setStep]=useState(0);const[choices,setChoices]=useState({});const[done,setDone]=useState(false);const[accent,setAccent]=useState('#ef101d');const screen=buildScreens[step];
  const selected=choices[step];
  const choose=v=>{if(screen.multi){setChoices(x=>{const current=Array.isArray(x[step])?x[step]:[];return {...x,[step]:current.includes(v)?current.filter(a=>a!==v):[...current,v]}})}else setChoices(x=>({...x,[step]:v}))};
  const printable=value=>Array.isArray(value)?value.join(', '):value||'Not selected';
  const summary=buildScreens.map((s,i)=>`${s.title}: ${printable(choices[i])}`).join('\n');const mail=`mailto:hello.rarescore@gmail.com?subject=${encodeURIComponent('My LG Growth Studio Website Plan')}&body=${encodeURIComponent(summary)}`;
  const reserve=async()=>{try{const r=await fetch('/api/create-checkout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({plan:'deposit'})});const d=await r.json();if(d.url){location.href=d.url;return}location.href='mailto:hello.rarescore@gmail.com?subject=Reserve%20My%20Website%20Project%20-%20$250'}catch{location.href='mailto:hello.rarescore@gmail.com?subject=Reserve%20My%20Website%20Project%20-%20$250'}};
  const canContinue=screen.multi?true:Boolean(selected);
  const next=()=>{if(step<buildScreens.length-1)setStep(v=>v+1);else setDone(true)};
  return <><FuturisticShell/><ActivityPopups/><SiteHeader dark/><main className="builder-page builder-page-v2"><section className="builder-shell builder-shell-v2">
    {!done?<>
      <div className="builder-config">
        <div className="builder-progress"><span>{String(step+1).padStart(2,'0')}</span><i><b style={{width:`${((step+1)/buildScreens.length)*100}%`}}/></i><span>{String(buildScreens.length).padStart(2,'0')}</span></div>
        <div className="builder-kicker"><span>Build your direction</span><b>{Math.round(((step+1)/buildScreens.length)*100)}%</b></div>
        <h1>{screen.title}</h1>
        <div className={`builder-options visual-options ${screen.multi?'multi':''}`}>{screen.options.map(v=><button key={v} className={(Array.isArray(selected)?selected.includes(v):selected===v)?'selected':''} onClick={()=>choose(v)}><OptionPreview type={screen.type} label={v}/><div><b>{v}</b><span>{(Array.isArray(selected)?selected.includes(v):selected===v)?'Selected':'Choose'} →</span></div></button>)}</div>
        {screen.type==='color'&&<div className="builder-fine-tune"><div><span>Fine tune the accent</span><strong>{accent.toUpperCase()}</strong></div><input aria-label="Choose accent color" type="color" value={accent} onChange={e=>setAccent(e.target.value)}/><div className="accent-swatches">{['#ef101d','#111111','#2457ff','#ff6a00','#00a67a','#6d35ff'].map(c=><button aria-label={`Use ${c}`} key={c} style={{background:c}} onClick={()=>setAccent(c)} className={accent===c?'active':''}/>)}</div></div>}
        <div className="builder-nav"><button className="builder-back" disabled={step===0} onClick={()=>setStep(v=>Math.max(0,v-1))}>← Back</button><button className="button red" disabled={!canContinue} onClick={next}>{step===buildScreens.length-1?'Build my website plan':'Next direction'} →</button></div>
      </div>
      <BuilderLivePreview choices={choices} accent={accent}/>
    </>:<div className="builder-complete builder-complete-v2"><div className="builder-complete-copy"><div className="eyebrow">Your website direction</div><h1>Now it has a point of view.</h1><p>Use this as the starting brief. We can refine the pages, motion, content and integrations after scope is confirmed.</p></div><BuilderLivePreview choices={choices} accent={accent}/><div className="builder-summary-grid">{buildScreens.map((s,i)=><article key={s.title}><span>{s.title}</span><b>{printable(choices[i])}</b></article>)}</div><div className="estimate"><span>Estimated starting investment</span><strong>From $1,500</strong><small>Final price depends on pages, integrations, content and animation scope.</small></div><div className="builder-final-actions"><a className="button red" href={mail}>Submit my website plan</a><button className="button dark" onClick={reserve}>Reserve project — $250</button></div></div>}
  </section></main><Footer/></>
}

function ContactPage(){
  usePageSeo({title:'Contact LG Growth Studio',description:'Talk with LG Growth Studio about a new website, SEO, paid advertising, automation or a second opinion on your current digital strategy.'});
  const planParam=new URLSearchParams(window.location.search).get('plan');
  const planName=planParam?planParam.replace(/[-_]+/g,' ').replace(/\b\w/g,c=>c.toUpperCase()):'';
  const[form,setForm]=useState({name:'',email:'',phone:'',company:'',website:'',need:planParam?'Website + growth':'Website',details:planParam?`I'm interested in the ${planName} plan. Please tell me the next step.`:'',company_url:''});
  const[status,setStatus]=useState('idle');const[error,setError]=useState('');
  const progress=['name','email','company','details'].filter(k=>String(form[k]||'').trim()).length;
  const set=(key,value)=>setForm(v=>({...v,[key]:value}));
  const submit=async e=>{e.preventDefault();setStatus('sending');setError('');try{const r=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...form,source:'LG Growth Studio contact page'})});const d=await r.json();if(!r.ok)throw new Error(d.error||'Could not send your message.');if(d.needsSetup){location.href=`mailto:hello.rarescore@gmail.com?subject=${encodeURIComponent('LG Growth Studio project inquiry — '+form.company)}&body=${encodeURIComponent(`${form.name}\n${form.email}\n${form.phone}\n${form.website}\n${form.need}\n\n${form.details}`)}`;setStatus('idle');return}setStatus('sent')}catch(e){setError(e.message||'Could not send your message.');setStatus('idle')}};
  return <><FuturisticShell/><ActivityPopups/><SiteHeader dark/><main className="contact-page black"><section className="contact-hero"><div className="contact-copy"><div className="eyebrow">Contact LG Growth Studio</div><h1>Tell us what<br/>needs to <em>change.</em></h1><p>New website, stronger search, better ads, or simply a second opinion. Give us the problem. We’ll tell you what we would do first.</p><div className="contact-shortcuts"><a href="/audit">Run the audit ↗</a><a href="/build-website">Plan a website ↗</a><a href="mailto:hello.rarescore@gmail.com">Email directly ↗</a></div></div><div className="contact-console"><div className="console-top"><span>PROJECT SIGNAL</span><b>{progress}/4 READY</b></div><div className="console-map" aria-hidden="true"><i className={progress>0?'on':''}/><i className={progress>1?'on':''}/><i className={progress>2?'on':''}/><i className={progress>3?'on':''}/><span/></div>{status==='sent'?<div className="contact-sent"><span>✓</span><h2>Received.</h2><p>We have your project details. Expect a reply within one business day.</p><a className="button line light" href="/">Back to the site</a></div>:<form className="contact-form-award" onSubmit={submit}><input className="honeypot" tabIndex="-1" autoComplete="off" value={form.company_url} onChange={e=>set('company_url',e.target.value)}/><div className="contact-field-grid"><label><span>Your name *</span><input required value={form.name} onChange={e=>set('name',e.target.value)} placeholder="Name"/></label><label><span>Email *</span><input required type="email" value={form.email} onChange={e=>set('email',e.target.value)} placeholder="you@business.com"/></label><label><span>Business *</span><input required value={form.company} onChange={e=>set('company',e.target.value)} placeholder="Business name"/></label><label><span>Phone</span><input value={form.phone} onChange={e=>set('phone',e.target.value)} placeholder="(000) 000-0000"/></label></div><label><span>Current website</span><input value={form.website} onChange={e=>set('website',e.target.value)} placeholder="yourwebsite.com"/></label><label><span>What do you need?</span><select value={form.need} onChange={e=>set('need',e.target.value)}><option>Website</option><option>SEO / local growth</option><option>Paid advertising</option><option>Website + growth</option><option>Not sure yet</option></select></label><label><span>What would you like to improve? *</span><textarea required value={form.details} onChange={e=>set('details',e.target.value)} placeholder="Tell us what is not working, what you want to change, or what you want the business to achieve." rows="5"/></label><button className="contact-submit" disabled={status==='sending'}>{status==='sending'?'Sending…':'Send project signal'}<span>↗</span></button>{error&&<p className="form-error">{error}</p>}</form>}</div></section><section className="contact-bottom"><div><span>Prefer to start with proof?</span><strong>Run the website audit first.</strong></div><a href="/audit">Analyze my website →</a></section></main><Footer/></>
}

function ProcessPage(){
  usePageSeo({title:'Our Process | LG Growth Studio',description:'See how LG Growth Studio diagnoses digital bottlenecks, prioritizes work, builds the solution and improves performance over time.'});
  return <><FuturisticShell/><ActivityPopups/><SiteHeader dark/><main className="process-page standalone-page">
    <section className="standalone-hero black"><div className="eyebrow">How the work moves</div><h1>From problem to <em>progress.</em></h1><p>We diagnose what is actually slowing the business down, choose the highest-impact work, build it properly, then keep improving what proves useful.</p></section>
    <Process/>
    <section className="process-detail-grid white"><article><span>01</span><h3>One owner for the outcome.</h3><p>Strategy, design, development and growth decisions stay connected instead of being passed between disconnected vendors.</p></article><article><span>02</span><h3>Work in the right order.</h3><p>A faster website does not help if the offer is unclear. More traffic does not help if the conversion path is weak. We fix the bottleneck first.</p></article><article><span>03</span><h3>Measure after launch.</h3><p>Search visibility, paid traffic and conversion behavior tell us what deserves the next round of work.</p></article></section>
    <FinalCTA/>
  </main><Footer/></>;
}

function PricingPage(){
  usePageSeo({title:'Pricing | LG Growth Studio',description:'Website project and ongoing growth pricing for web design, SEO, paid advertising and optimization from LG Growth Studio.'});
  return <><FuturisticShell/><ActivityPopups/><SiteHeader dark/><main className="pricing-page standalone-page">
    <section className="standalone-hero black"><div className="eyebrow">Pricing</div><h1>Clear scope. <em>No mystery.</em></h1><p>Start with a website project or ongoing growth support. Open each plan to see what it is for, what is included and where the next step goes.</p></section>
    <Pricing/>
    <section className="pricing-clarity white"><div><span>ONE-TIME</span><h2>Website project</h2><p>Best when the website itself is the bottleneck. Scope is confirmed before work starts.</p><a href="/build-website">Plan my website →</a></div><div><span>ONGOING</span><h2>Monthly growth</h2><p>Best when the foundation exists and you want SEO, advertising, content and conversion work managed continuously.</p><a href="/contact">Talk through the right plan →</a></div></section>
    <Faq/><FinalCTA/>
  </main><Footer/></>;
}

function ArticlesPreview(){
  const picks=articles.slice(0,4);
  return <section className="articles-preview white"><div className="articles-preview-head"><div><div className="eyebrow">Research library</div><h2>Ideas worth <em>using.</em></h2></div><a href="/articles">Read all articles →</a></div><div className="articles-preview-grid">{picks.map((a,i)=><a className="article-preview-card" href={`/articles/${a.slug}`} key={a.slug}><picture><source media="(max-width:720px)" srcSet={a.image.replace('.webp','-800.webp')}/><img src={a.image} alt={a.imageAlt} loading={i<2?'eager':'lazy'}/></picture><div><span>{a.category} · {a.readingTime}</span><h3>{a.title}</h3><p>{a.dek}</p><b>Read article →</b></div></a>)}</div></section>
}

function ArticlesPage(){
  usePageSeo({title:'Research Articles on Web Design, SEO & Growth | LG Growth Studio',description:'Long-form research from LG Growth Studio on website design, technical SEO, Core Web Vitals, AI search, accessibility, local SEO, security and growth.',image:articles[0].image,keywords:['SEO articles','web design research','growth marketing research','technical SEO']});
  return <><FuturisticShell/><SiteHeader/><main className="articles-page"><section className="articles-hero black"><div className="articles-hero-inner"><div><div className="eyebrow">LG Research Library</div><h1>Research for <em>better decisions.</em></h1></div><p>Evidence-backed thinking on websites, search, performance, accessibility, security and growth. Built to be useful before the sales call.</p></div><div className="article-topic-strip"><span>Web Design</span><span>SEO</span><span>Performance</span><span>AI Search</span><span>Growth</span></div></section><section className="article-index white">{articles.map((a,i)=><a className="article-index-card" href={`/articles/${a.slug}`} key={a.slug}><picture><source media="(max-width:720px)" srcSet={a.image.replace('.webp','-800.webp')}/><img src={a.image} alt={a.imageAlt} loading={i<3?'eager':'lazy'}/></picture><div><span>{String(i+1).padStart(2,'0')} · {a.category}</span><h2>{a.title}</h2><p>{a.dek}</p><footer><b>{a.readingTime}</b><em>Read article →</em></footer></div></a>)}</section></main><Footer/></>
}

function ArticlePage({article}){
  const related=articles.filter(a=>a.slug!==article.slug).slice(0,3);
  const schema={"@context":"https://schema.org","@graph":[{"@type":"Article","headline":article.title,"description":article.meta,"image":`${SITE_URL}${article.image}`,"datePublished":article.datePublished,"dateModified":article.datePublished,"author":{"@type":"Organization","name":"LG Growth Studio"},"publisher":{"@type":"Organization","name":"LG Growth Studio","url":SITE_URL},"mainEntityOfPage":`${SITE_URL}/articles/${article.slug}`,"keywords":[article.primaryKeyword,...article.keywords].join(', ')},{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":SITE_URL},{"@type":"ListItem","position":2,"name":"Articles","item":`${SITE_URL}/articles`},{"@type":"ListItem","position":3,"name":article.title,"item":`${SITE_URL}/articles/${article.slug}`}]},{"@type":"FAQPage","mainEntity":article.faq.map(([q,a])=>({"@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":a}}))}]};
  usePageSeo({title:`${article.shortTitle} | LG Growth Studio Research`,description:article.meta,image:article.image,schema,keywords:[article.primaryKeyword,...article.keywords]});
  return <><SiteHeader/><main className="article-page"><article><header className="article-hero black"><div className="article-hero-inner"><div className="article-hero-copy"><a className="article-back" href="/articles">← Research library</a><div className="article-meta-top"><span>{article.category}</span><span>{article.readingTime}</span><time dateTime={article.datePublished}>Aug 8, 2026</time></div><h1>{article.title}</h1><p>{article.dek}</p></div><picture className="article-hero-media"><source media="(max-width:720px)" srcSet={article.image.replace('.webp','-800.webp')}/><img src={article.image} alt={article.imageAlt}/></picture></div></header><div className="article-layout white"><aside className="article-toc"><span>In this article</span>{article.sections.map((s,i)=><a href={`#section-${i+1}`} key={s.heading}>{String(i+1).padStart(2,'0')} {s.heading}</a>)}</aside><div className="article-content"><p className="article-lede">{article.dek}</p>{article.sections.map((section,i)=><section id={`section-${i+1}`} key={section.heading}><span className="article-section-number">{String(i+1).padStart(2,'0')}</span><h2>{section.heading}</h2>{section.paragraphs.map((p,j)=><p key={j}>{p}</p>)}</section>)}<section className="article-faq"><div className="eyebrow">Questions</div><h2>Frequently asked</h2>{article.faq.map(([q,a])=><details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</section><section className="article-sources"><div className="eyebrow">Research sources</div><h2>References</h2><ol>{article.sources.map(src=><li key={src.url}><a href={src.url} target="_blank" rel="noreferrer">{src.label} ↗</a></li>)}</ol><p>Sources are provided for factual claims and further reading. Analysis and recommendations are original to LG Growth Studio.</p></section><aside className="article-conversion"><span>Apply the research</span><h2>See what this means for your website.</h2><p>Run the audit for a practical starting point, or send us the site if you want a human review of the highest-impact changes.</p><div><a className="button red" href="/audit">Run website audit</a><a className="button dark" href="/contact">Contact us</a></div></aside></div></div></article><section className="article-related black"><div className="eyebrow">Keep reading</div><h2>Related research</h2><div>{related.map(a=><a href={`/articles/${a.slug}`} key={a.slug}><span>{a.category}</span><h3>{a.shortTitle}</h3><b>Read →</b></a>)}</div></section></main><Footer/></>
}

function NotFoundPage(){
  usePageSeo({title:'404 — Page Not Found | LG Growth Studio',description:'The page you requested could not be found.',noindex:true});
  return <><SiteHeader dark/><main className="not-found-page black"><div className="nf-grid"/><div className="nf-orbit nf-a"/><div className="nf-orbit nf-b"/><div className="nf-route"><i/><i/><i/><i/><b/></div><section><span>404 · ROUTE LOST</span><h1>This page fell<br/><em>off the map.</em></h1><p>The address may have changed, the link may be old, or the page never existed.</p><div><a className="button red" href="/">Return home</a><a className="button line light" href="/articles">Read articles</a><a className="button line light" href="/audit">Run an audit</a></div></section></main></>
}

function Footer(){return <footer className="site-footer-simple"><img src="/lg-growth-studio-logo.png" alt="LG Growth Studio"/><span>Performance Marketing · Web Design · SEO · Paid Advertising · AI Automation</span><div><a href="/contact">Contact</a><a href="/audit">Audit</a><a href="/process">Process</a><a href="/reviews">Reviews</a><a href="/pricing">Pricing</a><a href="/articles">Articles</a></div></footer>}

export default function App(){
  const path=window.location.pathname.replace(/\/+$/,'')||'/';
  if(path==='/contact')return <ContactPage/>;
  if(path==='/audit')return <AuditPage/>;
  if(path==='/reviews')return <ReviewsPage/>;
  if(path==='/process')return <ProcessPage/>;
  if(path==='/pricing')return <PricingPage/>;
  if(path==='/build-website')return <BuildWebsitePage/>;
  if(path==='/articles')return <ArticlesPage/>;
  if(path.startsWith('/articles/')){const article=articleBySlug(path.split('/').pop());return article?<ArticlePage article={article}/>:<NotFoundPage/>;}
  if(path==='/')return <HomePage/>;
  return <NotFoundPage/>;
}
