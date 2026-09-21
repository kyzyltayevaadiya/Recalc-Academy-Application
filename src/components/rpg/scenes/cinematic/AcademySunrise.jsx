import React, { useRef, useState } from "react";
import { motion, useTransform, useMotionValueEvent } from "framer-motion";
import Stage, { useStage, usePace } from "@/components/rpg/scroll/Stage";
import Heroine from "@/components/rpg/Heroine";
import ParticleField from "@/components/rpg/ParticleField";
import { ACADEMY } from "@/lib/questData";

// WOW 7: night gives way to sunrise as she walks the last road.
// Mist lifts, the sun rises, birds cross the sky, windows light up,
// and the academy gates slowly open for her.
export default function AcademySunrise({ onAchievement }) {
  const { ref, progress } = useStage();
  const pace = usePace(progress);
  const unlocked = useRef(false);
  const [beat, setBeat] = useState("walk");
  useMotionValueEvent(progress, "change", (v) => {
    setBeat(v < 0.6 ? "walk" : v < 0.86 ? "gate" : "through");
    if (v > 0.87 && !unlocked.current) {
      unlocked.current = true;
      onAchievement?.("academy");
    }
  });

  const warmOp = useTransform(progress, [0.2, 0.55], [0, 0.9]);
  const sunY = useTransform(progress, [0.2, 0.55], ["30vh", "-2vh"]);
  const sunOp = useTransform(progress, [0.2, 0.32], [0, 1]);
  const starsOp = useTransform(progress, [0.15, 0.45], [1, 0]);
  const acScale = useTransform(progress, [0.15, 0.6], [0.45, 1.08]);
  const acOp = useTransform(progress, [0.15, 0.32], [0, 1]);
  const doorL = useTransform(progress, [0.5, 0.66], [0, -10]);
  const doorR = useTransform(progress, [0.5, 0.66], [0, 10]);
  const glowOp = useTransform(progress, [0.55, 0.72], [0, 1]);
  const windowsOp = useTransform(progress, [0.55, 0.75], [0, 1]);
  const bannerOp = useTransform(progress, [0.86, 0.92], [0, 1]);
  const gatesTextOp = useTransform(progress, [0.6, 0.66, 0.8, 0.86], [0, 1, 1, 0]);
  const titleOp = useTransform(progress, [0, 0.08], [1, 0]);
  const girlX = useTransform(progress, [0.6, 0.84], ["0vw", "24vw"]);
  const girlScale = useTransform(progress, [0.6, 0.84], [1, 0.6]);
  const girlOp = useTransform(progress, [0.82, 0.89], [1, 0]);
  const birdsOp = useTransform(progress, [0.28, 0.34, 0.55, 0.62], [0, 1, 1, 0]);

  return (
    <Stage vh={360} id="academy-gates" stageRef={ref} className="bg-quest-navy-deep">
      {/* pre-dawn sky, warming as she approaches */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #141433 0%, #232048 50%, #3a2a4a 100%)" }} />
      <motion.div style={{ opacity: warmOp, background: "linear-gradient(to bottom, rgba(240,168,104,0) 0%, rgba(240,168,104,0.18) 60%, rgba(240,140,80,0.32) 100%)" }} className="absolute inset-0 pointer-events-none" />
      <motion.div style={{ opacity: starsOp }} className="absolute inset-0"><ParticleField variant="stars" count={30} /></motion.div>

      {/* the rising sun */}
      <motion.div style={{ y: sunY, opacity: sunOp }} className="absolute left-[60%] top-0 will-change-transform">
        <div className="w-20 h-20 rounded-full bg-[#ffd88a] blur-[2px]" />
        <div className="absolute inset-[-24px] rounded-full bg-amber-300/50 blur-2xl" />
      </motion.div>

      {/* birds crossing the dawn */}
      <motion.div style={{ opacity: birdsOp }} className="absolute inset-0 pointer-events-none">
        {[0, 1, 2].map((i) => (
          <motion.div key={i} className="absolute text-white/70" style={{ top: `${26 + i * 9}%` }}
            animate={{ x: ["-6vw", "110vw"], y: [0, -14, 0] }}
            transition={{ duration: 10 - i * 2, repeat: Infinity, ease: "linear", delay: i * 1.2 }}>
            <svg width="18" height="8" viewBox="0 0 18 8"><motion.path d="M1,6 Q5,1 9,5 Q13,1 17,6" fill="none" stroke="white" strokeWidth="1" animate={{ y: [0, -1.5, 0] }} transition={{ duration: 0.5, repeat: Infinity }} /></svg>
          </motion.div>
        ))}
      </motion.div>

      {/* ground + road */}
      <div className="absolute bottom-0 left-0 right-0 h-[22%] bg-[#141824]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[36%] h-[6%] bg-[#4a3a2a]/80" />
      {/* mist bands */}
      <div className="absolute bottom-[16%] left-[-10%] w-[120%] h-[8vh] bg-white/10 blur-2xl rounded-full" />
      <div className="absolute bottom-[10%] left-[-15%] w-[130%] h-[7vh] bg-white/10 blur-2xl rounded-full" />

      {/* the academy, growing out of the dawn */}
      <div className="absolute bottom-[14%] left-1/2 -translate-x-1/2 w-[86%] max-w-3xl">
        <motion.div style={{ scale: acScale, opacity: acOp }} className="relative will-change-transform">
          <svg viewBox="0 0 100 74" className="w-full" shapeRendering="crispEdges">
            <rect x="18" y="44" width="64" height="30" fill="#2a2438" />
            {[18, 24, 30, 36, 42, 48, 54, 60, 66, 72, 78].map((x) => (
              <rect key={x} x={x} y="42" width="3" height="2" fill="#2a2438" />
            ))}
            <rect x="6" y="22" width="14" height="52" fill="#342c4a" />
            <rect x="80" y="22" width="14" height="52" fill="#342c4a" />
            {[6, 10, 14].map((x) => <rect key={`l${x}`} x={x} y="20" width="3" height="2" fill="#342c4a" />)}
            {[80, 84, 88].map((x) => <rect key={`r${x}`} x={x} y="20" width="3" height="2" fill="#342c4a" />)}
            <motion.g style={{ opacity: windowsOp }}>
              <rect x="11" y="30" width="3" height="4" fill="#FDB813" />
              <rect x="11" y="40" width="3" height="4" fill="#FDB813" />
              <rect x="86" y="30" width="3" height="4" fill="#FDB813" />
              <rect x="86" y="40" width="3" height="4" fill="#FDB813" />
              <rect x="40" y="50" width="2" height="3" fill="#FDB813" />
              <rect x="58" y="50" width="2" height="3" fill="#FDB813" />
            </motion.g>
            {/* the arch + doors that open */}
            <rect x="44" y="52" width="12" height="22" fill="#0d0a16" />
            <motion.rect x="44" y="52" width="6" height="22" fill="#1a1428" stroke="#3a2f50" strokeWidth="0.5" style={{ x: doorL }} />
            <motion.rect x="50" y="52" width="6" height="22" fill="#1a1428" stroke="#3a2f50" strokeWidth="0.5" style={{ x: doorR }} />
            {/* tower flags */}
            <rect x="12.4" y="14" width="0.6" height="8" fill="#8a6a1e" />
            <motion.rect x="13" y="15" width="4" height="5" fill="#C8102E" animate={{ skewX: [0, 14, 0] }} transition={{ duration: 1.4, repeat: Infinity }} />
            <rect x="85.4" y="14" width="0.6" height="8" fill="#8a6a1e" />
            <motion.rect x="86" y="15" width="4" height="5" fill="#C8102E" animate={{ skewX: [0, -14, 0] }} transition={{ duration: 1.6, repeat: Infinity }} />
          </svg>
          {/* light spilling from the opened gates */}
          <motion.div style={{ opacity: glowOp, background: "linear-gradient(to top, rgba(253,184,19,0.5), transparent)" }} className="absolute left-1/2 bottom-0 -translate-x-1/2 w-24 h-44 pointer-events-none" />
        </motion.div>
      </div>

      {/* the heroine on the last road */}
      <motion.div style={{ x: girlX, scale: girlScale, opacity: girlOp }} className="absolute bottom-[8%] left-[12%] z-20 will-change-transform">
        <Heroine state={beat === "walk" ? (pace === "idle" ? "walk" : pace) : "walk"} facing="right" size={104} />
      </motion.div>

      {/* beats */}
      <motion.div style={{ opacity: titleOp }} className="absolute top-[12%] left-1/2 -translate-x-1/2 z-30 text-center pointer-events-none">
        <div className="font-display text-[9px] text-white/60 tracking-[0.3em]">CHAPTER VI</div>
        <div className="font-pixel text-4xl text-white text-shadow-pixel">THE LAST ROAD</div>
      </motion.div>
      <motion.div style={{ opacity: gatesTextOp }} className="absolute left-1/2 top-[18%] -translate-x-1/2 z-30 text-center pointer-events-none">
        <div className="font-pixel text-3xl sm:text-5xl text-white text-shadow-pixel">THE GATES OF THE NEXT LEVEL</div>
      </motion.div>
      <motion.div style={{ opacity: bannerOp }} className="absolute left-1/2 top-[12%] -translate-x-1/2 z-30 text-center hud-glass rpg-border px-8 py-5 pointer-events-none">
        <div className="font-display text-[9px] text-quest-gold tracking-widest">NEW AREA DISCOVERED</div>
        <div className="font-pixel text-3xl text-quest-gold text-shadow-glow mt-1">{ACADEMY.name}</div>
      </motion.div>
    </Stage>
  );
}