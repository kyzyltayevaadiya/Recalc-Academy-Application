import React, { useState } from "react";
import { motion, useTransform, useMotionValueEvent } from "framer-motion";
import Stage, { useStage } from "@/components/rpg/scroll/Stage";
import Heroine from "@/components/rpg/Heroine";
import Dragon from "@/components/rpg/Dragon";
import ParticleField from "@/components/rpg/ParticleField";
import { MOUNTAIN } from "@/lib/questData";

const TONE = {
  ice: { border: "border-quest-ice/70", tag: "text-quest-ice", bar: "from-quest-ice to-white" },
  ember: { border: "border-quest-ember/70", tag: "text-quest-ember", bar: "from-quest-ember to-quest-gold" },
  crimson: { border: "border-quest-crimson/70", tag: "text-quest-crimson", bar: "from-quest-crimson to-quest-ember" },
  gold: { border: "border-quest-gold/70", tag: "text-quest-gold", bar: "from-quest-gold to-white" },
};

// A large, centered story card — the climb's real content. Each beat gets its
// own scroll range and a tonal color (calm research vs. crimson near-failure
// vs. gold breakthrough). Width is capped, not fixed, so it never runs off
// the edge of a narrower viewport (e.g. a browser window with devtools open).
function StoryBeat({ progress, range, tag, title, text, tone = "ice" }) {
  const t = TONE[tone] || TONE.ice;
  const op = useTransform(progress, [range[0], range[0] + 0.035, range[1] - 0.035, range[1]], [0, 1, 1, 0]);
  const y = useTransform(progress, [range[0], range[0] + 0.05], [28, 0]);

  return (
    <motion.div
      style={{ opacity: op, x: "-50%", y }}
      className={`absolute left-1/2 top-[24%] z-30 w-[90vw] max-w-[600px] hud-glass border-2 ${t.border} scanlines px-6 py-6 sm:px-8 sm:py-7 will-change-transform`}
    >
      <div className={`font-display text-[9px] sm:text-[10px] ${t.tag} tracking-[0.3em] mb-3`}>
        {tag}{title ? ` — ${title.toUpperCase()}` : ""}
      </div>
      <div className="font-pixel text-lg sm:text-2xl leading-snug text-white whitespace-pre-line">{text}</div>
    </motion.div>
  );
}

const ST = MOUNTAIN.stages;

