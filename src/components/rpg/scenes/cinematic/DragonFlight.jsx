import React, { useState } from "react";
import { motion, useTransform, useMotionValueEvent } from "framer-motion";
import Stage, { useStage } from "@/components/rpg/scroll/Stage";
import Heroine from "@/components/rpg/Heroine";
import Dragon from "@/components/rpg/Dragon";

const RIDGES = [0, 115, 230, 345, 460];
const TOWNS = [70, 200, 330, 430];

function Town({ left }) {
  return (
    <div className="absolute bottom-[9%]" style={{ left }}>
      {[0, 14, 28].map((dx, i) => (
        <div key={i} className="absolute bottom-0" style={{ left: dx }}>
          <div className="w-6 h-8 bg-[#10182c]" />
          <div className="absolute -top-2 left-0 w-full h-3 bg-[#0c1220]" style={{ clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }} />
          <div className="absolute top-2 left-1.5 w-1.5 h-1.5 bg-quest-gold animate-twinkle" style={{ animationDelay: `${i * 0.7}s` }} />
        </div>
      ))}
    </div>
  );
}

// WOW 5: she mounts the tamed dragon and they launch off the mountain.
// The whole world becomes an aerial landscape scrolling beneath her —
// mountains, forests, rivers, little towns, clouds sweeping past the camera —
// until golden lights appear far on the horizon.
export default function DragonFlight() {
  const { ref, progress } = useStage();
  const [beat, setBeat] = useState("mount");
  useMotionValueEvent(progress, "change", (v) =>
    setBeat(v < 0.12 ? "mount" : v < 0.84 ? "fly" : "horizon"));

  const farX = useTransform(progress, [0.12, 0.84], ["0vw", "-280vw"]);
  const midX = useTransform(progress, [0.12, 0.84], ["0vw", "-320vw"]);
  const nearX = useTransform(progress, [0.12, 0.84], ["0vw", "-350vw"]);
  const mountX = useTransform(progress, [0, 0.12], ["-6vw", "0vw"]);
  const mountY = useTransform(progress, [0, 0.12, 0.5, 0.84], ["30vh", "0vh", "-5vh", "3vh"]);
  const toastOp = useTransform(progress, [0.02, 0.06, 0.12], [0, 1, 0]);
  const cliffOp = useTransform(progress, [0.05, 0.22], [1, 0]);
  const fgCloud1 = useTransform(progress, [0.3, 0.44], ["125vw", "-140vw"]);
  const fgCloud2 = useTransform(progress, [0.6, 0.74], ["125vw", "-140vw"]);
  const cityScale = useTransform(progress, [0.84, 0.99], [0.35, 1.5]);
  const cityOp = useTransform(progress, [0.84, 0.92], [0, 1]);
  const cityTextOp = useTransform(progress, [0.87, 0.93], [0, 1]);

  return (
    <Stage vh={430} id="flight" stageRef={ref} className="bg-quest-navy-deep">
      {/* high-altitude dawn sky */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #16264e 0%, #2c4a7e 45%, #5a7aa8 100%)" }} />
      <div className="absolute left-[14%] top-[10%] w-32 h-32 bg-amber-200/70 blur-2xl rounded-full" />
      {/* wind streaks */}
      {[0, 1, 2].map((i) => (
        <motion.div key={i} className="absolute h-[2px] w-[24vw] bg-white/15 rounded-full"
          style={{ top: `${34 + i * 14}%` }}
          animate={{ x: ["-30vw", "130vw"] }}
          transition={{ duration: 1.4 - i * 0.25, repeat: Infinity, ease: "linear", delay: i * 0.4 }} />
      ))}

      {/* far ridgelines */}
      <motion.div style={{ x: farX }} className="absolute bottom-[34%] left-0 w-[500vw] h-[36vh] will-change-transform">
        {RIDGES.map((r, i) => (
          <div key={i} className="absolute bottom-0" style={{
            left: `${r}vw`, width: "120vw", height: `${60 + (i % 2) * 25}%`,
            background: "#2e3a5e",
            clipPath: "polygon(0% 100%, 15% 30%, 32% 70%, 50% 10%, 68% 62%, 84% 26%, 100% 100%)",
          }} />
        ))}
        {[90, 260, 400].map((l, i) => (
          <div key={`c${i}`} className="absolute bg-white/25 blur-2xl rounded-full"
            style={{ left: `${l}vw`, top: `${10 + i * 20}%`, width: "36vw", height: "8vh" }} />
        ))}
      </motion.div>

      {/* mid world: hills, a river, little towns */}
      <motion.div style={{ x: midX }} className="absolute bottom-[14%] left-0 w-[500vw] h-[30vh] will-change-transform">
        {RIDGES.map((r, i) => (
          <div key={i} className="absolute bottom-0 rounded-t-[45%]" style={{
            left: `${r + 40}vw`, width: "110vw", height: `${40 + (i % 3) * 12}%`, background: "#1e3428",
          }} />
        ))}
        <div className="absolute bottom-0 left-[80vw] w-[90vw] h-[8vh] bg-[#3a6a9a]/80" style={{ transform: "skewX(-25deg)" }} />
        {TOWNS.map((l, i) => <Town key={i} left={`${l}vw`} />)}
      </motion.div>

      {/* near hill crests */}
      <motion.div style={{ x: nearX }} className="absolute bottom-0 left-0 w-[520vw] h-[16vh] will-change-transform">
        {RIDGES.map((r, i) => (
          <div key={i} className="absolute bottom-0 rounded-t-[50%]" style={{
            left: `${r - 30}vw`, width: "130vw", height: "70%", background: "#0c1a12",
          }} />
        ))}
      </motion.div>

      {/* the launch cliff, falling away */}
      <motion.div style={{ opacity: cliffOp }} className="absolute bottom-0 left-0 w-[46vw] h-[26vh] bg-[#0d1226]" />

      {/* the heroine riding the tamed dragon */}
      <motion.div style={{ x: mountX, y: mountY }} className="absolute left-[24%] top-[40%] z-20 will-change-transform">
        <motion.div animate={{ y: [-8, 8, -8] }} transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}>
          <div className="relative">
            <Dragon state="ride" facing="right" size="min(44vw, 440px)" />
            {/* seated on the drawn saddle, roughly a third of the way down the dragon's back */}
            <div className="absolute left-[58%] top-[30%] -translate-x-1/2">
              <Heroine state={beat === "horizon" ? "discover" : "ride"} facing="right" size={54} />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* clouds that sweep IN FRONT of the camera */}
      <motion.div style={{ x: fgCloud1 }} className="absolute top-[8%] left-0 w-[130vw] h-[38vh] bg-white/80 blur-3xl rounded-full z-40 will-change-transform pointer-events-none" />
      <motion.div style={{ x: fgCloud2 }} className="absolute top-[54%] left-0 w-[120vw] h-[30vh] bg-white/70 blur-3xl rounded-full z-40 will-change-transform pointer-events-none" />

      {/* mount toast */}
      <motion.div style={{ opacity: toastOp }} className="absolute top-[16%] left-1/2 -translate-x-1/2 z-30 hud-glass border-2 border-quest-gold/60 px-6 py-3 scanlines pointer-events-none">
        <div className="font-display text-[8px] text-quest-gold">MOUNTED</div>
        <div className="font-pixel text-xl text-white">UNCERTAINTY — TAMED</div>
      </motion.div>

      {/* a city of gold appears on the horizon */}
      <motion.div style={{ scale: cityScale, opacity: cityOp }} className="absolute right-[10%] bottom-[38%] z-10 will-change-transform">
        <div className="relative w-40 h-20">
          <div className="absolute inset-0 bg-quest-gold/30 blur-xl rounded-full" />
          {[[0, 14], [10, 4], [18, 18], [28, 8], [38, 15], [48, 5], [58, 12], [68, 3], [76, 16], [86, 8], [94, 13], [30, 30], [55, 26], [12, 34]].map(([x, y], i) => (
            <div key={i} className="absolute w-1.5 h-1.5 bg-quest-gold rounded-full animate-twinkle" style={{ left: x, top: y, animationDelay: `${i * 0.4}s` }} />
          ))}
        </div>
      </motion.div>
      <motion.div style={{ opacity: cityTextOp }} className="absolute left-1/2 top-[14%] -translate-x-1/2 z-30 text-center pointer-events-none">
        <div className="font-pixel text-3xl sm:text-5xl text-quest-gold text-shadow-glow">A CITY OF GOLD ON THE HORIZON</div>
        <div className="font-display text-[9px] text-white/70 mt-3 animate-pulse">KEEP SCROLLING — DESCEND TOWARD THE LIGHTS</div>
      </motion.div>
    </Stage>
  );
}