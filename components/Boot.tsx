"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { hero } from "@/lib/data";
import { initAudio, sfx } from "@/lib/sound";

// The Title Screen. Restrained: engraved name, one prompt, dark sky.
export default function Boot({ onStart }: { onStart: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.from(".boot-pre", { opacity: 0, y: 10, duration: 0.5 })
        .from(".boot-logo", { opacity: 0, scale: 0.9, duration: 0.9, ease: "power2.out" }, "-=0.1")
        .from(".boot-sub", { opacity: 0, y: 10, duration: 0.5 }, "-=0.3")
        .from(".boot-start", { opacity: 0, duration: 0.4 }, "+=0.3");
    },
    { scope: ref }
  );

  const start = () => {
    initAudio();
    sfx.confirm();
    gsap.to(ref.current, { opacity: 0, duration: 0.5, ease: "power2.in", onComplete: onStart });
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
      <p className="boot-pre font-pixel text-sm uppercase tracking-[0.3em] text-[var(--ink-dim)] shadow-ink">
        A Developer Portfolio
      </p>
      <h1 className="boot-logo mt-8 px-4 text-center font-display text-5xl font-black uppercase leading-none tracking-[0.06em] text-[var(--gold)] title-stroke sm:text-7xl">
        {hero.name}
      </h1>
      <p className="boot-sub mt-6 font-pixel text-base text-[var(--ink-dim)] shadow-ink">
        {hero.class} · {hero.subclass} · Lv.{hero.level}
      </p>
      <p className="boot-start mt-20 font-pixel text-xl text-[var(--gold)] shadow-gold">
        <span className="blink">▶</span> PRESS START
      </p>
      <p className="boot-start mt-3 font-body text-base italic text-[var(--ink-dim)]">
        click anywhere or press Enter
      </p>
    </div>
  );
}
