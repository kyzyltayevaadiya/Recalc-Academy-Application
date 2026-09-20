import React from "react";
import { motion } from "framer-motion";

// A small pixel-art hooded traveler built from SVG rects.
// state: "idle" | "walk" | "run" | "climb"
// facing: "right" | "left"
export default function PlayerCharacter({ state = "idle", facing = "right", size = 96, className = "" }) {
  const moving = state === "walk" || state === "run";
  const speed = state === "run" ? 0.28 : 0.5;

  return (
    <motion.div
      className={`relative ${className}`}
      style={{ width: size, height: size * 1.25 }}
      animate={moving ? { y: [0, -4, 0] } : { y: [0, -2, 0] }}
      transition={moving ? { duration: speed, repeat: Infinity, ease: "easeInOut" } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg
        viewBox="0 0 16 20"
        width="100%"
        height="100%"
        shapeRendering="crispEdges"
        style={{ transform: facing === "left" ? "scaleX(-1)" : "none" }}
      >
        {/* Cloak back */}
        <rect x="3" y="7" width="10" height="9" fill="#1a2040" />
        <rect x="2" y="8" width="2" height="7" fill="#15183a" />
        {/* Body */}
        <rect x="4" y="8" width="8" height="7" fill="#2b3460" />
        {/* Gold trim */}
        <rect x="4" y="8" width="8" height="1" fill="#FDB813" />
        <rect x="7" y="9" width="2" height="6" fill="#3a4478" />
        {/* Hood */}
        <rect x="4" y="2" width="8" height="6" fill="#1f1838" />
        <rect x="5" y="1" width="6" height="2" fill="#241d44" />
        {/* Face shadow */}
        <rect x="6" y="5" width="4" height="2" fill="#0d0a1c" />
        <rect x="9" y="5" width="1" height="1" fill="#FDB813" opacity="0.8" />
        {/* Arms */}
        <rect x="3" y="9" width="1" height="4" fill="#2b3460" />
        <rect x="12" y="9" width="1" height="4" fill="#2b3460" />
        {/* Legs — animate when moving */}
        <motion.g
          animate={moving ? { x: [0, 0.5, 0] } : {}}
          transition={moving ? { duration: speed, repeat: Infinity, ease: "easeInOut" } : {}}
        >
          <rect x="5" y="15" width="2" height="4" fill="#120a1f" />
          <rect x="9" y="15" width="2" height="4" fill="#120a1f" />
        </motion.g>
        {/* Boots */}
        <rect x="5" y="18" width="2" height="1" fill="#0a0512" />
        <rect x="9" y="18" width="2" height="1" fill="#0a0512" />
      </svg>
    </motion.div>
  );
}