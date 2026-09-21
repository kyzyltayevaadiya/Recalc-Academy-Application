import React, { useMemo } from "react";

// Lightweight starfield / particle field rendered with absolutely-positioned divs.
// variant: "stars" | "embers" | "snow" | "fireflies" | "leaves" | "confetti"
// sizeRange/opacityRange/durRange let a caller build distinct depth layers
// (e.g. tiny dim far stars vs. fewer, brighter near stars) from the same
// system instead of a new one — all optional, default behavior unchanged.
export default function ParticleField({
  variant = "stars", count = 60, className = "",
  sizeRange = [1, 4], opacityRange = [0.3, 1], durRange = [2, 7],
}) {
  const items = useMemo(() => {
    const arr = [];
    const [sMin, sMax] = sizeRange;
    const [oMin, oMax] = opacityRange;
    const [dMin, dMax] = durRange;
    for (let i = 0; i < count; i++) {
      arr.push({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: sMin + Math.random() * (sMax - sMin),
        delay: Math.random() * 5,
        dur: dMin + Math.random() * (dMax - dMin),
        op: oMin + Math.random() * (oMax - oMin),
      });
    }
    return arr;
  }, [count]);

  const palette = {
    stars: "#ffffff",
    embers: "#FF6B1A",
    snow: "#E8F4FF",
    fireflies: "#FDB813",
    leaves: "#D4A03A",
    confetti: "#FDB813",
  }[variant];

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {items.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full pixelated"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: palette,
            opacity: p.op,
            boxShadow: variant === "fireflies" || variant === "embers" ? `0 0 6px ${palette}` : "none",
            animation: variant === "snow" ? `float-slow ${p.dur}s ease-in-out ${p.delay}s infinite` : `twinkle ${p.dur}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}