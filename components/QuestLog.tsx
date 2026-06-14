import { quests } from "@/lib/data";
import SectionShell from "./SectionShell";
import FFWindow from "./FFWindow";

export default function QuestLog() {
  return (
    <SectionShell id="quests" title="⚑ Quest Log">
      <div className="space-y-6 border-l-2 border-[var(--gold)] pl-5">
        {quests.map((q) => (
          <FFWindow key={q.org} title={q.rank} glow>
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <h3 className="font-display text-2xl font-bold text-[var(--ink)] shadow-ink">
                  {q.role}
                </h3>
                <p className="font-pixel text-lg text-[var(--mp-blue)] shadow-ink">@ {q.org}</p>
              </div>
              <span className="font-pixel text-base text-[var(--gold)] shadow-gold">{q.period}</span>
            </div>
            <ul className="ff-sub space-y-3 p-4">
              {q.log.map((line, i) => (
                <li key={i} className="flex gap-3 font-body text-xl leading-snug text-[var(--ink)]">
                  <span className="mt-1 text-[var(--gold)]">▸</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </FFWindow>
        ))}
      </div>
    </SectionShell>
  );
}
