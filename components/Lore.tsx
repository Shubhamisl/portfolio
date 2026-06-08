import { lore, trophies } from "@/lib/data";
import Section from "./Section";
import Reveal from "./Reveal";
import TypeLine from "./TypeLine";

export default function Lore() {
  return (
    <Section id="lore" banner="✧ LORE & TROPHIES" sub="Origin story // achievements unlocked">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        {/* education as a parchment scroll */}
        <Reveal>
          <article className="rpg-panel rpg-panel--parchment p-6">
            <p className="font-pixel text-[0.55rem] text-[#6b4f1f]">◆ ORIGIN</p>
            <h3 className="mt-3 text-2xl font-bold text-[var(--parchment-ink)]">{lore.degree}</h3>
            <p className="mt-1 text-xl text-[#5c4a28]">{lore.school}</p>
            <p className="mt-3 text-xl text-[#6b4f1f]">
              <TypeLine text={`${lore.expected}  ·  ${lore.cgpa}`} />
            </p>
            <ul className="mt-4 space-y-1">
              {lore.prior.map((p) => (
                <li key={p} className="text-lg text-[#5c4a28]">
                  ▪ {p}
                </li>
              ))}
            </ul>
          </article>
        </Reveal>

        {/* trophy cabinet */}
        <Reveal stagger className="grid grid-cols-2 gap-4 content-start">
          {trophies.map((t) => (
            <div
              key={t.name}
              className={`rpg-panel p-4 text-center rarity-${t.rarity}`}
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center border-2 border-current">
                <span className="text-2xl">🏆</span>
              </div>
              <h4 className="mt-3 font-pixel text-[0.5rem] leading-snug text-[var(--ink)]">
                {t.name}
              </h4>
              <p className="mt-2 text-base text-[var(--muted)]">{t.desc}</p>
              <p className="mt-1 font-pixel text-[0.4rem] uppercase tracking-wide text-current">
                {t.rarity}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
