import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Target } from "lucide-react";
import { PROFILE, RECORDS } from "@/lib/questData";
import ParticleField from "@/components/rpg/ParticleField";
import CharacterRecords from "@/components/rpg/CharacterRecords";
import memoryChevron from "@/assets/memories/memory-chevron.jpg";
import memoryTedx from "@/assets/memories/memory-tedx.jpg";
import memoryPresentation from "@/assets/memories/memory-presentation.jpg";

// Real event photos that pop out from different sides of the screen and
// converge just off-center, held briefly, then gone. Purely a playful easter
// egg (triggered from the portrait, RANK, or DIPLOMA), not part of the main
// scroll narrative. Rendered through a portal straight onto <body> so this
// "fixed, centered on the real viewport" positioning can never be hijacked by
// a transformed ancestor (several scenes in this project animate `x`/`y` on
// parents, which turns them into a containing block for `position: fixed`).
const MEMORIES = [
  { src: memoryChevron, from: { x: -520, y: -40 }, offset: { x: -150, y: -30 }, rotate: -8 },
  { src: memoryTedx, from: { x: 520, y: 20 }, offset: { x: 150, y: -10 }, rotate: 7 },
  { src: memoryPresentation, from: { x: 0, y: 480 }, offset: { x: 0, y: 200 }, rotate: -4 },
];
const MEMORIES_HOLD_MS = 3800;

