"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { mountRealEstateHero } from "./real-estate-hero-runtime";

export function RealEstateHero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    return mountRealEstateHero(root.current);
  }, []);

  return (
    <section ref={root} className="re-sequence" aria-labelledby="re-home-title">
      <div className="re-stage">
        <div className="re-editorial" aria-hidden="true">
          <header className="re-editorial__header">
            <span>Atelier North · Private residential</span>
            <span>Pasadena · San Gabriel foothills</span>
          </header>
          <div className="re-editorial__lead">
            <p className="re-kicker">Private residential</p>
            <h2>Extraordinary homes.<br />Carefully represented.</h2>
          </div>
          <figure className="re-editorial__primary">
            <Image
              src="/real-estate/editorial-interior.jpg"
              alt="Living room opening toward an infinity pool and canyon view"
              fill
              loading="eager"
              sizes="(max-width: 760px) calc(100vw - 40px), 58vw"
            />
          </figure>
          <div className="re-editorial__copy">
            <p>Buying or selling an exceptional home is not a transaction to rush. We combine positioning, presentation, market intelligence, and private representation to make every property feel intentional.</p>
            <a href="#properties" tabIndex={-1}>Explore properties <span aria-hidden="true">↗</span></a>
          </div>
          <figure className="re-editorial__detail">
            <Image
              src="/real-estate/editorial-detail.jpg"
              alt="Limestone staircase and olive trees in late afternoon light"
              fill
              sizes="(max-width: 760px) 31vw, 29vw"
            />
          </figure>
        </div>

        <div className="re-opening">
          <Image
            className="re-opening__image"
            src="/real-estate/hero-estate.jpg"
            alt="Contemporary Los Angeles hillside residence at golden hour"
            fill
            preload
            sizes="100vw"
          />
          <div className="re-opening__shade" />
          <div className="re-opening__copy">
            <p>Atelier North real estate</p>
            <h1 id="re-home-title">Property,<br />positioned differently.</h1>
          </div>
        </div>

        <div className="re-first-wall" />
        <div className="re-reveal">
          <Image
            src="/real-estate/reveal-estate.jpg"
            alt="Los Angeles residence reflected in its infinity pool at dusk"
            fill
            loading="eager"
            sizes="100vw"
          />
        </div>
        <div className="re-second-wall" />
        <div className="re-door re-door--left" />
        <div className="re-door re-door--right" />
        <div className="re-statement">
          <p className="re-statement__eyebrow">Atelier North</p>
          <h2>A house can be listed.<br />A home must be positioned.</h2>
          <p className="re-statement__foot">Private residential · Pasadena</p>
        </div>
        <div className="re-scroll-cue" aria-hidden="true"><span>Scroll to enter</span><i /></div>
      </div>
    </section>
  );
}
