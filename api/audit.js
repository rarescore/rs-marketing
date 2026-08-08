import dns from 'node:dns/promises';
import net from 'node:net';

const PRIVATE_V4=[/^10\./,/^127\./,/^169\.254\./,/^192\.168\./,/^0\./,/^224\./,/^255\./,/^172\.(1[6-9]|2\d|3[01])\./,/^100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\./];
const PRIVATE_V6=[/^::1$/,/^::$/,/^f[cd]/i,/^fe[89ab]/i,/^::ffff:(10\.|127\.|169\.254\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/i];
const clamp=n=>Math.max(0,Math.min(100,Math.round(Number(n)||0)));

function isPrivate(address){const v=net.isIP(address);if(!v)return true;return(v===4?PRIVATE_V4:PRIVATE_V6).some(r=>r.test(address))}
async function validateTarget(input){
  let url;try{url=new URL(/^https?:\/\//i.test(input)?input:`https://${input}`)}catch{throw new Error('Enter a valid public website URL.')}
  if(!['http:','https:'].includes(url.protocol)||url.username||url.password)throw new Error('Only public HTTP and HTTPS websites are supported.');
  if(url.port&&!['80','443'].includes(url.port))throw new Error('Custom ports are not supported.');
  const host=url.hostname.toLowerCase();
  if(host==='localhost'||host.endsWith('.local')||host.endsWith('.internal')||host.endsWith('.localhost'))throw new Error('Private network targets are not allowed.');
  const records=await dns.lookup(host,{all:true,verbatim:true});
  if(!records.length||records.some(r=>isPrivate(r.address)))throw new Error('Private network targets are not allowed.');
  return url;
}
async function safeFetch(input,options={},redirects=0){
  const url=await validateTarget(input.toString());
  const response=await fetch(url,{...options,redirect:'manual',signal:AbortSignal.timeout(12000),headers:{'User-Agent':'LGGrowthStudioAudit/2.0',Accept:'text/html,application/xhtml+xml,text/plain;q=.8',...(options.headers||{})}});
  if([301,302,303,307,308].includes(response.status)&&response.headers.get('location')){
    if(redirects>=4)throw new Error('The website redirected too many times.');
    return safeFetch(new URL(response.headers.get('location'),url),options,redirects+1);
  }
  return{response,finalUrl:url.toString()};
}
const attr=(tag,name)=>tag.match(new RegExp(`\\s${name}=["']([^"']*)["']`,'i'))?.[1]??null;
const has=(html,re)=>re.test(html);
const count=(html,re)=>(html.match(re)||[]).length;
const capture=(html,re)=>(html.match(re)?.[1]||'').replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();
const metaContent=(html,name)=>{const tags=html.match(/<meta\b[^>]*>/gi)||[];const tag=tags.find(x=>(attr(x,'name')||'').toLowerCase()===name.toLowerCase());return tag?(attr(tag,'content')||'').trim():''};
const issue=(severity,title,detail,fix)=>({severity,title,detail,fix});

async function runPageSpeed(url){
  const key=process.env.PAGESPEED_API_KEY?`&key=${encodeURIComponent(process.env.PAGESPEED_API_KEY)}`:'';
  const endpoint=`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile&category=performance&category=accessibility&category=best-practices&category=seo${key}`;
  const response=await fetch(endpoint,{signal:AbortSignal.timeout(45000)});
  if(!response.ok)throw new Error('Google Lighthouse could not complete the mobile test.');
  const data=await response.json();
  const cats=data.lighthouseResult?.categories||{};
  const audits=data.lighthouseResult?.audits||{};
  const value=id=>clamp((cats[id]?.score??0)*100);
  const metric=id=>audits[id]?.displayValue||null;
  return{
    performance:value('performance'),
    accessibility:value('accessibility'),
    bestPractices:value('best-practices'),
    seo:value('seo'),
    metrics:{lcp:metric('largest-contentful-paint'),cls:metric('cumulative-layout-shift'),tbt:metric('total-blocking-time'),speedIndex:metric('speed-index')},
    raw:data
  };
}

function analyzeHtml(html,headers,finalUrl,robotsOk,sitemapOk){
  const title=capture(html,/<title[^>]*>([\s\S]*?)<\/title>/i),description=metaContent(html,'description');
  const h1s=count(html,/<h1\b[^>]*>/gi),h2s=count(html,/<h2\b[^>]*>/gi);
  const images=html.match(/<img\b[^>]*>/gi)||[];
  const missingAlt=images.filter(tag=>attr(tag,'alt')===null).length;
  const lazyImages=images.filter(tag=>(attr(tag,'loading')||'').toLowerCase()==='lazy').length;
  const canonical=has(html,/<link[^>]+rel=["'][^"']*canonical[^"']*["'][^>]*>/i),viewport=has(html,/<meta[^>]+name=["']viewport["']/i),schema=has(html,/<script[^>]+type=["']application\/ld\+json["']/i),og=has(html,/<meta[^>]+property=["']og:title["']/i)&&has(html,/<meta[^>]+property=["']og:description["']/i),lang=has(html,/<html[^>]+lang=["'][^"']+["']/i),noindex=has(html,/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i);
  const https=finalUrl.startsWith('https://'),security=['content-security-policy','strict-transport-security','x-content-type-options','referrer-policy'].filter(h=>headers.get(h)).length;
  const issues=[];
  if(!title)issues.push(issue('high','Missing search title','Google cannot find the main title normally shown in search results.','Add a specific title that names the service, business and location when useful.'));
  else if(title.length<30||title.length>65)issues.push(issue('medium','Search title length needs work',`The page title is ${title.length} characters.`,`Keep the main title near 45–60 characters and make the page topic obvious.`));
  if(!description)issues.push(issue('medium','Missing search description','Google may pull random text from the page.','Add a specific 120–160 character meta description.'));
  if(h1s===0)issues.push(issue('high','No clear main page heading','The page does not have one primary heading that defines its topic.','Add one clear H1 and organize supporting sections beneath it.'));
  if(h1s>1)issues.push(issue('medium','Too many main headings',`${h1s} H1 headings were detected.`,`Keep one H1 and use H2/H3 headings below it.`));
  if(!canonical)issues.push(issue('medium','Canonical URL is missing','Search engines may treat similar URLs as separate pages.','Add a canonical link for the preferred page URL.'));
  if(noindex)issues.push(issue('high','Page is set to noindex','The page asks search engines not to include it in results.','Remove noindex if this page should be discoverable.'));
  if(!viewport)issues.push(issue('high','Mobile viewport is missing','The page may render incorrectly on phones.','Add a valid viewport meta tag and test common phone widths.'));
  if(images.length&&missingAlt)issues.push(issue(missingAlt/images.length>.4?'high':'medium','Images lack text alternatives',`${missingAlt} of ${images.length} images have no alt attribute.`,`Add accurate alt text to meaningful images and empty alt text to decorative images.`));
  if(images.length>5&&lazyImages===0)issues.push(issue('low','Images may load too early',`${images.length} images were found without native lazy loading.`,`Lazy-load noncritical images and preserve image dimensions.`));
  if(!schema)issues.push(issue('low','Structured data is missing','Search engines receive less organized information about the page.','Add accurate Organization, LocalBusiness, Service or page-specific schema.'));
  if(!og)issues.push(issue('low','Social sharing metadata is incomplete','Shared links may use random text or images.','Add Open Graph title, description and image tags.'));
  if(!lang)issues.push(issue('medium','Document language is missing','Browsers and assistive technology receive less context.','Set a valid lang attribute on the HTML element.'));
  if(!https)issues.push(issue('high','HTTPS is not enabled','Visitors and browsers receive an insecure connection.','Redirect all traffic to HTTPS.'));
  if(security<2)issues.push(issue('low','Security headers are limited',`${security} of 4 common response headers were detected.`,`Review CSP, HSTS, content-type and referrer policies.`));
  if(!robotsOk)issues.push(issue('low','robots.txt was not confirmed','Search crawlers may not have a central crawl policy.','Publish a valid robots.txt and reference the sitemap.'));
  if(!sitemapOk)issues.push(issue('low','XML sitemap was not confirmed','Search engines may discover important URLs less efficiently.','Publish and submit a canonical XML sitemap.'));
  const technical=clamp(100-(!title?24:0)-(!description?16:0)-(h1s===0?18:0)-(h1s>1?8:0)-(!canonical?10:0)-(noindex?40:0)-(!viewport?18:0)-(!schema?6:0)-(!og?4:0));
  const trust=clamp(100-(!https?50:0)-((4-security)*7)-(!lang?8:0));
  const media=clamp(100-(images.length?Math.round(missingAlt/images.length*55):0)-(images.length>5&&lazyImages===0?15:0));
  return{issues,technical,trust,media,checks:{title,descriptionLength:description.length,h1s,h2s,imageCount:images.length,missingAlt,robotsOk,sitemapOk,https}};
}

export default async function handler(req,res){
  if(req.method!=='POST')return res.status(405).json({error:'Method not allowed.'});
  try{
    const input=String(req.body?.url||'').trim().slice(0,500);if(!input)return res.status(400).json({error:'A website URL is required.'});
    const started=Date.now();
    const{response,finalUrl}=await safeFetch(input);
    if(!response.ok)throw new Error(`The website returned HTTP ${response.status}.`);
    const type=response.headers.get('content-type')||'';if(!type.includes('text/html')&&!type.includes('application/xhtml'))throw new Error('That URL did not return an HTML webpage.');
    const html=(await response.text()).slice(0,2_500_000),origin=new URL(finalUrl).origin;
    const probes=await Promise.allSettled([safeFetch(`${origin}/robots.txt`,{headers:{Accept:'text/plain'}}),safeFetch(`${origin}/sitemap.xml`,{headers:{Accept:'application/xml,text/xml'}})]);
    const robotsOk=probes[0].status==='fulfilled'&&probes[0].value.response.ok,sitemapOk=probes[1].status==='fulfilled'&&probes[1].value.response.ok;
    const htmlResult=analyzeHtml(html,response.headers,finalUrl,robotsOk,sitemapOk);
    let lighthouse=null;try{lighthouse=await runPageSpeed(finalUrl)}catch{}
    const categories=lighthouse?{
      Performance:lighthouse.performance,
      SEO:lighthouse.seo,
      Accessibility:lighthouse.accessibility,
      'Best practices':lighthouse.bestPractices,
      Technical:htmlResult.technical,
      Trust:htmlResult.trust,
      Media:htmlResult.media
    }:{Technical:htmlResult.technical,Trust:htmlResult.trust,Media:htmlResult.media};
    const score=lighthouse?clamp(lighthouse.performance*.28+lighthouse.seo*.22+lighthouse.accessibility*.12+lighthouse.bestPractices*.10+htmlResult.technical*.16+htmlResult.trust*.07+htmlResult.media*.05):clamp(htmlResult.technical*.55+htmlResult.trust*.25+htmlResult.media*.20);
    const perfIssues=[];
    if(lighthouse){
      if(lighthouse.performance<50)perfIssues.push(issue('high','Mobile performance is poor',`Google Lighthouse scored mobile performance at ${lighthouse.performance}/100${lighthouse.metrics.lcp?` with LCP ${lighthouse.metrics.lcp}`:''}.`,'Reduce render-blocking work, image weight and JavaScript execution.'));
      else if(lighthouse.performance<80)perfIssues.push(issue('medium','Mobile performance can improve',`Google Lighthouse scored mobile performance at ${lighthouse.performance}/100.`,'Prioritize the largest image, reduce unused code and delay noncritical scripts.'));
      if(lighthouse.accessibility<85)perfIssues.push(issue('medium','Accessibility needs attention',`Lighthouse scored accessibility at ${lighthouse.accessibility}/100.`,'Fix contrast, labels, landmarks and keyboard interaction issues identified by Lighthouse.'));
      if(lighthouse.seo<90)perfIssues.push(issue('medium','Lighthouse found SEO issues',`Google Lighthouse scored SEO at ${lighthouse.seo}/100.`,'Review crawlability, metadata, links and mobile usability checks.'));
      if(lighthouse.bestPractices<85)perfIssues.push(issue('medium','Browser best practices need work',`Lighthouse scored best practices at ${lighthouse.bestPractices}/100.`,'Resolve console errors, insecure resources and outdated browser patterns.'));
    }
    const weight={high:0,medium:1,low:2};
    const issues=[...perfIssues,...htmlResult.issues].sort((a,b)=>weight[a.severity]-weight[b.severity]).slice(0,12);
    const weights=lighthouse?{Performance:.28,SEO:.22,Accessibility:.12,'Best practices':.10,Technical:.16,Trust:.07,Media:.05}:{Technical:.55,Trust:.25,Media:.20};
    return res.status(200).json({url:finalUrl,score,categories,weights,issues,metrics:lighthouse?.metrics||null,checks:htmlResult.checks,source:lighthouse?'Google PageSpeed Insights + LG technical analysis':'LG technical analysis',summary:`Real public-page analysis completed in ${((Date.now()-started)/1000).toFixed(1)} seconds${lighthouse?' using Google Lighthouse mobile data':''}.`});
  }catch(error){return res.status(422).json({error:error.message||'We could not audit that website.'})}
}
