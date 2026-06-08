"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

type Props = {
  children: ReactNode;
  className?: string;
  /** stagger direct children instead of revealing as one block */
  stagger?: boolean;
  y?: number;
};

/** Scroll-triggered pixel-step reveal: snaps up + fades in as it enters the viewport. */
export default function Reveal({ children, className, stagger, y = 28 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const targets = stagger ? Array.from(el.children) : [el];
      gsap.from(targets, {
        opacity: 0,
        y,
        duration: 0.5,
        ease: "steps(6)",
        stagger: stagger ? 0.1 : 0,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
