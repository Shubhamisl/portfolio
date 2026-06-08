import type { ReactNode } from "react";
import Reveal from "./Reveal";

/** Standard section shell: anchor id + pixel banner heading. */
export default function Section({
  id,
  banner,
  sub,
  children,
}: {
  id: string;
  banner: string;
  sub?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20">
      <Reveal className="mb-10">
        <p className="banner">{banner}</p>
        {sub && <p className="mt-2 text-xl text-[var(--muted)]">{sub}</p>}
        <div className="mt-3 h-1 w-full max-w-xs bg-[var(--panel-edge)]" />
      </Reveal>
      {children}
    </section>
  );
}
