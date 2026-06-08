"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { hero } from "@/lib/data";

const NAV = [
  { id: "stats", label: "STATS" },
  { id: "quests", label: "QUESTS" },
  { id: "dungeons", label: "PROJECTS" },
  { id: "lore", label: "LORE" },
  { id: "save", label: "CONTACT" },
];

/** Persistent top HUD: party member bars + fast-travel nav. */
export default function Hud() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(ref.current, { y: -60, opacity: 0, duration: 0.6, ease: "steps(8)", delay: 0.2 });
    },
    { scope: ref }
  );

  return (
    <header
      ref={ref}
      className="fixed top-0 inset-x-0 z-[100] border-b-2 border-[var(--panel-edge)] bg-[rgba(12,10,22,0.92)] backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2">
        <div className="flex items-center gap-3">
          <span className="font-pixel text-[0.6rem] text-[var(--rpg-gold)]">Lv.{hero.level}</span>
          <div className="hidden sm:flex flex-col gap-1">
            <Bar label="HP" pct={86} color="var(--rpg-hp)" />
            <Bar label="MP" pct={92} color="var(--rpg-mp)" />
          </div>
        </div>
        <nav className="flex flex-wrap items-center justify-end gap-x-4 gap-y-1">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="font-pixel text-[0.55rem] text-[var(--muted)] transition-colors hover:text-[var(--rpg-gold)]"
            >
              {n.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Bar({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-pixel text-[0.5rem] w-5" style={{ color }}>
        {label}
      </span>
      <div className="bar-track w-28">
        <div className="bar-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}
