import React, { useState } from "react";
import { motion } from "framer-motion";
import { FOREST } from "@/lib/questData";
import ChapterHeading from "@/components/rpg/ChapterHeading";
import Heroine from "@/components/rpg/Heroine";
import ParticleField from "@/components/rpg/ParticleField";

export default function ChapterForest() {
  const [chosen, setChosen] = useState(false);

  return (
    <section id="forest" className="relative min-h-screen w-full overflow-hidden py-20 px-4 scanlines"
      style={{ background: "linear-gradient(to bottom, #0a1a14 0%, #0d2a1c 50%, #06160f 100%)" }}>
      {/* Tree silhouettes — parallax layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-2/3 opacity-30"
          style={{ background: "radial-gradient(ellipse at 30% 100%, #1a3a28 0%, transparent 60%)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 opacity-50"
          style={{ background: "radial-gradient(ellipse at 70% 100%, #0d2a1c 0%, transparent 70%)" }} />
      </div>
      <ParticleField variant="leaves" count={30} />

      <div className="relative z-10 max-w-4xl mx-auto">
        <ChapterHeading chapter={FOREST.chapter} title={FOREST.title} accent="text-emerald-300" />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-body text-lg text-white/80 leading-relaxed text-center max-w-2xl mx-auto mb-12 whitespace-pre-line"
        >
          {FOREST.body}
        </motion.p>

        {/* Branching roads */}
        {!chosen ? (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <div className="font-display text-[9px] sm:text-xs text-quest-gold tracking-[0.3em] mb-2">{FOREST.forkLabel}</div>
              <div className="font-pixel text-xl text-white">{FOREST.forkIntro}</div>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {FOREST.roads.map((road, i) => {
                const isUnknown = road.label === FOREST.chosen;
                return (
                  <motion.button
                    key={road.label}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    onClick={() => isUnknown && setChosen(true)}
                    className={`hud-glass border-2 p-6 text-left transition-colors ${
                      isUnknown
                        ? "border-quest-gold/60 hover:border-quest-gold cursor-pointer"
                        : "border-white/20 opacity-60"
                    }`}
                  >
                    <div className="font-display text-sm text-white mb-2">{road.label} →</div>
                    <div className="font-body text-sm text-white/70">{road.desc}</div>
                    {isUnknown && <div className="font-pixel text-base text-quest-gold mt-3">▶ take this path</div>}
                  </motion.button>
                );
              })}
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >
            <motion.div
              initial={{ x: 120, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="hud-glass border-2 border-quest-gold px-5 py-3 mb-8 inline-block scanlines"
              role="log"
              aria-live="polite"
            >
              <span className="font-display text-[10px] text-quest-gold">NOTIFICATION</span>
              <div className="font-pixel text-2xl text-white">{FOREST.notification}</div>
            </motion.div>

            <div className="space-y-4">
              {FOREST.decisions.map((d, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="hud-glass border-l-4 border-emerald-400/60 p-4"
                >
                  <div className="font-display text-[9px] text-emerald-300 mb-1">DECISION {i + 1}</div>
                  <div className="font-body text-base text-white/85 leading-relaxed">{d}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <div className="flex justify-center mt-12">
          <Heroine state={chosen ? "walk" : "read"} size={80} />
        </div>
      </div>
    </section>
  );
}