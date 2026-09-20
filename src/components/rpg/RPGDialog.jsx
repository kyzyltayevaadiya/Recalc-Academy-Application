import React from "react";
import { motion, AnimatePresence } from "framer-motion";

// Classic RPG message box. role="log" + aria-live for accessibility.
export default function RPGDialog({ show, title, children, onClose, dismissable = true }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/70" onClick={dismissable ? onClose : undefined} />
          <motion.div
            role="log"
            aria-live="polite"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="relative w-full max-w-lg hud-glass rpg-border p-6 font-pixel text-quest-gold scanlines"
          >
            {title && (
              <div className="font-display text-[10px] sm:text-xs text-quest-gold mb-3 tracking-wider">
                ▶ {title}
              </div>
            )}
            <div className="font-pixel text-xl sm:text-2xl leading-snug text-white">
              {children}
            </div>
            {dismissable && (
              <button
                onClick={onClose}
                className="mt-5 font-display text-[9px] text-quest-gold/80 hover:text-quest-gold border-2 border-quest-gold/60 hover:border-quest-gold px-4 py-2 transition-colors"
              >
                ▶ CONTINUE
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}