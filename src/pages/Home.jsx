import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, BarChart3, Check, CirclePlay, Search, Sparkles, Target, Video } from 'lucide-react'
import Seo from '../components/Seo'
import { FaqList, SectionIntro } from '../components/UI'
import { articles, faqs, plans } from '../data'

const signals = [
  ['01', 'Be found', 'Search structure, local visibility and useful content help the right people discover you.'],
  ['02', 'Be understood', 'Clear words and strong creative explain why your business is the right fit.'],
  ['03', 'Be chosen', 'Fast pages, proof and simple next steps turn attention into calls and leads.'],
]

const studio = [
  { icon: Video, title: 'AI video & social', text: 'We plan, create, test and post short-form content that looks like your brand—not a template.', tag: 'Create attention' },
  { icon: Target, title: 'Ads that create leads', text: 'Meta, Instagram, TikTok and Google campaigns built around calls, forms and real sales conversations.', tag: 'Capture demand' },
  { icon: Search, title: 'SEO & local growth', text: 'We improve the pages, Google signals and local presence that decide whether people can find you.', tag: 'Build visibility' },
  { icon: Sparkles, title: 'Premium websites', text: 'High-performance sites that feel credible in seconds and make the next action obvious on every screen.', tag: 'Convert interest' },
]

function Hero(){return <section className="new-hero">
  <div className="hero-lines" aria-hidden="true"><i/><i/><i/></div>
  <div className="wrap new-hero-grid">
    <div className="new-hero-copy">
      <p className="eyebrow"><span/> Marketing that is clear, connected and built to grow</p>
      <h1>Findable.<br/>Believable.<br/><i>Chosen.</i></h1>
      <p>We build the videos, ads, search presence and websites that help people notice your business—and feel confident contacting you.</p>
      <div className="new-hero-actions"><Link to="/pricing" className="button button-acid">See packages <ArrowUpRight/></Link><Link to="/audit" className="button button-quiet">Run a free website audit <ArrowRight/></Link></div>
      <div className="hero-proof"><span><b>4</b> simple monthly plans</span><span><b>$1.5k</b> websites from</span><span><b>1 day</b> typical reply</span></div>
    </div>
    <div className="brand-stage" aria-label="RS Marketing brand mark and growth dashboard">
      <div className="brand-halo"/>
      <img src="/assets/rs-logo-white.webp" width="1200" height="1200" alt="RS Marketing — Rare Score Marketing" fetchPriority="high"/>
      <div className="float-card float-card-a"><BarChart3/><span>Search visibility</span><b>+ clearer signals</b></div>
      <div className="float-card float-card-b"><CirclePlay/><span>Creative testing</span><b>Ideas that improve</b></div>
      <div className="flight-tag"><span/> Strategy · Creative · Search · Growth</div>
    </div>
  </div>
  <div className="continuity-strip"><div>{['AI VIDEO','SOCIAL MEDIA','PAID ADS','SEO','GOOGLE PROFILE','PREMIUM WEBSITES','LEAD SYSTEMS','AI VIDEO','SOCIAL MEDIA','PAID ADS','SEO','GOOGLE PROFILE','PREMIUM WEBSITES','LEAD SYSTEMS'].map((x,i)=><span key={`${x}-${i}`}>{x}<b>↗</b></span>)}</div></div>
</section>}

