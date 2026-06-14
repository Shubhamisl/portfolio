"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import Image from "next/image";
import { stats, hero } from "@/lib/data";
import SectionShell from "./SectionShell";
import FFWindow from "./FFWindow";

export default function StatSheet() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".atb-fill").forEach((bar) => {
        gsap.to(bar, {
          width: bar.dataset.value + "%",
          duration: 0.8,
          ease: "power1.inOut",
          scrollTrigger: { trigger: bar, start: "top 92%", once: true },
          onComplete: () => {
            const ping = bar.parentElement?.parentElement?.querySelector(".atb-ping");
            if (ping) gsap.fromTo(ping, { scale: 1 }, { scale: 1.4, yoyo: true, repeat: 1, duration: 0.12 });
          },
        });
      });
      gsap.utils.toArray<HTMLElement>(".atb-num").forEach((num) => {
        const end = Number(num.dataset.value);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: end,
          duration: 0.7,
          ease: "power1.inOut",
          scrollTrigger: { trigger: num, start: "top 92%", once: true },
          onUpdate: () => (num.textContent = String(Math.round(obj.v))),
        });
      });
    },
    { scope: ref }
  );

  // group skills under gold sub-bars
  const groups = Array.from(new Set(stats.map((s) => s.group)));

  const attrs = [
    ["LV", String(hero.level)],
    ["CLASS", "FULL-STACK"],
    ["JOB", "AI MAGE"],
    ["EXP", "1 YR CONTRACT"],
    ["ORIGIN", "JSS · NOIDA"],
  ];

  return (
    <SectionShell id="stats" title="◈ Status">
      <div ref={ref} className="grid gap-6 lg:grid-cols-[1fr_2fr]">
        {/* left: character card */}
        <FFWindow title="CHARACTER" glow>
          <div className="relative mx-auto mt-2 aspect-square w-32 overflow-hidden rounded border-2 border-[rgba(244,244,252,0.6)] bg-white">
            <Image src="/me.png" alt={hero.name} fill sizes="128px" className="object-cover" />
          </div>
          <p className="mt-3 text-center font-display text-xl font-bold text-[var(--ink)] shadow-ink">
            {hero.name}
          </p>
          <ul className="mt-4">
            {attrs.map(([k, v]) => (
              <li key={k} className="ff-row flex items-center justify-between !pl-2">
                <span className="font-pixel text-base text-[var(--ink-dim)] shadow-ink">{k}</span>
                <span className="font-pixel text-base text-[var(--gold)] shadow-gold">{v}</span>
              </li>
            ))}
          </ul>
        </FFWindow>

        {/* right: skills as ATB gauges, grouped */}
        <FFWindow title="MAGITEK & ABILITIES" glow>
          <div className="space-y-5">
            {groups.map((g) => (
              <div key={g}>
                <p className="ff-subbar">— {g} —</p>
                <div className="mt-2 space-y-3">
                  {stats
                    .filter((s) => s.group === g)
                    .map((s) => (
                      <div key={s.key}>
                        <div className="flex items-baseline justify-between">
                          <span className="font-pixel text-base text-[var(--ink)] shadow-ink">
                            {s.label}
                          </span>
                          <span className="font-pixel text-base text-[var(--gold)] shadow-gold">
                            <span className="atb-num" data-value={s.value}>0</span>
                            <span className="atb-ping inline-block">/100</span>
                          </span>
                        </div>
                        <div className="atb-track mt-1.5">
                          <div className="atb-fill" data-value={s.value} style={{ background: s.color }} />
                        </div>
                        <p className="mt-1 font-body text-base leading-snug text-[var(--ink-dim)]">
                          {s.items.join(" · ")}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </FFWindow>
      </div>
    </SectionShell>
  );
}
