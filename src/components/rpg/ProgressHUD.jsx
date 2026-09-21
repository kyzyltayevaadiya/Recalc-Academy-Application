import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Map as MapIcon, X } from "lucide-react";

export default function ProgressHUD({ chapters, activeIndex, progress, onJump }) {
  const [open, setOpen] = useState(false);
  const pct = Math.round(progress * 100);

  return (
    <>
      {/* Top-left: title + progress */}
      <div className="fixed top-3 left-3 z-50 hud-glass border border-quest-gold/40 px-3 py-2 scanlines">
        <div className="font-display text-[8px] text-quest-gold leading-none mb-1">ADIYA'S QUEST</div>
        <div className="flex items-center gap-2">
          <div className="w-24 h-2 bg-quest-navy-deep border border-quest-gold/40 overflow-hidden">
            <motion.div
              className="h-full bg-quest-gold"
              style={{ width: `${pct}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
          <span className="font-pixel text-sm text-white leading-none">{pct}%</span>
        </div>
        <div className="font-pixel text-xs text-white/60 leading-none mt-0.5">JOURNEY {pct}% COMPLETE</div>
      </div>

      {/* Top-right: map button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-3 right-3 z-50 hud-glass border border-quest-gold/40 px-3 py-2 flex items-center gap-2 hover:border-quest-gold transition-colors scanlines"
        aria-label="Open world map"
      >
        <MapIcon className="w-4 h-4 text-quest-gold" />
        <span className="font-display text-[8px] text-quest-gold">MAP</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[65] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/80" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="relative w-full max-w-md max-h-[85vh] flex flex-col hud-glass rpg-border p-6 scanlines"
            >
              <div className="flex items-center justify-between mb-4 shrink-0">
                <div className="font-display text-xs text-quest-gold">WORLD MAP</div>
                <button onClick={() => setOpen(false)} aria-label="Close map">
                  <X className="w-5 h-5 text-quest-gold hover:text-white" />
                </button>
              </div>
              <div className="space-y-1 overflow-y-auto pr-1">
                {chapters.map((c, i) => {
                  const done = i < activeIndex;
                  const active = i === activeIndex;
                  return (
                    <button
                      key={c.id}
                      onClick={() => { onJump(c.id); setOpen(false); }}
                      className={`w-full flex items-center gap-3 px-3 py-2 border-2 transition-colors text-left ${
                        active
                          ? "border-quest-gold bg-quest-gold/10"
                          : done
                          ? "border-quest-gold/30 hover:border-quest-gold/60"
                          : "border-white/10 hover:border-quest-gold/40"
                      }`}
                    >
                      <span className={`font-pixel text-base ${active ? "text-quest-gold" : done ? "text-quest-gold/70" : "text-white/40"}`}>
                        {done ? "✓" : active ? "◉" : "○"}
                      </span>
                      <span className={`font-pixel text-lg ${active ? "text-quest-gold" : "text-white/80"}`}>{c.map}</span>
                      <span className="ml-auto font-body text-xs text-white/40 hidden sm:block">{c.label}</span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 font-pixel text-base text-white/50 text-center shrink-0">Fast travel unlocked. Choose your destination.</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}