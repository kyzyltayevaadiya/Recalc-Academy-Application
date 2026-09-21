import React from "react";
import { motion, useTransform } from "framer-motion";
import Stage, { useStage, usePace } from "@/components/rpg/scroll/Stage";
import Heroine from "@/components/rpg/Heroine";
import Dragon from "@/components/rpg/Dragon";
import ParticleField from "@/components/rpg/ParticleField";
import { MOUNTAIN } from "@/lib/questData";

function Checkpoint({ progress, range, pos, tag, title, text }) {
  const op = useTransform(progress, [range[0], range[0] + 0.05, range[1] - 0.05, range[1]], [0, 1, 1, 0]);
  const y = useTransform(progress, [range[0], range[0] + 0.06], [26, 0]);
  return (
    <motion.div style={{ opacity: op, y }} className={`absolute w-52 sm:w-64 hud-glass border-l-4 border-quest-ice/70 p-3 will-change-transform ${pos}`}>
      <div className="font-display text-[8px] text-quest-ice">{tag}</div>
      <div className="font-pixel text-lg text-white leading-tight">{title}</div>
      <div className="font-body text-xs text-white/75 leading-snug mt-1">{text}</div>
    </motion.div>
  );
}

const CP = MOUNTAIN.checkpoints;

// WOW 2: the forest thins, rocks rise, and a gigantic mountain emerges through clouds.
// The camera then climbs diagonally past real milestone checkpoints to the summit.
export default function MountainPassage() {
  const { ref, progress } = useStage();
  const pace = usePace(progress);

  const forestY = useTransform(progress, [0.12, 0.34], ["0vh", "40vh"]);
  const forestOp = useTransform(progress, [0.12, 0.32], [1, 0]);
  const mountainScale = useTransform(progress, [0.14, 0.44], [0.35, 1.25]);
  const mountainY = useTransform(progress, [0.14, 0.44], ["18vh", "0vh"]);
  const mountainOp = useTransform(progress, [0.14, 0.3], [0, 1]);
  const climbX = useTransform(progress, [0.46, 1], ["0%", "-16%"]);
  const climbY = useTransform(progress, [0.46, 1], ["0%", "9%"]);
  const cloud1 = useTransform(progress, [0.16, 0.6], ["-30vw", "120vw"]);
  const cloud2 = useTransform(progress, [0.25, 0.7], ["120vw", "-40vw"]);
  const snowOp = useTransform(progress, [0.4, 0.6], [0, 1]);
  const pathLen = useTransform(progress, [0.46, 0.92], [0, 1]);
  const summitOp = useTransform(progress, [0.9, 0.96], [0, 1]);
  const dragonOp = useTransform(progress, [0.93, 0.99], [0, 1]);
  const titleOp = useTransform(progress, [0, 0.08], [1, 0]);

  return (
    <Stage vh={460} id="mountain" stageRef={ref} className="bg-quest-navy-deep">
      {/* cold sky */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #16305e 0%, #2a4a78 45%, #4a6a94 100%)" }} />

      {/* the mountain, revealed */}
      <motion.div style={{ scale: mountainScale, y: mountainY, opacity: mountainOp }} className="absolute inset-0 will-change-transform">
        <motion.div style={{ x: climbX, y: climbY }} className="absolute inset-0 will-change-transform">
          <svg viewBox="0 0 120 70" preserveAspectRatio="xMidYMax slice" className="absolute bottom-0 left-0 w-full h-[85%]" shapeRendering="crispEdges">
            <polygon points="8,70 46,10 84,70" fill="#3a4a68" />
            <polygon points="62,70 97,16 128,70" fill="#2e3a54" />
            <polygon points="36,70 56,26 92,70" fill="#4a5a78" />
            <polygon points="56,26 51,34 54,37 58,32 62,39 65,36 60,28" fill="#e8f0ff" />
            <polygon points="97,16 93,22 96,25 99,20 102,26 104,23 100,18" fill="#dbe8f8" />
          </svg>
          {/* the zigzag climb path */}
          <svg viewBox="0 0 100 70" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full h-[85%]">
            <motion.path
              d="M 46 68 L 46 60 L 56 60 L 56 52 L 66 52 L 66 44 L 58 44 L 58 36 L 68 36 L 68 28 L 60 28 L 60 20 L 62 16"
              fill="none" stroke="#e8d8a8" strokeWidth="1" strokeDasharray="2 1"
              style={{ pathLength: pathLen, opacity: 0.8 }}
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* the forest sinking away below */}
      <motion.div style={{ y: forestY, opacity: forestOp }} className="absolute bottom-0 left-0 right-0 h-[34%] will-change-transform">
        <div className="absolute bottom-0 left-0 w-full h-1/2" style={{ background: "linear-gradient(to top, #0d2a1c, #123324)" }} />
        <div className="absolute bottom-0 left-0 w-full flex items-end justify-around">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <svg key={i} width="40" height="90" viewBox="0 0 14 20" preserveAspectRatio="none" shapeRendering="crispEdges">
              <rect x="6" y="14" width="2" height="6" fill="#0a140d" />
              <polygon points="7,0 1,8 13,8" fill="#123324" />
              <polygon points="7,4 0,13 14,13" fill="#0d2a1c" />
            </svg>
          ))}
        </div>
      </motion.div>

      {/* clouds passing in front of the peaks */}
      <motion.div style={{ x: cloud1 }} className="absolute top-[22%] w-[60vw] h-[12vh] bg-white/25 blur-2xl rounded-full will-change-transform" />
      <motion.div style={{ x: cloud2 }} className="absolute top-[36%] w-[50vw] h-[10vh] bg-white/20 blur-2xl rounded-full will-change-transform" />

      {/* drifting snow + wind */}
      <motion.div style={{ opacity: snowOp }} className="absolute inset-0">
        <ParticleField variant="snow" count={26} />
      </motion.div>

      {/* the heroine, climbing */}
      <div className="absolute bottom-[16%] left-[30%] z-20">
        <Heroine state={pace === "idle" ? "climb" : "climb"} facing="right" size={110} />
      </div>

      {/* milestone checkpoints along the ascent */}
      <Checkpoint progress={progress} range={[0.48, 0.6]} pos="left-[6%] top-[20%]" tag={CP[0].tag} title={CP[0].title} text={CP[0].text} />
      <Checkpoint progress={progress} range={[0.6, 0.72]} pos="right-[6%] top-[28%]" tag={CP[1].tag} title={CP[1].title} text={CP[1].text} />
      <Checkpoint progress={progress} range={[0.72, 0.83]} pos="left-[8%] top-[36%]" tag={CP[2].tag} title={CP[2].title} text={CP[2].text} />
      <Checkpoint progress={progress} range={[0.83, 0.9]} pos="right-[8%] top-[44%]" tag={CP[3].tag} title={CP[3].title} text={CP[3].text} />

      {/* summit */}
      <motion.div style={{ opacity: summitOp }} className="absolute left-1/2 top-[12%] -translate-x-1/2 z-30 text-center pointer-events-none">
        <div className="font-display text-[9px] text-quest-ice tracking-widest">CHECKPOINT REACHED</div>
        <div className="font-pixel text-3xl text-white text-shadow-pixel mt-1">{CP[4].tag} — {CP[4].title}</div>
        <div className="font-body text-sm text-white/80 mt-2 max-w-md">{CP[4].text}</div>
      </motion.div>

      {/* something enormous on the horizon */}
      <motion.div style={{ opacity: dragonOp }} className="absolute right-[16%] top-[6%] z-10">
        <Dragon state="fly" silhouette size={130} />
      </motion.div>
      <motion.div style={{ opacity: dragonOp }} className="absolute left-1/2 top-[26%] -translate-x-1/2 z-30 font-pixel text-xl text-white/80 animate-flicker pointer-events-none">
        {MOUNTAIN.dragonReveal}
      </motion.div>

      {/* chapter title */}
      <motion.div style={{ opacity: titleOp }} className="absolute top-[12%] left-1/2 -translate-x-1/2 z-30 text-center">
        <div className="font-display text-[9px] text-white/60 tracking-[0.3em]">CHAPTER II</div>
        <div className="font-pixel text-4xl text-white text-shadow-pixel">THE CLIMB</div>
      </motion.div>
    </Stage>
  );
}