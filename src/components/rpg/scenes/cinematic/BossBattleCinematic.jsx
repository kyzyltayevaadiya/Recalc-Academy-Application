import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Stage, { useStage } from "@/components/rpg/scroll/Stage";
import Heroine from "@/components/rpg/Heroine";
import Dragon from "@/components/rpg/Dragon";
import ParticleField from "@/components/rpg/ParticleField";
import { DRAGON } from "@/lib/questData";

const ROUNDS = DRAGON.rounds;

// Pacing: click ATTACK -> the response text shows and waits for CONTINUE
// (reader controls the pace) -> the strike lands -> a short beat before the
// dragon attacks again.
const HIT_HOLD_MS = 900;
const NEXT_ATTACK_DELAY_MS = 750;
const TAME_HOLD_MS = 2200;

const DRAGON_STATE_BY_PHASE = {
  intro: "fly", attack: "fire", response: "fire", hit: "recoil", tame: "calm", achieve: "calm",
};
const GIRL_STATE_BY_PHASE = {
  intro: "idle", attack: "ride", response: "walk", hit: "ride", tame: "idle", achieve: "celebrate",
};

const dragonVariants = {
  intro: { x: 0, y: 0, rotate: 0 },
  attack: { x: -70, y: 12, rotate: -5 },
  response: { x: -40, y: 4, rotate: -2 },
  hit: { x: 65, y: -18, rotate: 10 },
  tame: { x: 0, y: 0, rotate: 0 },
  achieve: { x: 0, y: 0, rotate: 0 },
};
const girlVariants = {
  intro: { x: 0, rotate: 0 },
  attack: { x: 18, rotate: 6 },
  response: { x: -8, rotate: 0 },
  hit: { x: -42, rotate: -10 },
  tame: { x: 0, rotate: 0 },
  achieve: { x: 0, rotate: 0 },
};

