import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { INVENTORY } from "@/lib/questData";
import ChapterHeading from "@/components/rpg/ChapterHeading";

const RARITY = {
  COMMON: { color: "#9ca3af", glow: "rgba(156,163,175,0.4)" },
  RARE: { color: "#3b82f6", glow: "rgba(59,130,246,0.5)" },
  EPIC: { color: "#a855f7", glow: "rgba(168,85,247,0.5)" },
  LEGENDARY: { color: "#FDB813", glow: "rgba(253,184,19,0.6)" },
};

export default function Inventory() {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="inventory" className="relative min-h-screen w-full overflow-hidden py-20 px-4 scanlines bg-quest-navy-deep">
      <div className="relative z-10 max-w-5xl mx-auto">
        <ChapterHeading chapter="EQUIPMENT" title={INVENTORY.title} />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {INVENTORY.items.map((item, i) => {
            const r = RARITY[item.rarity];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onMouseEnter={() => setHovered(item)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setHovered(hovered === item ? null : item)}
                className="hud-glass border-2 p-4 text-center cursor-pointer transition-transform hover:-translate-y-1"
                style={{ borderColor: r.color, boxShadow: `0 0 18px ${r.glow}` }}
              >
                <div className="text-4xl mb-2">{item.icon}</div>
                <div className="font-pixel text-base text-white leading-tight">{item.name}</div>
                <div className="font-display text-[7px] mt-2" style={{ color: r.color }}>{item.rarity}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Tooltip */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-8 hud-glass rpg-border p-5 scanlines"
              style={{ borderColor: RARITY[hovered.rarity].color }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{hovered.icon}</span>
                <div>
                  <div className="font-pixel text-xl text-white">{hovered.name}</div>
                  <div className="font-display text-[8px]" style={{ color: RARITY[hovered.rarity].color }}>{hovered.rarity} · {hovered.year}</div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 font-body text-sm text-white/80">
                <div><span className="text-quest-gold font-pixel text-base">Role:</span> {hovered.role}</div>
                <div><span className="text-quest-gold font-pixel text-base">Result:</span> {hovered.result}</div>
                <div className="sm:col-span-2"><span className="text-quest-gold font-pixel text-base">Learned:</span> {hovered.learned}</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="font-pixel text-base text-white/40 text-center mt-8">Hover or tap an item to inspect.</p>
      </div>
    </section>
  );
}