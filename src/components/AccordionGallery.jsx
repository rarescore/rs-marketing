import{useState}from'react';
export default function AccordionGallery({items,defaultIndex=2}){
  const[active,setActive]=useState(Math.min(defaultIndex,items.length-1));
  const activate=(i)=>setActive(i);
  return <div className="accordion-gallery">{items.map((item,i)=>{
    const isActive=i===active;
    return <article key={item.label} className={`plan-panel ${isActive?'active':''}`} onMouseEnter={()=>activate(i)} onClick={()=>activate(i)} onFocus={()=>activate(i)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();activate(i)}}} tabIndex="0" role="button" aria-expanded={isActive} aria-label={`${item.label}, ${item.price} ${item.period}`}>
      <div className="plan-number">0{i+1}</div>{item.recommended&&<span className="recommended">Recommended</span>}
      <div className="plan-copy">{item.eyebrow&&<span className="plan-eyebrow">{item.eyebrow}</span>}<p>{item.label}</p><strong>{item.price}</strong><small>{item.period}</small><ul>{item.features.map(f=><li key={f}>{f}</li>)}</ul><a href={item.target} onClick={e=>e.stopPropagation()}>{item.cta}</a></div>
      {!isActive&&<span className="plan-collapsed-label">{item.label}</span>}
    </article>
  })}</div>
}
