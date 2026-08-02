import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import Logo from './Logo'
import CursorMist from './CursorMist'
import { nav } from '../data'

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  useEffect(() => { scrollTo({ top: 0, behavior: 'instant' }) }, [location.pathname])
  useEffect(() => { const onScroll=()=>setScrolled(scrollY>24); addEventListener('scroll',onScroll,{passive:true}); return()=>removeEventListener('scroll',onScroll) }, [])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow='' } }, [open])
  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav-shell">
        <Logo />
        <nav className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Main navigation">
          {nav.map(([label, href]) => <NavLink key={href} to={href} onClick={()=>setOpen(false)} className={({isActive})=>isActive?'active':''}>{label}</NavLink>)}
          <Link className="button button-small button-acid nav-cta" to="/contact" onClick={()=>setOpen(false)}>Start a project <ArrowUpRight size={16}/></Link>
        </nav>
        <button className="menu-toggle" onClick={()=>setOpen(!open)} aria-label={open?'Close menu':'Open menu'} aria-expanded={open}>{open?<X/>:<Menu/>}</button>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-lead wrap">
        <p className="eyebrow">One clear next step</p>
        <h2>Let’s make your business<br/><i>easier to choose.</i></h2>
        <Link to="/contact" className="circle-link" aria-label="Start a project"><ArrowUpRight/></Link>
      </div>
      <div className="footer-grid wrap">
        <div><Logo light/><p>Clear marketing. Better signals.<br/>More chances to be chosen.</p></div>
        <div><h3>Explore</h3>{nav.map(([l,h])=><Link key={h} to={h}>{l}</Link>)}</div>
        <div><h3>Services</h3><Link to="/services#creative">Creative studio</Link><Link to="/services#paid">Paid growth</Link><Link to="/services#search">SEO & local</Link><Link to="/services#web">Websites</Link></div>
        <div><h3>Start a conversation</h3><a href="mailto:hello.rarescore@gmail.com">hello.rarescore@gmail.com</a><span>Remote studio · Serving U.S. businesses</span></div>
      </div>
      <div className="footer-bottom wrap"><span>© {new Date().getFullYear()} Rare Score Marketing</span><div><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link></div></div>
    </footer>
  )
}

export default function Layout({ children }) {
  return <><CursorMist/><Header/><main id="main-content">{children}</main><Footer/></>
}
