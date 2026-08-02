import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export function Marquee({ dark = false }) {
  const words = ['AI VIDEO', 'PAID MEDIA', 'SEARCH', 'SOCIAL', 'LOCAL GROWTH', 'PERFORMANCE WEB']
  return <div className={`marquee ${dark?'marquee-dark':''}`} aria-hidden="true"><div>{[...words,...words].map((w,i)=><span key={i}>{w}<b>✦</b></span>)}</div></div>
}

export function FaqList({ items }) {
  const [open, setOpen] = useState(0)
  return <div className="faq-list">{items.map(([q,a],i)=><div className={`faq-item ${open===i?'open':''}`} key={q}><button onClick={()=>setOpen(open===i?-1:i)} aria-expanded={open===i}><span>{String(i+1).padStart(2,'0')}</span>{q}<ChevronDown/></button><div className="faq-answer"><p>{a}</p></div></div>)}</div>
}

export function SectionIntro({ eyebrow, title, copy, light = false }) {
  return <div className={`section-intro ${light?'light':''}`}><p className="eyebrow">{eyebrow}</p><h2 dangerouslySetInnerHTML={{__html:title}} />{copy&&<p className="lede">{copy}</p>}</div>
}
