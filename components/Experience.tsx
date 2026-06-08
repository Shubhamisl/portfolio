"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { sfx } from "@/lib/sound";
import Boot from "./Boot";
import Starfield from "./Starfield";
import MainMenu from "./MainMenu";
import MuteToggle from "./MuteToggle";
import DialogueBar from "./DialogueBar";

// Client shell: orchestrates boot gate, ambient world, menu, sound, dialogue + section transitions.
export default function Experience({ children }: { children: ReactNode }) {
  const [started, setStarted] = useState(false);
  const flashRef = useRef<HTMLDivElement>(null);

  // global SFX delegation: hover + click on interactive elements (no per-component wiring)
  useEffect(() => {
    if (!started) return;
    const sel = "a, button, .menu-item";
    let last = 0;
    const over = (e: Event) => {
      const t = (e.target as HTMLElement)?.closest(sel);
      if (!t) return;
      const now = performance.now();
      if (now - last < 60) return;
      last = now;
      sfx.hover();
    };
    const click = (e: Event) => {
      if ((e.target as HTMLElement)?.closest(sel)) sfx.select();
    };
    document.addEventListener("pointerover", over);
    document.addEventListener("click", click);
    return () => {
      document.removeEventListener("pointerover", over);
      document.removeEventListener("click", click);
    };
  }, [started]);

  useGSAP(
    () => {
      if (!started) return;
      const flash = flashRef.current;
      if (!flash) return;
      // quick battle-flash as each section (after the first) scrolls into view
      gsap.utils.toArray<HTMLElement>("section[id]").forEach((sec, i) => {
        if (i === 0) return;
        ScrollTrigger.create({
          trigger: sec,
          start: "top 60%",
          onEnter: () => {
            gsap.fromTo(
              flash,
              { opacity: 0.45 },
              { opacity: 0, duration: 0.35, ease: "steps(5)", overwrite: true }
            );
          },
        });
      });
    },
    { dependencies: [started] }
  );

  return (
    <>
      <Starfield />
      <div className="vignette" aria-hidden />
      <div ref={flashRef} className="flash" aria-hidden />

      {!started && <Boot onStart={() => setStarted(true)} />}

      {started && (
        <>
          <MainMenu />
          <MuteToggle />
          <DialogueBar active={started} />
        </>
      )}

      <div className={started ? "" : "locked"} aria-hidden={!started}>
        {children}
      </div>
    </>
  );
}
