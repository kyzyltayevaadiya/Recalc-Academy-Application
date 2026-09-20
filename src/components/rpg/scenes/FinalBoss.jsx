import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FINAL_BOSS } from "@/lib/questData";
import ChapterHeading from "@/components/rpg/ChapterHeading";
import ParticleField from "@/components/rpg/ParticleField";

export default function FinalBoss() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="finalboss" className="relative min-h-screen w-full overflow-hidden py-20 px-4 scanlines bg-quest-navy-deep">
      <ParticleField variant="stars" count={50} />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-display text-[10px] text-quest-crimson mb-4 tracking-widest"
        >
          {FINAL_BOSS.title}
        </motion.div>

        {/* Silhouette -> reveal */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="text-8xl mb-6"
        >
          {revealed ? "🪞" : "👤"}
        </motion.div>

        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-xl sm:text-2xl text-white text-shadow-pixel mb-10"
            >
              {FINAL_BOSS.name}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto mb-10 text-left">
          {FINAL_BOSS.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="hud-glass border border-quest-crimson/50 p-3"
            >
              <div className="flex justify-between font-pixel text-base text-white/80 mb-1">
                <span>{s.label}</span>
                <span className="text-quest-crimson">{s.value}/{s.max}</span>
              </div>
              <div className="h-2 bg-quest-navy-deep border border-quest-crimson/30 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-quest-crimson to-quest-ember"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(s.value / s.max) * 100}%` }}
                  viewport={{ once: true }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lines */}
        <div className="space-y-3">
          {FINAL_BOSS.lines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.4 }}
              className="font-pixel text-xl text-white/80 italic"
            >
              "{line}"
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}