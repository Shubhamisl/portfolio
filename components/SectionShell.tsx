import type { ReactNode } from "react";

export default function SectionShell({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="relative z-10 mx-auto max-w-[1100px] scroll-mt-24 px-4 py-16">
      <h2 className="mb-10 font-display text-3xl font-bold uppercase tracking-[0.14em] text-[var(--gold)] shadow-gold">
        {title}
      </h2>
      {children}
    </section>
  );
}
