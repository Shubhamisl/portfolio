"use client";

import { useCallback, useEffect, useState } from "react";
import { sfx } from "@/lib/sound";

const ITEMS = [
  { id: "top", label: "STATUS", icon: "✦", desc: "Character overview" },
  { id: "stats", label: "MAGIC / SKILLS", icon: "◈", desc: "Stat allocation" },
  { id: "quests", label: "QUEST LOG", icon: "⚑", desc: "Experience" },
  { id: "dungeons", label: "DUNGEONS", icon: "⚔", desc: "Projects" },
  { id: "lore", label: "LORE", icon: "✧", desc: "Education & trophies" },
  { id: "save", label: "SAVE / CONTACT", icon: "◆", desc: "Get in touch" },
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
    const el = it.id === "top" ? document.body : document.getElementById(it.id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (it.id === "top") window.scrollTo({ top: 0, behavior: "smooth" });
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
      {/* trigger */}
      <button
        aria-label="Open menu"
        onClick={() => {
          setOpen(true);
          sfx.open();
        }}
        className="fixed bottom-4 left-4 z-[130] border-2 border-[var(--rpg-gold)] bg-[rgba(12,10,22,0.9)] px-3 py-2 font-pixel text-[0.55rem] text-[var(--rpg-gold)] shadow-[3px_3px_0_rgba(0,0,0,0.6)] transition-transform hover:translate-x-0.5 hover:translate-y-0.5"
      >
        ☰ MENU [M]
      </button>

      {open && (
        <div className="menu-overlay flex items-center justify-center px-4" onClick={close}>
          <div
            className="frame-gold frame-studs w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="banner mb-1 !text-[0.8rem]">▌MENU</p>
            <p className="mb-4 text-lg text-[var(--muted)]">↑ ↓ navigate · ENTER select · ESC close</p>
            <ul>
              {ITEMS.map((it, i) => (
                <li
                  key={it.id}
                  className="menu-item"
                  data-active={i === idx}
                  onMouseEnter={() => {
                    setIdx(i);
                    sfx.hover();
                  }}
                  onClick={() => jump(i)}
                >
                  <span className="w-4 text-[var(--rpg-gold)]">{i === idx ? "▶" : ""}</span>
                  <span className="text-[var(--rpg-cyan)]">{it.icon}</span>
                  <span className="font-pixel text-[0.6rem]">{it.label}</span>
                  <span className="ml-auto text-base text-[var(--muted)]">{it.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
