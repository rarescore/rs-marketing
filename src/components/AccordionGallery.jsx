import {useState} from 'react';

export default function AccordionGallery({items,defaultIndex=2}){
  const [active,setActive]=useState(Math.min(defaultIndex,items.length-1));
  const item=items[active];

  return <div className="plan-deck">
    <div className="plan-tabs" role="tablist" aria-label="Pricing plans">
      {items.map((x,i)=>{
        const selected=i===active;
        return <button
          key={x.label}
          type="button"
          className={`plan-tab ${selected?'active':''}`}
          role="tab"
          aria-selected={selected}
          aria-controls="plan-detail-panel"
          onClick={()=>setActive(i)}
          onFocus={()=>setActive(i)}
        >
          <span className="plan-tab-number">0{i+1}</span>
          <span className="plan-tab-meta">{x.eyebrow}</span>
          <strong>{x.label}</strong>
          <small>{x.price}<em>{x.period}</em></small>
          {x.recommended&&<b>Recommended</b>}
        </button>
      })}
    </div>

    <article id="plan-detail-panel" className="plan-detail" role="tabpanel" aria-live="polite">
      <div className="plan-detail-top">
        <div>
          <span className="plan-detail-eyebrow">{item.eyebrow}</span>
          <h3>{item.label}</h3>
        </div>
        <div className="plan-detail-price"><strong>{item.price}</strong><span>{item.period}</span></div>
      </div>
      <div className="plan-detail-body">
        <div className="plan-feature-list">
          {item.features.map((f,i)=><div key={f}><span>{String(i+1).padStart(2,'0')}</span><p>{f}</p></div>)}
        </div>
        <div className="plan-detail-action">
          {item.recommended&&<span className="plan-recommended">Recommended</span>}
          <p>{item.label==='Professional Website'
            ? 'A focused one-time build for businesses that need the website itself fixed first.'
            : 'Ongoing strategy and execution for businesses that want the system managed month after month.'}</p>
          <a href={item.target}>{item.cta}<span>↗</span></a>
        </div>
      </div>
    </article>
  </div>
}
