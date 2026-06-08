"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { hero } from "@/lib/data";
import { initAudio, sfx } from "@/lib/sound";

export default function Boot({ onStart }: { onStart: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.from(".boot-logo", { opacity: 0, scale: 0.7, duration: 0.7, ease: "steps(8)" })
        .from(".boot-sub", { opacity: 0, y: 12, duration: 0.4 }, "-=0.2")
        .from(".boot-start", { opacity: 0, duration: 0.3 }, "+=0.2");
    },
    { scope: ref }
  );

  const start = () => {
    initAudio();
    sfx.confirm();
    gsap.to(ref.current, {
      opacity: 0,
      duration: 0.5,
      ease: "steps(6)",
      onComplete: onStart,
    });
  };

  return (
    <div
      ref={ref}
      className="boot"
      role="button"
      tabIndex={0}
      onClick={start}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && start()}
    >
      <p className="boot-sub font-pixel text-[0.6rem] text-[var(--rpg-mp)]">
        ◆ A DEVELOPER PORTFOLIO ◆
      </p>
      <h1 className="boot-logo mt-6 text-center font-pixel text-2xl leading-relaxed text-[var(--rpg-gold)] text-outline sm:text-4xl">
        {hero.name}
      </h1>
      <p className="boot-sub mt-4 font-pixel text-[0.6rem] text-[var(--muted)]">
        {hero.class} · Lv.{hero.level}
      </p>
      <p className="boot-start mt-16 font-pixel text-[0.7rem] text-[var(--ink)]">
        PRESS START <span className="blink">▼</span>
      </p>
      <p className="boot-start mt-3 text-base text-[var(--muted)]">click anywhere or press Enter</p>
    </div>
  );
}
