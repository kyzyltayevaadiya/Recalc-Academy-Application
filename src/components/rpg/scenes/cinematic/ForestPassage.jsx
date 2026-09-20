import React, { useState } from "react";
import { motion, useTransform, useMotionValueEvent } from "framer-motion";
import Stage, { useStage, usePace } from "@/components/rpg/scroll/Stage";
import Heroine from "@/components/rpg/Heroine";
import ParticleField from "@/components/rpg/ParticleField";

const TREES_BACK = [0, 7, 14, 21, 29, 36, 43, 50, 57, 64, 71, 78, 85, 92, 99];
const TREES_MID = [4, 13, 22, 31, 40, 49, 58, 67, 76, 85, 94];
const BUSHES = [2, 17, 35, 52, 70, 86, 97];

function Tree({ h }) {
  return (
    <svg width={h * 0.7} height={h} viewBox="0 0 14 20" preserveAspectRatio="none" shapeRendering="crispEdges" className="shrink-0">
      <rect x="6" y="14" width="2" height="6" fill="#0a140d" />
      <polygon points="7,0 1,8 13,8" fill="#123324" />
      <polygon points="7,4 0,13 14,13" fill="#0d2a1c" />
      <rect x="2" y="10" width="3" height="2" fill="#123324" />
    </svg>
  );
}

