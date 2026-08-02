import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AlertTriangle, ArrowRight, Globe2, LoaderCircle, LockKeyhole, MapPin, Search, ShieldCheck } from 'lucide-react'
import Seo from '../components/Seo'

const previewResult={
  url:'https://example.com',score:64,mode:'preview',summary:'Preview report. Deploy on Vercel to scan a real public website.',
  categories:{Metadata:72,Structure:58,Crawlability:66,Mobile:82,Media:49,Trust:61},
  issues:[
    {severity:'high',title:'Google cannot see one clear page topic',detail:'The page structure does not make the main service obvious.',fix:'Use one clear main heading and organize the sections underneath it.'},
    {severity:'medium',title:'Search result description needs work',detail:'Google may choose random page text when it shows this page.',fix:'Write a simple description that explains the service and location.'},
    {severity:'medium',title:'Images are missing descriptions',detail:'Some images do not explain their meaning to search engines or screen readers.',fix:'Add short, accurate alternative text to useful images.'},
  ],
  estimate:{price:1850,label:'Website SEO repair',effort:'2–3 weeks'},checks:{title:'Example business',descriptionLength:82,h1s:0,h2s:6,imageCount:12,missingAlt:5,robotsOk:true,sitemapOk:false,https:true},
  ranking:{status:'not_connected',keyword:'',location:''}
}

export default function Audit(){
  const navigate=useNavigate()
  const [form,setForm]=useState({url:'',keyword:'',location:'',email:''})
  const [state,setState]=useState('idle')
  const [step,setStep]=useState(0)
  const [error,setError]=useState('')
  const valid=useMemo(()=>{try{const u=new URL(/^https?:\/\//.test(form.url)?form.url:`https://${form.url}`);return u.hostname.includes('.')}catch{return false}},[form.url])
  const update=e=>setForm({...form,[e.target.name]:e.target.value})

  async function run(e){
    e.preventDefault()
    if(!valid){setError('Enter a website such as yourbusiness.com.');return}
    setError('');setState('loading');setStep(0)
    const timer=setInterval(()=>setStep(s=>Math.min(s+1,3)),650)
    try{
      const response=await fetch('/api/audit',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)})
      const data=await response.json()
      if(!response.ok)throw new Error(data.error||'We could not read that website.')
      const result={...data,request:{keyword:form.keyword,location:form.location,email:form.email}}
      sessionStorage.setItem('rsAuditResult',JSON.stringify(result))
      clearInterval(timer);setStep(3)
      setTimeout(()=>navigate('/audit/report',{state:{result}}),350)
    }catch(err){
      clearInterval(timer)
      if(import.meta.env.DEV){const result={...previewResult,url:/^https?:\/\//.test(form.url)?form.url:`https://${form.url}`,request:{keyword:form.keyword,location:form.location,email:form.email}};sessionStorage.setItem('rsAuditResult',JSON.stringify(result));navigate('/audit/report',{state:{result}})}
      else{setError(err.message);setState('idle')}
    }
  }

  return <><Seo title="Free Website SEO Audit | RS Marketing" description="Get a clear website score, Google visibility context, simple findings and a repair estimate from RS Marketing."/>
    <section className="new-audit-page">
      <div className="audit-scan-lines" aria-hidden="true"><i/><i/><i/></div>
      <div className="wrap new-audit-layout">
        <div className="new-audit-copy">
          <p className="eyebrow">Free website audit</p>
          <h1>See why Google may be<br/><i>passing you by.</i></h1>
          <p>We check the public page people and Google can see. Your score opens at the top of a new report—no scrolling around to find it.</p>
          <div className="audit-promise"><span><ShieldCheck/> No password needed</span><span><LockKeyhole/> Public information only</span><span><ArrowRight/> Plain-English report</span></div>
          <div className="audit-explainer"><strong>What you will get</strong><div><b>01</b><span><strong>Your score out of 100</strong><small>With animated bars for every area.</small></span></div><div><b>02</b><span><strong>What is hurting your search visibility</strong><small>Explained without technical jargon.</small></span></div><div><b>03</b><span><strong>A price to let us fix it</strong><small>Based on the work your page appears to need.</small></span></div></div>
        </div>
        <form className="new-audit-form" onSubmit={run}>
          <div className="audit-form-head"><span>FREE REPORT</span><b>About 15 seconds</b></div>
          <label>Website address<div><Globe2/><input name="url" value={form.url} onChange={update} placeholder="yourbusiness.com" inputMode="url" autoComplete="url" required/></div><small>The main page you want us to check.</small></label>
          <label>Main service or keyword <span>(optional)</span><div><Search/><input name="keyword" value={form.keyword} onChange={update} placeholder="example: emergency plumber"/></div><small>What would a customer type into Google?</small></label>
          <label>City or service area <span>(optional)</span><div><MapPin/><input name="location" value={form.location} onChange={update} placeholder="example: Austin, TX" autoComplete="address-level2"/></div><small>This makes a connected rank check more useful.</small></label>
          <label>Email <span>(optional)</span><div><ArrowRight/><input type="email" name="email" value={form.email} onChange={update} placeholder="you@company.com" autoComplete="email"/></div><small>We do not add you to a mailing list.</small></label>
          {error&&<p className="form-error"><AlertTriangle/>{error}</p>}
          <button className="button button-acid" disabled={!valid||state==='loading'}>{state==='loading'?<><LoaderCircle className="spin"/> Building your report…</>:<>Run my free audit <ArrowRight/></>}</button>
          <small>By running the audit, you agree to our <Link to="/privacy">privacy notice</Link>.</small>
        </form>
      </div>
      {state==='loading'&&<div className="scan-overlay" role="status" aria-live="polite"><div><div className="scanner-orb"><span/><Globe2/></div><p>Building your report</p>{['Reading the public page','Checking Google basics','Testing mobile and structure','Preparing your score'].map((x,i)=><span className={i<=step?'done':''} key={x}><i/>{x}</span>)}</div></div>}
    </section>
  </>
}
