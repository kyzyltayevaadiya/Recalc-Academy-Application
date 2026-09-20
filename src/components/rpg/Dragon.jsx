import React from "react";
import { motion, useReducedMotion } from "framer-motion";

// Animated pixel dragon — the Startup / Uncertainty.
// States: silhouette | hostile | calm | flying. Optional fire breath.
export default function Dragon({ state = "hostile", facing = "right", size = 420, className = "", showFire = false }) {
  const reduce = !!useReducedMotion();
  const flapDur = state === "hostile" ? 0.5 : state === "flying" ? 0.38 : state === "calm" ? 2.8 : 4;
  const flapAmp = state === "hostile" || state === "flying" ? [-38, 20] : [-12, 4];
  const dark = state === "silhouette";
  const body = dark ? "#0d1226" : state === "calm" ? "#4A3A7E" : "#3D2B6E";
  const bodyDk = dark ? "#0d1226" : state === "calm" ? "#37285f" : "#2A1F4A";
  const wing = dark ? "#0d1226" : state === "calm" ? "#6a58ae" : "#5A4A9E";
  const belly = dark ? "#0d1226" : "#4A3A6E";
  const ridge = dark ? "#0d1226" : "#8a6a1e";
  const eye = dark ? "#1a2238" : state === "calm" ? "#FDB813" : "#FF3333";
  const fireA = state === "hostile" || state === "flying";

  return (
    <div className={`relative ${className}`} style={{ width: size, aspectRatio: "64 / 36", transform: facing === "left" ? "scaleX(-1)" : undefined }}>
      <svg viewBox="0 0 64 36" width="100%" height="100%" shapeRendering="crispEdges" overflow="visible">
        {/* far wing */}
        <motion.g style={{ transformBox: "fill-box", transformOrigin: "90% 95%" }}
          animate={reduce ? {} : { rotate: flapAmp.map((v) => -v) }}
          transition={{ duration: flapDur, repeat: Infinity, ease: "easeInOut" }}>
          <polygon points="30,15 18,2 16,10 24,17" fill={wing} opacity={0.75} />
        </motion.g>

        {/* tail */}
        <motion.g style={{ transformBox: "fill-box", transformOrigin: "100% 50%" }}
          animate={reduce ? {} : { rotate: [4, -7, 4] }}
          transition={{ duration: flapDur * 1.6, repeat: Infinity, ease: "easeInOut" }}>
          <rect x="14" y="16" width="8" height="2" fill={bodyDk} />
          <rect x="9" y="15" width="6" height="2" fill={bodyDk} />
          <polygon points="9,16 3,13 5,19" fill={bodyDk} />
        </motion.g>

        {/* body */}
        <rect x="20" y="14" width="26" height="8" fill={body} />
        <rect x="20" y="20" width="26" height="2" fill={belly} />
        {/* ridge spikes */}
        {[22, 27, 32, 37, 42].map((x) => (
          <polygon key={x} points={`${x},14 ${x + 2},10 ${x + 4},14`} fill={ridge} />
        ))}

        {/* neck + head */}
        <rect x="44" y="8" width="6" height="8" fill={body} />
        <rect x="46" y="5" width="10" height="6" fill={body} />
        <rect x="54" y="8" width="6" height="3" fill={body} />
        <polygon points="46,5 47,1 49,5" fill={ridge} />
        <rect x="49" y="7" width="2" height="2" fill={eye} style={{ filter: `drop-shadow(0 0 3px ${eye})` }} />

        {/* tucked legs */}
        <rect x="26" y="22" width="3" height="4" fill={bodyDk} />
        <rect x="34" y="22" width="3" height="4" fill={bodyDk} />

        {/* near wing */}
        <motion.g style={{ transformBox: "fill-box", transformOrigin: "10% 95%" }}
          animate={reduce ? {} : { rotate: flapAmp }}
          transition={{ duration: flapDur, repeat: Infinity, ease: "easeInOut" }}>
          <polygon points="30,15 42,0 44,8 36,17" fill={wing} />
          <polygon points="30,15 42,0 44,8" fill={bodyDk} opacity={0.5} />
        </motion.g>

        {/* fire breath */}
        {showFire && !dark && (
          <motion.g style={{ transformBox: "fill-box", transformOrigin: "0% 50%" }}
            animate={reduce ? {} : { scaleX: [0.7, 1.25, 0.9], opacity: [0.9, 1, 0.75] }}
            transition={{ duration: 0.22, repeat: Infinity }}>
            <polygon points="60,7 72,10.5 60,14" fill="#FF6B1A" />
            <polygon points="60,8.5 68,10.5 60,12.5" fill="#FDB813" />
          </motion.g>
        )}
      </svg>
    </div>
  );
}