"use client";

import { useEffect, useRef } from "react";

// Layered parallax starfield + drifting fog motes. Pure canvas, pauses for reduced-motion.
export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const colors = ["#f2c14e", "#6aa3ff", "#a779ff", "#56d4d4", "#ece8ff"];
    type Star = { x: number; y: number; z: number; s: number; c: string; tw: number };
    const stars: Star[] = Array.from({ length: 130 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random() * 0.8 + 0.2,
      s: Math.random() < 0.85 ? 2 : 3,
      c: colors[(Math.random() * colors.length) | 0],
      tw: Math.random() * Math.PI * 2,
    }));

    let raf = 0;
    let scrollY = window.scrollY;
    const onScroll = () => (scrollY = window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const st of stars) {
        st.tw += 0.04;
        const py = (st.y - scrollY * st.z * 0.25) % h;
        const yy = py < 0 ? py + h : py;
        const flicker = 0.55 + Math.sin(st.tw) * 0.45;
        ctx.globalAlpha = flicker * st.z;
        ctx.fillStyle = st.c;
        // pixel star (square)
        ctx.fillRect(Math.round(st.x), Math.round(yy), st.s, st.s);
      }
      ctx.globalAlpha = 1;
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} className="starfield" aria-hidden />;
}
