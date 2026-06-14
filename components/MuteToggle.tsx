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
      className="ff-btn fixed bottom-4 right-4 z-[130] text-sm"
    >
      ♪ {muted ? "OFF" : "ON"}
    </button>
  );
}
