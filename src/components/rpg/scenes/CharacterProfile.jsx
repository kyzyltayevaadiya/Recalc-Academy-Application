import React from "react";
import { motion } from "framer-motion";
import { PROFILE } from "@/lib/questData";
import PlayerCharacter from "@/components/rpg/PlayerCharacter";
import ParticleField from "@/components/rpg/ParticleField";

function StatBar({ label, value, max }) {
  return (
    <div>
      <div className="flex justify-between font-pixel text-base text-white/80 mb-1">
        <span>{label}</span>
        <span className="text-quest-gold">{value}/{max}</span>
      </div>
      <div className="h-3 bg-quest-navy-deep border border-quest-gold/40 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-quest-gold-deep to-quest-gold"
          initial={{ width: 0 }}
          whileInView={{ width: `${(value / max) * 100}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function CharacterProfile() {
  return (
    <section id="profile" className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-quest-navy-deep to-quest-navy py-20 px-4 scanlines">
      <ParticleField variant="stars" count={40} />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-[10px] text-quest-gold mb-3 tracking-widest text-center"
        >
          CHARACTER PROFILE
        </motion.div>

        <div className="grid md:grid-cols-[auto_1fr] gap-8 items-start">
          {/* Portrait card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="hud-glass rpg-border p-6 scanlines"
          >
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-b from-quest-purple/40 to-quest-navy-deep p-4 border-2 border-quest-gold/40">
                <PlayerCharacter state="idle" size={120} />
              </div>
            </div>
            <div className="space-y-2 font-pixel text-lg">
              <div>
                <span className="text-quest-gold text-base">NAME</span>
                <div className="text-white">{PROFILE.name}</div>
              </div>
              <div>
                <span className="text-quest-gold text-base">CLASS</span>
                <div className="text-white text-base">{PROFILE.class}</div>
              </div>
              <div>
                <span className="text-quest-gold text-base">LEVEL</span>
                <div className="text-white text-base">{PROFILE.level}</div>
              </div>
              <div>
                <span className="text-quest-gold text-base">LOCATION</span>
                <div className="text-white text-base">{PROFILE.location}</div>
              </div>
            </div>
          </motion.div>

          {/* Stats + intro */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6">
              <div className="font-display text-[10px] text-quest-gold mb-2">CURRENT QUEST</div>
              <div className="font-pixel text-xl text-white">{PROFILE.currentQuest}</div>
            </div>

            <p className="font-body text-lg text-white/80 leading-relaxed mb-8 border-l-2 border-quest-gold/50 pl-4">
              {PROFILE.intro}
            </p>

            <div className="font-display text-[10px] text-quest-gold mb-4">CHARACTER TRAITS</div>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {PROFILE.traits.map((t) => (
                <StatBar key={t.label} {...t} />
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a href={PROFILE.links.cv} className="font-display text-[10px] text-quest-navy bg-quest-gold px-5 py-3 hover:bg-white transition-colors">▶ VIEW CV</a>
              <a href={PROFILE.links.linkedin} target="_blank" rel="noreferrer" className="font-display text-[10px] text-quest-gold border-2 border-quest-gold/60 hover:border-quest-gold px-5 py-3 transition-colors">LINKEDIN</a>
              <a href="#origin" className="font-display text-[10px] text-white/70 border-2 border-white/30 hover:border-white px-5 py-3 transition-colors">CONTINUE QUEST ↓</a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}