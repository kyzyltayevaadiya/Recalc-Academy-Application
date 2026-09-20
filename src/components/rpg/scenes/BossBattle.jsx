import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image } from "@/components/ui/image";
import { DRAGON, IMAGE_URLS } from "@/lib/questData";
import ChapterHeading from "@/components/rpg/ChapterHeading";
import PlayerCharacter from "@/components/rpg/PlayerCharacter";
import ParticleField from "@/components/rpg/ParticleField";

export default function BossBattle({ onAchievement }) {
  const [round, setRound] = useState(0);
  const [defeated, setDefeated] = useState(false);

  const advance = () => {
    if (round < DRAGON.rounds.length - 1) {
      setRound(round + 1);
    } else {
      setDefeated(true);
      onAchievement?.("dragon");
    }
  };

  const hpMax = DRAGON.rounds.length;
  const hp = hpMax - round;

  return (
    <section id="dragon" className="relative min-h-screen w-full overflow-hidden scanlines"
      style={{ background: "linear-gradient(to bottom, #1A0A0A 0%, #2a0a0a 50%, #1A0A0A 100%)" }}>
      {/* Dragon backdrop */}
      <div className="absolute inset-0 opacity-50">
        <Image src={IMAGE_URLS.dragon} alt="A colossal volcanic dragon" fittingType="fill" className="w-full h-full pixelated" />
        <div className="absolute inset-0 bg-gradient-to-b from-quest-navy-deep/60 via-transparent to-black/90" />
      </div>
      <ParticleField variant="embers" count={40} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-20">
        <ChapterHeading chapter={DRAGON.chapter} title={DRAGON.title} accent="text-quest-ember" />

        {/* Boss health bar */}
        <div className="hud-glass border-2 border-quest-crimson p-4 mb-8 scanlines">
          <div className="flex items-center justify-between mb-2">
            <span className="font-display text-[10px] text-quest-crimson">BOSS — {DRAGON.bossName}</span>
            <span className="font-pixel text-base text-white">HP {hp}/{hpMax}</span>
          </div>
          <div className="h-5 bg-quest-navy-deep border-2 border-quest-crimson/60 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-quest-crimson via-quest-ember to-quest-gold"
              animate={{ width: `${(hp / hpMax) * 100}%` }}
              transition={{ duration: 0.6 }}
            />
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-body text-lg text-white/80 leading-relaxed text-center mb-10 max-w-2xl mx-auto"
        >
          {DRAGON.intro}
        </motion.p>

        {/* Battle rounds */}
        <div className="space-y-4 mb-10">
          {DRAGON.rounds.slice(0, round + (defeated ? 0 : 1)).map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="grid sm:grid-cols-2 gap-3"
            >
              <div className="hud-glass border-2 border-quest-crimson/70 p-4">
                <div className="font-display text-[8px] text-quest-crimson mb-1">DRAGON ATTACK</div>
                <div className="font-pixel text-xl text-quest-ember">{r.attack}</div>
              </div>
              <div className="hud-glass border-2 border-quest-gold/70 p-4">
                <div className="font-display text-[8px] text-quest-gold mb-1">YOUR RESPONSE</div>
                <div className="font-pixel text-xl text-quest-gold">{r.response}</div>
                <div className="font-body text-sm text-white/70 mt-2 leading-relaxed">{r.detail}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Result / transformation */}
        <AnimatePresence>
          {defeated && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="hud-glass rpg-border p-6 mb-6 scanlines">
                <div className="font-display text-[10px] text-quest-gold mb-2">RESULT</div>
                <div className="font-body text-base text-white/90 leading-relaxed mb-4">{DRAGON.result}</div>
                <div className="font-pixel text-xl text-quest-gold leading-snug">{DRAGON.transformation}</div>
              </div>
              <div className="flex items-center justify-center gap-4">
                <PlayerCharacter state="idle" size={70} />
                <span className="text-5xl animate-float-slow">🐉</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!defeated && (
          <div className="flex justify-center">
            <button
              onClick={advance}
              className="font-display text-[10px] text-quest-navy bg-quest-gold px-6 py-3 hover:bg-white transition-colors border-2 border-quest-gold"
            >
              {round < hpMax - 1 ? "▶ ATTACK" : "▶ FINAL STRIKE"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}