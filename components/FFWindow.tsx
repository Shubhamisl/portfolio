"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

// The FF6 blue beveled window. Opens by expanding from a thin horizontal line on scroll-in.
export default function FFWindow({
  title,
  glow,
  className = "",
  children,
  animate = true,
}: {
  title?: string;
  glow?: boolean;
  className?: string;
  children: ReactNode;
  animate?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!animate || !ref.current) return;
      // fromTo + immediateRender:false: never leave the window collapsed if the
      // trigger is missed during an instant/programmatic scroll.
      gsap.fromTo(
        ref.current,
        { scaleY: 0, opacity: 0 },
        {
          scaleY: 1,
          opacity: 1,
          duration: 0.28,
          ease: "power2.out",
          transformOrigin: "center center",
          immediateRender: false,
          scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
        }
      );
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      className={`ff-window ${glow ? "ff-window--glow" : ""} p-5 ${className}`}
    >
      {title && <span className="ff-title-chip text-sm">{`❖ ${title} ❖`}</span>}
      {children}
    </div>
  );
}
