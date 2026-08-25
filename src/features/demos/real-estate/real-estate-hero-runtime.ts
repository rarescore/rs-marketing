const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const range = (progress: number, start: number, end: number) => clamp((progress - start) / (end - start));
const mix = (from: number, to: number, amount: number) => from + (to - from) * amount;
const smooth = (value: number) => value * value * (3 - 2 * value);

export function mountRealEstateHero(sequence: HTMLElement) {
  const query = <T extends HTMLElement>(selector: string) => sequence.querySelector<T>(selector);
  const opening = query<HTMLElement>(".re-opening");
  const openingCopy = query<HTMLElement>(".re-opening__copy");
  const firstWall = query<HTMLElement>(".re-first-wall");
  const reveal = query<HTMLElement>(".re-reveal");
  const revealImage = query<HTMLImageElement>(".re-reveal img");
  const secondWall = query<HTMLElement>(".re-second-wall");
  const leftDoor = query<HTMLElement>(".re-door--left");
  const rightDoor = query<HTMLElement>(".re-door--right");
  const statement = query<HTMLElement>(".re-statement");
  const cue = query<HTMLElement>(".re-scroll-cue");
  const editorial = query<HTMLElement>(".re-editorial");
  const editorialLink = query<HTMLAnchorElement>(".re-editorial__copy a");

  if (!opening || !openingCopy || !firstWall || !reveal || !revealImage || !secondWall || !leftDoor || !rightDoor || !statement || !cue || !editorial || !editorialLink) return;

  let target = 0;
  let rendered = -1;
  let frame = 0;

  const render = (progress: number) => {
    const lineGrow = smooth(range(progress, 0.06, 0.115));
    const wallGrow = smooth(range(progress, 0.115, 0.225));
    const hairline = Math.max(2 / window.innerWidth, 0.001);
    firstWall.style.transform = `scale(${wallGrow ? mix(hairline, 1, wallGrow) : hairline}, ${lineGrow})`;
    firstWall.style.opacity = progress < 0.455 ? "1" : "0";
    opening.style.opacity = progress < 0.255 ? "1" : "0";
    openingCopy.style.opacity = String(1 - smooth(range(progress, 0.09, 0.19)));

    const revealIn = smooth(range(progress, 0.265, 0.295));
    const revealGrow = smooth(range(progress, 0.295, 0.445));
    reveal.style.opacity = progress >= 0.265 && progress < 0.635 ? String(revealIn) : "0";
    reveal.style.transform = `scale(${mix(0.12, 1, revealGrow)}, ${mix(0.1, 1, revealGrow)})`;
    revealImage.style.transform = `scale(${mix(1, 1.025, smooth(range(progress, 0.445, 0.49)))})`;

    const secondAppear = smooth(range(progress, 0.485, 0.51));
    const secondGrow = smooth(range(progress, 0.51, 0.615));
    secondWall.style.opacity = progress >= 0.485 && progress < 0.715 ? String(secondAppear) : "0";
    secondWall.style.transform = `scale(${mix(0.1, 1, secondGrow)}, ${mix(0.08, 1, secondGrow)})`;

    const textIn = smooth(range(progress, 0.62, 0.65));
    const textOut = smooth(range(progress, 0.685, 0.715));
    statement.style.opacity = String(textIn * (1 - textOut));
    statement.style.transform = `translate3d(0, ${mix(12, 0, textIn)}px, 0)`;

    const split = smooth(range(progress, 0.715, 0.875));
    const doorsVisible = progress >= 0.605 && progress < 0.89;
    leftDoor.style.opacity = doorsVisible ? "1" : "0";
    rightDoor.style.opacity = doorsVisible ? "1" : "0";
    leftDoor.style.transform = `translate3d(${-101 * split}%,0,0)`;
    rightDoor.style.transform = `translate3d(${101 * split}%,0,0)`;

    const editorialIsVisible = progress >= 0.715;
    editorial.setAttribute("aria-hidden", editorialIsVisible ? "false" : "true");
    editorialLink.tabIndex = editorialIsVisible ? 0 : -1;
    cue.style.opacity = String(1 - smooth(range(progress, 0.02, 0.09)));
  };

  const tick = () => {
    frame = 0;
    if (Math.abs(target - rendered) > 0.00008) {
      rendered = rendered < 0 ? target : mix(rendered, target, 0.18);
      render(rendered);
      frame = requestAnimationFrame(tick);
    } else {
      rendered = target;
      render(rendered);
    }
  };

  const measure = () => {
    const rect = sequence.getBoundingClientRect();
    const distance = sequence.offsetHeight - window.innerHeight;
    target = distance > 0 ? clamp(-rect.top / distance) : 1;
    if (rect.bottom > 0 && rect.top < window.innerHeight && !frame) frame = requestAnimationFrame(tick);
  };

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reducedMotion.matches) {
    render(1);
    return;
  }

  window.addEventListener("scroll", measure, { passive: true });
  window.addEventListener("resize", measure, { passive: true });
  measure();

  return () => {
    window.removeEventListener("scroll", measure);
    window.removeEventListener("resize", measure);
    if (frame) cancelAnimationFrame(frame);
  };
}
