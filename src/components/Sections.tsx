import { ArrowRight, ArrowUpRight, Check, MapPin, Phone, Quote, ScanLine, ShieldCheck, TimerReset, Wrench } from 'lucide-react'
import { company, serviceAreas, services, testimonials } from '../data/site'
import QuoteForm from './QuoteForm'
import Logo from './Logo'

export function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Service highlights">
      <span><TimerReset /> Emergency service</span><span><ShieldCheck /> Licensed &amp; insured</span><span><Wrench /> 25+ years of experience</span><span><MapPin /> Greater LA County</span>
    </section>
  )
}

export function Services() {
  return (
    <section className="section services" id="services" aria-labelledby="services-title">
      <div className="section-heading reveal">
        <p className="eyebrow">What we solve</p>
        <h2 id="services-title">One team.<br /><em>Every line.</em></h2>
        <p>From the fixture you can see to the sewer line you cannot, our technicians diagnose the problem and explain the repair.</p>
      </div>
      <div className="services__grid">
        {services.map((service, index) => {
          const Icon = service.icon
          return (
            <article className={`service-card reveal ${service.featured ? 'service-card--featured' : ''}`} key={service.title}>
              <div><span>{String(index + 1).padStart(2, '0')}</span><Icon /></div>
              <p>{service.short}</p><h3>{service.title}</h3><small>{service.description}</small>
              <a href="#quote" aria-label={`Request ${service.title}`}>Request service <ArrowUpRight size={16} /></a>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export function Story() {
  return (
    <section className="story" id="story" aria-labelledby="story-title">
      <div className="story__number reveal"><span>Since</span><strong>1997</strong><p>Built in Los Angeles.<br />Passed down with care.</p></div>
      <div className="story__copy reveal">
        <p className="eyebrow">The Extreme story</p>
        <h2 id="story-title">A trade learned <em>side by side.</em></h2>
        <p>Extreme Plumbing &amp; Rooter began when the owner was a teenager helping his father after school and during vacations. They worked together across plumbing and construction, building the practical knowledge that still drives the company today.</p>
        <p>By 2016, he had taken full control of the business. Today, the team trains every week, works with modern equipment, and stays ready around the clock—always aiming to solve the problem with the least expense possible.</p>
        <div className="story__checks">
          <span><Check /> Honest explanations</span><span><Check /> Quality materials</span><span><Check /> State-of-the-art tools</span><span><Check /> Safety-first work</span>
        </div>
      </div>
    </section>
  )
}

const steps = [
  { icon: Phone, label: 'Call', title: 'Tell us what happened', copy: 'We are available 24 hours a day for urgent plumbing and drain problems.' },
  { icon: ScanLine, label: 'Diagnose', title: 'Find the real cause', copy: 'Professional assessment and camera technology help us locate the trouble precisely.' },
  { icon: Wrench, label: 'Repair', title: 'Fix it cleanly', copy: 'We explain the work, use quality materials and keep disruption to a minimum.' },
  { icon: ShieldCheck, label: 'Confirm', title: 'Check the full system', copy: 'Before we leave, we verify performance and make sure you know what comes next.' },
]

export function Process() {
  return (
    <section className="section process" id="process" aria-labelledby="process-title">
      <div className="process__intro reveal"><p className="eyebrow">How we work</p><h2 id="process-title">From panic<br />to <em>handled.</em></h2><p>A clear, four-part response designed to keep you informed from the first call through the final check.</p></div>
      <div className="process__steps">
        {steps.map((step, index) => {
          const Icon = step.icon
          return <article className="process-step reveal" key={step.label}><div><span>0{index + 1}</span><Icon /></div><p>{step.label}</p><h3>{step.title}</h3><small>{step.copy}</small>{index < steps.length - 1 && <ArrowRight className="process-step__arrow" />}</article>
        })}
      </div>
    </section>
  )
}

export function Reviews() {
  return (
    <section className="reviews" id="reviews" aria-labelledby="reviews-title">
      <div className="reviews__header reveal"><p className="eyebrow">Customer stories</p><h2 id="reviews-title">Fast work.<br /><em>Human service.</em></h2><div><strong>100+</strong><span>customer reviews<br />and recommendations</span></div></div>
      <div className="reviews__track">
        {testimonials.map((testimonial) => (
          <blockquote className="review-card reveal" key={testimonial.name}>
            <Quote /><p>“{testimonial.quote}”</p><footer><strong>{testimonial.name}</strong><span>{testimonial.context}</span></footer>
          </blockquote>
        ))}
      </div>
    </section>
  )
}

export function Areas() {
  return (
    <section className="section areas" id="areas" aria-labelledby="areas-title">
      <div className="section-heading reveal"><p className="eyebrow">Service area</p><h2 id="areas-title">All across<br /><em>Greater LA.</em></h2><p>Based in Van Nuys and serving homes and businesses throughout the San Fernando Valley and Los Angeles County.</p></div>
      <div className="areas__grid reveal">{serviceAreas.map((area, index) => <span key={area}><i>{String(index + 1).padStart(2, '0')}</i>{area}<MapPin size={15} /></span>)}</div>
    </section>
  )
}

export function Contact() {
  return (
    <section className="contact" id="quote" aria-labelledby="quote-title">
      <div className="contact__copy reveal"><p className="eyebrow">Need plumbing assistance?</p><h2 id="quote-title">Let’s get it <em>flowing.</em></h2><p>Tell us what you are dealing with. For urgent problems, call now for the fastest response.</p><a className="contact__phone" href={company.phoneHref}><Phone /><span>24/7 service line<small>{company.phone}</small></span></a><span className="contact__or">or request an estimate</span></div>
      <QuoteForm />
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__lead"><Logo /><h2>Los Angeles plumbing,<br /><em>without the runaround.</em></h2></div>
      <div className="footer__grid">
        <div><strong>Contact</strong><a href={company.phoneHref}>{company.phone}</a><a href={company.secondaryPhoneHref}>{company.secondaryPhone}</a><a href={company.emailHref}>{company.email}</a></div>
        <div><strong>Visit</strong><p>{company.address}</p><span>Serving Greater Los Angeles County</span></div>
        <div><strong>Explore</strong><a href="#services">Services</a><a href="#story">Our story</a><a href="#reviews">Reviews</a><a href="#areas">Service areas</a></div>
        <a className="footer__cta" href={company.phoneHref}>Call now <ArrowUpRight /></a>
      </div>
      <div className="footer__bottom"><span>© 2026 Extreme Plumbing &amp; Rooter</span><span>24 hours · 7 days · 365 days</span><a href="#top">Back to top ↑</a></div>
    </footer>
  )
}
