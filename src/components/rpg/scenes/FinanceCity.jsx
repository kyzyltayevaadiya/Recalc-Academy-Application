import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image } from "@/components/ui/image";
import { CAPITAL, IMAGE_URLS } from "@/lib/questData";
import ChapterHeading from "@/components/rpg/ChapterHeading";
import ParticleField from "@/components/rpg/ParticleField";
import RPGDialog from "@/components/rpg/RPGDialog";

export default function FinanceCity() {
  const [active, setActive] = useState(null);

  return (
    <section id="capital" className="relative min-h-screen w-full overflow-hidden py-20 px-4 scanlines"
      style={{ background: "linear-gradient(to bottom, #050B14 0%, #0a1428 100%)" }}>
      <div className="absolute inset-0 opacity-40">
        <Image src={IMAGE_URLS.capital} alt="A pixel-art financial metropolis at night" fittingType="fill" className="w-full h-full pixelated" />
        <div className="absolute inset-0 bg-gradient-to-b from-quest-navy-deep/70 to-quest-navy-deep/90" />
      </div>
      <ParticleField variant="fireflies" count={20} />

      <div className="relative z-10 max-w-5xl mx-auto">
        <ChapterHeading chapter={CAPITAL.chapter} title={CAPITAL.title} accent="text-quest-gold" />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-body text-lg text-white/80 leading-relaxed text-center max-w-2xl mx-auto mb-10"
        >
          {CAPITAL.intro}
        </motion.p>

        {/* Merchant prompt */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hud-glass border-2 border-quest-gold/60 px-5 py-4 mb-10 max-w-md mx-auto text-center scanlines"
        >
          <div className="font-display text-[8px] text-quest-gold mb-1">A MERCHANT ASKS</div>
          <div className="font-pixel text-lg text-white">"{CAPITAL.merchantPrompt}"</div>
        </motion.div>

        {/* Buildings grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {CAPITAL.buildings.map((b, i) => (
            <motion.button
              key={b.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setActive(b)}
              whileHover={{ y: -6 }}
              className="hud-glass border-2 border-quest-gold/30 hover:border-quest-gold p-5 text-left transition-colors group"
            >
              <div className="font-display text-[8px] text-quest-gold/70 mb-1">{b.tag}</div>
              <div className="font-pixel text-xl text-white group-hover:text-quest-gold transition-colors">{b.name}</div>
              <div className="font-pixel text-base text-quest-gold/50 mt-2 group-hover:text-quest-gold">▶ enter</div>
            </motion.button>
          ))}
        </div>
      </div>

      <RPGDialog show={!!active} title={active?.tag} onClose={() => setActive(null)}>
        <div className="mb-2 font-pixel text-2xl text-quest-gold">{active?.name}</div>
        <div className="font-body text-base text-white/90 leading-relaxed">{active?.text}</div>
      </RPGDialog>
    </section>
  );
}