import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FINALE } from "@/lib/questData";
import Heroine from "@/components/rpg/Heroine";
import ParticleField from "@/components/rpg/ParticleField";

export default function FinalScreen() {
  const [stage, setStage] = useState(0); // 0: complete, 1: erase, 2: just beginning

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 2200);
    const t2 = setTimeout(() => setStage(2), 3600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <section id="finale" className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center px-4 scanlines"
      style={{ background: "linear-gradient(to bottom, #1a1a3a 0%, #4a3a1a 50%, #8a5a1a 100%)" }}>
      <ParticleField variant="stars" count={40} />
      <ParticleField variant="fireflies" count={15} />

      <div className="relative z-10 text-center max-w-2xl">
        <div className="flex justify-center mb-8">
          <Heroine state="celebrate" size={100} />
        </div>

        <div className="font-display text-2xl sm:text-3xl text-white text-shadow-pixel mb-2 h-12">
          <AnimatePresence mode="wait">
            {stage === 0 && (
              <motion.div key="complete" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                QUEST COMPLETE?
              </motion.div>
            )}
            {stage === 1 && (
              <motion.div key="erasing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-white/40">
                QUEST COMPLETE?
              </motion.div>
            )}
            {stage === 2 && (
              <motion.div key="beginning" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-quest-gold text-shadow-glow">
                QUEST JUST BEGINNING.
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {stage === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <div className="font-display text-[10px] text-quest-gold/80 mt-6 mb-2">CURRENT OBJECTIVE</div>
            <div className="font-pixel text-3xl text-white mb-10">ACCEPT ME TO {FINALE.academyName}</div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <a href={`mailto:${FINALE.secondary.email}`} className="font-display text-xs text-quest-navy bg-quest-gold px-8 py-4 hover:bg-white transition-colors border-2 border-quest-gold shadow-[0_0_30px_rgba(253,184,19,0.5)]">
                {FINALE.primaryCta}
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to={FINALE.secondary.cv} className="font-display text-[10px] text-quest-gold border-2 border-quest-gold/60 hover:border-quest-gold px-5 py-3 transition-colors">VIEW CV</Link>
              <a href={FINALE.secondary.linkedin} target="_blank" rel="noreferrer" className="font-display text-[10px] text-quest-gold border-2 border-quest-gold/60 hover:border-quest-gold px-5 py-3 transition-colors">LINKEDIN</a>
              <a href={`mailto:${FINALE.secondary.email}`} className="font-display text-[10px] text-quest-gold border-2 border-quest-gold/60 hover:border-quest-gold px-5 py-3 transition-colors">EMAIL ME</a>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="font-pixel text-base text-white/50 mt-12"
            >
              {FINALE.saved}
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}