import React, { useState } from "react";
import { motion } from "framer-motion";
import { JOURNEY } from "@/lib/questData";
import ChapterHeading from "@/components/rpg/ChapterHeading";
import Heroine from "@/components/rpg/Heroine";
import ParticleField from "@/components/rpg/ParticleField";
import RPGDialog from "@/components/rpg/RPGDialog";
import { Swords, TrendingUp, Cpu, HeartPulse, Leaf, Globe, GraduationCap } from "lucide-react";

const ICONS = {
  swords: Swords,
  "trending-up": TrendingUp,
  cpu: Cpu,
  "heart-pulse": HeartPulse,
  leaf: Leaf,
  globe: Globe,
  "graduation-cap": GraduationCap,
};

export default function JourneyTrail({ onAchievement }) {
  const [active, setActive] = useState(null);
  const last = JOURNEY.milestones[JOURNEY.milestones.length - 1];

  const open = (m) => {
    setActive(m);
    if (m.id === last.id) onAchievement?.("journey");
  };

  return (
    <section
      id="journey"
      className="relative min-h-screen w-full overflow-hidden py-20 px-4 scanlines"
      style={{ background: "linear-gradient(to bottom, #3a2a14 0%, #2a3a1f 45%, #122014 100%)" }}
    >
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-amber-300/15 to-transparent" />
      <ParticleField variant="leaves" count={22} />

      <div className="relative z-10 max-w-5xl mx-auto">
        <ChapterHeading chapter={JOURNEY.chapter} title={JOURNEY.title} />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-body text-lg text-white/80 leading-relaxed max-w-2xl mx-auto text-center mb-14"
        >
          {JOURNEY.intro}
        </motion.p>

        {/* Rider on the road */}
        <div className="flex flex-col items-center mb-16">
          <Heroine state="rideHorse" size={150} />
          <div className="mt-3 w-full max-w-md h-1 bg-gradient-to-r from-transparent via-quest-gold/50 to-transparent" />
        </div>

        {/* Trail markers — click a waypoint for the full story */}
        <div className="relative">
          <div className="hidden md:block absolute top-10 left-0 right-0 border-t-2 border-dashed border-quest-gold/25" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-6 md:gap-3">
            {JOURNEY.milestones.map((m, i) => {
              const Icon = ICONS[m.icon] || Swords;
              return (
                <motion.button
                  key={m.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => open(m)}
                  whileHover={{ y: -6 }}
                  className="group relative z-10 flex flex-col items-center text-center"
                >
                  <div className="bg-quest-gold/10 group-hover:bg-quest-gold/20 hud-glass p-3 border-2 border-quest-gold/40 group-hover:border-quest-gold transition-colors">
                    <Icon className="w-6 h-6 text-quest-gold" />
                  </div>
                  <div className="font-display text-[7px] text-quest-gold/70 mt-2">{m.year}</div>
                  <div className="font-pixel text-base text-white mt-1 leading-snug">{m.title}</div>
                  <div className="font-pixel text-sm text-quest-gold/60 mt-1 group-hover:text-quest-gold">▶ read more</div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      <RPGDialog show={!!active} title={active?.year} onClose={() => setActive(null)}>
        <div className="mb-1 font-pixel text-2xl text-quest-gold">{active?.title}</div>
        <div className="font-display text-[9px] text-quest-gold/70 mb-1 tracking-wide">{active?.org}</div>
        <div className="font-body text-sm text-white/50 mb-4">{active?.location}</div>
        <ul className="space-y-2.5">
          {active?.bullets?.map((b, i) => (
            <li key={i} className="font-body text-base text-white/90 leading-relaxed flex gap-2">
              <span className="text-quest-gold shrink-0">●</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </RPGDialog>
    </section>
  );
}
