import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Gauge, Play, Search, Sparkles, Zap } from 'lucide-react'
import Seo from '../components/Seo'
import { FaqList, Marquee, SectionIntro } from '../components/UI'
import { articles, faqs, plans, processSteps, services } from '../data'

function Hero() {
  const visual = useRef(null)
  useEffect(()=>{
    const el=visual.current
    if(!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const move=e=>{ const r=el.getBoundingClientRect(); el.style.setProperty('--rx',`${((e.clientY-r.top)/r.height-.5)*-4}deg`); el.style.setProperty('--ry',`${((e.clientX-r.left)/r.width-.5)*5}deg`) }
    const reset=()=>{el.style.setProperty('--rx','0deg');el.style.setProperty('--ry','0deg')}
    el.addEventListener('pointermove',move);el.addEventListener('pointerleave',reset)
    return()=>{el.removeEventListener('pointermove',move);el.removeEventListener('pointerleave',reset)}
  },[])
  return <section className="hero">
    <div className="hero-art" ref={visual}><img src="/assets/growth-engine.webp" srcSet="/assets/growth-engine-840.webp 840w, /assets/growth-engine.webp 1680w" sizes="100vw" width="1680" height="944" alt="Abstract glass growth engine with luminous data flowing through connected rings" fetchPriority="high"/><div className="hero-grid"/></div>
    <div className="wrap hero-content">
      <p className="eyebrow hero-eyebrow"><span/>Independent growth studio · Los Angeles / Remote</p>
      <h1>Make your business<br/><i>impossible to overlook.</i></h1>
      <div className="hero-bottom">
        <p>AI-powered creative, search, paid media and performance websites—directed by people, measured against business outcomes.</p>
        <div className="hero-actions"><Link to="/pricing" className="button button-acid">Explore packages <ArrowUpRight/></Link><Link to="/audit" className="text-link">Audit my website <ArrowRight/></Link></div>
      </div>
      <a className="scroll-cue" href="#system"><ArrowDown/> <span>Scroll to see the system</span></a>
    </div>
  </section>
}

function GrowthLab() {
  const [budget,setBudget]=useState(2000)
  const [goal,setGoal]=useState('Leads')
  const [channel,setChannel]=useState('Paid + organic')
  const leads=Math.round((budget*({Awareness:.25,Leads:.55,Sales:.38}[goal]||.4))/58)
  const assets=Math.round(8+budget/180)
  return <section className="lab-section" id="system"><div className="wrap lab-grid">
    <SectionIntro eyebrow="The growth lab" title={'Plan for a system,<br/><i>not a lucky post.</i>'} copy="Change the inputs to see how we balance production and acquisition. This is a planning illustration—not a performance promise." light/>
    <div className="lab-panel">
      <div className="lab-controls">
        <label>Monthly working budget <output>${budget.toLocaleString()}</output><input type="range" min="500" max="10000" step="500" value={budget} onChange={e=>setBudget(+e.target.value)}/></label>
        <fieldset><legend>Primary goal</legend><div>{['Awareness','Leads','Sales'].map(x=><button className={goal===x?'active':''} onClick={()=>setGoal(x)} key={x}>{x}</button>)}</div></fieldset>
        <fieldset><legend>Channel mix</legend><div>{['Organic','Paid + organic','Search + social'].map(x=><button className={channel===x?'active':''} onClick={()=>setChannel(x)} key={x}>{x}</button>)}</div></fieldset>
      </div>
      <div className="lab-output">
        <div className="metric-orbit"><span className="orbit-ring"/><div><b>{assets}</b><small>planned<br/>assets</small></div></div>
        <div className="lab-readout"><span>Planning scenario</span><strong>{goal}</strong><p>{channel}</p><div><b>~{leads}</b><small>modeled inquiries*</small></div></div>
      </div>
      <p className="lab-note">*Illustration uses a sample $58 cost per inquiry and does not predict actual results. Your market, offer, budget and sales process determine performance.</p>
    </div>
  </div></section>
}

function ServicesPreview(){return <section className="services-preview section"><div className="wrap">
  <SectionIntro eyebrow="One connected studio" title={'Every channel should make<br/><i>the others more valuable.</i>'} copy="We connect the message, production, distribution and measurement so the work compounds instead of fragmenting across vendors."/>
  <div className="service-stack">{services.slice(0,6).map((s,i)=>{const Icon=s.icon;return <Link to="/services" className="service-row" key={s.title}><span>{String(i+1).padStart(2,'0')}</span><Icon/><h3>{s.title}</h3><p>{s.text}</p><ArrowUpRight/></Link>})}</div>
  <Link to="/services" className="button button-dark">See every capability <ArrowRight/></Link>
  </div></section>}

function Process(){return <section className="process-section section"><div className="wrap"><SectionIntro light eyebrow="How we work" title={'Creativity with<br/><i>operating discipline.</i>'}/><div className="process-grid">{processSteps.map((p,i)=><article key={p.number}><div className="process-visual"><span>{p.number}</span>{i===0&&<Search/>}{i===1&&<Sparkles/>}{i===2&&<Gauge/>}{i===3&&<Zap/>}</div><h3>{p.title}</h3><p>{p.text}</p></article>)}</div></div></section>}

function PricingPreview(){return <section className="pricing-preview section"><div className="wrap"><SectionIntro eyebrow="Clear monthly scopes" title={'Start focused.<br/><i>Scale with evidence.</i>'} copy="Four levels for four operating stages. Media spend remains in your accounts and is never hidden inside our fee."/><div className="price-ribbon">{plans.map(p=><Link to={`/pricing#${p.id}`} className={`mini-plan ${p.popular?'featured':''}`} key={p.id}><p>{p.eyebrow}</p><h3>{p.name}</h3><div><strong>${p.price.toLocaleString()}</strong><span>/ month</span></div><ul>{p.features.slice(0,3).map(x=><li key={x}><Check/> {x}</li>)}</ul><span className="mini-plan-link">View scope <ArrowUpRight/></span></Link>)}</div><p className="price-foot">Need a focused website instead? <Link to="/pricing#website">Performance websites begin at $1,500.</Link></p></div></section>}

function AuditCta(){return <section className="audit-cta"><div className="wrap audit-cta-grid"><div><p className="eyebrow">Free technical preview</p><h2>Your website is already<br/>telling us <i>what to fix.</i></h2><p>Run a live on-page audit for metadata, structure, crawl signals, media, mobile readiness and trust foundations. Get a score, prioritized issues and a transparent repair range.</p><Link className="button button-acid" to="/audit">Run my free audit <ArrowUpRight/></Link></div><div className="audit-gauge"><span className="gauge-score">?<small>/100</small></span><div className="gauge-lines">{Array.from({length:18}).map((_,i)=><i key={i} style={{'--i':i}}/>)}</div><div className="scan-card"><b><Play/> LIVE CRAWL</b><span>Title & metadata</span><span>Heading structure</span><span>Indexing signals</span><span>Image accessibility</span></div></div></div></section>}

function InsightsPreview(){return <section className="insights-preview section"><div className="wrap"><div className="split-heading"><SectionIntro eyebrow="Field notes" title={'Ideas you can<br/><i>put to work.</i>'}/><Link to="/insights" className="text-link">Read all insights <ArrowRight/></Link></div><div className="article-grid">{articles.slice(0,3).map((a,i)=><Link to={`/insights/${a.slug}`} className={`article-card article-${i}`} key={a.slug}><div className="article-image"><img src={a.image} srcSet={`${a.image.replace('.webp','-840.webp')} 840w, ${a.image} 1680w`} sizes={i===0?'(max-width: 760px) 100vw, 50vw':'(max-width: 760px) 100vw, 25vw'} loading="lazy" width="1680" height="944" alt=""/></div><div><span>{a.category} · {a.minutes} min</span><h3>{a.title}</h3><p>{a.dek}</p><b>Read article <ArrowUpRight/></b></div></Link>)}</div></div></section>}

export default function Home(){
  const schema={ '@context':'https://schema.org','@type':'ProfessionalService',name:'Rare Score Marketing',alternateName:'RS Marketing',email:'hello.rarescore@gmail.com',url:import.meta.env.VITE_SITE_URL||'https://rsmarketing.com',areaServed:'United States',serviceType:['Digital Marketing','Search Engine Optimization','Social Media Marketing','Web Design','Advertising'] }
  return <><Seo schema={schema}/><Hero/><Marquee/><GrowthLab/><ServicesPreview/><Process/><PricingPreview/><AuditCta/><InsightsPreview/><section className="faq-section section"><div className="wrap faq-grid"><SectionIntro eyebrow="The honest answers" title={'Good partnerships<br/><i>start with clarity.</i>'}/><FaqList items={faqs.slice(0,6)}/></div></section></>
}
