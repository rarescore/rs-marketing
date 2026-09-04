import { useEffect, useState } from 'react'

export function useHeroProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const section = document.querySelector<HTMLElement>('.hero')
        if (!section) return
        const available = Math.max(section.offsetHeight - window.innerHeight, 1)
        setProgress(Math.min(1, Math.max(0, -section.getBoundingClientRect().top / available)))
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return progress
}
