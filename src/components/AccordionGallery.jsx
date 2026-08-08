import {useEffect,useMemo,useState} from 'react';

function slug(value=''){
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
}

export default function AccordionGallery({items,defaultIndex=2}){
  const initial=useMemo(()=>{
    if(typeof window==='undefined')return Math.min(defaultIndex,items.length-1);
    const hash=window.location.hash.replace('#','').trim();
    if(hash){
      const found=items.findIndex(item=>slug(item.label)===hash || slug(item.label).includes(hash));
      if(found>=0)return found;
    }
    return Math.min(defaultIndex,items.length-1);
  },[defaultIndex,items]);
  const[active,setActive]=useState(initial);

  useEffect(()=>{
    if(typeof window==='undefined')return;
    const onHash=()=>{
      const hash=window.location.hash.replace('#','').trim();
      const found=items.findIndex(item=>slug(item.label)===hash || slug(item.label).includes(hash));
      if(found>=0)setActive(found);
    };
    window.addEventListener('hashchange',onHash);
    return()=>window.removeEventListener('hashchange',onHash);
  },[items]);

  const activate=i=>{
    setActive(i);
    if(typeof window!=='undefined' && window.location.pathname==='/pricing'){
      const next=`#${slug(items[i].label)}`;
      if(window.location.hash!==next)history.replaceState(null,'',next);
    }
  };

  const onKey=(e,i)=>{
    if(e.key==='Enter'||e.key===' '){e.preventDefault();activate(i);return;}
    if(e.key==='ArrowRight'||e.key==='ArrowDown'){e.preventDefault();activate((i+1)%items.length);return;}
    if(e.key==='ArrowLeft'||e.key==='ArrowUp'){e.preventDefault();activate((i-1+items.length)%items.length);}
  };

  return <div className={`accordion-gallery pricing-accordion active-${active}`} role="tablist" aria-label="Pricing plans">
    {items.map((item,i)=>{
      const selected=i===active;
      return <article
        key={item.label}
        id={slug(item.label)}
        className={`plan-panel ${selected?'active':''}`}
        onClick={()=>activate(i)}
        onFocus={()=>activate(i)}
        onKeyDown={e=>onKey(e,i)}
        tabIndex="0"
        role="tab"
        aria-selected={selected}
        aria-controls={`plan-detail-${i}`}
      >
        <div className="plan-number">0{i+1}</div>
        {item.recommended&&<span className="recommended">Recommended</span>}
        <span className="plan-collapsed-label">{item.shortLabel||item.label}</span>
        <div id={`plan-detail-${i}`} className="plan-copy" aria-hidden={!selected}>
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
