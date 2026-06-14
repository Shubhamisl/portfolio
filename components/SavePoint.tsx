"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { contacts, hero } from "@/lib/data";
import TypeLine from "./TypeLine";
import FFWindow from "./FFWindow";

export default function SavePoint() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.to(".save-glyph", { rotate: 360, repeat: -1, duration: 8, ease: "none" });
      gsap.to(".save-glyph", {
        filter: "drop-shadow(0 0 18px var(--magic-violet))",
        yoyo: true,
        repeat: -1,
        duration: 1.4,
        ease: "sine.inOut",
      });
    },
    { scope: ref }
  );

  const slots = [
    { label: "EMAIL", value: contacts.email, href: `mailto:${contacts.email}` },
    { label: "PHONE", value: contacts.phone, href: `tel:${contacts.phone.replace(/\s/g, "")}` },
    { label: "GITHUB", value: "View repositories", href: contacts.github },
    { label: "LINKEDIN", value: "Connect", href: contacts.linkedin },
  ];

  return (
    <section id="save" ref={ref} className="relative z-10 mx-auto max-w-3xl scroll-mt-24 px-4 py-20">
      <div className="mb-8 flex flex-col items-center">
        <div className="save-glyph mb-4 h-12 w-12 rotate-45 border-4 border-[var(--magic-violet)] bg-[#0a0e28]" />
        <h2 className="font-display text-3xl font-bold uppercase tracking-[0.14em] text-[var(--gold)] shadow-gold">
          ◆ Save Point
        </h2>
      </div>

      <FFWindow title="SAVE / RECRUIT" glow>
        <p className="font-body text-2xl leading-snug text-[var(--ink)]">
          <TypeLine text={`${hero.name} is available for full-stack and Magitek (AI) quests. Select a slot to make contact.`} />
        </p>

        <ul className="mt-6">
          {slots.map((s) => (
            <li key={s.label} className="ff-row is-active flex items-center gap-3 !border-b-0">
              <a href={s.href} className="flex w-full items-center justify-between">
                <span className="font-pixel text-base text-[var(--ink)] shadow-ink">{s.label}</span>
                <span className="font-body text-lg text-[var(--ink-dim)]">{s.value} ▸</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-6 text-center">
          <a href={`mailto:${contacts.email}`} className="ff-btn">
            <span className="blink">►</span> SAVE
          </a>
        </div>
      </FFWindow>

      <footer className="mt-16 text-center">
        <p className="font-pixel text-sm text-[var(--ink-dim)] shadow-ink">
          BUILT WITH NEXT.JS · GSAP · TAILWIND
        </p>
        <p className="mt-2 font-body text-lg italic text-[var(--ink-dim)]">
          © {new Date().getFullYear()} {hero.name} — the adventure continues.
        </p>
      </footer>
    </section>
  );
}
