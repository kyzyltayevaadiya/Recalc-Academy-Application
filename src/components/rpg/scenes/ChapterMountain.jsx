import React from "react";
import { motion } from "framer-motion";
import { MOUNTAIN } from "@/lib/questData";
import ChapterHeading from "@/components/rpg/ChapterHeading";
import PlayerCharacter from "@/components/rpg/PlayerCharacter";
import ParticleField from "@/components/rpg/ParticleField";

export default function ChapterMountain() {
  return (
    <section id="mountain" className="relative w-full overflow-hidden scanlines"
      style={{ background: "linear-gradient(to bottom, #1a2040 0%, #2a2a5a 40%, #4a4a7a 70%, #cfe3ff 100%)" }}>
      <ParticleField variant="snow" count={50} />

      {/* Parallax mountain layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-1/2 opacity-40"
          style={{ background: "radial-gradient(ellipse at 50% 100%, #3D2B6E 0%, transparent 70%)" }} />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 pt-24 pb-16">
        <ChapterHeading chapter={MOUNTAIN.chapter} title={MOUNTAIN.title} accent="text-quest-ice" />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-body text-lg text-white/85 leading-relaxed text-center mb-16"
        >
          {MOUNTAIN.body}
        </motion.p>

        {/* Checkpoints as a vertical climb */}
        <div className="relative pl-8 sm:pl-16">
          {/* Vertical path */}
          <div className="absolute left-3 sm:left-7 top-0 bottom-0 w-1 bg-gradient-to-b from-quest-gold/20 via-quest-gold/50 to-quest-gold" />

          {MOUNTAIN.checkpoints.map((cp, i) => (
            <motion.div
              key={cp.tag}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="relative mb-12 last:mb-0"
            >
              {/* Node */}
              <div className="absolute -left-8 sm:-left-16 top-1 w-6 h-6 sm:w-8 sm:h-8 bg-quest-gold border-2 border-quest-navy rounded-full flex items-center justify-center font-display text-[8px] text-quest-navy">
                {i + 1}
              </div>
              <div className="hud-glass border-2 border-quest-ice/40 hover:border-quest-ice p-5 transition-colors">
                <div className="font-display text-[9px] text-quest-ice mb-1">{cp.tag}</div>
                <div className="font-pixel text-xl text-white mb-2">{cp.title}</div>
                <div className="font-body text-base text-white/75 leading-relaxed">{cp.text}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summit character looking out */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mt-16"
        >
          <PlayerCharacter state="idle" size={80} />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-6 font-pixel text-xl text-quest-gold text-center text-shadow-glow"
          >
            {MOUNTAIN.dragonReveal}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl mt-4 animate-float-slow"
          >
            🐉
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}