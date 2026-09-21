import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LOOT, ARTIFACT } from "@/lib/questData";
import ChapterHeading from "@/components/rpg/ChapterHeading";
import Heroine from "@/components/rpg/Heroine";
import govLetter from "@/assets/gov-letter.png";

// scattered around the sealed original to sell it as the rarest pull from the chest
const SPARKLES = [
  { glyph: "✦", style: { top: "-12px", left: "-10px", fontSize: "20px" }, delay: 0 },
  { glyph: "✧", style: { top: "-16px", right: "18%", fontSize: "13px" }, delay: 0.6 },
  { glyph: "⋆", style: { top: "22%", right: "-14px", fontSize: "15px" }, delay: 1.2 },
  { glyph: "✦", style: { bottom: "-12px", right: "-10px", fontSize: "20px" }, delay: 0.3 },
  { glyph: "✧", style: { bottom: "-16px", left: "22%", fontSize: "13px" }, delay: 0.9 },
  { glyph: "⋆", style: { top: "55%", left: "-14px", fontSize: "15px" }, delay: 1.5 },
];

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
        <ChapterHeading chapter="CHAPTER IV" title="THE TREASURE" accent="text-quest-gold" />

        {/* Treasure chest */}
        <div className="flex flex-col items-center mb-12">
          <button onClick={open} className="select-none" aria-label="Open treasure chest">
            <Heroine state={opened ? "celebrate" : "open"} size={110} />
          </button>
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

              {/* Rarest find in the chest: the government's own seal on the work */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ type: "spring", stiffness: 160, damping: 18 }}
                className="relative pt-2"
              >
                <div className="text-center mb-6">
                  <div className="font-display text-[9px] text-quest-gold tracking-[0.3em] animate-pulse">✦ LEGENDARY ITEM FOUND ✦</div>
                  <div className="font-pixel text-2xl sm:text-3xl text-white text-shadow-glow mt-1">{ARTIFACT.name}</div>
                  <div className="font-body text-sm text-white/60 mt-1">{ARTIFACT.subtitle}</div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 items-start max-w-4xl mx-auto">
                  {/* the sealed original, framed like the rarest pull from the chest */}
                  <div
                    className="relative p-3 sm:p-4 scanlines"
                    style={{
                      background: "linear-gradient(160deg, #cdae74 0%, #b8945a 45%, #a3803f 100%)",
                      boxShadow: "0 0 0 3px #0b0f1a, 0 0 0 6px rgba(253,184,19,0.85), 0 0 0 9px #0b0f1a, inset 0 0 50px rgba(70,42,10,0.55), 0 0 40px rgba(253,184,19,0.35)",
                    }}
                  >
                    {SPARKLES.map((s, i) => (
                      <span
                        key={i}
                        className="absolute text-quest-gold animate-twinkle select-none pointer-events-none leading-none"
                        style={{ ...s.style, animationDelay: `${s.delay}s` }}
                      >
                        {s.glyph}
                      </span>
                    ))}
                    <img src={govLetter} alt="Signed government conclusion on the autism-screening pilot" className="relative w-full h-auto block" />
                  </div>

                  {/* translated for those who can't read the original */}
                  <div
                    className="relative hud-glass border-2 border-quest-gold/60 p-5 sm:p-6 scanlines"
                    style={{ boxShadow: "0 0 30px rgba(253,184,19,0.25)" }}
                  >
                    <span className="absolute top-2 left-2 text-quest-gold/70 text-sm leading-none select-none">✦</span>
                    <span className="absolute top-2 right-2 text-quest-gold/70 text-sm leading-none select-none">✦</span>
                    <span className="absolute bottom-2 left-2 text-quest-gold/70 text-sm leading-none select-none">✦</span>
                    <span className="absolute bottom-2 right-2 text-quest-gold/70 text-sm leading-none select-none">✦</span>

                    <div className="font-display text-[8px] text-quest-gold tracking-[0.3em] mb-3 text-center">TRANSLATED RECORD</div>
                    <div className="font-pixel text-lg text-white leading-snug text-center mb-4">{ARTIFACT.translation.heading}</div>
                    <div className="space-y-3 font-body text-sm text-white/85 leading-relaxed">
                      {ARTIFACT.translation.paragraphs.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                    <div className="font-pixel text-base text-quest-gold/90 text-right mt-5">— {ARTIFACT.translation.signOff}</div>
                  </div>
                </div>
              </motion.div>

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