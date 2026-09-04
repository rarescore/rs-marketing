import { FormEvent, useState } from 'react'
import { ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { company, services } from '../data/site'

export default function QuoteForm() {
  const [sent, setSent] = useState(false)

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const subject = `Service request: ${data.get('service')}`
    const body = [
      `Name: ${data.get('name')}`,
      `Phone: ${data.get('phone')}`,
      `Email: ${data.get('email')}`,
      `Service: ${data.get('service')}`,
      '',
      `Details: ${data.get('details')}`,
    ].join('\n')
    setSent(true)
    window.location.href = `${company.emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <form className="quote-form" onSubmit={submit}>
      <div className="field"><label htmlFor="name">Your name</label><input id="name" name="name" placeholder="Full name" required /></div>
      <div className="field"><label htmlFor="phone">Phone number</label><input id="phone" name="phone" type="tel" placeholder="(818) 555-0123" required /></div>
      <div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" placeholder="you@example.com" required /></div>
      <div className="field"><label htmlFor="service">What do you need?</label><select id="service" name="service" defaultValue="Drain Cleaning & Rooter"><option>Emergency plumbing</option>{services.map((service) => <option key={service.title}>{service.title}</option>)}</select></div>
      <div className="field field--full"><label htmlFor="details">Tell us what is happening</label><textarea id="details" name="details" placeholder="A few details help us arrive prepared." rows={4} /></div>
      <button className="button button--dark" type="submit">Prepare my request <ArrowUpRight size={18} /></button>
      <p className={sent ? 'form-note form-note--shown' : 'form-note'}><CheckCircle2 size={16} /> Your email app is opening with the request ready to send.</p>
    </form>
  )
}
