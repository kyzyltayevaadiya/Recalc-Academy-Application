import React, { useRef, useState } from "react";
import { motion, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Stage, { useStage } from "@/components/rpg/scroll/Stage";
import Heroine from "@/components/rpg/Heroine";
import Dragon from "@/components/rpg/Dragon";
import ParticleField from "@/components/rpg/ParticleField";
import { DRAGON } from "@/lib/questData";

// Scroll-controlled timeline. Each scroll segment advances the fight.
const BEATS = [
  [0.0, "intro"], [0.05, "atk1"], [0.12, "dodge1"], [0.18, "slash1"],
  [0.25, "atk2"], [0.30, "knock2"], [0.36, "rise2"], [0.44, "atk3"],
  [0.52, "fallen"], [0.60, "tryagain"], [0.66, "rise3"], [0.72, "atk4"],
  [0.78, "combo"], [0.86, "collapse"], [0.92, "tame"], [0.97, "achieve"],
];

const GIRL_STATE = {
  intro: "idle", atk1: "dodge", dodge1: "dodge", slash1: "attack",
  atk2: "dodge", knock2: "knocked", rise2: "attack", atk3: "knocked",
  fallen: "knocked", tryagain: "knocked", rise3: "rise", atk4: "dodge",
  combo: "attack", collapse: "walk", tame: "discover", achieve: "celebrate",
};

const CHALLENGES = {
  atk1: "NO ROADMAP", atk2: "LIMITED RESOURCES", atk3: "FAILURE", atk4: "UNCERTAINTY",
};
const ABILITIES = {
  dodge1: "INITIATIVE", rise2: "ADAPT", rise3: "ITERATION", combo: "LEARN → ADAPT → BUILD",
};

function Flash({ beat }) {
  return (
    <AnimatePresence mode="wait">
      {CHALLENGES[beat] && (
        <motion.div key={`c-${beat}`} initial={{ scale: 1.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 16 }}
          className="absolute left-1/2 top-[16%] -translate-x-1/2 z-30 text-center pointer-events-none">
          <div className="font-display text-[8px] text-quest-crimson tracking-[0.4em]">CHALLENGE</div>
          <div className="font-pixel text-4xl sm:text-6xl text-[#ff5a4a] text-shadow-pixel">{CHALLENGES[beat]}</div>
        </motion.div>
      )}
      {ABILITIES[beat] && (
        <motion.div key={`a-${beat}`} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 16 }}
          className="absolute left-1/2 top-[38%] -translate-x-1/2 z-30 text-center pointer-events-none">
          <div className="font-display text-[8px] text-quest-gold tracking-[0.4em]">ABILITY UNLOCKED</div>
          <div className="font-pixel text-3xl sm:text-5xl text-quest-gold text-shadow-glow">{ABILITIES[beat]}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// WOW 4: the full animated 4-phase boss battle, ending not in a kill but in taming.
export default function BossBattleCinematic({ onAchievement }) {
  const { ref, progress } = useStage();
  const [beat, setBeat] = useState("intro");
  const tamed = useRef(false);
  useMotionValueEvent(progress, "change", (v) => {
    const b = BEATS.filter(([, t]) => v >= t).pop();
    if (b && b[1] !== beat) setBeat(b[1]);
    if (v > 0.97 && !tamed.current) {
      tamed.current = true;
      onAchievement?.("dragon");
    }
  });

  // dragon choreography
  const dX = useTransform(progress,
    [0, 0.05, 0.10, 0.14, 0.25, 0.30, 0.34, 0.44, 0.50, 0.54, 0.72, 0.78, 0.82, 1],
    [0, -60, 80, 0, -30, 50, 0, -80, 40, 0, -50, 30, 0, 0]);
  const dY = useTransform(progress,
    [0, 0.06, 0.12, 0.28, 0.33, 0.48, 0.53, 0.75, 0.80, 0.86, 1],
    [0, 110, 0, 90, 0, 140, 0, 80, 0, 230, 230]);
  const dRot = useTransform(progress, [0.86, 0.9, 1], [0, 12, 12]);

  // heroine choreography
  const gX = useTransform(progress,
    [0, 0.06, 0.10, 0.18, 0.24, 0.30, 0.36, 0.42, 0.44, 0.50, 0.52, 0.64, 0.70, 0.78, 0.84, 0.90, 0.93, 1],
    [0, 60, 0, 50, 0, -70, -70, -30, -30, -120, -120, -120, -70, -70, -40, -20, 110, 110]);
  const gRot = useTransform(progress,
    [0, 0.06, 0.10, 0.30, 0.34, 0.36, 0.42, 0.46, 0.50, 0.52, 0.64, 0.70, 1],
    [0, -16, 0, 0, 74, 74, 0, 0, 80, 80, 80, 0, 0]);

  // health bars
  const bossHp = useTransform(progress, [0.05, 0.24, 0.26, 0.43, 0.45, 0.71, 0.73, 0.85, 0.86, 1], [100, 100, 75, 75, 50, 50, 25, 25, 0, 0]);
  const girlHp = useTransform(progress, [0, 0.30, 0.34, 0.50, 0.54, 1], [100, 100, 55, 55, 25, 25]);
  const bossW = useTransform(bossHp, (v) => `${v}%`);
  const girlW = useTransform(girlHp, (v) => `${v}%`);

  // atmosphere
  const quietOp = useTransform(progress, [0.52, 0.57, 0.62, 0.66], [0, 0.55, 0.55, 0]);
  const fireOn = ["atk1", "atk2", "atk3", "atk4"].includes(beat);
  const dragonMode = beat === "achieve" || beat === "tame" ? "calm" : "hostile";
  const shake = beat === "atk3" ? { x: [0, -12, 12, -8, 8, -4, 0], y: [0, 6, -4, 2, 0] }
    : beat === "collapse" ? { x: [0, -10, 10, -6, 6, 0] } : { x: 0, y: 0 };

  return (
    <Stage vh={520} id="battle" stageRef={ref} className="bg-quest-navy-deep">
      <motion.div animate={shake} transition={{ duration: 0.5 }} className="absolute inset-0">
        {/* burning battlefield sky */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #1a0f2a 0%, #3d1220 55%, #140a18 100%)" }} />
        <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[70vw] h-[24vh] bg-quest-ember/20 blur-3xl rounded-full" />
        {/* ridge silhouettes */}
        <svg viewBox="0 0 200 40" preserveAspectRatio="none" className="absolute bottom-[18%] left-0 w-full h-[26%] opacity-70">
          <polygon points="0,40 30,18 60,40 90,10 130,40 160,22 200,40" fill="#0d0a1a" />
        </svg>
        <div className="absolute bottom-0 left-0 right-0 h-[20%]" style={{ background: "linear-gradient(to bottom, #0d0a1a, #05030a)" }} />
        {/* smoke + embers */}
        {[0, 1].map((i) => (
          <motion.div key={i} className="absolute bottom-[16%] w-[36vw] h-[20vh] bg-black/30 blur-3xl rounded-full"
            style={{ left: `${15 + i * 45}%` }}
            animate={{ x: [0, 40, 0], opacity: [0.2, 0.45, 0.2] }}
            transition={{ duration: 6 + i * 2, repeat: Infinity, ease: "easeInOut" }} />
        ))}
        <ParticleField variant="embers" count={22} />

        {/* the dragon */}
        <motion.div style={{ x: dX, y: dY, rotate: dRot }} className="absolute right-[4%] sm:right-[10%] top-[6%] z-10 will-change-transform">
          <Dragon state={dragonMode} facing="left" size="min(46vw, 520px)" showFire={fireOn} />
        </motion.div>

        {/* the heroine */}
        <motion.div style={{ x: gX, rotate: gRot }} className="absolute left-[8%] sm:left-[12%] bottom-[12%] z-20 will-change-transform">
          <Heroine state={GIRL_STATE[beat] || "idle"} facing="right" size={118} />
        </motion.div>

        {/* boss UI — top */}
        <div className="absolute top-[4%] left-1/2 -translate-x-1/2 z-30 w-[80vw] sm:w-[520px] hud-glass border-2 border-quest-crimson/60 px-4 py-3 scanlines pointer-events-none">
          <div className="flex justify-between font-display text-[8px] sm:text-[10px] mb-2">
            <span className="text-quest-crimson">🐉 {DRAGON.title} DRAGON</span>
            <span className="text-white/60">{DRAGON.bossName}</span>
          </div>
          <div className="h-4 bg-quest-navy-deep border-2 border-quest-gold/40 overflow-hidden">
            <motion.div style={{ width: bossW }} className="h-full bg-gradient-to-r from-quest-ember via-quest-crimson to-[#8a0f22]" />
          </div>
        </div>

        {/* heroine HP — bottom left */}
        <div className="absolute bottom-[5%] left-[4%] z-30 w-44 hud-glass border border-quest-gold/50 px-3 py-2 scanlines pointer-events-none">
          <div className="font-display text-[8px] text-quest-gold mb-1">❤ {DRAGON.bossName === "UNCERTAINTY" ? "FOUNDER" : "FOUNDER"}</div>
          <div className="h-2.5 bg-quest-navy-deep border border-quest-gold/40 overflow-hidden">
            <motion.div style={{ width: girlW }} className="h-full bg-gradient-to-r from-quest-terminal to-emerald-500" />
          </div>
        </div>

        {/* challenge / ability flashes */}
        <Flash beat={beat} />

        {/* combo: LEARN → ADAPT → BUILD */}
        <AnimatePresence>
          {beat === "combo" && (
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="absolute left-1/2 top-[34%] -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none">
              {["LEARN", "ADAPT", "BUILD"].map((w, i) => (
                <motion.div key={w} initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.35 }}
                  className="font-pixel text-2xl sm:text-4xl text-quest-gold text-shadow-glow">↓ {w}</motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* failure — everything goes quiet */}
        <motion.div style={{ opacity: quietOp }} className="absolute inset-0 bg-black pointer-events-none" />
        <AnimatePresence>
          {beat === "fallen" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 text-center pointer-events-none">
              <div className="font-pixel text-3xl text-white/50">the world went quiet…</div>
            </motion.div>
          )}
          {beat === "tryagain" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute left-1/2 top-[30%] -translate-x-1/2 z-30 text-center hud-glass border-2 border-white/40 px-8 py-5 scanlines pointer-events-none">
              <div className="font-display text-lg sm:text-2xl text-white">TRY AGAIN?</div>
              <motion.div className="font-pixel text-2xl text-quest-terminal mt-2" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.7, repeat: Infinity }}>
                ▶ YES
              </motion.div>
            </motion.div>
          )}
          {beat === "intro" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute left-1/2 bottom-[16%] -translate-x-1/2 z-30 max-w-md text-center hud-glass border-2 border-quest-crimson/50 px-5 py-4 scanlines pointer-events-none">
              <div className="font-pixel text-xl text-white leading-snug">{DRAGON.intro}</div>
              <div className="font-display text-[8px] text-quest-gold mt-2 animate-pulse">SCROLL TO CONTINUE THE FIGHT</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* the taming */}
        <AnimatePresence>
          {beat === "tame" && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="absolute left-1/2 top-[14%] -translate-x-1/2 z-30 text-center pointer-events-none">
              <div className="font-pixel text-2xl sm:text-4xl text-quest-ice text-shadow-pixel">she reached out…</div>
            </motion.div>
          )}
          {beat === "achieve" && (
            <motion.div initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              className="absolute left-1/2 top-[10%] -translate-x-1/2 z-30 text-center hud-glass rpg-border px-8 py-5 scanlines pointer-events-none">
              <div className="font-display text-[9px] text-quest-gold tracking-[0.3em]">ACHIEVEMENT UNLOCKED</div>
              <div className="font-pixel text-3xl sm:text-5xl text-quest-gold text-shadow-glow mt-1">TAMED THE UNKNOWN</div>
              <div className="font-body text-sm text-white/80 mt-3 max-w-md">{DRAGON.transformation}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Stage>
  );
}