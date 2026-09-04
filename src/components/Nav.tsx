import { useEffect, useState } from 'react'
import { Menu, Phone, X } from 'lucide-react'
import Logo from './Logo'
import { company } from '../data/site'

const links = [
  ['Services', '#services'], ['Why Extreme', '#story'], ['Process', '#process'], ['Reviews', '#reviews'], ['Areas', '#areas'],
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <a className="skip-link" href="#main">Skip to content</a>
      <a href="#top" aria-label="Extreme Plumbing & Rooter home"><Logo /></a>
      <nav className={open ? 'nav__links nav__links--open' : 'nav__links'} aria-label="Primary navigation">
        {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
        <a className="nav__call nav__call--mobile" href={company.phoneHref}><Phone size={16} /> Call 24/7</a>
      </nav>
      <div className="nav__actions">
        <span><i /> Available 24/7</span>
        <a className="nav__call" href={company.phoneHref}><Phone size={16} /> {company.phone}</a>
        <button className="nav__menu" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  )
}
