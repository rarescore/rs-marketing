const clean=(v,n=200)=>String(v||'').trim().slice(0,n)

export default async function handler(req,res){
  if(req.method!=='POST')return res.status(405).json({error:'Method not allowed.'})
  const body=req.body||{}
  if(body.company_url)return res.status(200).json({ok:true})
  const name=clean(body.name,100), email=clean(body.email,200), company=clean(body.company,150), details=clean(body.details,5000)
  if(!name||!company||!details||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return res.status(400).json({error:'Complete the required contact fields.'})
  if(!process.env.RESEND_API_KEY)return res.status(200).json({ok:false,needsSetup:true})
  const text=`New RS Marketing project inquiry\n\nName: ${name}\nEmail: ${email}\nPhone: ${clean(body.phone,50)}\nCompany: ${company}\nWebsite: ${clean(body.website,500)}\nNeed: ${clean(body.need,150)}\nBudget: ${clean(body.budget,100)}\nSource: ${clean(body.source,500)}\n\nProject details:\n${details}`
  const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({from:'RS Marketing Website <inquiries@rsmarketing.com>',to:['hello.rarescore@gmail.com'],reply_to:email,subject:`Project inquiry: ${company}`,text})})
  if(!response.ok)return res.status(502).json({error:'Email delivery is temporarily unavailable.'})
  return res.status(200).json({ok:true})
}
