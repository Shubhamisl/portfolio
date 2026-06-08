"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

/** Typewriter line that types itself out when scrolled into view (GSAP TextPlugin). */
export default function TypeLine({
  text,
  className,
  speed = 0.022,
}: {
  text: string;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      gsap.to(el, {
        duration: Math.max(0.4, text.length * speed),
        text: { value: text },
        ease: "none",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    },
    { scope: ref, dependencies: [text] }
  );

  return <span ref={ref} className={className} aria-label={text} />;
}
