import { useEffect, useRef } from 'react'

export default function CursorMist() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || matchMedia('(pointer: coarse)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = canvas.getContext('2d', { alpha: true })
    let frame, particles = [], x = -100, y = -100, active = false, last = 0
    const resize = () => { canvas.width = innerWidth * devicePixelRatio; canvas.height = innerHeight * devicePixelRatio; canvas.style.width = `${innerWidth}px`; canvas.style.height = `${innerHeight}px`; ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0) }
    const move = (event) => { x = event.clientX; y = event.clientY; active = true }
    const leave = () => { active = false }
    const tick = (time) => {
      ctx.clearRect(0, 0, innerWidth, innerHeight)
      if (active && time - last > 28) {
        particles.push({ x, y, r: 18 + Math.random()*16, life: 1, dx: (Math.random()-.5)*.8, dy: -.35-Math.random()*.5 })
        last = time
      }
      particles = particles.filter(p => p.life > .02)
      for (const p of particles) {
        p.x += p.dx; p.y += p.dy; p.r += .55; p.life *= .952
        const g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r)
        g.addColorStop(0, `rgba(216,255,62,${.045*p.life})`)
        g.addColorStop(.55, `rgba(230,235,215,${.025*p.life})`)
        g.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill()
      }
      frame = requestAnimationFrame(tick)
    }
    resize(); addEventListener('resize',resize); addEventListener('pointermove',move); document.documentElement.addEventListener('mouseleave',leave); frame=requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(frame); removeEventListener('resize',resize); removeEventListener('pointermove',move); document.documentElement.removeEventListener('mouseleave',leave) }
  }, [])
  return <canvas ref={canvasRef} className="cursor-mist" aria-hidden="true" />
}
