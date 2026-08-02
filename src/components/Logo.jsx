import { Link } from 'react-router-dom'

export function Mark({ size = 42 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" className="logo-mark">
      <rect x="1" y="1" width="46" height="46" rx="13" fill="currentColor" />
      <path d="M10 34V14h12.4c6.1 0 9.6 2.7 9.6 7.2 0 2.7-1.3 4.8-3.8 6.1L38 36h-9.1l-7.2-6.8h-4V36H10Zm7.7-11h5c1.8 0 2.9-.7 2.9-2s-1.1-2-2.9-2h-5v4Z" fill="var(--paper)"/>
      <path d="M8 31.8 39 12l-20.8 20.2L8 36l13.2-11.4L8 31.8Z" fill="var(--sage)"/>
    </svg>
  )
}

export default function Logo({ light = false }) {
  return (
    <Link to="/" className={`logo ${light ? 'logo-light' : ''}`} aria-label="RS — Rare Score Marketing home">
      <Mark />
      <span className="logo-type"><b>RS</b><span>Rare Score<br/>Marketing</span></span>
    </Link>
  )
}
