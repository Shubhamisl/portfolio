"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { hero } from "@/lib/data";

const NAV = [
  { id: "stats", label: "STATUS" },
  { id: "quests", label: "QUESTS" },
  { id: "dungeons", label: "MAP" },
  { id: "lore", label: "RECORDS" },
  { id: "save", label: "SAVE" },
];

export default function Hud() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(ref.current, { y: -50, opacity: 0, duration: 0.5, ease: "power2.out", delay: 0.1 });
    },
    { scope: ref }
  );

  return (
    <header ref={ref} className="fixed inset-x-0 top-0 z-[100] px-3 pt-3">
      <div className="ff-window mx-auto flex max-w-[1100px] items-center justify-between gap-4 !rounded-md !p-2">
        <div className="flex items-center gap-3">
          <span className="font-pixel text-base text-[var(--gold)] shadow-gold">
            {hero.name.split(" ")[0]} · Lv.{hero.level}
          </span>
          <div className="hidden items-center gap-2 sm:flex">
            <MiniBar label="HP" pct={86} color="var(--hp-green)" />
            <MiniBar label="MP" pct={92} color="var(--mp-blue)" />
          </div>
        </div>
        <nav className="flex flex-wrap items-center justify-end gap-x-3 gap-y-1">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="font-pixel text-sm text-[var(--ink-dim)] shadow-ink transition-colors hover:text-[var(--gold)]"
            >
              {n.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function MiniBar({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="font-pixel text-xs" style={{ color }}>{label}</span>
      <div className="atb-track w-20">
        <div className="atb-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}
