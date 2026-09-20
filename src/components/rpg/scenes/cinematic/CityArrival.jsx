import React, { useState } from "react";
import { motion, useTransform, useMotionValueEvent } from "framer-motion";
import Stage, { useStage } from "@/components/rpg/scroll/Stage";
import Heroine from "@/components/rpg/Heroine";
import Dragon from "@/components/rpg/Dragon";
import ParticleField from "@/components/rpg/ParticleField";

const TOWERS = [
  { l: "3%", w: "9%", h: "55%" }, { l: "14%", w: "7%", h: "72%" },
  { l: "24%", w: "10%", h: "48%" }, { l: "36%", w: "8%", h: "85%" },
  { l: "47%", w: "12%", h: "62%" }, { l: "61%", w: "8%", h: "78%" },
  { l: "72%", w: "10%", h: "52%" }, { l: "84%", w: "9%", h: "68%" },
  { l: "94%", w: "7%", h: "58%" },
];

function Tower({ t, i }) {
  return (
    <div className="absolute bottom-0 bg-[#0e1830] border-t-2 border-[#1a2646]" style={{ left: t.l, width: t.w, height: t.h }}>
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-2 bg-[#0e1830]" />
      {[0, 1, 2].map((k) => (
        <div key={k} className="absolute w-1.5 h-1.5 bg-quest-gold animate-twinkle"
          style={{ left: `${22 + k * 26}%`, top: `${14 + k * 22}%`, animationDelay: `${(i * 3 + k) * 0.5}s` }} />
      ))}
    </div>
  );
}

// WOW 6: descent through a cloud bank, the City of Capital rising to meet her —
// golden windows, a gate, townsfolk in the plaza. She lands, dismounts, walks in.
export default function CityArrival() {
  const { ref, progress } = useStage();
  const [beat, setBeat] = useState("descend");
  useMotionValueEvent(progress, "change", (v) =>
    setBeat(v < 0.55 ? "descend" : v < 0.95 ? "landed" : "enter"));

  const cloudAY = useTransform(progress, [0, 0.32], ["35vh", "-140vh"]);
  const cloudBY = useTransform(progress, [0.06, 0.42], ["48vh", "-140vh"]);
  const cityScale = useTransform(progress, [0, 0.35, 0.55], [0.72, 1.05, 1.38]);
  const cityY = useTransform(progress, [0, 0.35, 0.55], ["12vh", "0vh", "-16vh"]);
  const dY = useTransform(progress, [0, 0.4, 0.55], ["-26vh", "-8vh", "0vh"]);
  const dX = useTransform(progress, [0.55, 0.8], ["0vw", "-5vw"]);
  const dScale = useTransform(progress, [0.55, 0.8], [1, 0.85]);
  const girlOp = useTransform(progress, [0.55, 0.6], [0, 1]);
  const girlX = useTransform(progress, [0.6, 0.95], ["0vw", "24vw"]);
  const bannerOp = useTransform(progress, [0.56, 0.63], [0, 1]);
  const enterOp = useTransform(progress, [0.9, 0.96], [0, 1]);

  return (
    <Stage vh={300} id="arrival" stageRef={ref} className="bg-quest-navy-deep">
      {/* evening sky + golden horizon glow */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #050b14 0%, #0a1428 45%, #2a2a4a 100%)" }} />
      <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[80vw] h-[30vh] bg-quest-gold/15 blur-3xl rounded-full" />

      {/* the city, rising out of the clouds */}
      <motion.div style={{ scale: cityScale, y: cityY }} className="absolute bottom-0 left-0 w-full h-[72%] will-change-transform">
        {TOWERS.map((t, i) => <Tower key={i} t={t} i={i} />)}
        {/* front wall */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[52%] h-[34%] bg-[#141d34] border-t-4 border-[#1f2a4a]">
          <div className="absolute top-3 left-6 w-2 h-2 bg-quest-gold animate-flicker" />
          <div className="absolute top-8 left-12 w-2 h-2 bg-quest-gold animate-twinkle" />
          <div className="absolute top-4 right-8 w-2 h-2 bg-quest-gold animate-flicker" style={{ animationDelay: "1s" }} />
        </div>
        {/* the gate arch */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-36">
          <div className="absolute inset-0 bg-[#f8c86a]/15 border-2 border-quest-gold/50" style={{ borderRadius: "14px 14px 0 0" }} />
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-20 h-28 bg-quest-gold/25 blur-xl" />
        </div>
      </motion.div>

      {/* cloud bank sweeping past the camera */}
      <motion.div style={{ y: cloudAY }} className="absolute -top-[10%] left-[-15%] w-[130vw] h-[45vh] bg-white/60 blur-3xl rounded-full will-change-transform pointer-events-none" />
      <motion.div style={{ y: cloudBY }} className="absolute -top-[10%] left-[-10%] w-[120vw] h-[40vh] bg-white/50 blur-3xl rounded-full will-change-transform pointer-events-none" />

      {/* townsfolk strolling the plaza */}
      {[0, 1, 2].map((i) => (
        <motion.div key={i} className="absolute bottom-[3%] w-2 h-5 bg-white/35 z-10"
          style={{ left: `${28 + i * 20}%` }}
          animate={{ x: [0, 44 - i * 16, 0] }}
          transition={{ duration: 5 + i * 2, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }} />
      ))}

      {/* the dragon lands; she dismounts and walks toward the gate */}
      <motion.div style={{ x: dX, y: dY, scale: dScale }} className="absolute left-[6%] bottom-[6%] z-20 will-change-transform">
        <Dragon state={beat === "descend" ? "flying" : "calm"} facing="right" size="min(36vw, 400px)" />
        {beat === "descend" && (
          <div className="absolute left-[32%] -top-8"><Heroine state="ride" size={64} /></div>
        )}
      </motion.div>
      <motion.div style={{ opacity: girlOp, x: girlX }} className="absolute bottom-[4%] left-[10%] z-20 will-change-transform">
        <Heroine state={beat === "enter" ? "look" : "walk"} facing="right" size={100} />
      </motion.div>

      <ParticleField variant="fireflies" count={12} />

      {/* area discovered */}
      <motion.div style={{ opacity: bannerOp }} className="absolute left-1/2 top-[14%] -translate-x-1/2 z-30 text-center hud-glass rpg-border px-8 py-5 pointer-events-none">
        <div className="font-display text-[9px] text-quest-gold tracking-widest">NEW AREA DISCOVERED</div>
        <div className="font-pixel text-3xl text-white text-shadow-pixel mt-1">THE CITY OF CAPITAL</div>
      </motion.div>
      <motion.div style={{ opacity: enterOp }} className="absolute bottom-[8%] left-1/2 -translate-x-1/2 z-30 font-display text-[10px] text-quest-gold animate-pulse pointer-events-none">
        ▶ ENTER THE CITY
      </motion.div>
    </Stage>
  );
}