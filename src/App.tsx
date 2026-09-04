import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Nav from './components/Nav'
import Hero from './components/Hero'
import { Areas, Contact, Footer, Process, Reviews, Services, Story, TrustStrip } from './components/Sections'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((element) => {
        gsap.fromTo(element, { y: 42, opacity: 0 }, {
          y: 0, opacity: 1, duration: .9, ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        })
      })
    })
    return () => context.revert()
  }, [])

  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <TrustStrip />
        <Services />
        <Story />
        <Process />
        <Reviews />
        <Areas />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
