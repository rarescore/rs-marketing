import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useReducedMotion from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);
const SEED_COUNT = 320;
const SPRITE_COUNT = 5;

function mulberry32(seed) {
  return function random() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function smoothstep(value) {
  const t = Math.max(0, Math.min(1, value));
  return t * t * (3 - 2 * t);
}

export default function PomegranateSequence() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const progressRef = useRef(0);
  const displayProgressRef = useRef(0);
  const rafRef = useRef(0);
  const imagesRef = useRef([]);
  const [ready, setReady] = useState(false);
  const reducedMotion = useReducedMotion();

  const particles = useMemo(() => {
    const random = mulberry32(20260805);
    return Array.from({ length: SEED_COUNT }, (_, index) => {
      const depth = random();
      return {
        sprite: index % SPRITE_COUNT,
        x: -0.08 + random() * 1.16,
        start: 0.015 + random() * 0.34,
        duration: 0.43 + random() * 0.29,
        depth,
        size: (0.46 + random() * 0.78) * (0.55 + depth * 1.15),
        rotation: random() * Math.PI * 2,
        spin: (-5.5 + random() * 11) * Math.PI,
        sway: 0.005 + random() * 0.065,
        frequency: 0.8 + random() * 2.5,
        phase: random() * Math.PI * 2,
      };
    });
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    let active = true;
    Promise.all(Array.from({ length: SPRITE_COUNT }, (_, index) => new Promise((resolve) => {
      const image = new Image();
      image.decoding = 'async';
      image.onload = () => resolve(image);
      image.onerror = () => resolve(null);
      image.src = `/seeds/seed-${index}.webp`;
    }))).then((images) => {
      if (!active) return;
      imagesRef.current = images;
      setReady(images.some(Boolean));
    });
    return () => { active = false; };
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion || !ready) return;
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
    let width = 0, height = 0, dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
    };

    const draw = (progress) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, width, height);
      const portrait = height > width;
      const baseSize = portrait ? height * 0.044 : height * 0.072;
      const visible = [];

      for (const particle of particles) {
        const local = (progress - particle.start) / particle.duration;
        if (local >= 0 && local <= 1) visible.push({ particle, local });
      }
      visible.sort((a, b) => a.particle.depth - b.particle.depth);

      for (const { particle, local } of visible) {
        const image = imagesRef.current[particle.sprite];
        if (!image) continue;
        const travel = smoothstep(local);
        let x = particle.x + Math.sin(local * particle.frequency * Math.PI * 2 + particle.phase) * particle.sway;
        if (portrait) x = 0.5 + (x - 0.5) * 0.86;
        const y = -0.18 + travel * 1.42;
        let size = baseSize * particle.size;
        if (particle.depth > 0.88) size *= 1.45;
        if (particle.depth > 0.97) size *= 1.75;
        const ratio = image.width / image.height;
        const dw = ratio >= 1 ? size : size * ratio;
        const dh = ratio >= 1 ? size / ratio : size;

        ctx.save();
        ctx.translate(x * width, y * height);
        ctx.rotate(particle.rotation + particle.spin * local);
        if (particle.depth > 0.72 && local > 0.05) {
          ctx.globalAlpha = 0.10;
          ctx.drawImage(image, -dw / 2, -dh / 2 - Math.min(20, height * 0.012), dw, dh);
        }
        ctx.globalAlpha = particle.depth < 0.06 ? 0.76 : 1;
        ctx.drawImage(image, -dw / 2, -dh / 2, dw, dh);
        ctx.restore();
      }
    };

    const tick = () => {
      displayProgressRef.current += (progressRef.current - displayProgressRef.current) * 0.38;
      if (Math.abs(progressRef.current - displayProgressRef.current) < 0.0001) {
        displayProgressRef.current = progressRef.current;
      }
      draw(displayProgressRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });
    rafRef.current = requestAnimationFrame(tick);
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => { progressRef.current = self.progress; },
    });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      trigger.kill();
    };
  }, [particles, ready, reducedMotion]);

  if (reducedMotion) {
    return <section className="sequence reduced seed-fallback"><img src="/seeds/seed-0.webp" alt="Ruby-red pomegranate seed" /></section>;
  }

  return (
    <section ref={sectionRef} className="sequence">
      <div className="sequence-stage"><canvas ref={canvasRef} aria-hidden="true" /></div>
      <div className="sequence-copy"><span>Scroll to begin</span><strong>Make them notice.</strong></div>
    </section>
  );
}
