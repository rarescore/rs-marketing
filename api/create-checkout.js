const priceMap={foundation:'STRIPE_PRICE_FOUNDATION',growth:'STRIPE_PRICE_GROWTH',custom:'STRIPE_PRICE_CUSTOM',website:'STRIPE_PRICE_WEBSITE',deposit:'STRIPE_PRICE_DEPOSIT'}

export default async function handler(req,res){
  if(req.method!=='POST')return res.status(405).json({error:'Method not allowed.'})
  const plan=String(req.body?.plan||'')
  const priceId=process.env[priceMap[plan]]
  if(!process.env.STRIPE_SECRET_KEY||!priceId)return res.status(200).json({needsSetup:true})
  const origin=`${req.headers['x-forwarded-proto']||'https'}://${req.headers.host}`
  const params=new URLSearchParams({mode:['website','deposit'].includes(plan)?'payment':'subscription','line_items[0][price]':priceId,'line_items[0][quantity]':'1',success_url:`${origin}/build-website?checkout=success&plan=${plan}`,cancel_url:`${origin}/build-website?checkout=cancelled&plan=${plan}`,'billing_address_collection':'required','allow_promotion_codes':'true'})
  const response=await fetch('https://api.stripe.com/v1/checkout/sessions',{method:'POST',headers:{Authorization:`Bearer ${process.env.STRIPE_SECRET_KEY}`,'Content-Type':'application/x-www-form-urlencoded'},body:params})
  const data=await response.json()
  if(!response.ok)return res.status(502).json({error:data.error?.message||'Checkout could not be created.'})
  return res.status(200).json({url:data.url})
}
