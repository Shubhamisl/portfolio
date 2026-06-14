"use client";

import { useState } from "react";
import Image from "next/image";
import { dungeons } from "@/lib/data";
import SectionShell from "./SectionShell";
import FFWindow from "./FFWindow";
import { sfx } from "@/lib/sound";

// Project location nodes placed on the overworld (% coords of the map box).
const NODES: { name: string; x: number; y: number; side: "l" | "r" }[] = [
  { name: dungeons[0].name, x: 20, y: 28, side: "r" }, // Cuemath
  { name: dungeons[1].name, x: 74, y: 22, side: "l" }, // GYM
  { name: dungeons[2].name, x: 47, y: 82, side: "r" }, // Meridian
];

// Non-interactive flavor labels (his stack as RPG place names) for density.
const AMBIENT: { name: string; x: number; y: number; side: "l" | "r" }[] = [
  { name: "FastAPI Keep", x: 64, y: 55, side: "l" },
  { name: "pgvector Caves", x: 30, y: 60, side: "r" },
  { name: "Supabase Sea", x: 50, y: 40, side: "l" },
];

export default function Dungeons() {
  const [sel, setSel] = useState(0);
  const d = dungeons[sel];

  return (
    <SectionShell id="dungeons" title="⚔ World Map">
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* the map */}
        <FFWindow title="WORLD OF BALANCE" className="!p-2">
          <div className="relative aspect-square w-full overflow-hidden rounded">
            {/* CC0 pixel-art overworld (Puny World by Shade, public domain) */}
            <Image
              src="/map/puny-overworld.png"
              alt="Overworld map of cleared dungeons"
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover [image-rendering:pixelated]"
            />
            {/* subtle dark+blue grade so gold nodes and labels pop */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(8,10,30,0.55)_100%)]" />

            {/* ambient flavor labels */}
            {AMBIENT.map((n) => (
              <div key={n.name} className="map-node" style={{ left: `${n.x}%`, top: `${n.y}%` }}>
                <span className="map-dot" style={{ width: 7, height: 7, opacity: 0.7 }} />
                <span className={`map-label map-label--${n.side} map-label--ambient`}>{n.name}</span>
              </div>
            ))}

            {/* project nodes */}
            {NODES.map((n, i) => (
              <button
                key={n.name}
                className={`map-node ${i === sel ? "is-on" : ""}`}
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
                aria-label={n.name}
                onMouseEnter={() => sfx.hover()}
                onClick={() => {
                  setSel(i);
                  sfx.confirm();
                }}
              >
                <span className="map-dot" />
                <span className={`map-label map-label--${n.side}`}>
                  {i === sel ? "▸ " : ""}
                  {n.name}
                </span>
              </button>
            ))}

            <div className="map-logo">
              <span className="block text-2xl font-black leading-none tracking-wider">FF VI</span>
              <span className="block font-pixel text-[0.6rem] tracking-[0.25em]">WORLD OF BALANCE</span>
            </div>
          </div>
          <p className="mt-2 px-1 font-pixel text-sm text-[var(--ink-dim)] shadow-ink">
            ▸ select a location to inspect the dungeon cleared there
          </p>
        </FFWindow>

        {/* detail panel for the selected dungeon */}
        <FFWindow title={d.name} glow animate={false} key={d.name}>
          <p className="font-pixel text-sm text-[var(--hp-green)] shadow-ink">◈ CLEARED</p>
          <p className="mt-1 font-body text-lg italic text-[var(--ink-dim)]">{d.tagline}</p>

          <ul className="ff-sub mt-3 space-y-2 p-3">
            {d.log.map((line, i) => (
              <li key={i} className="flex gap-2 font-body text-base leading-snug text-[var(--ink)]">
                <span className="mt-0.5 text-[var(--mp-blue)]">▸</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>

          <p className="ff-subbar mt-3">— LOOT —</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {d.loot.map((l) => (
              <li
                key={l}
                className="rounded border border-[rgba(244,244,252,0.4)] bg-[#0a0e28] px-1.5 py-0.5 font-pixel text-sm text-[var(--magic-violet)]"
              >
                {l}
              </li>
            ))}
          </ul>

          <div className="mt-4 flex gap-2">
            {d.links.map((ln) => (
              <a key={ln.label} href={ln.href} className="ff-btn text-sm">
                ► {ln.label}
              </a>
            ))}
          </div>
        </FFWindow>
      </div>
    </SectionShell>
  );
}
