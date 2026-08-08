import {useState} from 'react';

export default function AccordionGallery({items,defaultIndex=2}){
  const [active,setActive]=useState(Math.min(defaultIndex,items.length-1));
  const activate=(i)=>setActive(i);
  const onKey=(e,i)=>{
    if(e.key==='Enter'||e.key===' '){e.preventDefault();activate(i)}
    if(e.key==='ArrowRight'||e.key==='ArrowDown'){e.preventDefault();activate((i+1)%items.length)}
    if(e.key==='ArrowLeft'||e.key==='ArrowUp'){e.preventDefault();activate((i-1+items.length)%items.length)}
  };
  return <div className="accordion-gallery" role="tablist" aria-label="Pricing plans">
    {items.map((item,i)=>{
      const selected=i===active;
      return <article
        key={item.label}
        className={`plan-panel ${selected?'active':''}`}
        onMouseEnter={()=>activate(i)}
        onClick={()=>activate(i)}
        onFocus={()=>activate(i)}
        onKeyDown={e=>onKey(e,i)}
        tabIndex="0"
        role="tab"
        aria-selected={selected}
      >
        <div className="plan-number">0{i+1}</div>
        {item.recommended&&<span className="recommended">Recommended</span>}
        <span className="plan-collapsed-label">{item.label}</span>
        <div className="plan-copy">
          {item.eyebrow&&<span className="plan-eyebrow">{item.eyebrow}</span>}
          <p>{item.label}</p>
          <strong>{item.price}</strong>
          <small>{item.period}</small>
          <ul>{item.features.map(f=><li key={f}>{f}</li>)}</ul>
          <a href={item.target} onClick={e=>e.stopPropagation()}>{item.cta}</a>
        </div>
      </article>;
    })}
  </div>;
}
