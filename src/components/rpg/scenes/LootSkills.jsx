import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LOOT } from "@/lib/questData";
import ChapterHeading from "@/components/rpg/ChapterHeading";

export default function LootSkills({ onAchievement }) {
  const [opened, setOpened] = useState(false);

  const open = () => {
    setOpened(true);
    onAchievement?.("treasure");
  };

  return (
    <section id="loot" className="relative min-h-screen w-full overflow-hidden py-20 px-4 scanlines"
      style={{ background: "linear-gradient(to bottom, #1A2F20 0%, #0d1f14 100%)" }}>
      <div className="relative z-10 max-w-4xl mx-auto">
        <ChapterHeading chapter="CHAPTER V" title="THE TREASURE" accent="text-quest-gold" />

        {/* Treasure chest */}
        <div className="flex flex-col items-center mb-12">
          <motion.button
            onClick={open}
            whileHover={{ scale: opened ? 1 : 1.05 }}
            className="text-7xl select-none"
            aria-label="Open treasure chest"
          >
            {opened ? "💎" : "🧰"}
          </motion.button>
          {!opened && (
            <div className="font-pixel text-lg text-quest-gold mt-3 animate-float-slow">▶ click to open</div>
          )}
        </div>

        <AnimatePresence>
          {opened && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-10"
            >
              {/* Skills flying out */}
              <div>
                <div className="font-display text-[10px] text-quest-gold text-center mb-4">{LOOT.title}</div>
                <div className="flex flex-wrap justify-center gap-3">
                  {LOOT.skills.map((s, i) => (
                    <motion.div
                      key={s}
                      initial={{ opacity: 0, y: 40, scale: 0.5 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: i * 0.08, type: "spring", stiffness: 200 }}
                      className="hud-glass border-2 border-quest-gold/60 px-4 py-2 font-pixel text-lg text-white"
                    >
                      + {s}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* XP + Level up */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.6 }}
                  className="hud-glass border-2 border-quest-gold px-6 py-3 scanlines"
                >
                  <span className="font-pixel text-2xl text-quest-gold">XP +{LOOT.xp}</span>
                </motion.div>
                <motion.div
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, delay: 1 }}
                  className="font-display text-xl text-white text-shadow-glow"
                >
                  LEVEL UP!
                </motion.div>
              </div>

              {/* Skill tree */}
              <div>
                <div className="font-display text-[10px] text-quest-gold text-center mb-6">SKILL TREE</div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {LOOT.tree.map((branch, i) => (
                    <motion.div
                      key={branch.branch}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="hud-glass border-2 border-quest-gold/30 hover:border-quest-gold/70 p-4 transition-colors"
                    >
                      <div className="font-display text-[9px] text-quest-gold mb-3">◆ {branch.branch}</div>
                      <div className="space-y-2">
                        {branch.nodes.map((n, j) => (
                          <div key={j} className="flex items-center gap-2">
                            <span className="text-quest-gold text-sm">●</span>
                            <span className="font-body text-sm text-white/80">{n}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}