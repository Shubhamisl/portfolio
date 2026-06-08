"use client";

import { useEffect, useState } from "react";
import { isMuted, setMuted, onMuteChange, sfx } from "@/lib/sound";

export default function MuteToggle() {
  const [muted, setM] = useState(true);

  useEffect(() => {
    setM(isMuted());
    return onMuteChange(setM);
  }, []);

  return (
    <button
      aria-label={muted ? "Unmute sound" : "Mute sound"}
      onClick={() => {
        const next = !muted;
        setMuted(next);
        if (!next) sfx.select();
      }}
      className="fixed bottom-4 right-4 z-[130] border-2 border-[var(--rpg-gold)] bg-[rgba(12,10,22,0.9)] px-3 py-2 font-pixel text-[0.55rem] text-[var(--rpg-gold)] shadow-[3px_3px_0_rgba(0,0,0,0.6)] transition-transform hover:translate-x-0.5 hover:translate-y-0.5"
    >
      {muted ? "♪ OFF" : "♪ ON"}
    </button>
  );
}
