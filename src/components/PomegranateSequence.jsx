import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useReducedMotion from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 90;
const PRIORITY_FRAMES = [0,1,2,3,4,5,8,12,16,20,24,28,32,36,40,44,48,52,56,60,64,68,72,76,80,84,89];

export default function PomegranateSequence() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const targetFrameRef = useRef(0);
  const displayFrameRef = useRef(0);
  const [loaded, setLoaded] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return undefined;

    const sequence = window.matchMedia('(max-width: 700px)').matches ? 'mobile' : 'desktop';
    let active = true;
    const loadedIndices = new Set();

    const loadFrame = index => new Promise(resolve => {
      if (imagesRef.current[index]) {
        resolve();
        return;
      }

      const image = new Image();
      image.decoding = 'async';
      image.onload = () => {
        if (active) {
          imagesRef.current[index] = image;
          if (!loadedIndices.has(index)) {
            loadedIndices.add(index);
            setLoaded(loadedIndices.size);
          }
        }
        resolve();
      };
      image.onerror = resolve;
      image.src = `/sequence/${sequence}/frame-${String(index).padStart(3, '0')}.webp`;
    });

    const loadBatch = async indices => {
      await Promise.all(indices.map(loadFrame));
    };

    (async () => {
      await loadBatch(PRIORITY_FRAMES);

      const remaining = Array.from({ length: FRAME_COUNT }, (_, index) => index)
        .filter(index => !PRIORITY_FRAMES.includes(index));

      for (let start = 0; start < remaining.length && active; start += 12) {
        await loadBatch(remaining.slice(start, start + 12));
        await new Promise(resolve => window.setTimeout(resolve, 18));
      }
    })();

    return () => {
      active = false;
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion || !canvasRef.current || !sectionRef.current) return undefined;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d', {
      alpha: false,
      desynchronized: true
    });

    let animationFrameId = 0;
    let width = 0;
    let height = 0;
    let lastRenderedFrame = -100;

    const getClosestImage = index => {
      if (imagesRef.current[index]) return imagesRef.current[index];

      for (let offset = 1; offset < FRAME_COUNT; offset += 1) {
        const before = index - offset;
        const after = index + offset;
        if (before >= 0 && imagesRef.current[before]) return imagesRef.current[before];
        if (after < FRAME_COUNT && imagesRef.current[after]) return imagesRef.current[after];
      }
      return null;
    };

    const drawCover = (image, opacity = 1) => {
      if (!image) return;
      const scale = Math.max(width / image.width, height / image.height);
      const drawWidth = image.width * scale;
      const drawHeight = image.height * scale;
      const x = (width - drawWidth) * 0.5;
      const y = (height - drawHeight) * 0.5;

      context.globalAlpha = opacity;
      context.drawImage(image, x, y, drawWidth, drawHeight);
    };

    const renderFrame = frame => {
      if (width <= 0 || height <= 0) return;

      const clamped = Math.max(0, Math.min(FRAME_COUNT - 1, frame));
      const lowerIndex = Math.floor(clamped);
      const upperIndex = Math.min(FRAME_COUNT - 1, lowerIndex + 1);
      const blend = clamped - lowerIndex;
      const lowerImage = getClosestImage(lowerIndex);
      const upperImage = getClosestImage(upperIndex);

      if (!lowerImage && !upperImage) return;

      context.globalAlpha = 1;
      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, width, height);
      drawCover(lowerImage || upperImage, 1);

      if (upperImage && upperImage !== lowerImage && blend > 0.01) {
        drawCover(upperImage, blend);
      }

      context.globalAlpha = 1;
      lastRenderedFrame = clamped;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      renderFrame(displayFrameRef.current);
    };

    const tick = () => {
      const target = targetFrameRef.current;
      const current = displayFrameRef.current;
      const distance = target - current;

      // Fast enough to follow one or two scroll gestures, but damped enough
      // to remove visible frame stepping on 60–120 Hz displays.
      displayFrameRef.current = Math.abs(distance) < 0.002
        ? target
        : current + distance * 0.24;

      if (Math.abs(displayFrameRef.current - lastRenderedFrame) > 0.002) {
        renderFrame(displayFrameRef.current);
      }

      animationFrameId = window.requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: false,
      onUpdate: self => {
        // Slightly ease the densest middle portion so it remains readable,
        // while the full sequence still completes in roughly two scrolls.
        const progress = self.progress;
        const shaped = progress < 0.48
          ? progress * 0.94
          : progress < 0.67
            ? 0.4512 + (progress - 0.48) * 0.72
            : 0.588 + (progress - 0.67) * 1.2485;
        targetFrameRef.current = Math.min(FRAME_COUNT - 1, shaped * (FRAME_COUNT - 1));
      }
    });

    animationFrameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      trigger.kill();
    };
  }, [loaded, reducedMotion]);

  if (reducedMotion) {
    return (
      <section className="sequence reduced">
        <img
          src="/sequence/desktop/frame-055.webp"
          alt="Falling ruby-red pomegranate seeds"
        />
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="sequence">
      <canvas ref={canvasRef} aria-hidden="true" />
      <div className="sequence-copy">
        <span>Scroll to begin</span>
        <strong>Make them notice.</strong>
      </div>
      <div
        className="load-meter"
        style={{ '--p': `${Math.min(100, (loaded / FRAME_COUNT) * 100)}%` }}
      />
    </section>
  );
}
