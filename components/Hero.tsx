"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import Image from "next/image";
import { hero, contacts } from "@/lib/data";
import TypeLine from "./TypeLine";

// The Title / character header — restrained, over a receding Mode-7 grid.
export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.from(".hero-name", { opacity: 0, y: 24, duration: 0.6, ease: "power2.out" })
        .from(".hero-window", { scaleY: 0, opacity: 0, duration: 0.3, ease: "power2.out", transformOrigin: "center" }, "-=0.1")
        .from(".hero-portrait, .hero-info", { opacity: 0, y: 16, stagger: 0.12 }, "-=0.05")
        .from(".hero-cta", { opacity: 0, y: 8, stagger: 0.08 }, "-=0.1");

      gsap.to(".mode7", {
        backgroundPositionY: "60px",
        repeat: -1,
        duration: 4,
        ease: "none",
      });
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      className="relative z-10 flex min-h-screen items-center justify-center overflow-hidden px-4 pt-24 pb-20"
    >
      {/* Mode-7 perspective grid receding to horizon */}
      <div
        className="mode7 pointer-events-none absolute inset-x-0 bottom-0 h-1/2 opacity-30"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent 0 38px, rgba(120,160,255,0.5) 38px 40px), repeating-linear-gradient(90deg, transparent 0 38px, rgba(120,160,255,0.5) 38px 40px)",
          transform: "perspective(320px) rotateX(62deg)",
          transformOrigin: "bottom",
          maskImage: "linear-gradient(to top, #000, transparent)",
        }}
        aria-hidden
      />

      <div className="relative w-full max-w-4xl">
        <h1 className="hero-name mb-6 text-center font-display text-4xl font-black uppercase leading-none tracking-[0.06em] text-[var(--gold)] title-stroke sm:text-6xl">
          {hero.name}
        </h1>

        <div className="hero-window ff-window ff-window--glow grid gap-5 p-6 md:grid-cols-[220px_1fr]">
          {/* portrait sub-window */}
          <div className="hero-portrait ff-sub flex flex-col items-center p-4">
            <div className="relative aspect-square w-full overflow-hidden rounded border-2 border-[rgba(244,244,252,0.6)] bg-white">
              <Image
                src="/me.png"
                alt={hero.name}
                fill
                sizes="220px"
                className="object-cover"
                priority
              />
            </div>
            <p className="mt-3 font-pixel text-base text-[var(--ink)] shadow-ink">{hero.class}</p>
            <p className="font-pixel text-sm text-[var(--ink-dim)] shadow-ink">
              {hero.subclass} · Lv.{hero.level}
            </p>
            <p className="mt-2 font-pixel text-sm text-[var(--mp-blue)] shadow-ink">⌖ {hero.location}</p>
          </div>

          {/* info */}
          <div className="hero-info">
            <p className="ff-subbar">— OVERVIEW —</p>
            <p className="mt-3 font-body text-xl leading-relaxed text-[var(--ink)]">{hero.blurb}</p>
            <p className="mt-4 font-body text-lg italic text-[var(--ink-dim)]">
              <TypeLine text={hero.title} />
            </p>

            <div className="hero-cta mt-6 flex flex-wrap gap-3">
              <a className="ff-btn text-sm" href="#stats">► STATUS</a>
              <a className="ff-btn text-sm" href="#dungeons">► WORLD MAP</a>
              <a className="ff-btn text-sm" href={`mailto:${contacts.email}`}>► RECRUIT</a>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center font-pixel text-sm text-[var(--ink-dim)] shadow-ink">
          descend to continue <span className="blink">▼</span>
        </p>
      </div>
    </section>
  );
}
