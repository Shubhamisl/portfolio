"use client";

import { useEffect, useRef, useState } from "react";
import { sfx } from "@/lib/sound";
import { hero } from "@/lib/data";

const LINES = [
  `Welcome, traveler. You have entered the menu of ${hero.name}.`,
  `A ${hero.class}, Lv.${hero.level} — wielder of Python, TypeScript, and the arts of Magitek (AI).`,
  "Read the STATUS, walk the WORLD MAP, study the records. Press [M] for the menu at any time.",
];

export default function DialogueBar({ active }: { active: boolean }) {
  const [line, setLine] = useState(0);
  const [shown, setShown] = useState("");
  const [done, setDone] = useState(false);
  const [closed, setClosed] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!active || closed) return;
    const full = LINES[line];
    if (full === undefined) return; // guard against out-of-range line
    setShown("");
    setDone(false);
    let i = 0;
    const tick = () => {
      i++;
      setShown(full.slice(0, i));
      if (i % 2 === 0) sfx.type();
      if (i < full.length) timer.current = setTimeout(tick, 32);
      else setDone(true);
    };
    timer.current = setTimeout(tick, 32);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [line, active, closed]);

  if (!active || closed) return null;

  const advance = () => {
    if (!done) {
      if (timer.current) clearTimeout(timer.current);
      setShown(LINES[line]);
      setDone(true);
      sfx.move();
      return;
    }
    sfx.select();
    setLine((l) => {
      if (l < LINES.length - 1) return l + 1;
      setClosed(true);
      return l;
    });
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-[125] px-4 pb-20 sm:pb-4">
      <div
        className="ff-dialogue mx-auto max-w-3xl cursor-pointer p-5"
        onClick={advance}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && advance()}
      >
        <p className="font-display text-base font-bold uppercase tracking-widest text-[var(--gold)] shadow-gold">
          ❖ Guide
        </p>
        <p className="mt-3 min-h-[3.25rem] font-body text-2xl leading-snug text-[var(--ink)]">
          {shown}
          {!done && <span className="blink">▮</span>}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-pixel text-sm text-[var(--ink-dim)]">
            {line + 1}/{LINES.length} · click or Enter
          </span>
          {done && <span className="tri-more" />}
        </div>
      </div>
    </div>
  );
}
