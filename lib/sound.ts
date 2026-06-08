"use client";

// Tiny chiptune SFX engine (Web Audio). Muted by default; unlocked on first user gesture.

let ctx: AudioContext | null = null;
let muted = true;
const listeners = new Set<(m: boolean) => void>();

export function initAudio() {
  if (typeof window === "undefined") return;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new AC();
  }
  if (ctx.state === "suspended") ctx.resume();
}

export function isMuted() {
  return muted;
}

export function setMuted(m: boolean) {
  muted = m;
  if (!m) initAudio();
  listeners.forEach((l) => l(m));
}

export function onMuteChange(fn: (m: boolean) => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

type Tone = { freq: number; dur: number; type?: OscillatorType; vol?: number; slideTo?: number };

function play({ freq, dur, type = "square", vol = 0.06, slideTo }: Tone) {
  if (muted || !ctx) return;
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, now + dur);
  gain.gain.setValueAtTime(vol, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
  osc.connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + dur);
}

export const sfx = {
  move: () => play({ freq: 440, dur: 0.05, vol: 0.04 }),
  hover: () => play({ freq: 660, dur: 0.04, vol: 0.03 }),
  select: () => play({ freq: 520, dur: 0.09, slideTo: 880, vol: 0.06 }),
  confirm: () => {
    play({ freq: 660, dur: 0.08 });
    setTimeout(() => play({ freq: 990, dur: 0.12 }), 70);
  },
  type: () => play({ freq: 1200, dur: 0.012, type: "square", vol: 0.015 }),
  open: () => play({ freq: 300, dur: 0.12, slideTo: 600, vol: 0.05 }),
};
