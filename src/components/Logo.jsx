import { Link } from 'react-router-dom'

export function Mark({ size = 42 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" className="logo-mark">
      <rect x="1" y="1" width="46" height="46" rx="13" fill="currentColor" />
      <path d="M11 34V13h12.2c6.6 0 10.4 3 10.4 8 0 3.6-2.1 6-5.7 7.4L37 36h-9.2l-7.1-7.1h-2.4V36H11Zm7.3-12.2h5.2c2.3 0 3.6-.9 3.6-2.6 0-1.7-1.3-2.5-3.6-2.5h-5.2v5.1Z" fill="var(--ink)"/>
      <path d="M30.4 12.8h7.1l-3.4 5.5-3.7-5.5Z" fill="var(--acid)"/>
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
