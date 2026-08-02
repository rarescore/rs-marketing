import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AlertTriangle, ArrowLeft, ArrowRight, Check, CheckCircle2, Download, ExternalLink, Info, Search, Wrench } from 'lucide-react'
import Seo from '../components/Seo'

const plainNames={Metadata:'Google basics',Structure:'Page structure',Crawlability:'Google access',Mobile:'Mobile setup',Media:'Images',Trust:'Trust & safety'}
const plainHelp={Metadata:'Your page title and search description.',Structure:'How clearly the page explains its main topic.',Crawlability:'Whether Google can find and understand the page.',Mobile:'Whether the page is prepared for phone visitors.',Media:'Whether images are useful and properly described.',Trust:'Security and credibility signals.'}

function getStored(){try{return JSON.parse(sessionStorage.getItem('rsAuditResult')||'null')}catch{return null}}
function messageFor(score){if(score<45)return 'Google is likely having a hard time understanding and trusting this page.';if(score<70)return 'Search rank may be impacted by several signals that need attention.';if(score<85)return 'Your foundation is working, but a few gaps may be holding the page back.';return 'Your page has a strong foundation. The next gains come from deeper content and authority.'}
function priorityText(severity){return severity==='high'?'Fix this first':severity==='medium'?'Important improvement':'Helpful improvement'}

function ScoreDial({score,ready}){return <div className={`report-score ${ready?'is-ready':''}`} style={{'--report-score':`${score}%`}}><div><strong>{score}</strong><span>/100</span><small>Website score</small></div></div>}

export default function AuditReport(){
  const location=useLocation()
  const result=location.state?.result||getStored()
  const [ready,setReady]=useState(false)
  useEffect(()=>{const t=setTimeout(()=>setReady(true),120);return()=>clearTimeout(t)},[])
  const categories=useMemo(()=>Object.entries(result?.categories||{}),[result])
  if(!result)return <section className="empty-report"><Search/><h1>No report found.</h1><p>Run the free audit first and your score will open here.</p><Link to="/audit" className="button button-dark">Run free audit <ArrowRight/></Link></section>
  const rank=result.ranking||{status:'not_connected'}
  const keyword=result.request?.keyword||rank.keyword
  const locationName=result.request?.location||rank.location
  return <><Seo title={`Website Audit Score: ${result.score}/100 | RS Marketing`} noindex/>
    <section className="report-top">
      <div className="wrap report-nav"><Link to="/audit"><ArrowLeft/> Run another audit</Link><button onClick={()=>window.print()}><Download/> Save report</button></div>
      <div className="wrap report-hero">
        <ScoreDial score={result.score||0} ready={ready}/>
        <div><p className="eyebrow">Your website audit</p><h1>{result.score}/100<br/><i>{result.score<70?'Needs attention':'A useful foundation'}</i></h1><p className="rank-impact">{messageFor(result.score||0)}</p><a href={result.url} target="_blank" rel="noreferrer">{result.url} <ExternalLink/></a>{result.mode==='preview'&&<span className="preview-badge">DEMO SCORE · DEPLOY TO RUN A LIVE AUDIT</span>}</div>
        <aside><span><AlertTriangle/> What this means</span><h2>{(result.issues||[]).filter(x=>x.severity==='high').length} urgent {((result.issues||[]).filter(x=>x.severity==='high').length===1)?'issue':'issues'} found</h2><p>{result.summary}</p><Link to={`/contact?audit=${encodeURIComponent(result.url)}&estimate=${result.estimate?.price}`} className="button button-acid">Let us improve your score <ArrowRight/></Link></aside>
      </div>
    </section>

    <section className="report-breakdown section"><div className="wrap"><div className="report-section-title"><div><p className="eyebrow">Score breakdown</p><h2>Where your website<br/><i>gains or loses points.</i></h2></div><p>The bars fill to show how each part performed. A shorter bar is a clearer opportunity for improvement.</p></div><div className={`big-score-bars ${ready?'is-ready':''}`}>{categories.map(([name,value],i)=><article key={name} style={{'--delay':`${i*90}ms`}}><div><span>{String(i+1).padStart(2,'0')}</span><h3>{plainNames[name]||name}</h3><b>{value}/100</b></div><p>{plainHelp[name]}</p><i><em style={{'--value':`${value}%`}}/></i><small>{value<55?'Needs work':value<75?'Can improve':value<90?'Good':'Strong'}</small></article>)}</div></div></section>

    <section className="google-position"><div className="wrap google-position-grid"><div><p className="eyebrow">Google visibility</p><h2>What page are you<br/><i>showing on?</i></h2><p>Google results change by keyword, city, device and time. We only show an exact position when a live rank provider is connected—never a made-up number.</p></div><div className="rank-card"><div className="rank-card-head"><Search/><span>{keyword||'No keyword entered'}</span><small>{locationName||'No location entered'}</small></div>{rank.status==='found'?<><p>Estimated Google position</p><strong>#{rank.position}</strong><span className="google-page">Page {rank.page}</span><small>Checked for the keyword and location above. Rankings can move.</small></>:rank.status==='not_found'?<><p>Search rank impacted</p><strong>100+</strong><span className="google-page">Not found in first 10 pages</span><small>Google did not show this website in the first 100 results for this search.</small></>:<><p>Exact Google page</p><strong>—</strong><span className="google-page">Rank check not connected</span><small>{keyword?'Connect a ranking provider or Google Search Console to show a verified position.':'Enter a main service and city on your next audit to prepare a rank check.'}</small></>}</div></div></section>

    <section className="report-findings section"><div className="wrap report-findings-grid"><div><p className="eyebrow">What needs to improve</p><h2>Google may not rank<br/>this page higher <i>because…</i></h2><p>We placed the most important items first. Each one includes a simple explanation and the action that should be taken.</p></div><div className="plain-issue-list">{(result.issues||[]).length?(result.issues||[]).map((item,i)=><article key={`${item.title}-${i}`}><span className={`plain-priority ${item.severity}`}>{priorityText(item.severity)}</span><div className="issue-number">{String(i+1).padStart(2,'0')}</div><h3>{item.title}</h3><p>{item.detail}</p><div className="plain-fix"><CheckCircle2/><div><b>What to do</b><p>{item.fix}</p></div></div></article>):<article><span className="plain-priority low">Strong result</span><h3>No major public-page problems found.</h3><p>A deeper site crawl, Search Console review and competitor check can still uncover growth opportunities.</p></article>}</div></div></section>

    <section className="repair-offer"><div className="wrap repair-offer-card"><div><p className="eyebrow">Want us to handle it?</p><h2>Let us improve<br/><i>your score.</i></h2><p>We will confirm the exact scope before charging. The amount below is a starting estimate based on this public-page audit.</p></div><div className="repair-price"><span>{result.estimate?.label||'Website repair'}</span><strong><small>from</small>${result.estimate?.price?.toLocaleString()}</strong><p>Estimated time: {result.estimate?.effort||'After review'}</p></div><div className="repair-actions"><Link to={`/contact?audit=${encodeURIComponent(result.url)}&estimate=${result.estimate?.price}`} className="button button-acid">Purchase this fix <Wrench/></Link><Link to={`/contact?audit=${encodeURIComponent(result.url)}`} className="button button-outline">Contact us first <ArrowRight/></Link></div></div></section>

    <section className="report-method"><div className="wrap"><Info/><p>This free report checks one public page and visible technical signals. It is not a full-site crawl, backlink study, accessibility certification or promise of a specific Google ranking. Exact ranking requires a keyword, location and connected data source.</p></div></section>
  </>
}