function StatBar({ label, value, max }) {
  return (
    <div>
      <div className="flex justify-between font-pixel text-sm text-white/80 mb-1">
        <span>{label}</span>
        <span className="text-quest-gold">{value}/{max}</span>
      </div>
      <div className="h-2 bg-quest-navy-deep border border-quest-gold/40 overflow-hidden">
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
  const [showMemories, setShowMemories] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const revealMemories = () => {
    clearTimeout(timerRef.current);
    setShowMemories(true);
    timerRef.current = setTimeout(() => setShowMemories(false), MEMORIES_HOLD_MS);
  };

  return (
    <section id="profile" className="relative w-full overflow-hidden bg-gradient-to-b from-quest-navy-deep to-quest-navy py-10 px-4 scanlines">
      <ParticleField variant="stars" count={40} />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-[10px] text-quest-gold mb-2 tracking-widest text-center"
        >
          CHARACTER PROFILE
        </motion.div>

        <div className="grid md:grid-cols-[280px_1fr] gap-6 items-start">
          {/* Portrait card — compact */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative border-2 border-quest-gold/70 p-4 w-full mx-auto md:mx-0"
          >
            <div className="flex justify-center mb-3">
              <button
                type="button"
                onClick={revealMemories}
                className="relative cursor-pointer transition-transform hover:scale-[1.03] active:scale-[0.98]"
                aria-label="Reveal a few real photos"
                title="Click for a few real photos"
              >
                <img
                  src={PROFILE.portrait}
                  alt={`Pixel-art portrait of ${PROFILE.name}`}
                  className="w-full max-w-[170px] pixelated pointer-events-none"
                />
                {/* a small blinking star hints this is clickable */}
                <motion.span
                  className="absolute -top-1.5 -right-1.5 text-quest-gold text-lg leading-none select-none"
                  style={{ filter: "drop-shadow(0 0 4px rgba(253,184,19,0.8))" }}
                  animate={{ opacity: [0.35, 1, 0.35], scale: [0.85, 1.15, 0.85] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  aria-hidden="true"
                >
                  ✦
                </motion.span>
              </button>
            </div>

            {/* Real photos — popping out from different sides, centered on
                the real viewport via a portal (see MEMORIES comment above) */}
            {typeof document !== "undefined" && createPortal(
              <AnimatePresence>
                {showMemories && (
                  <div className="fixed inset-0 z-[70] pointer-events-none">
                    {MEMORIES.map((m, i) => (
                      // Outer wrapper is a plain (non-motion) element doing the
                      // static centering translate; the inner motion.div owns
                      // the entrance transform. Keeping those on two different
                      // elements avoids framer-motion's inline `transform`
                      // silently overwriting a Tailwind translate class.
                      <div
                        key={i}
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                        style={{ left: `calc(50% + ${m.offset.x}px)`, top: `calc(50% + ${m.offset.y}px)` }}
                      >
                        <motion.div
                          className="hud-glass border-2 border-quest-gold/70 p-1.5"
                          style={{ boxShadow: "0 14px 44px rgba(0,0,0,0.65)" }}
                          initial={{ opacity: 0, x: m.from.x, y: m.from.y, rotate: 0, scale: 0.7 }}
                          animate={{ opacity: 1, x: 0, y: 0, rotate: m.rotate, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.6, transition: { duration: 0.4 } }}
                          transition={{ delay: i * 0.12, type: "spring", stiffness: 190, damping: 18 }}
                        >
                          <img
                            src={m.src}
                            alt=""
                            className="block w-auto max-h-[38vh] sm:max-h-[280px] max-w-[65vw] sm:max-w-[240px] object-contain"
                            draggable={false}
                          />
                        </motion.div>
                      </div>
                    ))}
                  </div>
                )}
              </AnimatePresence>,
              document.body
            )}

            <div className="space-y-2.5 font-mono">
              <div>
                <div className="text-quest-gold text-[10px] font-bold tracking-widest">NAME</div>
                <div className="text-white text-base font-bold tracking-wide leading-tight">{PROFILE.name}</div>
                <div className="flex items-center gap-1.5 mt-1">
                  <motion.span
                    className="inline-block text-sm leading-none"
                    animate={{ rotate: [-4, 4, -4] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {RECORDS.origin.flag}
                  </motion.span>
                  <span className="text-white/70 text-xs">{RECORDS.origin.country} · {RECORDS.origin.language}</span>
                </div>
              </div>
              <div>
                <div className="text-quest-gold text-[10px] font-bold tracking-widest">CLASS</div>
                <div className="text-white text-sm leading-tight">{PROFILE.class}</div>
              </div>
              <div>
                <div className="text-quest-gold text-[10px] font-bold tracking-widest">LEVEL</div>
                <div className="text-white text-sm font-bold leading-tight">{PROFILE.level}</div>
              </div>
              <div>
                <div className="text-quest-gold text-[10px] font-bold tracking-widest">LOCATION</div>
                <div className="text-white text-sm font-bold leading-tight">{PROFILE.location}</div>
              </div>
              <div>
                <div className="text-quest-gold text-[10px] font-bold tracking-widest">EDUCATION</div>
                <div className="text-white text-sm font-bold leading-tight mb-1.5">{PROFILE.education.degree}</div>
                <div className="space-y-1">
                  {PROFILE.education.schools.map((s) => (
                    <div
                      key={s.name}
                      className={`flex items-start gap-1.5 text-xs leading-tight ${
                        s.current ? "text-quest-gold font-bold text-shadow-glow" : "text-white/90"
                      }`}
                    >
                      <span>{s.flag}</span>
                      <span>
                        {s.name}
                        {s.current && <span className="text-quest-gold/80 font-normal"> — currently here</span>}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats + records + intro */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            <div>
              <div className="flex items-center gap-2 font-display text-[9px] text-quest-gold mb-1.5">
                <Target className="w-3 h-3" />
                CURRENT QUEST
              </div>
              <div className="font-pixel text-lg text-white leading-snug">{PROFILE.currentQuest}</div>
            </div>

            <p className="font-body text-sm text-white/80 leading-relaxed border-l-2 border-quest-gold/50 pl-3">
              {PROFILE.intro}
            </p>

            <div className="grid sm:grid-cols-2 gap-4 items-start">
              {/* School — compact */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="hud-glass border border-quest-gold/40 p-2.5"
              >
                <div className="font-pixel text-sm text-white leading-snug">🎓 {RECORDS.school.name}</div>
                <div className="font-body text-xs text-quest-gold/70 mt-0.5 mb-1.5">{RECORDS.school.program}</div>
                <div className="flex flex-wrap gap-1">
                  {RECORDS.school.hl.map((s) => (
                    <span key={s} className="font-body text-[9px] text-white/80 border border-quest-gold/30 bg-quest-navy-deep/60 px-1.5 py-0.5">
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Character traits — compact */}
              <div>
                <div className="font-display text-[9px] text-quest-gold mb-2">CHARACTER TRAITS</div>
                <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                  {PROFILE.traits.map((t) => (
                    <StatBar key={t.label} {...t} />
                  ))}
                </div>
              </div>
            </div>

            <CharacterRecords onPeek={revealMemories} />

            <div className="flex flex-wrap gap-3">
              <Link to={PROFILE.links.cv} className="font-display text-[10px] text-quest-navy bg-quest-gold px-5 py-3 hover:bg-white transition-colors">▶ VIEW CV</Link>
              <a href={PROFILE.links.linkedin} target="_blank" rel="noreferrer" className="font-display text-[10px] text-quest-gold border-2 border-quest-gold/60 hover:border-quest-gold px-5 py-3 transition-colors">LINKEDIN</a>
              <Link to={PROFILE.links.evidence} className="font-display text-[10px] text-white/70 border-2 border-white/30 hover:border-white px-5 py-3 transition-colors">📖 OPEN THE BOOK</Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
