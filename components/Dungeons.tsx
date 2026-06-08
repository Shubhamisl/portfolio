import { dungeons } from "@/lib/data";
import Section from "./Section";
import Reveal from "./Reveal";

export default function Dungeons() {
  return (
    <Section id="dungeons" banner="⚔ DUNGEONS CLEARED" sub="Projects // bosses defeated, loot acquired">
      <Reveal stagger className="grid gap-6 lg:grid-cols-3">
        {dungeons.map((d) => (
          <article
            key={d.name}
            className="frame-gold frame-studs flex flex-col p-5 transition-transform hover:-translate-y-1"
          >
            <header>
              <span className="font-pixel text-[0.5rem] text-[var(--rpg-xp)]">CLEARED ✓</span>
              <h3 className="mt-2 font-pixel text-[0.75rem] leading-snug text-[var(--rpg-gold)]">
                {d.name}
              </h3>
              <p className="mt-2 text-lg text-[var(--muted)]">{d.tagline}</p>
            </header>

            <ul className="mt-4 flex-1 space-y-2">
              {d.log.map((line, i) => (
                <li key={i} className="flex gap-2 text-lg leading-snug text-[var(--muted)]">
                  <span className="mt-0.5 text-[var(--rpg-cyan)]">▸</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4">
              <p className="font-pixel text-[0.45rem] text-[var(--muted)]">◆ LOOT</p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {d.loot.map((l) => (
                  <li
                    key={l}
                    className="border border-[var(--panel-edge)] bg-[var(--bg)] px-1.5 py-0.5 text-sm text-[var(--rpg-purple)]"
                  >
                    {l}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 flex gap-2">
              {d.links.map((ln) => (
                <a key={ln.label} href={ln.href} className="btn-pixel !text-[0.5rem] !px-2 !py-1.5">
                  {ln.label}
                </a>
              ))}
            </div>
          </article>
        ))}
      </Reveal>
    </Section>
  );
}
