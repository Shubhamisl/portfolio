import { lore, trophies } from "@/lib/data";
import SectionShell from "./SectionShell";
import FFWindow from "./FFWindow";

// The Records Hall — education as lore, certs/awards as a trophy collection.
export default function Lore() {
  return (
    <SectionShell id="lore" title="✧ Records Hall">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <FFWindow title="ORIGIN" glow>
          <h3 className="font-display text-2xl font-bold text-[var(--ink)] shadow-ink">{lore.degree}</h3>
          <p className="mt-1 font-body text-xl text-[var(--ink-dim)]">{lore.school}</p>
          <div className="ff-sub mt-4 p-4">
            <p className="font-pixel text-lg text-[var(--gold)] shadow-gold">
              {lore.expected} · {lore.cgpa}
            </p>
            <ul className="mt-3 space-y-1">
              {lore.prior.map((p) => (
                <li key={p} className="font-body text-lg text-[var(--ink)]">
                  ▪ {p}
                </li>
              ))}
            </ul>
          </div>
        </FFWindow>

        <FFWindow title="TROPHIES" glow>
          <div className="grid grid-cols-2 gap-3">
            {trophies.map((t) => (
              <div key={t.name} className="ff-sub flex flex-col items-center p-3 text-center">
                <div className="flex h-11 w-11 items-center justify-center rounded border-2 border-[var(--gold)]">
                  <span className="text-xl">◆</span>
                </div>
                <h4 className="mt-2 font-pixel text-sm leading-snug text-[var(--ink)] shadow-ink">
                  {t.name}
                </h4>
                <p className="mt-1 font-body text-base text-[var(--ink-dim)]">{t.desc}</p>
                <p
                  className="mt-1 font-pixel text-xs uppercase tracking-wide"
                  style={{ color: t.rarity === "epic" ? "var(--magic-violet)" : "var(--mp-blue)" }}
                >
                  {t.rarity}
                </p>
              </div>
            ))}
          </div>
        </FFWindow>
      </div>
    </SectionShell>
  );
}