function SignalSection(){return <section className="signal-section section"><div className="wrap"><div className="signal-title"><p className="eyebrow">The whole job, in plain language</p><h2>Good marketing moves people through<br/><i>three decisions.</i></h2></div><div className="signal-grid">{signals.map(([n,title,text])=><article key={n}><span>{n}</span><div className="signal-orbit"><i/><b>{title.split(' ')[1]}</b></div><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>}

function StudioSection(){return <section className="new-studio section"><div className="wrap"><div className="split-heading"><SectionIntro eyebrow="One connected studio" title={'Less to manage.<br/><i>More working together.</i>'} copy="You should not need five vendors to make one customer journey work. We connect the message, the content, the traffic and the page."/><Link to="/services" className="text-link">See every service <ArrowRight/></Link></div><div className="studio-grid">{studio.map((item,i)=>{const Icon=item.icon;return <Link to="/services" className={`studio-card studio-card-${i+1}`} key={item.title}><div className="studio-card-top"><span>{item.tag}</span><ArrowUpRight/></div><Icon/><h3>{item.title}</h3><p>{item.text}</p><div className="studio-pulse"><i/><i/><i/><i/><i/></div></Link>})}</div></div></section>}

function WorkFlow(){return <section className="flow-section"><div className="wrap flow-grid"><div><p className="eyebrow">A simple working rhythm</p><h2>You bring the business.<br/><i>We build the signal.</i></h2><p>Every month has a clear purpose, visible work and a plain-language review. You know what is being made, what it is meant to do and what we learned.</p><Link to="/contact" className="button button-acid">Tell us your goal <ArrowUpRight/></Link></div><div className="flow-steps">{[['01','Listen','We learn the offer, buyer and current bottleneck.'],['02','Build','We create the pages, content and campaigns.'],['03','Test','We compare messages, formats and audiences.'],['04','Improve','We keep what works and change what does not.']].map(([n,t,p])=><article key={n}><span>{n}</span><div><h3>{t}</h3><p>{p}</p></div><i/></article>)}</div></div></section>}

function PricingPreview(){return <section className="new-pricing section"><div className="wrap"><div className="split-heading"><SectionIntro eyebrow="Clear monthly options" title={'Choose the pace.<br/><i>Keep the clarity.</i>'} copy="Start with the amount of production and management you need now. Advertising spend remains separate and stays in accounts you own."/><Link to="/pricing" className="text-link">Compare every detail <ArrowRight/></Link></div><div className="new-price-grid">{plans.map(p=><article className={p.popular?'selected':''} key={p.id}>{p.popular&&<span className="choice-tag">Best place to start</span>}<p>{p.eyebrow}</p><h3>{p.name}</h3><div className="new-price"><b>${p.price.toLocaleString()}</b><span>/ month</span></div><p>{p.description}</p><ul>{p.features.slice(0,4).map(x=><li key={x}><Check/>{x}</li>)}</ul><Link to={`/pricing#${p.id}`} className="price-link">See this package <ArrowUpRight/></Link></article>)}</div><div className="website-bar"><div><span>Need the website first?</span><h3>Premium SEO-ready websites from $1,500.</h3></div><p>Mobile-first design, clear pages, analytics, metadata, schema and a working contact path.</p><Link to="/pricing#website" className="button button-dark">Website details <ArrowRight/></Link></div></div></section>}

function AuditBanner(){return <section className="new-audit-banner"><div className="wrap new-audit-grid"><div><p className="eyebrow">Free website audit</p><h2>See what may be holding<br/>your website <i>back.</i></h2><p>Get a score, animated breakdown, plain-language findings and a repair estimate. No password needed.</p><Link to="/audit" className="button button-acid">Run my free audit <ArrowUpRight/></Link></div><div className="audit-preview-card"><div className="mini-score"><strong>?</strong><span>/100</span></div><div className="mini-bars">{['Google basics','Mobile','Page structure','Trust'].map((x,i)=><div key={x}><span>{x}</span><i><b style={{'--bar':`${[78,91,64,83][i]}%`}}/></i></div>)}</div><p><span/> Your report opens on a new page</p></div></div></section>}

function Insights(){return <section className="new-insights section"><div className="wrap"><div className="split-heading"><SectionIntro eyebrow="Useful thinking" title={'Understand the system.<br/><i>Make better decisions.</i>'}/><Link to="/insights" className="text-link">View all articles <ArrowRight/></Link></div><div className="new-article-grid">{articles.slice(0,3).map((a,i)=><Link to={`/insights/${a.slug}`} key={a.slug}><div><img src={a.image.replace('.webp','-840.webp')} width="840" height="472" alt="" loading="lazy"/></div><span>{String(i+1).padStart(2,'0')} · {a.category}</span><h3>{a.title}</h3><p>{a.dek}</p><b>Read the article <ArrowUpRight/></b></Link>)}</div></div></section>}

export default function Home(){
  const schema={ '@context':'https://schema.org','@type':'ProfessionalService',name:'Rare Score Marketing',alternateName:'RS Marketing',email:'hello.rarescore@gmail.com',url:import.meta.env.VITE_SITE_URL||'https://rsmarketing.com',areaServed:'United States',serviceType:['Digital Marketing','Search Engine Optimization','Social Media Marketing','Web Design','Advertising'] }
  return <><Seo schema={schema}/><Hero/><SignalSection/><StudioSection/><WorkFlow/><PricingPreview/><AuditBanner/><Insights/><section className="faq-section section"><div className="wrap faq-grid"><SectionIntro eyebrow="Simple answers" title={'Know what you are<br/><i>buying before the call.</i>'}/><FaqList items={faqs.slice(0,6)}/></div></section></>
}
