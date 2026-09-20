import React from "react";
import { motion } from "framer-motion";
import { QUESTLOG } from "@/lib/questData";
import ChapterHeading from "@/components/rpg/ChapterHeading";

export default function QuestLog() {
  return (
    <section id="questlog" className="relative min-h-screen w-full overflow-hidden py-20 px-4 scanlines bg-quest-navy">
      <div className="relative z-10 max-w-3xl mx-auto">
        <ChapterHeading chapter="RECORD" title={QUESTLOG.title} />

        <div className="space-y-4 mb-10">
          {QUESTLOG.completed.map((q, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="hud-glass border-l-4 border-quest-terminal/70 p-4"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="font-pixel text-quest-terminal text-lg">✓</span>
                <span className="font-display text-[9px] text-quest-terminal">QUEST COMPLETED</span>
              </div>
              <div className="font-pixel text-lg text-white">{q.name}</div>
              <div className="font-body text-sm text-white/60 mt-1">{q.date} — {q.detail}</div>
            </motion.div>
          ))}
        </div>

        {/* Current quest */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="hud-glass border-2 border-quest-gold p-5 mb-4 scanlines"
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="font-pixel text-quest-gold text-lg animate-pulse">◉</span>
            <span className="font-display text-[9px] text-quest-gold">CURRENT QUEST</span>
          </div>
          <div className="font-pixel text-xl text-white">{QUESTLOG.current}</div>
        </motion.div>

        {/* Next objective */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="hud-glass border-2 border-quest-gold/50 p-5 text-center"
        >
          <div className="font-display text-[9px] text-quest-gold/70 mb-1">NEXT OBJECTIVE</div>
          <div className="font-pixel text-2xl text-quest-gold text-shadow-glow">{QUESTLOG.next}</div>
        </motion.div>
      </div>
    </section>
  );
}