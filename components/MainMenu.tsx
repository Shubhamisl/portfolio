"use client";

import { useCallback, useEffect, useState } from "react";
import { sfx } from "@/lib/sound";

const ITEMS = [
  { id: "top", label: "STATUS", icon: "✦", desc: "Overview" },
  { id: "stats", label: "MAGITEK / SKILLS", icon: "◈", desc: "Stats" },
  { id: "quests", label: "QUEST LOG", icon: "⚑", desc: "Experience" },
  { id: "dungeons", label: "WORLD MAP", icon: "⚔", desc: "Projects" },
  { id: "lore", label: "RECORDS HALL", icon: "✧", desc: "Education" },
  { id: "save", label: "SAVE POINT", icon: "◆", desc: "Contact" },
];

export default function MainMenu() {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const close = useCallback(() => {
    setOpen(false);
    sfx.move();
  }, []);

  const jump = useCallback((i: number) => {
    const it = ITEMS[i];
    sfx.confirm();
    if (it.id === "top") window.scrollTo({ top: 0, behavior: "smooth" });
    else document.getElementById(it.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "m" || e.key === "M") {
        setOpen((o) => {
          if (!o) sfx.open();
          return !o;
        });
        return;
      }
      if (!open) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowDown") {
        setIdx((i) => (i + 1) % ITEMS.length);
        sfx.move();
      }
      if (e.key === "ArrowUp") {
        setIdx((i) => (i - 1 + ITEMS.length) % ITEMS.length);
        sfx.move();
      }
      if (e.key === "Enter") jump(idx);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, idx, close, jump]);

  return (
    <>
      <button
        aria-label="Open menu"
        onClick={() => {
          setOpen(true);
          sfx.open();
        }}
        className="ff-btn fixed bottom-4 left-4 z-[130] text-sm"
      >
        ☰ MENU [M]
      </button>

      {open && (
        <div className="menu-overlay flex items-center justify-center px-4" onClick={close}>
          <div
            className="ff-window ff-window--glow w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="ff-title-chip text-sm">❖ MENU ❖</span>
            <p className="mb-4 mt-2 font-pixel text-sm text-[var(--ink-dim)] shadow-ink">
              ↑ ↓ navigate · ENTER select · ESC close
            </p>
            <ul>
              {ITEMS.map((it, i) => (
                <li
                  key={it.id}
                  className={`ff-row flex items-center gap-3 ${i === idx ? "is-active" : ""}`}
                  onMouseEnter={() => {
                    setIdx(i);
                    sfx.hover();
                  }}
                  onClick={() => jump(i)}
                >
                  <span className="text-[var(--mp-blue)]">{it.icon}</span>
                  <span className="font-pixel text-base text-[var(--ink)] shadow-ink">{it.label}</span>
                  <span className="ml-auto font-pixel text-sm text-[var(--gold)] shadow-gold">
                    {it.desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