// WOW 1: the girl physically leaves the village and travels into a darkening forest.
// The world moves past the camera — foreground trunks briefly occlude the screen.
export default function ForestPassage() {
  const { ref, progress } = useStage();
  const pace = usePace(progress);
  const [phase, setPhase] = useState("travel");
  useMotionValueEvent(progress, "change", (v) => setPhase(v > 0.87 ? "arrive" : "travel"));

  const backX = useTransform(progress, [0, 1], ["0%", "-58%"]);
  const midX = useTransform(progress, [0, 1], ["0%", "-72%"]);
  const bushX = useTransform(progress, [0, 1], ["0%", "-90%"]);
  const villageX = useTransform(progress, [0, 0.32], ["0%", "-70vw"]);
  const villageOp = useTransform(progress, [0, 0.28], [1, 0]);
  const darkOp = useTransform(progress, [0.28, 0.75], [0, 0.62]);
  const fireflyOp = useTransform(progress, [0.58, 0.78], [0, 1]);
  const titleOp = useTransform(progress, [0, 0.09], [1, 0]);
  const arriveOp = useTransform(progress, [0.88, 0.94], [0, 1]);
  const trunk1 = useTransform(progress, [0.12, 0.42], ["116vw", "-30vw"]);
  const trunk2 = useTransform(progress, [0.42, 0.7], ["116vw", "-30vw"]);
  const trunk3 = useTransform(progress, [0.7, 0.95], ["116vw", "-30vw"]);

  return (
    <Stage vh={340} id="forest-passage" stageRef={ref} className="bg-quest-navy-deep">
      {/* dawn sky, slowly swallowed by forest shade */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #f0a868 0%, #c9785a 28%, #6a9a6e 55%, #2a4a30 100%)" }} />
      <div className="absolute left-[10%] top-[14%] w-28 h-28 bg-amber-200/80 blur-2xl rounded-full" />

      {/* the home village, receding behind her */}
      <motion.div style={{ x: villageX, opacity: villageOp }} className="absolute bottom-[24%] left-[6%] flex items-end gap-6 will-change-transform">
        <div className="relative">
          <div className="w-20 h-12 bg-[#3a2a1e] border-2 border-[#241a10]" />
          <div className="absolute -top-4 left-0 w-full h-6 bg-[#8a4a2a]" style={{ clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }} />
          <div className="absolute top-4 left-3 w-2 h-2 bg-quest-gold animate-flicker" />
        </div>
        <div className="relative">
          <div className="w-24 h-16 bg-[#40301f] border-2 border-[#2a1e12]" />
          <div className="absolute -top-5 left-0 w-full h-7 bg-[#7a3e24]" style={{ clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }} />
          <div className="absolute top-5 left-4 w-2 h-2 bg-quest-gold animate-flicker" />
          <div className="absolute top-5 right-4 w-2 h-2 bg-quest-gold animate-twinkle" />
        </div>
        <motion.div className="w-3 h-3 rounded-full bg-white/25 blur-[2px] -translate-y-4"
          animate={{ y: [-4, -26], opacity: [0.5, 0] }} transition={{ duration: 2.4, repeat: Infinity }} />
      </motion.div>

      {/* distant tree line */}
      <motion.div style={{ x: backX }} className="absolute bottom-[22%] left-0 w-[230%] flex items-end justify-around will-change-transform">
        {TREES_BACK.map((_, i) => <Tree key={i} h={70 + (i % 3) * 22} />)}
      </motion.div>

      {/* midground trees */}
      <motion.div style={{ x: midX }} className="absolute bottom-[16%] left-0 w-[260%] flex items-end justify-around will-change-transform">
        {TREES_MID.map((_, i) => <Tree key={i} h={130 + (i % 4) * 34} />)}
      </motion.div>

      {/* ground */}
      <div className="absolute bottom-0 left-0 right-0 h-[18%]" style={{ background: "linear-gradient(to bottom, #1c3a24 0%, #0a160e 100%)" }} />
      {/* the path */}
      <motion.div style={{ x: bushX }} className="absolute bottom-0 left-0 w-[300%] h-[7%] bg-[#4a3a26]/70 will-change-transform" />

      {/* foreground bushes */}
      <motion.div style={{ x: bushX }} className="absolute bottom-[10%] left-0 w-[300%] flex items-end justify-around will-change-transform">
        {BUSHES.map((_, i) => (
          <div key={i} className="w-16 h-8 bg-[#08140c] border-2 border-[#06120a]" style={{ borderRadius: "40% 40% 0 0" }} />
        ))}
      </motion.div>

      {/* leaves flying past */}
      <ParticleField variant="leaves" count={18} />

      {/* the heroine — world travels past her */}
      <div className="absolute bottom-[12%] left-[24%] sm:left-[28%] z-20">
        <Heroine state={phase === "arrive" ? "discover" : pace} facing="right" size={110} />
      </div>

      {/* darkening forest light + fireflies */}
      <motion.div style={{ opacity: darkOp }} className="absolute inset-0 bg-[#04120b] pointer-events-none" />
      <motion.div style={{ opacity: fireflyOp }} className="absolute inset-0">
        <ParticleField variant="fireflies" count={16} />
      </motion.div>

      {/* foreground trunks — full occlusion transitions */}
      {[trunk1, trunk2, trunk3].map((t, i) => (
        <motion.div key={i} style={{ x: t }} className="absolute top-0 h-full w-[15vw] z-40 will-change-transform pointer-events-none">
          <div className="w-full h-full bg-[#050e08]" />
          <div className="absolute top-[10%] -left-[6vw] w-[26vw] h-[22vh] bg-[#050e08]" style={{ borderRadius: "45%" }} />
          <div className="absolute bottom-[30%] -right-[3vw] w-[20vw] h-[16vh] bg-[#050e08]" style={{ borderRadius: "45%" }} />
        </motion.div>
      ))}

      {/* chapter title at departure */}
      <motion.div style={{ opacity: titleOp }} className="absolute top-[12%] left-1/2 -translate-x-1/2 z-30 text-center">
        <div className="font-display text-[9px] text-quest-navy/80 tracking-[0.3em]">CHAPTER II</div>
        <div className="font-pixel text-4xl text-quest-navy text-shadow-pixel">INTO THE UNKNOWN</div>
      </motion.div>

      {/* discovery at the clearing */}
      <motion.div style={{ opacity: arriveOp }} className="absolute left-1/2 top-[20%] -translate-x-1/2 z-30 text-center hud-glass rpg-border px-8 py-5 pointer-events-none">
        <div className="font-display text-[9px] text-quest-gold tracking-widest">NEW AREA DISCOVERED</div>
        <div className="font-pixel text-3xl text-white text-shadow-pixel mt-1">THE UNKNOWN FOREST</div>
      </motion.div>
    </Stage>
  );
}