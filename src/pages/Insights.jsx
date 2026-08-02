import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Seo from '../components/Seo'
import { articles } from '../data'

export default function Insights(){const cats=['All',...new Set(articles.map(a=>a.category))];const[filter,setFilter]=useState('All');const visible=filter==='All'?articles:articles.filter(a=>a.category===filter);return <><Seo title="Marketing Insights | RS Marketing" description="Original field notes on SEO, creative testing, local growth, paid acquisition and high-converting websites."/>
<section className="page-hero insights-hero"><div className="wrap"><p className="eyebrow">Field notes</p><h1>Clear thinking for<br/><i>messy growth problems.</i></h1><p className="page-lede">No recycled listicles. Practical essays on the systems behind search, creative, local trust and conversion.</p></div></section>
<section className="insights-list section"><div className="wrap"><div className="filter-tabs" role="group" aria-label="Filter articles">{cats.map(c=><button key={c} className={filter===c?'active':''} onClick={()=>setFilter(c)}>{c}</button>)}</div><div className="insight-feature-grid">{visible.map((a,i)=><Link className={`insight-card ${i===0?'featured':''}`} to={`/insights/${a.slug}`} key={a.slug}><div className="insight-img"><img src={a.image} srcSet={`${a.image.replace('.webp','-840.webp')} 840w, ${a.image} 1680w`} sizes={i===0?'(max-width: 760px) 100vw, 60vw':'(max-width: 760px) 100vw, 25vw'} width="1680" height="944" alt="" loading={i?'lazy':'eager'}/><span>{a.category}</span></div><div><p>{a.minutes} minute read</p><h2>{a.title}</h2><p>{a.dek}</p><b>Read the field note <ArrowUpRight/></b></div></Link>)}</div></div></section></>}
