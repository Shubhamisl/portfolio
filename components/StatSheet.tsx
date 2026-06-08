"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { stats } from "@/lib/data";
import Section from "./Section";

export default function StatSheet() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".stat-fill").forEach((bar) => {
        gsap.to(bar, {
          width: bar.dataset.value + "%",
          duration: 1,
          ease: "steps(20)",
          scrollTrigger: { trigger: bar, start: "top 90%", once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((num) => {
        const end = Number(num.dataset.value);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: end,
          duration: 1,
          ease: "steps(20)",
          scrollTrigger: { trigger: num, start: "top 90%", once: true },
          onUpdate: () => (num.textContent = String(Math.round(obj.v))),
        });
      });
    },
    { scope: ref }
  );

  return (
    <Section id="stats" banner="◈ CHARACTER STATS" sub="Skill tree // attribute allocation">
      <div ref={ref} className="grid gap-5 md:grid-cols-2">
        {stats.map((s) => (
          <div key={s.key} className="frame-gold frame-studs p-5">
            <div className="flex items-baseline justify-between">
              <h3 className="font-pixel text-[0.7rem]" style={{ color: s.color }}>
                {s.abbr} · {s.label}
              </h3>
              <span className="font-pixel text-[0.7rem] text-[var(--ink)]">
                <span className="stat-num" data-value={s.value}>
                  0
                </span>
                /100
              </span>
            </div>

            <div className="bar-track mt-3">
              <div
                className="bar-fill stat-fill"
                data-value={s.value}
                style={{ background: s.color }}
              />
            </div>

            <ul className="mt-4 flex flex-wrap gap-2">
              {s.items.map((it) => (
                <li
                  key={it}
                  className="border border-[var(--panel-edge)] bg-[var(--bg)] px-2 py-1 text-base text-[var(--muted)]"
                >
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
