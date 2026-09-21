import React, { useEffect, useState } from "react";

import fly1 from "@/assets/dragon/fly-1.png";
import fly2 from "@/assets/dragon/fly-2.png";
import fire from "@/assets/dragon/fire.png";
import recoil from "@/assets/dragon/recoil.png";
import calm from "@/assets/dragon/calm.png";
import ride from "@/assets/dragon/ride.png";

// Each entry: frame(s) sharing one canvas size (from the source art, in px)
// so swapping frames never shifts or resizes the dragon, plus playback speed.
// fly-1/fly-2 already share a canvas (built at asset-prep time); the rest are
// single illustrated poses — the same 6 states the source project's own
// battle/flight scenes use (see girl-animation/src/timeline.js `dragonFrame`).
const STATES = {
  fly: { frames: [fly1, fly2], w: 379, h: 428, fps: 3.2 },
  fire: { frames: [fire], w: 413, h: 620, fps: 1 },
  recoil: { frames: [recoil], w: 300, h: 607, fps: 1 },
  calm: { frames: [calm], w: 394, h: 195, fps: 1 },
  ride: { frames: [ride], w: 380, h: 590, fps: 1 },
};

function useFrame(frames, fps) {
  const [i, setI] = useState(0);
  const frameCount = frames.length;
  useEffect(() => {
    setI(0);
    if (frameCount <= 1) return;
    const id = setInterval(() => setI((n) => (n + 1) % frameCount), 1000 / fps);
    return () => clearInterval(id);
  }, [frames, fps, frameCount]);
  return frames[i] ?? frames[0];
}

// The illustrated dragon — the Startup / Uncertainty. States: fly (2-frame
// flap cycle), fire (breathing), recoil (rearing back, hit/reacting), calm
// (curled up, tamed), ride (saddled, for the flight scene).
export default function Dragon({ state = "fly", facing = "right", size = 420, className = "", silhouette = false }) {
  const meta = STATES[state] || STATES.fly;
  const src = useFrame(meta.frames, meta.fps);
  const height = typeof size === "number" ? size * (meta.h / meta.w) : `calc(${size} * ${(meta.h / meta.w).toFixed(3)})`;

  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height, transform: facing === "left" ? "scaleX(-1)" : undefined }}
    >
      <img
        src={src}
        alt="The startup dragon"
        className="w-full h-full object-contain"
        style={silhouette ? { filter: "brightness(0)", opacity: 0.85 } : undefined}
        draggable={false}
      />
    </div>
  );
}
