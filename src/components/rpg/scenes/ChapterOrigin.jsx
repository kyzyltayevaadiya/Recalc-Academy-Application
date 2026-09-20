import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ORIGIN } from "@/lib/questData";
import ChapterHeading from "@/components/rpg/ChapterHeading";
import PlayerCharacter from "@/components/rpg/PlayerCharacter";
import ParticleField from "@/components/rpg/ParticleField";
import RPGDialog from "@/components/rpg/RPGDialog";
import { School, BookOpen, Milestone, Home } from "lucide-react";

const ICONS = { school: School, book: BookOpen, signpost: Milestone, house: Home };

export default function ChapterOrigin({ onAchievement }) {
  const [active, setActive] = useState(null);

  return (
    <section id="origin" className="relative min-h-screen w-full overflow-hidden py-20 px-4 scanlines"
      style={{ background: "linear-gradient(to bottom, #2a4a30 0%, #1A2F20 60%, #122014 100%)" }}>
      {/* Sunrise gradient */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-amber-300/20 to-transparent" />
      {/* Distant hills parallax */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 opacity-40"
        style={{ background: "radial-gradient(ellipse at 50% 100%, #3a5a3a 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-5xl mx-auto">
        <ChapterHeading chapter={ORIGIN.chapter} title={ORIGIN.title} />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-body text-lg text-white/80 leading-relaxed max-w-2xl mx-auto text-center mb-12"
        >
          {ORIGIN.body}
        </motion.p>

        {/* Interactive village objects */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {ORIGIN.objects.map((obj, i) => {
            const Icon = ICONS[obj.icon] || BookOpen;
            return (
              <motion.button
                key={obj.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setActive(obj)}
                whileHover={{ y: -6 }}
                className="group hud-glass border-2 border-quest-gold/30 hover:border-quest-gold p-4 sm:p-6 text-center transition-colors"
              >
                <div className="flex justify-center mb-3">
                  <div className="bg-quest-gold/10 group-hover:bg-quest-gold/20 p-3 border-2 border-quest-gold/40 transition-colors">
                    <Icon className="w-7 h-7 text-quest-gold" />
                  </div>
                </div>
                <div className="font-pixel text-lg text-white">{obj.title}</div>
                <div className="font-display text-[8px] text-quest-gold/70 mt-1">{obj.tag}</div>
                <div className="font-pixel text-base text-quest-gold/60 mt-2 group-hover:text-quest-gold">▶ examine</div>
              </motion.button>
            );
          })}
        </div>

        {/* Hidden curiosity bush easter egg */}
        <div className="flex justify-center">
          <button
            onClick={() => onAchievement?.("curiosity")}
            className="text-4xl hover:scale-110 transition-transform animate-float-slow"
            aria-label="A suspicious bush"
            title="A suspicious bush..."
          >
            🌿
          </button>
        </div>

        {/* Character walking */}
        <div className="flex justify-center mt-10">
          <PlayerCharacter state="walk" size={70} />
        </div>
      </div>

      <RPGDialog show={!!active} title={active?.tag} onClose={() => setActive(null)}>
        <div className="mb-2 font-pixel text-2xl text-quest-gold">{active?.title}</div>
        <div className="font-body text-base text-white/90 leading-relaxed">{active?.text}</div>
      </RPGDialog>
    </section>
  );
}