// WOW 4: the boss battle, told as a sequence of real challenges. Each round
// the dragon attacks with a problem; she reads it, hits ATTACK, and the
// window reveals what she actually did about it before the counter-strike lands.
export default function BossBattleCinematic({ onAchievement }) {
  const { ref } = useStage();
  const [phase, setPhase] = useState("intro");
  const [roundIndex, setRoundIndex] = useState(0);
  const [bossHp, setBossHp] = useState(100);
  const [girlHp, setGirlHp] = useState(100);
  const tamed = useRef(false);
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const after = (ms, fn) => { timers.current.push(setTimeout(fn, ms)); };

  const startRound = (i) => {
    setRoundIndex(i);
    setPhase("attack");
    setGirlHp((h) => Math.max(40, h - 12));
  };

  const begin = () => startRound(0);

  const handleAttack = () => setPhase("response");

  const handleContinue = () => {
    setPhase("hit");
    setBossHp((h) => Math.max(0, h - 20));
    after(HIT_HOLD_MS, () => {
      const next = roundIndex + 1;
      if (next >= ROUNDS.length) {
        setPhase("tame");
        after(TAME_HOLD_MS, () => {
          setPhase("achieve");
          if (!tamed.current) {
            tamed.current = true;
            onAchievement?.("dragon");
          }
        });
      } else {
        after(NEXT_ATTACK_DELAY_MS, () => startRound(next));
      }
    });
  };

  const round = ROUNDS[roundIndex];
  const shake = phase === "hit" ? { x: [0, -10, 10, -6, 6, 0], y: [0, 4, -3, 2, 0] }
    : phase === "attack" ? { x: [0, -4, 4, -2, 0] } : { x: 0, y: 0 };
  // the curled "calm" pose is low and wide, not tall like the flying poses —
  // anchor it to the ground line instead of the top so it rests on its feet
  // rather than hanging in the sky where the flying poses live.
  const grounded = phase === "tame" || phase === "achieve";

  return (
    <Stage vh={260} id="battle" stageRef={ref} className="bg-quest-navy-deep">
      <motion.div animate={shake} transition={{ duration: 0.5 }} className="absolute inset-0">
        {/* burning battlefield sky */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #1a0f2a 0%, #3d1220 55%, #140a18 100%)" }} />
        <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[70vw] h-[24vh] bg-quest-ember/20 blur-3xl rounded-full" />
        <svg viewBox="0 0 200 40" preserveAspectRatio="none" className="absolute bottom-[18%] left-0 w-full h-[26%] opacity-70">
          <polygon points="0,40 30,18 60,40 90,10 130,40 160,22 200,40" fill="#0d0a1a" />
        </svg>
        <div className="absolute bottom-0 left-0 right-0 h-[20%]" style={{ background: "linear-gradient(to bottom, #0d0a1a, #05030a)" }} />
        {[0, 1].map((i) => (
          <motion.div key={i} className="absolute bottom-[16%] w-[36vw] h-[20vh] bg-black/30 blur-3xl rounded-full"
            style={{ left: `${15 + i * 45}%` }}
            animate={{ x: [0, 40, 0], opacity: [0.2, 0.45, 0.2] }}
            transition={{ duration: 6 + i * 2, repeat: Infinity, ease: "easeInOut" }} />
        ))}
        <ParticleField variant="embers" count={22} />

        {/* impact flashes */}
        <AnimatePresence>
          {phase === "attack" && (
            <motion.div key="atk-flash" initial={{ opacity: 0.55 }} animate={{ opacity: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }} className="absolute inset-0 bg-[#ff3b1f] mix-blend-screen pointer-events-none" />
          )}
          {phase === "hit" && (
            <motion.div key="hit-flash" initial={{ opacity: 0.7 }} animate={{ opacity: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.55 }} className="absolute inset-0 bg-white mix-blend-screen pointer-events-none" />
          )}
        </AnimatePresence>

        {/* the dragon */}
        <motion.div variants={dragonVariants} animate={phase} transition={{ type: "spring", stiffness: 130, damping: 15 }}
          className={`absolute right-[4%] sm:right-[10%] z-10 will-change-transform ${grounded ? "bottom-[16%]" : "top-[6%]"}`}>
          <Dragon state={DRAGON_STATE_BY_PHASE[phase]} facing="left" size="min(46vw, 520px)" />
        </motion.div>

        {/* the heroine */}
        <motion.div variants={girlVariants} animate={phase} transition={{ type: "spring", stiffness: 130, damping: 15 }}
          className="absolute left-[8%] sm:left-[12%] bottom-[12%] z-20 will-change-transform">
          <Heroine state={GIRL_STATE_BY_PHASE[phase]} facing="right" size={118} />
        </motion.div>

        {/* boss UI — top */}
        <div className="absolute top-[4%] left-1/2 -translate-x-1/2 z-30 w-[80vw] sm:w-[520px] hud-glass border-2 border-quest-crimson/60 px-4 py-3 scanlines pointer-events-none">
          <div className="flex justify-between font-display text-[8px] sm:text-[10px] mb-2">
            <span className="text-quest-crimson">🐉 {DRAGON.title} DRAGON</span>
            <span className="text-white/60">{DRAGON.bossName}</span>
          </div>
          <div className="h-4 bg-quest-navy-deep border-2 border-quest-gold/40 overflow-hidden">
            <motion.div animate={{ width: `${bossHp}%` }} transition={{ duration: 0.5 }} className="h-full bg-gradient-to-r from-quest-ember via-quest-crimson to-[#8a0f22]" />
          </div>
        </div>

        {/* heroine HP — bottom left */}
        <div className="absolute bottom-[5%] left-[4%] z-30 w-44 hud-glass border border-quest-gold/50 px-3 py-2 scanlines pointer-events-none">
          <div className="font-display text-[8px] text-quest-gold mb-1">❤ FOUNDER</div>
          <div className="h-2.5 bg-quest-navy-deep border border-quest-gold/40 overflow-hidden">
            <motion.div animate={{ width: `${girlHp}%` }} transition={{ duration: 0.5 }} className="h-full bg-gradient-to-r from-quest-terminal to-emerald-500" />
          </div>
        </div>

        {/* the challenge / response window */}
        <AnimatePresence mode="wait">
          {(phase === "attack" || phase === "response" || phase === "hit") && (
            <motion.div
              key={`${roundIndex}-${phase === "attack" ? "problem" : "resolved"}`}
              initial={{ opacity: 0, x: "-50%", y: 24, scale: 0.96 }}
              animate={{ opacity: 1, x: "-50%", y: 0, scale: 1 }}
              exit={{ opacity: 0, x: "-50%", y: -12 }}
              transition={{ type: "spring", stiffness: 240, damping: 20 }}
              className="absolute left-1/2 bottom-[4%] z-30 w-[80vw] sm:w-[420px] hud-glass border-2 border-quest-crimson/70 px-4 py-4 scanlines text-center"
            >
              <div className="font-display text-[8px] text-white/40 tracking-[0.3em] mb-3">ATTACK {roundIndex + 1} / {ROUNDS.length}</div>

              {phase === "attack" ? (
                <>
                  <div className="font-pixel text-lg sm:text-xl text-[#ff5a4a] text-shadow-pixel leading-snug mb-2">{round.title}</div>
                  <div className="font-display text-[8px] text-quest-crimson/90 tracking-wide mb-2">🐉 {round.tag}</div>
                  <div className="font-body text-xs sm:text-sm text-white/80 leading-relaxed">{round.situation}</div>
                  <button
                    onClick={handleAttack}
                    className="mt-4 font-display text-[10px] sm:text-xs text-quest-navy bg-quest-gold px-5 py-2.5 hover:bg-white transition-colors border-2 border-quest-gold shadow-[0_0_30px_rgba(253,184,19,0.5)] tracking-widest"
                  >
                    ⚔️ ATTACK
                  </button>
                </>
              ) : (
                <>
                  <div className="font-display text-[8px] text-quest-gold tracking-[0.35em] mb-2">HOW SHE RESPONDED</div>
                  <div className="font-body text-xs sm:text-sm text-white/90 leading-relaxed">{round.response}</div>
                  {phase === "response" && (
                    <button
                      onClick={handleContinue}
                      className="mt-4 font-display text-[10px] sm:text-xs text-quest-navy bg-quest-gold px-5 py-2.5 hover:bg-white transition-colors border-2 border-quest-gold shadow-[0_0_30px_rgba(253,184,19,0.5)] tracking-widest"
                    >
                      ▶ CONTINUE
                    </button>
                  )}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* intro */}
        <AnimatePresence>
          {phase === "intro" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute left-1/2 bottom-[16%] -translate-x-1/2 z-30 max-w-md text-center hud-glass border-2 border-quest-crimson/50 px-5 py-4 scanlines">
              <div className="font-pixel text-xl text-white leading-snug">{DRAGON.intro}</div>
              <button
                onClick={begin}
                className="mt-4 font-display text-xs sm:text-sm text-quest-navy bg-quest-gold px-6 py-3 hover:bg-white transition-colors border-2 border-quest-gold shadow-[0_0_30px_rgba(253,184,19,0.5)] tracking-widest"
              >
                ▶ BEGIN
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* the taming */}
        <AnimatePresence>
          {phase === "tame" && (
            <motion.div initial={{ opacity: 0, x: "-50%", scale: 0.9 }} animate={{ opacity: 1, x: "-50%", scale: 1 }} exit={{ opacity: 0, x: "-50%" }}
              className="absolute left-1/2 top-[14%] z-30 text-center pointer-events-none">
              <div className="font-pixel text-2xl sm:text-4xl text-quest-ice text-shadow-pixel">Adiya reached out…</div>
            </motion.div>
          )}
          {phase === "achieve" && (
            <motion.div initial={{ x: "-50%", y: -40, opacity: 0 }} animate={{ x: "-50%", y: 0, opacity: 1 }}
              className="absolute left-1/2 top-[10%] z-30 w-[90vw] sm:w-auto text-center hud-glass rpg-border px-8 py-5 scanlines pointer-events-none">
              <div className="font-display text-[9px] text-quest-gold tracking-[0.3em]">ACHIEVEMENT UNLOCKED</div>
              <div className="font-pixel text-3xl sm:text-5xl text-quest-gold text-shadow-glow mt-1">TAMED THE UNKNOWN</div>
              <div className="font-body text-sm text-white/80 mt-3 max-w-md">{DRAGON.transformation}</div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
                className="font-display text-[9px] text-quest-gold mt-5 animate-pulse">▼ SCROLL TO CONTINUE</motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Stage>
  );
}
