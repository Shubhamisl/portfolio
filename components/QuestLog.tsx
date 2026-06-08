import { quests } from "@/lib/data";
import Section from "./Section";
import Reveal from "./Reveal";

export default function QuestLog() {
  return (
    <Section id="quests" banner="✦ QUEST LOG" sub="Work experience // missions accepted">
      <Reveal stagger className="space-y-6">
        {quests.map((q) => (
          <article key={q.org} className="frame-gold frame-studs p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span
                className={`font-pixel text-[0.55rem] px-2 py-1 ${
                  q.rank === "MAIN QUEST"
                    ? "text-[var(--rpg-gold)] border border-[var(--rpg-gold)]"
                    : "text-[var(--rpg-mp)] border border-[var(--rpg-mp)]"
                }`}
              >
                {q.rank}
              </span>
              <span className="text-lg text-[var(--muted)]">{q.period}</span>
            </div>

            <h3 className="mt-4 font-pixel text-[0.85rem] text-[var(--ink)]">{q.role}</h3>
            <p className="mt-1 text-xl text-[var(--rpg-xp)]">@ {q.org}</p>

            <ul className="mt-4 space-y-3">
              {q.log.map((line, i) => (
                <li key={i} className="flex gap-3 text-xl leading-snug text-[var(--muted)]">
                  <span className="mt-1 text-[var(--rpg-gold)]">▸</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </Reveal>
    </Section>
  );
}