// WOW 2: the forest thins, rocks rise, and a gigantic mountain emerges through
// clouds. The climb itself carries the real origin story of the autism
// venture — research, the first failed drafts, the near-miss, the last shot —
// told as large, prominent story cards instead of small side-pinned tags.
export default function MountainPassage() {
  const { ref, progress } = useStage();

  const forestY = useTransform(progress, [0.08, 0.24], ["0vh", "40vh"]);
  const forestOp = useTransform(progress, [0.08, 0.22], [1, 0]);
  const mountainScale = useTransform(progress, [0.1, 0.5], [0.35, 1.25]);
  const mountainY = useTransform(progress, [0.1, 0.5], ["18vh", "0vh"]);
  const mountainOp = useTransform(progress, [0.1, 0.2], [0, 1]);
  const climbX = useTransform(progress, [0.16, 1], ["0%", "-16%"]);
  const climbY = useTransform(progress, [0.16, 1], ["0%", "9%"]);
  const cloud1 = useTransform(progress, [0.1, 0.9], ["-30vw", "120vw"]);
  const cloud2 = useTransform(progress, [0.2, 0.95], ["120vw", "-40vw"]);
  const snowOp = useTransform(progress, [0.5, 0.62], [0, 1]);
  const pathLen = useTransform(progress, [0.16, 0.9], [0, 1]);
  const titleOp = useTransform(progress, [0, 0.05], [1, 0]);

  const narrationOp = useTransform(progress, [0.03, 0.07, 0.13, 0.16], [0, 1, 1, 0]);
  const narrationY = useTransform(progress, [0.03, 0.08], [28, 0]);

  const cliffOp = useTransform(progress, [0.89, 0.93], [0, 1]);
  const dragonOp = useTransform(progress, [0.93, 0.99], [0, 1]);

  // one continuous climb-progress readout: rises to each real checkpoint
  // (15% / 35% / 68%) as she reaches it, then to 100% at the summit — never
  // resets between story beats the way a bar embedded in each card would.
  const climbPctMV = useTransform(progress, [0, 0.18, 0.29, 0.45, 0.75, 0.9, 1], [0, 0, 15, 35, 68, 100, 100]);
  const climbBarWidth = useTransform(climbPctMV, (v) => `${v}%`);
  const [climbPct, setClimbPct] = useState(0);
  useMotionValueEvent(climbPctMV, "change", (v) => setClimbPct(Math.round(v)));

  // Stage 4 ("So Close") — right where the text turns ("And we didn't make
  // it."), her grip slips and she slides down the slope before catching
  // herself: climb -> knocked (falling) -> rise (recovering) -> climb.
  const fallX = useTransform(progress, [0.6, 0.64, 0.7, 0.73, 0.76], [0, 30, 34, 6, 0]);
  const fallY = useTransform(progress, [0.6, 0.64, 0.7, 0.73, 0.76], [0, 60, 64, 12, 0]);
  const fallRot = useTransform(progress, [0.6, 0.64, 0.7, 0.73, 0.76], [0, -24, -20, -4, 0]);
  const [heroineState, setHeroineState] = useState("climb");
  useMotionValueEvent(progress, "change", (v) => {
    setHeroineState(v < 0.63 ? "climb" : v < 0.71 ? "knocked" : v < 0.76 ? "rise" : "climb");
  });

  return (
    <Stage vh={820} id="mountain" stageRef={ref} className="bg-quest-navy-deep">
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

      {/* the heroine, climbing — and, at "So Close", almost losing her grip */}
      <motion.div style={{ x: fallX, y: fallY, rotate: fallRot }} className="absolute bottom-[16%] left-[30%] z-20 will-change-transform">
        <Heroine state={heroineState} facing="right" size={110} />
      </motion.div>

      {/* opening narration — the problem, before the climb begins */}
      <motion.div style={{ opacity: narrationOp, x: "-50%", y: narrationY }} className="absolute left-1/2 top-[26%] z-30 w-[88vw] max-w-[560px] hud-glass rpg-border scanlines px-6 py-6 sm:px-8 sm:py-7 will-change-transform">
        <div className="font-display text-[9px] text-quest-gold tracking-[0.3em] mb-3">THE PROBLEM</div>
        <div className="font-pixel text-lg sm:text-2xl leading-snug text-white">{MOUNTAIN.narration}</div>
      </motion.div>

      {/* the real story, told as five large beats up the mountain */}
      <StoryBeat progress={progress} range={[0.18, 0.29]} tag={ST[0].tag} title={ST[0].title} text={ST[0].text} tone={ST[0].tone} />
      <StoryBeat progress={progress} range={[0.31, 0.45]} tag={ST[1].tag} title={ST[1].title} text={ST[1].text} tone={ST[1].tone} />
      <StoryBeat progress={progress} range={[0.47, 0.57]} tag={ST[2].tag} title={ST[2].title} text={ST[2].text} tone={ST[2].tone} />
      <StoryBeat progress={progress} range={[0.59, 0.75]} tag={ST[3].tag} title={ST[3].title} text={ST[3].text} tone={ST[3].tone} />
      <StoryBeat progress={progress} range={[0.77, 0.9]} tag={ST[4].tag} title={ST[4].title} text={ST[4].text} tone={ST[4].tone} />

      {/* one continuous climb-progress bar for the whole chapter, instead of
          each card resetting its own — it only ever rises, at the exact
          checkpoints given (15% / 35% / 68%), ending at the summit. */}
      <div className="absolute top-16 sm:top-4 left-1/2 -translate-x-1/2 z-40 w-[80vw] max-w-[380px] hud-glass border border-quest-ice/50 px-4 py-2 scanlines pointer-events-none">
        <div className="flex justify-between font-display text-[8px] text-quest-ice mb-1.5">
          <span>THE CLIMB</span>
          <span>{climbPct}%</span>
        </div>
        <div className="h-2.5 bg-quest-navy-deep border border-quest-ice/40 overflow-hidden">
          <motion.div style={{ width: climbBarWidth }} className="h-full bg-gradient-to-r from-quest-ice to-quest-gold" />
        </div>
      </div>

      {/* the cliffhanger, right at the summit */}
      <motion.div style={{ opacity: cliffOp }} className="absolute left-1/2 top-[22%] -translate-x-1/2 z-30 text-center pointer-events-none px-4">
        <div className="font-display text-[9px] text-quest-crimson tracking-widest mb-2">SUMMIT REACHED</div>
        <motion.div animate={{ opacity: [1, 0.55, 1] }} transition={{ duration: 1.6, repeat: Infinity }} className="font-pixel text-2xl sm:text-4xl text-white text-shadow-pixel">
          {MOUNTAIN.cliffhanger}
        </motion.div>
      </motion.div>

      {/* something enormous on the horizon */}
      <motion.div style={{ opacity: dragonOp }} className="absolute right-[16%] top-[6%] z-10">
        <Dragon state="fly" silhouette size={130} />
      </motion.div>
      <motion.div style={{ opacity: dragonOp }} className="absolute left-1/2 top-[42%] -translate-x-1/2 z-30 pointer-events-none">
        <div className="font-pixel text-xl text-white/80 animate-flicker">{MOUNTAIN.dragonReveal}</div>
      </motion.div>

      {/* chapter title */}
      <motion.div style={{ opacity: titleOp }} className="absolute top-[12%] left-1/2 -translate-x-1/2 z-30 text-center">
        <div className="font-display text-[9px] text-white/60 tracking-[0.3em]">CHAPTER II</div>
        <div className="font-pixel text-4xl text-white text-shadow-pixel">THE CLIMB</div>
      </motion.div>
    </Stage>
  );
}
