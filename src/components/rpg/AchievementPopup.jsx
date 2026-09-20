import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Floating achievement notification, top-right.
export default function AchievementPopup({ achievement, onDone }) {
  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          key={achievement.id}
          initial={{ x: 120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          onAnimationComplete={() => {
            if (onDone) setTimeout(onDone, 2600);
          }}
          className="fixed top-20 right-4 z-[70] hud-glass border-2 border-quest-gold px-4 py-3 max-w-[260px] scanlines"
          role="log"
          aria-live="polite"
        >
          <div className="font-display text-[8px] text-quest-gold mb-1">ACHIEVEMENT UNLOCKED</div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{achievement.icon}</span>
            <div>
              <div className="font-pixel text-lg text-white leading-none">{achievement.title}</div>
              <div className="font-body text-xs text-white/70 mt-0.5">{achievement.desc}</div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}