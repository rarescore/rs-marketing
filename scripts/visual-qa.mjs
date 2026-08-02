import fs from 'node:fs/promises'
import chromium from '@sparticuz/chromium'
import puppeteer from 'puppeteer-core'

const base = process.env.QA_URL || 'http://127.0.0.1:4173'
const routes = ['/', '/services', '/pricing', '/audit', '/insights', '/insights/creative-testing-without-content-chaos', '/contact', '/privacy', '/not-a-route']
const viewports = [{ name:'mobile', width:390, height:844, deviceScaleFactor:1 }, { name:'desktop', width:1440, height:1000, deviceScaleFactor:1 }]
await fs.mkdir('.qa', { recursive:true })
const browser = await puppeteer.launch({ args:chromium.args, defaultViewport:null, executablePath:await chromium.executablePath(), headless:'shell' })
const report=[]
for (const vp of viewports) {
  const page=await browser.newPage(); await page.setViewport(vp)
  const errors=[]; page.on('console',m=>{if(m.type()==='error')errors.push(m.text())}); page.on('pageerror',e=>errors.push(e.message))
  for (const route of routes) {
    const response=await page.goto(`${base}${route}`,{waitUntil:'networkidle0',timeout:30000})
    await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=600){globalThis.scrollTo(0,y);await new Promise(resolve=>setTimeout(resolve,25))}globalThis.scrollTo(0,0)})
    await new Promise(resolve=>setTimeout(resolve,100))
    const metrics=await page.evaluate(()=>{const vw=document.documentElement.clientWidth;const clipped=el=>{for(let p=el.parentElement;p&&p!==document.body;p=p.parentElement){if(['auto','scroll','hidden','clip'].includes(globalThis.getComputedStyle(p).overflowX))return true}return false};const raw=[...document.querySelectorAll('*')].map(el=>({el,rect:el.getBoundingClientRect()})).filter(x=>!clipped(x.el)&&(x.rect.right>vw+1||x.rect.left < -1));return {title:document.title,h1:document.querySelectorAll('h1').length,overflow:raw.reduce((max,x)=>Math.max(max,x.rect.right-vw,-x.rect.left),0),broken:[...document.images].filter(i=>i.complete&&!i.naturalWidth).length,main:!!document.querySelector('main'),offenders:raw.slice(0,8).map(x=>({tag:x.el.tagName,class:x.el.className?.toString().slice(0,100),left:Math.round(x.rect.left),right:Math.round(x.rect.right),text:x.el.textContent?.trim().slice(0,80)}))}})
    report.push({viewport:vp.name,route,status:response?.status(),...metrics,errors:[...errors]}); errors.length=0
    if (route==='/' || route==='/pricing' || route==='/audit') await page.screenshot({path:`.qa/${vp.name}-${route==='/'?'home':route.slice(1)}.png`,fullPage:true})
  }
  await page.close()
}
await browser.close()
await fs.writeFile('.qa/report.json',JSON.stringify(report,null,2))
const failures=report.filter(x=>![200,304].includes(x.status)||x.h1!==1||x.overflow>1||x.broken||!x.main||x.errors.length)
console.log(JSON.stringify({pages:report.length,failures,passed:!failures.length},null,2))
if(failures.length)process.exitCode=1
