import { useEffect, useRef, useState } from 'react';
import useReducedMotion from '../hooks/useReducedMotion';

const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
const INTRO_MS = 3600;
const TRANSITION_MS = 650;
const DESKTOP_FRAMES = 85; // Uses only the clean, visually consistent part of the source sequence.
const MOBILE_FRAMES = 78;

export default function PomegranateSequence() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const framesRef = useRef([]);
  const rafRef = useRef(0);
  const [ready, setReady] = useState(false);
  const [loaded, setLoaded] = useState(0);
  const [finishing, setFinishing] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;

    const mobile = window.matchMedia('(max-width: 700px)').matches;
    const folder = mobile ? 'mobile' : 'desktop';
    const count = mobile ? MOBILE_FRAMES : DESKTOP_FRAMES;
    const frames = new Array(count);
    framesRef.current = frames;
    let cancelled = false;

    // Keep the page still while the short opening experience plays.
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';

    const loadFrame = (index) => new Promise((resolve) => {
      const img = new Image();
      img.decoding = 'async';
      img.onload = async () => {
        if (cancelled) { resolve(); return; }
        try {
          frames[index] = await createImageBitmap(img);
        } catch {
          frames[index] = img;
        }
        setLoaded((value) => value + 1);
        resolve();
      };
      img.onerror = resolve;
      img.src = `/sequence/${folder}/frame-${String(index).padStart(3, '0')}.webp`;
    });

    (async () => {
      // Load the entire short sequence before playback so it never jumps.
      for (let i = 0; i < count; i += 12) {
        await Promise.all(Array.from({ length: Math.min(12, count - i) }, (_, j) => loadFrame(i + j)));
        if (cancelled) return;
      }
      if (!cancelled) setReady(true);
    })();

    return () => {
      cancelled = true;
      document.documentElement.style.overflow = previousOverflow;
      frames.forEach((frame) => frame?.close?.());
    };
  }, [reduced]);

  useEffect(() => {
    if (reduced || !ready || !canvasRef.current) return undefined;

    const mobile = window.matchMedia('(max-width: 700px)').matches;
    const count = mobile ? MOBILE_FRAMES : DESKTOP_FRAMES;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
    let cssW = 1;
    let cssH = 1;
    let startTime = 0;
    let lastExact = -1;
    let completed = false;

    const fit = (img, alpha = 1) => {
      if (!img) return;
      const iw = img.width || img.naturalWidth;
      const ih = img.height || img.naturalHeight;
      const scale = Math.max(cssW / iw, cssH / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      ctx.globalAlpha = alpha;
      ctx.drawImage(img, (cssW - dw) / 2, (cssH - dh) / 2, dw, dh);
    };

    const nearest = (index, direction = 1) => {
      const frames = framesRef.current;
      if (frames[index]) return frames[index];
      for (let offset = 1; offset < count; offset += 1) {
        const forward = index + offset * direction;
        const backward = index - offset * direction;
        if (forward >= 0 && forward < count && frames[forward]) return frames[forward];
        if (backward >= 0 && backward < count && frames[backward]) return frames[backward];
      }
      return null;
    };

    const draw = (exact) => {
      if (Math.abs(exact - lastExact) < 0.01) return;
      const low = Math.floor(exact);
      const high = Math.min(count - 1, low + 1);
      const blend = exact - low;
      const first = nearest(low, 1);
      const second = nearest(high, -1);

      ctx.globalAlpha = 1;
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, cssW, cssH);
      fit(first, 1);
      if (second && second !== first && blend > 0.01) fit(second, blend);
      ctx.globalAlpha = 1;
      lastExact = exact;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      cssW = Math.max(1, rect.width);
      cssH = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lastExact = -1;
      draw(0);
    };

    const finish = () => {
      if (completed) return;
      completed = true;
      setFinishing(true);
      window.setTimeout(() => {
        document.documentElement.style.overflow = '';
        const next = document.querySelector('.hero');
        if (next) next.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    };

    const render = (time) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const progress = clamp(elapsed / INTRO_MS, 0, 1);
      // Gentle ease-in/out while preserving the natural frame motion.
      const eased = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      draw(eased * (count - 1));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(render);
      } else {
        finish();
      }
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });
    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [ready, reduced]);

  if (reduced) return null;

  const mobile = typeof window !== 'undefined' && window.matchMedia('(max-width:700px)').matches;
  const total = mobile ? MOBILE_FRAMES : DESKTOP_FRAMES;

  return (
    <section
      ref={sectionRef}
      className={`sequence sequence-auto ${ready ? 'is-ready' : ''} ${finishing ? 'is-finishing' : ''}`}
      aria-label="Pomegranate seed opening animation"
      style={{ '--transition-ms': `${TRANSITION_MS}ms` }}
    >
      <div className="sequence-sticky">
        <canvas ref={canvasRef} aria-hidden="true" />
        <div className="sequence-copy">
          <span>LG Growth Studio</span>
          <strong>Make them notice.</strong>
        </div>
        {!ready && (
          <div className="sequence-loading">
            Preparing experience <b>{Math.min(100, Math.round((loaded / total) * 100))}%</b>
          </div>
        )}
      </div>
      <div className="load-meter" style={{ '--p': `${Math.min(100, (loaded / total) * 100)}%` }} />
    </section>
  );
}
