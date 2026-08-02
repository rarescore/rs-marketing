import dns from 'node:dns/promises'
import net from 'node:net'

const PRIVATE_V4 = [/^10\./,/^127\./,/^169\.254\./,/^192\.168\./,/^0\./,/^224\./,/^255\./,/^172\.(1[6-9]|2\d|3[01])\./,/^100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\./]
const PRIVATE_V6 = [/^::1$/,/^::$/,/^f[cd]/i,/^fe[89ab]/i,/^::ffff:(10\.|127\.|169\.254\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/i]

function isPrivate(address) {
  const version = net.isIP(address)
  if (!version) return true
  return (version === 4 ? PRIVATE_V4 : PRIVATE_V6).some(re => re.test(address))
}

async function validateTarget(input) {
  let url
  try { url = new URL(/^https?:\/\//i.test(input) ? input : `https://${input}`) } catch { throw new Error('Enter a valid website URL.') }
  if (!['http:','https:'].includes(url.protocol) || url.username || url.password) throw new Error('Only public HTTP and HTTPS websites are supported.')
  if (url.port && !['80','443'].includes(url.port)) throw new Error('Custom ports are not supported.')
  const host = url.hostname.toLowerCase()
  if (host === 'localhost' || host.endsWith('.local') || host.endsWith('.internal') || host.endsWith('.localhost')) throw new Error('Private network targets are not allowed.')
  const records = await dns.lookup(host, { all: true, verbatim: true })
  if (!records.length || records.some(r => isPrivate(r.address))) throw new Error('Private network targets are not allowed.')
  return url
}

async function safeFetch(input, options = {}, redirects = 0) {
  const url = await validateTarget(input.toString())
  const response = await fetch(url, { ...options, redirect: 'manual', signal: AbortSignal.timeout(9000), headers: { 'User-Agent':'RSMarketingAudit/1.0 (+https://rsmarketing.com)', Accept:'text/html,application/xhtml+xml,text/plain;q=.8', ...(options.headers||{}) } })
  if ([301,302,303,307,308].includes(response.status) && response.headers.get('location')) {
    if (redirects >= 3) throw new Error('The website redirected too many times.')
    return safeFetch(new URL(response.headers.get('location'), url), options, redirects + 1)
  }
  return { response, finalUrl: url.toString() }
}

const has = (html, re) => re.test(html)
const capture = (html, re) => (html.match(re)?.[1] || '').replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim()
const metaContent = (html, name) => {
  const tags = html.match(/<meta\b[^>]*>/gi) || []
  const tag = tags.find(item => (attr(item, 'name') || '').toLowerCase() === name.toLowerCase())
  return tag ? (attr(tag, 'content') || '').trim() : ''
}
const count = (html, re) => (html.match(re)||[]).length
const attr = (tag, name) => tag.match(new RegExp(`\\s${name}=["']([^"']*)["']`,'i'))?.[1] ?? null
const clamp = n => Math.max(0, Math.min(100, Math.round(n)))

function issue(severity,title,detail,fix){ return {severity,title,detail,fix} }

async function checkGooglePosition(hostname, keyword, location) {
  const query=String(keyword||'').trim().slice(0,140)
  const place=String(location||'').trim().slice(0,100)
  if(!query)return {status:'not_requested',keyword:'',location:place}
  if(!process.env.SERPER_API_KEY)return {status:'not_connected',keyword:query,location:place}
  try{
    const response=await fetch('https://google.serper.dev/search',{method:'POST',headers:{'X-API-KEY':process.env.SERPER_API_KEY,'Content-Type':'application/json'},body:JSON.stringify({q:[query,place].filter(Boolean).join(' '),num:100}) ,signal:AbortSignal.timeout(8000)})
    if(!response.ok)throw new Error('Rank provider unavailable')
    const data=await response.json()
    const target=hostname.replace(/^www\./,'')
    const organic=Array.isArray(data.organic)?data.organic:[]
    const index=organic.findIndex(item=>{try{return new URL(item.link).hostname.replace(/^www\./,'')===target}catch{return false}})
    if(index<0)return {status:'not_found',keyword:query,location:place,checked:organic.length}
    const position=Number(organic[index].position)||index+1
    return {status:'found',keyword:query,location:place,position,page:Math.ceil(position/10),checked:organic.length}
  }catch{return {status:'not_connected',keyword:query,location:place}}
}

function analyze(html, headers, finalUrl, robotsOk, sitemapOk, duration) {
  const title=capture(html,/<title[^>]*>([\s\S]*?)<\/title>/i)
  const description=metaContent(html,'description')
  const h1s=count(html,/<h1\b[^>]*>/gi), h2s=count(html,/<h2\b[^>]*>/gi)
  const images=html.match(/<img\b[^>]*>/gi)||[]
  const missingAlt=images.filter(tag=>attr(tag,'alt')===null).length
  const lazyImages=images.filter(tag=>attr(tag,'loading')==='lazy').length
  const canonical=has(html,/<link[^>]+rel=["'][^"']*canonical[^"']*["'][^>]*>/i)
  const viewport=has(html,/<meta[^>]+name=["']viewport["']/i)
  const schema=has(html,/<script[^>]+type=["']application\/ld\+json["']/i)
  const og=has(html,/<meta[^>]+property=["']og:title["']/i)&&has(html,/<meta[^>]+property=["']og:description["']/i)
  const lang=has(html,/<html[^>]+lang=["'][^"']+["']/i)
  const noindex=has(html,/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i)
  const forms=count(html,/<form\b/gi), labels=count(html,/<label\b/gi)
  const https=finalUrl.startsWith('https://')
  const security=['content-security-policy','strict-transport-security','x-content-type-options','referrer-policy'].filter(h=>headers.get(h)).length
  const issues=[]
  if(!title)issues.push(issue('high','Google cannot see a clear page title','The page is missing the main label Google usually shows in search results.','Add a short, specific title that names the service, location when useful, and business.'))
  else if(title.length<30||title.length>65)issues.push(issue('medium','The Google title is hard to scan',`The title is ${title.length} characters: “${title.slice(0,90)}”.`,'Rewrite it in roughly 45–60 characters so people can understand the page quickly.'))
  if(!description)issues.push(issue('medium','The Google search description is missing','Google may pull random page text instead of showing a clear summary.','Add a useful one- or two-sentence description of this page.'))
  else if(description.length<90||description.length>170)issues.push(issue('low','Meta description length can be improved',`The detected description is ${description.length} characters.`,'Aim for a useful, specific summary around 120–160 characters.'))
  if(h1s===0)issues.push(issue('high','The main page topic is not clear','Google cannot find one main heading that explains what this page is about.','Add one clear main heading that matches the service or purpose of the page.'))
  if(h1s>1)issues.push(issue('medium','The page has too many main headings',`${h1s} main headings make the primary topic less clear.`,'Keep one main heading and use smaller headings for the sections below it.'))
  if(!canonical)issues.push(issue('medium','Google may see duplicate versions of this page','The page does not clearly name which web address is the main version.','Set the preferred web address so similar versions do not compete with each other.'))
  if(noindex)issues.push(issue('high','This page tells Google not to show it','A hidden setting asks search engines to leave the page out of results.','Remove that setting if this page should appear in Google.'))
  if(!viewport)issues.push(issue('high','The page may not work properly on phones','The mobile sizing setting is missing.','Add the correct mobile setting and test the page on common phone sizes.'))
  if(images.length&&missingAlt)issues.push(issue(missingAlt/images.length>.4?'high':'medium','Some images are not explained',`${missingAlt} of ${images.length} images have no text description for Google or screen readers.`,'Add short, accurate descriptions to useful images. Mark decorative images as decorative.'))
  if(images.length>5&&lazyImages===0)issues.push(issue('low','Below-the-fold images may load too early',`${images.length} images were found and none explicitly use native lazy loading.`,'Lazy-load non-critical images and preserve explicit dimensions to reduce page work.'))
  if(!schema)issues.push(issue('low','Google is missing extra business details','The page does not include the organized business information that can help search engines understand it.','Add accurate structured details for the business, service and page type.'))
  if(!og)issues.push(issue('low','Shared links may look unfinished','Social platforms may choose random words or images when someone shares this page.','Set the title, description and image used when the page is shared.'))
  if(!lang)issues.push(issue('medium','The document language is not declared','Browsers and assistive technologies receive less context.','Set a valid lang attribute on the HTML element.'))
  if(forms>0&&labels===0)issues.push(issue('medium','Forms may lack visible programmatic labels',`${forms} form element(s) were found but no label elements were detected.`,'Associate every input with a clear label and useful validation text.'))
  if(!https)issues.push(issue('high','The audited page is not using HTTPS','Unencrypted transport weakens user trust and browser security.','Redirect all traffic to HTTPS and renew certificates automatically.'))
  if(security<2)issues.push(issue('low','Few security headers were detected',`${security} of 4 common protective response headers were found.`,'Review CSP, HSTS, content-type and referrer policies for the production stack.'))
  if(!robotsOk)issues.push(issue('low','robots.txt was not confirmed','Crawlers may lack a central crawl-policy file.','Publish a valid robots.txt and reference the XML sitemap.'))
  if(!sitemapOk)issues.push(issue('low','An XML sitemap was not confirmed','Discovery of important URLs may be less efficient.','Publish and submit a canonical XML sitemap.'))

  const metadata=clamp(100-(!title?45:0)-(!description?35:0)-(!og?15:0)-(title&&(title.length<30||title.length>65)?10:0))
  const structure=clamp(100-(h1s===0?50:0)-(h1s>1?25:0)-(h2s===0?15:0)-(!lang?15:0))
  const crawlability=clamp(100-(!canonical?25:0)-(noindex?65:0)-(!robotsOk?10:0)-(!sitemapOk?15:0))
  const mobile=clamp(100-(!viewport?70:0)-(images.length>8&&lazyImages===0?15:0))
  const media=clamp(100-(images.length?Math.round(missingAlt/images.length*60):0)-(images.length>5&&lazyImages===0?20:0))
  const trust=clamp(100-(!https?55:0)-((4-security)*8)-(!schema?10:0)-(forms>0&&labels===0?20:0))
  const categories={Metadata:metadata,Structure:structure,Crawlability:crawlability,Mobile:mobile,Media:media,Trust:trust}
  const score=clamp(metadata*.2+structure*.18+crawlability*.2+mobile*.14+media*.12+trust*.16)
  let estimate
  if(score<45)estimate={price:3200,label:'Technical recovery + rebuild',effort:'3–6 weeks'}
  else if(score<70)estimate={price:1850,label:'SEO remediation sprint',effort:'2–3 weeks'}
  else if(score<85)estimate={price:950,label:'Optimization sprint',effort:'1–2 weeks'}
  else estimate={price:500,label:'Conversion polish',effort:'3–5 business days'}
  const weight={high:0,medium:1,low:2}
  return {url:finalUrl,score,categories,issues:issues.sort((a,b)=>weight[a.severity]-weight[b.severity]).slice(0,10),estimate,summary:`We checked ${images.length} images, ${h1s+h2s} primary headings and the page’s public response signals in ${(duration/1000).toFixed(1)} seconds.`,checks:{title,descriptionLength:description.length,h1s,h2s,imageCount:images.length,missingAlt,robotsOk,sitemapOk,https}}
}

export default async function handler(req,res){
  if(req.method!=='POST')return res.status(405).json({error:'Method not allowed.'})
  try{
    const input=String(req.body?.url||'').trim().slice(0,500)
    const keyword=String(req.body?.keyword||'').trim().slice(0,140)
    const location=String(req.body?.location||'').trim().slice(0,100)
    if(!input)return res.status(400).json({error:'A website URL is required.'})
    const started=Date.now(); const {response,finalUrl}=await safeFetch(input)
    if(!response.ok)throw new Error(`The website returned HTTP ${response.status}.`)
    const type=response.headers.get('content-type')||''
    if(!type.includes('text/html')&&!type.includes('application/xhtml'))throw new Error('That URL did not return an HTML webpage.')
    const length=Number(response.headers.get('content-length')||0)
    if(length>2_500_000)throw new Error('That page is too large for the free preview.')
    const html=(await response.text()).slice(0,2_500_000)
    const origin=new URL(finalUrl).origin
    const probes=await Promise.allSettled([safeFetch(`${origin}/robots.txt`,{headers:{Accept:'text/plain'}}),safeFetch(`${origin}/sitemap.xml`,{headers:{Accept:'application/xml,text/xml'}})])
    const robotsOk=probes[0].status==='fulfilled'&&probes[0].value.response.ok
    const sitemapOk=probes[1].status==='fulfilled'&&probes[1].value.response.ok
    const ranking=await checkGooglePosition(new URL(finalUrl).hostname,keyword,location)
    return res.status(200).json({...analyze(html,response.headers,finalUrl,robotsOk,sitemapOk,Date.now()-started),ranking})
  }catch(error){return res.status(422).json({error:error.message||'We could not audit that website.'})}
}
