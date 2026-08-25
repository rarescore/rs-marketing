"use client";

import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(Flip, ScrollTrigger);
gsap.ticker.lagSmoothing(0);

export { Flip, gsap, ScrollTrigger };
