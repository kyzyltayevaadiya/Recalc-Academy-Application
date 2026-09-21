import React, { useState } from "react";
import { motion } from "framer-motion";
import { Image } from "@/components/ui/image";
import { HERO, IMAGE_URLS } from "@/lib/questData";
import RPGDialog from "@/components/rpg/RPGDialog";
import Heroine from "@/components/rpg/Heroine";
import ParticleField from "@/components/rpg/ParticleField";

export default function HeroScene({ onStart }) {
  const [dialog, setDialog] = useState(false);

  const handleStart = () => {
    setDialog(true);
  };

  const handleClose = () => {
    setDialog(false);
    onStart?.();
  };

  return (
    <section id="hero" className="relative h-screen min-h-[640px] w-full overflow-hidden bg-quest-navy-deep scanlines">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={IMAGE_URLS.hero}
          alt="A lone traveler on a hill at night, looking toward a distant glowing city"
          fittingType="fill"
          className="w-full h-full pixelated"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-quest-navy-deep/40 via-transparent to-quest-navy-deep/80" />
      </div>

      <ParticleField variant="stars" count={80} />
      <ParticleField variant="fireflies" count={18} />

      {/* Title block */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="font-display text-[10px] sm:text-xs text-quest-gold/80 mb-6 tracking-[0.3em]"
        >
          {HERO.tagline}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-display text-3xl sm:text-5xl md:text-6xl text-white text-shadow-glow leading-tight"
        >
          {HERO.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-pixel text-xl sm:text-2xl text-white/80 mt-6 max-w-md"
        >
          {HERO.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-10 flex items-center justify-center"
        >
          <button
            onClick={handleStart}
            className="group relative font-display text-xs sm:text-sm text-quest-navy bg-quest-gold px-8 py-4 hover:bg-white transition-colors border-2 border-quest-gold shadow-[0_0_30px_rgba(253,184,19,0.5)]"
          >
            ▶ {HERO.startLabel}
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.6 }}
          className="absolute bottom-8 font-pixel text-lg text-white/50 animate-float-slow"
        >
          ↓ scroll to begin
        </motion.div>
      </div>

      {/* Protagonist on the hill, bottom-left */}
      <div className="absolute bottom-16 left-8 sm:left-20 z-10 hidden sm:block">
        <Heroine state="look" size={80} />
      </div>

      <RPGDialog show={dialog} title="QUEST STARTED" onClose={handleClose}>
        {HERO.questStarted}
      </RPGDialog>
    </section>
  );
}