import { lazy, Suspense, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowDown, ArrowUpRight, Phone } from 'lucide-react'
import { company } from '../data/site'
import { useHeroProgress } from '../hooks/useHeroProgress'
import Logo from './Logo'

const PipeScene = lazy(() => import('./scene/PipeScene'))

function OpeningSequence() {
  const root = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const context = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(root.current, { display: 'none' })
        return
      }
      const timeline = gsap.timeline({ defaults: { ease: 'power4.inOut' } })
      timeline
        .fromTo('.opening__mark', { scale: .84, opacity: 0 }, { scale: 1, opacity: 1, duration: .8, ease: 'power3.out' })
        .to('.opening__seam', { scaleY: 1, duration: .55 }, '-=.25')
        .to('.opening__left', { xPercent: -102, duration: 1.25 }, '+=.22')
        .to('.opening__right', { xPercent: 102, duration: 1.25 }, '<')
        .to('.opening__mark', { opacity: 0, scale: 1.08, duration: .35 }, '<')
        .to(root.current, { autoAlpha: 0, display: 'none', duration: .25 })
    }, root)
    return () => context.revert()
  }, [])

  return (
    <div className="opening" ref={root} aria-hidden="true">
      <div className="opening__half opening__left" />
      <div className="opening__half opening__right" />
      <div className="opening__seam" />
      <div className="opening__mark"><Logo /><span>Los Angeles · 24/7</span></div>
    </div>
  )
}

export default function Hero() {
  const progress = useHeroProgress()
  const stage = progress < .23 ? 'Diagnose' : progress < .58 ? 'Clear' : 'Restore'
  const stageNumber = progress < .23 ? '01' : progress < .58 ? '02' : '03'

  return (
    <>
      <OpeningSequence />
      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero__stage">
          <Suspense fallback={<div className="scene scene-fallback" />}><PipeScene progress={progress} /></Suspense>
          <div className="hero__noise" />
          <div className="hero__content">
            <p className="eyebrow"><span>Greater Los Angeles</span><span>24 hours · 7 days</span></p>
            <h1 id="hero-title">We get to the <em>root</em> of it.</h1>
            <p className="hero__lead">25+ years of experience solving plumbing, drain and sewer problems with modern diagnostics and clean workmanship.</p>
            <div className="hero__actions">
              <a className="button button--primary" href={company.phoneHref}><Phone size={18} /> Call for immediate help</a>
              <a className="button button--ghost" href="#quote">Get a free estimate <ArrowUpRight size={18} /></a>
            </div>
          </div>
          <div className="hero__readout" aria-live="polite">
            <span>{stageNumber}</span><p>{stage}<small>Line status</small></p><i style={{ transform: `scaleX(${Math.max(.035, progress)})` }} />
          </div>
          <a className="hero__scroll" href="#services"><ArrowDown size={17} /> Scroll to clear the line</a>
          <span className="hero__meter" style={{ transform: `scaleY(${progress})` }} />
        </div>
      </section>
    </>
  )
}
