import React, { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

// Idle
import idle1 from "@/assets/hero/idle-1.png";
import idle2 from "@/assets/hero/idle-2.png";
import idle3 from "@/assets/hero/idle-3.png";
import idle4 from "@/assets/hero/idle-4.png";
// Walk
import walk1 from "@/assets/hero/walk-1.png";
import walk2 from "@/assets/hero/walk-2.png";
import walk3 from "@/assets/hero/walk-3.png";
import walk4 from "@/assets/hero/walk-4.png";
// Run
import run1 from "@/assets/hero/run-1.png";
import run2 from "@/assets/hero/run-2.png";
import run3 from "@/assets/hero/run-3.png";
import run4 from "@/assets/hero/run-4.png";
// Climb (ladder)
import climb1 from "@/assets/hero/climb-1.png";
import climb2 from "@/assets/hero/climb-2.png";
import climb3 from "@/assets/hero/climb-3.png";
import climb4 from "@/assets/hero/climb-4.png";
// Read map
import read1 from "@/assets/hero/read-1.png";
import read2 from "@/assets/hero/read-2.png";
import read3 from "@/assets/hero/read-3.png";
import read4 from "@/assets/hero/read-4.png";
// Dodge / evade crouch
import dodge1 from "@/assets/hero/dodge-1.png";
import dodge2 from "@/assets/hero/dodge-2.png";
import dodge3 from "@/assets/hero/dodge-3.png";
// Knocked down
import knocked1 from "@/assets/hero/knocked-1.png";
import knocked2 from "@/assets/hero/knocked-2.png";
// Rising back up
import rise1 from "@/assets/hero/rise-1.png";
import rise2 from "@/assets/hero/rise-2.png";
// Opening the treasure chest
import open1 from "@/assets/hero/open-1.png";
import open2 from "@/assets/hero/open-2.png";
import open3 from "@/assets/hero/open-3.png";
// Single-pose states
import discover1 from "@/assets/hero/discover-1.png";
import attack1 from "@/assets/hero/attack-1.png";
import celebrate1 from "@/assets/hero/celebrate-1.png";
import ride1 from "@/assets/hero/ride-1.png";
// Horseback gallop
import rideHorse1 from "@/assets/hero/ride-horse-1.png";
import rideHorse2 from "@/assets/hero/ride-horse-2.png";
import rideHorse3 from "@/assets/hero/ride-horse-3.png";

// Each entry: sequential sprite frames sharing one canvas size (w/h — px, from
// the source sheet) so swapping frames never shifts or clips the pose, plus
// the playback speed for that cycle. `look` and `sit` reuse idle/rise art —
// there's no separate illustrated pose for either in the source sheet.
const STATES = {
  idle: { frames: [idle1, idle2, idle3, idle4], w: 122, h: 224, fps: 2.2 },
  look: { frames: [idle1, idle2, idle3, idle4], w: 122, h: 224, fps: 1.6 },
  walk: { frames: [walk1, walk2, walk3, walk4], w: 141, h: 220, fps: 7 },
  run: { frames: [run1, run2, run3, run4], w: 177, h: 225, fps: 11 },
  climb: { frames: [climb1, climb2, climb3, climb4], w: 149, h: 275, fps: 4 },
  read: { frames: [read1, read2, read3, read4], w: 146, h: 233, fps: 1.8 },
  dodge: { frames: [dodge1, dodge2, dodge3], w: 218, h: 176, fps: 8 },
  knocked: { frames: [knocked1, knocked2], w: 324, h: 170, fps: 2.6 },
  rise: { frames: [rise1, rise2], w: 168, h: 157, fps: 2.6 },
  sit: { frames: [rise2], w: 168, h: 157, fps: 1 },
  open: { frames: [open1, open2, open3], w: 193, h: 178, fps: 4 },
  discover: { frames: [discover1], w: 147, h: 246, fps: 1 },
  attack: { frames: [attack1], w: 130, h: 233, fps: 1 },
  celebrate: { frames: [celebrate1], w: 147, h: 252, fps: 1 },
  ride: { frames: [ride1], w: 280, h: 428, fps: 1 },
  rideHorse: { frames: [rideHorse1, rideHorse2, rideHorse3], w: 290, h: 261, fps: 6 },
};

// Cycles through a state's frames at its own fps. Hard-swaps (no crossfade) —
// these are illustrated poses, not a rig, so blending two of them together
// reads as a smeary double-exposure instead of motion.
function useFrame(frames, fps, reduce) {
  const [i, setI] = useState(0);
  const frameCount = frames.length;
  useEffect(() => {
    setI(0);
    if (reduce || frameCount <= 1) return;
    const id = setInterval(() => setI((n) => (n + 1) % frameCount), 1000 / fps);
    return () => clearInterval(id);
  }, [frames, fps, frameCount, reduce]);
  return frames[i] ?? frames[0];
}

// Female pixel-art heroine — illustrated sprite frames (multi-frame idle / walk /
// run / climb / read / dodge / knocked / rise / open cycles, plus a few
// single-pose accents) pulled from the source character sheet.
export default function Heroine({ state = "idle", facing = "right", size = 96, className = "" }) {
  const reduce = !!useReducedMotion();
  const meta = STATES[state] || STATES.idle;
  const src = useFrame(meta.frames, meta.fps, reduce);
  const height = size * (meta.h / meta.w);

  return (
    <div className={`relative ${className}`} style={{ width: size, height }}>
      {state === "discover" && !reduce && (
        <span
          className="absolute -top-5 left-1/2 -translate-x-1/2 font-display text-sm text-quest-gold text-shadow-glow animate-float-slow"
        >!</span>
      )}
      {state === "celebrate" && !reduce && (
        <>
          <span className="absolute -top-4 left-0 text-quest-gold text-lg animate-twinkle">✦</span>
          <span className="absolute -top-7 right-0 text-quest-gold text-lg animate-twinkle" style={{ animationDelay: "0.4s" }}>✦</span>
        </>
      )}

      <div className="w-full h-full" style={{ transform: facing === "left" ? "scaleX(-1)" : undefined }}>
        <img
          src={src}
          alt="The young explorer representing Adiya"
          className="w-full h-full object-contain pixelated"
          draggable={false}
        />
      </div>
    </div>
  );
}
