import {useEffect,useState} from 'react';

export default function AccordionGallery({items,defaultIndex=2}){
  const safeDefault=Math.max(0,Math.min(defaultIndex,items.length-1));
  const[active,setActive]=useState(safeDefault);
  useEffect(()=>{
    const hash=(window.location.hash||'').replace('#','').toLowerCase();
    if(!hash)return;
    const index=items.findIndex(item=>String(item.label||'').toLowerCase().replace(/\s+/g,'-')===hash||String(item.label||'').toLowerCase().includes(hash));
    if(index>=0)setActive(index);
  },[items]);
  const activate=i=>setActive(i);
  const onKey=(e,i)=>{
    if(e.key==='Enter'||e.key===' '){e.preventDefault();activate(i)}
    if(e.key==='ArrowRight'||e.key==='ArrowDown'){e.preventDefault();activate((i+1)%items.length)}
    if(e.key==='ArrowLeft'||e.key==='ArrowUp'){e.preventDefault();activate((i-1+items.length)%items.length)}
  };
  return <div className="accordion-gallery pricing-accordion" role="tablist" aria-label="Pricing plans">
    {items.map((item,i)=>{
      const selected=i===active;
      const id=String(item.label||`plan-${i+1}`).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
      return <article
        id={id}
        key={item.label}
        className={`plan-panel ${selected?'active':''}`}
        onClick={()=>activate(i)}
        onKeyDown={e=>onKey(e,i)}
        tabIndex="0"
        role="tab"
        aria-selected={selected}
        aria-controls={`${id}-details`}
      >
        <div className="plan-number">0{i+1}</div>
        {item.recommended&&<span className="recommended">Recommended</span>}
        <div className="plan-closed-copy" aria-hidden={selected}><span>{item.eyebrow}</span><strong>{item.label}</strong><small>{item.price}</small></div>
        <div id={`${id}-details`} className="plan-copy" aria-hidden={!selected}>
          {item.eyebrow&&<span className="plan-eyebrow">{item.eyebrow}</span>}
          <p>{item.label}</p>
          <strong>{item.price}</strong>
          <small>{item.period}</small>
          <ul>{item.features.map(f=><li key={f}>{f}</li>)}</ul>
          <a href={item.target} onClick={e=>e.stopPropagation()}>{item.cta} <span>↗</span></a>
        </div>
      </article>;
    })}
  </div>;
}
