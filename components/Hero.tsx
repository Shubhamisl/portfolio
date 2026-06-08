"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { hero, contacts } from "@/lib/data";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.35 });
      tl.from(".hero-portrait", { scale: 0.8, opacity: 0, duration: 0.5, ease: "steps(6)" })
        .from(".hero-name span", { y: 40, opacity: 0, stagger: 0.04, ease: "steps(4)" }, "-=0.2")
        .from(".hero-line", { opacity: 0, y: 16, stagger: 0.12, ease: "steps(4)" }, "-=0.1")
        .from(".hero-cta", { opacity: 0, y: 10, stagger: 0.1 }, "-=0.1");

      // parallax drift on the portrait as you scroll away from the title screen
      gsap.to(".hero-portrait", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: ref }
  );

  const letters = hero.name.split("");

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center justify-center px-4 pt-24 pb-16"
    >
      <div className="grid w-full max-w-6xl items-center gap-10 md:grid-cols-[260px_1fr]">
        {/* character portrait */}
        <div className="hero-portrait frame-gold frame-studs mx-auto w-full max-w-[260px] p-5">
          <div className="bob flex aspect-square items-center justify-center border-2 border-[var(--panel-edge)] bg-[var(--bg)]">
            <span className="font-pixel text-5xl text-[var(--rpg-gold)] drop-shadow-[3px_3px_0_rgba(0,0,0,0.8)]">
              SK
            </span>
          </div>
          <p className="mt-4 text-center font-pixel text-[0.55rem] text-[var(--rpg-xp)]">
            ◆ {hero.class.toUpperCase()} ◆
          </p>
          <p className="mt-1 text-center text-lg text-[var(--muted)]">
            {hero.subclass} · Lv.{hero.level}
          </p>
        </div>

        {/* title block */}
        <div>
          <p className="font-pixel text-[0.6rem] text-[var(--rpg-mp)]">▶ NEW GAME</p>
          <h1 className="hero-name mt-4 font-pixel text-3xl leading-tight text-[var(--ink)] sm:text-4xl md:text-5xl">
            {letters.map((c, i) => (
              <span key={i} className="inline-block drop-shadow-[3px_3px_0_rgba(0,0,0,0.85)]">
                {c === " " ? " " : c}
              </span>
            ))}
          </h1>
          <p className="hero-line mt-4 font-pixel text-[0.7rem] text-[var(--rpg-gold)]">
            {hero.title}
          </p>
          <div className="hero-line win-ff mt-5 max-w-xl p-4">
            <p className="text-2xl leading-snug text-[#dce6ff]">{hero.blurb}</p>
          </div>
          <p className="hero-line mt-4 text-xl text-[var(--muted)]">
            <span className="text-[var(--rpg-cyan)]">⌖</span> {hero.location}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a className="hero-cta btn-pixel" href="#stats">
              View Stats
            </a>
            <a className="hero-cta btn-pixel" href="#dungeons">
              Projects
            </a>
            <a className="hero-cta btn-pixel" href={`mailto:${contacts.email}`}>
              Hire ▶
            </a>
          </div>
        </div>
      </div>

      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-pixel text-[0.55rem] text-[var(--muted)]">
        scroll to continue <span className="blink">▼</span>
      </p>
    </section>
  );
}
