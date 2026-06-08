"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { contacts, hero } from "@/lib/data";
import TypeLine from "./TypeLine";

export default function SavePoint() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".save-crystal", {
        scale: 0.5,
        opacity: 0,
        duration: 0.6,
        ease: "steps(8)",
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      });
    },
    { scope: ref }
  );

  const links = [
    { label: "EMAIL", value: contacts.email, href: `mailto:${contacts.email}` },
    { label: "PHONE", value: contacts.phone, href: `tel:${contacts.phone.replace(/\s/g, "")}` },
    { label: "GITHUB", value: "View repos", href: contacts.github },
    { label: "LINKEDIN", value: "Connect", href: contacts.linkedin },
  ];

  return (
    <section id="save" ref={ref} className="mx-auto max-w-4xl scroll-mt-24 px-4 py-24 text-center">
      <div className="save-crystal mx-auto mb-6 h-14 w-14 rotate-45 border-4 border-[var(--rpg-cyan)] bg-[var(--panel)] shadow-[0_0_24px_var(--rpg-cyan)]" />
      <p className="banner">◆ SAVE POINT</p>
      <h2 className="mt-4 font-pixel text-base text-[var(--ink)] sm:text-lg">
        <TypeLine text="JOIN THE PARTY?" />
      </h2>
      <p className="mx-auto mt-4 max-w-lg text-2xl text-[var(--muted)]">
        {hero.name} is available for full-stack and AI-integration quests. Send word to recruit.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="frame-gold frame-studs group flex items-center justify-between p-4 text-left transition-transform hover:-translate-y-1"
          >
            <span className="font-pixel text-[0.55rem] text-[var(--rpg-gold)]">{l.label}</span>
            <span className="text-xl text-[var(--muted)] group-hover:text-[var(--ink)]">
              {l.value} ▸
            </span>
          </a>
        ))}
      </div>

      <footer className="mt-20 border-t-2 border-[var(--panel-edge)] pt-6">
        <p className="font-pixel text-[0.5rem] text-[var(--muted)]">
          ⌘ BUILT WITH NEXT.JS · GSAP · TAILWIND
        </p>
        <p className="mt-3 text-lg text-[var(--muted)]">
          © {new Date().getFullYear()} {hero.name} — GAME OVER? <span className="blink">PRESS START ▶</span>
        </p>
      </footer>
    </section>
  );
}
