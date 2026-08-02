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
  if(!title)issues.push(issue('high','The page has no title element','Search results and browser tabs lack a primary page label.','Write a unique, specific title around 45–60 characters.'))
  else if(title.length<30||title.length>65)issues.push(issue('medium','The title length is unlikely to scan well',`The title is ${title.length} characters: “${title.slice(0,90)}”.`,'Rewrite it to communicate page topic and brand clearly within roughly 45–60 characters.'))
  if(!description)issues.push(issue('medium','No meta description was detected','Search engines may assemble an unpredictable snippet from page copy.','Add a unique description that sets context and earns the click without repeating the title.'))
  else if(description.length<90||description.length>170)issues.push(issue('low','Meta description length can be improved',`The detected description is ${description.length} characters.`,'Aim for a useful, specific summary around 120–160 characters.'))
  if(h1s===0)issues.push(issue('high','No primary H1 was detected','The page hierarchy does not expose a clear primary topic.','Add one visible, descriptive H1 that matches the page’s purpose.'))
  if(h1s>1)issues.push(issue('medium','Multiple H1 headings were detected',`${h1s} H1 elements make the primary page topic less explicit.`,'Keep one dominant H1 and move subsections to H2/H3 levels.'))
  if(!canonical)issues.push(issue('medium','No canonical URL was detected','Duplicate URL variants can compete or split signals.','Add a self-referencing canonical to the preferred public URL.'))
  if(noindex)issues.push(issue('high','The page asks search engines not to index it','A robots noindex directive was detected.','Confirm this is intentional; remove the directive if this page should appear in search.'))
  if(!viewport)issues.push(issue('high','No mobile viewport directive was detected','Mobile browsers may render the page at a desktop width.','Add a responsive viewport meta tag and verify the layout on real phones.'))
  if(images.length&&missingAlt)issues.push(issue(missingAlt/images.length>.4?'high':'medium','Images are missing alternative text',`${missingAlt} of ${images.length} image tags have no alt attribute.`,'Add meaningful alt text to informative images and empty alt attributes to decorative images.'))
  if(images.length>5&&lazyImages===0)issues.push(issue('low','Below-the-fold images may load too early',`${images.length} images were found and none explicitly use native lazy loading.`,'Lazy-load non-critical images and preserve explicit dimensions to reduce page work.'))
  if(!schema)issues.push(issue('low','No JSON-LD structured data was detected','Search engines receive less explicit entity and page context.','Add only schema types that match visible, truthful page content.'))
  if(!og)issues.push(issue('low','Social sharing metadata is incomplete','Shared links may use unpredictable copy or imagery.','Add Open Graph title, description and image metadata.'))
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
    return res.status(200).json(analyze(html,response.headers,finalUrl,robotsOk,sitemapOk,Date.now()-started))
  }catch(error){return res.status(422).json({error:error.message||'We could not audit that website.'})}
}
