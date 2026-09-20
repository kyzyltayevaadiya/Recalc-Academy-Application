import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Image } from "@/components/ui/image";
import { ACADEMY, IMAGE_URLS } from "@/lib/questData";
import ChapterHeading from "@/components/rpg/ChapterHeading";
import PlayerCharacter from "@/components/rpg/PlayerCharacter";
import ParticleField from "@/components/rpg/ParticleField";

export default function AcademyGates({ onAchievement }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-200px" });
  React.useEffect(() => {
    if (inView) onAchievement?.("academy");
  }, [inView, onAchievement]);

  return (
    <section id="academy" ref={ref} className="relative min-h-screen w-full overflow-hidden py-20 px-4 scanlines"
      style={{ background: "linear-gradient(to bottom, #2a1a0a 0%, #4a2a10 40%, #8a5a1a 100%)" }}>
      <div className="absolute inset-0">
        <Image src={IMAGE_URLS.academy} alt="Grand academy gates at golden sunrise" fittingType="fill" className="w-full h-full pixelated" />
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/30 via-transparent to-amber-900/60" />
      </div>
      <ParticleField variant="stars" count={25} />

      <div className="relative z-10 max-w-3xl mx-auto">
        <ChapterHeading chapter={ACADEMY.chapter} title={ACADEMY.title} accent="text-quest-gold" />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hud-glass border-2 border-quest-gold px-6 py-4 mb-10 text-center scanlines"
        >
          <div className="font-display text-[9px] text-quest-gold mb-1">THE GATES BEAR THE NAME</div>
          <div className="font-pixel text-2xl text-white text-shadow-glow">{ACADEMY.name}</div>
        </motion.div>

        <div className="space-y-4 mb-12">
          {ACADEMY.reasons.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="hud-glass border-l-4 border-quest-gold/70 p-4"
            >
              <div className="font-display text-[8px] text-quest-gold mb-1">REASON {i + 1}</div>
              <div className="font-body text-base text-white/85 leading-relaxed">{r}</div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <PlayerCharacter state="walk" size={80} />
        </div>
      </div>
    </section>
  );
}