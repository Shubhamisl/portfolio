"use client";

import { useEffect, useRef, useState } from "react";
import { sfx } from "@/lib/sound";
import { hero } from "@/lib/data";

const LINES = [
  `Welcome, traveler. You've entered the realm of ${hero.name}.`,
  `A ${hero.class}, Lv.${hero.level} — wielder of Python, TypeScript, and agentic AI.`,
  "Explore the STATS, clear the DUNGEONS, study the LORE. Press [M] for the menu anytime.",
];

export default function DialogueBar({ active }: { active: boolean }) {
  const [line, setLine] = useState(0);
  const [shown, setShown] = useState("");
  const [done, setDone] = useState(false);
  const [closed, setClosed] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // typewriter for current line
  useEffect(() => {
    if (!active || closed) return;
    const full = LINES[line];
    setShown("");
    setDone(false);
    let i = 0;
    const tick = () => {
      i++;
      setShown(full.slice(0, i));
      if (i % 2 === 0) sfx.type();
      if (i < full.length) {
        timer.current = setTimeout(tick, 28);
      } else {
        setDone(true);
      }
    };
    timer.current = setTimeout(tick, 30);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [line, active, closed]);

  if (!active || closed) return null;

  const advance = () => {
    if (!done) {
      // skip to full line
      if (timer.current) clearTimeout(timer.current);
      setShown(LINES[line]);
      setDone(true);
      sfx.move();
      return;
    }
    sfx.select();
    if (line < LINES.length - 1) setLine((l) => l + 1);
    else setClosed(true);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-[125] px-4 pb-20 sm:pb-4">
      <div
        className="dialogue mx-auto max-w-3xl cursor-pointer p-5"
        onClick={advance}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && advance()}
      >
        <p className="font-pixel text-[0.5rem] text-[var(--rpg-gold)]">▌GUIDE</p>
        <p className="mt-3 min-h-[3.5rem] text-2xl leading-snug text-[var(--ink)]">
          {shown}
          {!done && <span className="blink">▮</span>}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-base text-[var(--muted)]">
            {line + 1}/{LINES.length} · click or Enter
          </span>
          {done && <span className="tri" />}
        </div>
      </div>
    </div>
  );
}
