import React, { useRef, useState } from "react";
import { motion, useTransform, useMotionValueEvent } from "framer-motion";
import Stage, { useStage } from "@/components/rpg/scroll/Stage";
import Heroine from "@/components/rpg/Heroine";
import Dragon from "@/components/rpg/Dragon";
import ParticleField from "@/components/rpg/ParticleField";
import { DRAGON } from "@/lib/questData";

// WOW 3: quiet summit → wind → a giant shadow → ROOOOAR → the dragon flies
// across the screen → boss encounter interface slams in.
export default function DragonEncounter() {
  const { ref, progress } = useStage();
  const [beat, setBeat] = useState("calm");
  useMotionValueEvent(progress, "change", (v) => {
    setBeat(
      v < 0.18 ? "calm" :
      v < 0.38 ? "shadow" :
      v < 0.42 ? "shadow" :
      v < 0.56 ? "flyby" :
      v < 0.68 ? "roar" :
      v < 0.82 ? "boss" : "uncertainty"
    );
  });

  const shadowX = useTransform(progress, [0.16, 0.36], ["-70vw", "70vw"]);
  const shadowOp = useTransform(progress, [0.16, 0.22, 0.36, 0.4], [0, 0.45, 0.45, 0]);
  const darken = useTransform(progress, [0.14, 0.4], [0, 0.5]);
  const dragonX = useTransform(progress, [0.36, 0.58], ["-40vw", "120vw"]);
  const dragonY = useTransform(progress, [0.36, 0.47, 0.58], ["-6vh", "16vh", "4vh"]);
  const flashOp = useTransform(progress, [0.4, 0.43, 0.48], [0, 0.65, 0]);
  const barW = useTransform(progress, [0.68, 0.8], ["0%", "100%"]);
  const barOp = useTransform(progress, [0.66, 0.7], [0, 1]);
  const bossOp = useTransform(progress, [0.56, 0.62], [0, 1]);
  const readyOp = useTransform(progress, [0.86, 0.92], [0, 1]);

  const shake = beat === "roar"
    ? { x: [0, -10, 10, -6, 6, 0], y: [0, 4, -3, 2, 0] }
    : { x: 0, y: 0 };

  return (
    <Stage vh={280} id="dragon" stageRef={ref} className="bg-quest-navy-deep">
      {/* storm sky over the summit */}
      <motion.div animate={shake} transition={{ duration: 0.55 }} className="absolute inset-0">
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #1a1230 0%, #3a1826 55%, #12081a 100%)" }} />
        {/* wind streaks */}
        {[0, 1, 2].map((i) => (
          <motion.div key={i}
            className="absolute h-[2px] w-[30vw] bg-white/15 rounded-full"
            style={{ top: `${28 + i * 18}%` }}
            animate={{ x: ["-30vw", "130vw"] }}
            transition={{ duration: 1.6 - i * 0.3, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
          />
        ))}
        <ParticleField variant="snow" count={18} />

        {/* summit ground */}
        <div className="absolute bottom-0 left-0 right-0 h-[22%]" style={{ background: "linear-gradient(to bottom, #2a2440 0%, #14102a 100%)" }} />
        <div className="absolute bottom-[18%] left-[55%] w-24 h-10 bg-[#1a1630]" style={{ clipPath: "polygon(20% 0, 80% 20%, 100% 100%, 0 100%)" }} />

        {/* a giant shadow crosses the peaks */}
        <motion.div style={{ x: shadowX, opacity: shadowOp }} className="absolute top-[16%] left-1/2 w-[110vw] h-[36vh] bg-black blur-2xl rounded-[50%] will-change-transform" />

        {/* the dragon flies across the screen */}
        <motion.div style={{ x: dragonX, y: dragonY }} className="absolute top-[18%] left-0 z-20 will-change-transform">
          <Dragon state="hostile" facing="left" size="min(52vw, 460px)" showFire={beat === "flyby" || beat === "roar"} />
        </motion.div>

        {/* the heroine watches — tiny before what is coming */}
        <div className="absolute bottom-[12%] left-[18%] z-20">
          <Heroine state={beat === "calm" ? "look" : "dodge"} facing="right" size={96} />
        </div>

        <motion.div style={{ opacity: darken }} className="absolute inset-0 bg-[#0a0410] pointer-events-none" />
        <motion.div style={{ opacity: flashOp }} className="absolute inset-0 bg-[#ff5a2a] mix-blend-screen pointer-events-none" />

        {/* ROOOOAR */}
        {beat === "roar" && (
          <motion.div
            initial={{ scale: 1.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute left-1/2 top-[30%] -translate-x-1/2 z-30 font-display text-4xl sm:text-6xl text-[#ff6a3a] text-shadow-pixel whitespace-nowrap"
          >
            <motion.span animate={{ x: [0, -4, 4, -2, 2, 0] }} transition={{ duration: 0.3, repeat: Infinity }} display="block">ROOOOOAR!</motion.span>
          </motion.div>
        )}

        {/* boss encounter interface */}
        <motion.div style={{ opacity: bossOp }} initial={false} className="absolute left-1/2 top-[14%] -translate-x-1/2 z-30 text-center pointer-events-none">
          <motion.div initial={{ scale: 1.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 14 }}>
            <div className="font-display text-[10px] sm:text-sm text-quest-crimson tracking-[0.3em]">⚔ BOSS ENCOUNTER</div>
            <div className="font-pixel text-4xl sm:text-6xl text-white text-shadow-pixel mt-2">{DRAGON.title} DRAGON</div>
          </motion.div>
          {/* the uncertainty meter */}
          <motion.div style={{ opacity: barOp }} className="mt-8 hud-glass border-2 border-quest-crimson/70 px-5 py-3 scanlines">
            <div className="font-display text-[9px] text-white/70 mb-2">{DRAGON.bossName}</div>
            <div className="w-[70vw] sm:w-[420px] h-4 bg-quest-navy-deep border-2 border-quest-gold/50 overflow-hidden">
              <motion.div style={{ width: barW }} className="h-full bg-gradient-to-r from-quest-ember to-quest-crimson" />
            </div>
            <div className="font-pixel text-base text-quest-crimson mt-1 text-right">— 100%</div>
          </motion.div>
        </motion.div>

        {/* scroll to fight */}
        <motion.div style={{ opacity: readyOp }} className="absolute bottom-[6%] left-1/2 -translate-x-1/2 z-30 font-display text-[10px] text-quest-gold animate-pulse">
          ▶ SCROLL TO FIGHT
        </motion.div>
      </motion.div>
    </Stage>
  );
}