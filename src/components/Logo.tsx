export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand ${compact ? 'brand--compact' : ''}`}>
      <svg viewBox="0 0 54 54" aria-hidden="true">
        <path d="M9 8h36v10H20v5h21v9H20v5h25v10H9z" />
        <circle cx="43" cy="13" r="5" />
      </svg>
      <span><strong>Extreme</strong>{!compact && <small>Plumbing &amp; Rooter</small>}</span>
    </span>
  )
}
