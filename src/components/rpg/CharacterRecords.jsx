import React, { useRef, useState } from "react";
import { motion, animate, useReducedMotion } from "framer-motion";
import { RECORDS } from "@/lib/questData";

// Counts a number up from 0 the moment it scrolls into view. Uses framer-motion's
// own `onViewportEnter` (same mechanism `whileInView` uses elsewhere in this file)
// instead of a hand-rolled IntersectionObserver + effect — that's what left the
// SAT figure stuck at 0 before: a second effect run (React 18 dev double-invoke)
// could stop the animation before `onUpdate` ever fired.
function CountUp({ value, decimals = 0 }) {
  const [display, setDisplay] = useState(0);
  const started = useRef(false);
  const reduce = useReducedMotion();

  return (
    <motion.span
      viewport={{ once: true, margin: "-40px" }}
      onViewportEnter={() => {
        if (started.current) return;
        started.current = true;
        if (reduce) {
          setDisplay(value);
          return;
        }
        animate(0, value, { duration: 1.1, ease: "easeOut", onUpdate: setDisplay });
      }}
    >
      {display.toFixed(decimals)}
    </motion.span>
  );
}

function ShimmerOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none animate-shimmer opacity-40"
      style={{
        backgroundImage: "linear-gradient(75deg, transparent 40%, rgba(253,184,19,0.5) 50%, transparent 60%)",
        backgroundSize: "200% 100%",
      }}
    />
  );
}

function StatBadge({ label, value, sub, glow, delay = 0, onClick }) {
  const Tag = onClick ? motion.button : motion.div;
  return (
    <Tag
      type={onClick ? "button" : undefined}
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay }}
      whileHover={onClick ? { scale: 1.04 } : undefined}
      whileTap={onClick ? { scale: 0.97 } : undefined}
      className={`relative overflow-hidden hud-glass border border-quest-gold/40 px-2 py-2.5 text-center w-full ${onClick ? "cursor-pointer hover:border-quest-gold" : ""}`}
    >
      {glow && <ShimmerOverlay />}
      <div className="relative font-display text-[6px] text-quest-gold/70 tracking-widest mb-1 leading-none">{label}</div>
      <div className="relative font-display text-sm sm:text-base text-quest-gold text-shadow-glow leading-none whitespace-nowrap">{value}</div>
      {sub && <div className="relative font-body text-[8px] text-white/40 mt-1 leading-tight">{sub}</div>}
    </Tag>
  );
}

// Compact "character records" panel — academic background + languages — sized
// to sit inside the profile card's right column, above the CV/LinkedIn row.
export default function CharacterRecords({ onPeek }) {
  const r = RECORDS;

  return (
    <div>
      <div className="font-display text-[9px] text-quest-gold tracking-widest mb-2.5">{r.title}</div>

      <div className="space-y-2">
        {/* Stat badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          <StatBadge
            label="RANK"
            value={<>#<CountUp value={r.bestStudent.rank} />/<CountUp value={r.bestStudent.of} /></>}
            sub={r.bestStudent.context}
            glow
            delay={0.05}
            onClick={onPeek}
          />
          <StatBadge label="DIPLOMA" value="RED" sub="Perfect GPA" glow delay={0.1} onClick={onPeek} />
          <StatBadge
            label="SAT"
            value={<CountUp value={r.sat.score} />}
            sub="Superscore"
            delay={0.15}
          />
          <StatBadge
            label="IELTS"
            value={<CountUp value={r.ielts.score} decimals={1} />}
            sub={`/${r.ielts.max.toFixed(1)}`}
            delay={0.2}
          />
        </div>

        {/* Languages */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: 0.25 }}
          className="hud-glass border border-quest-gold/40 p-2.5 space-y-1.5"
        >
          {r.languages.map((l) => (
            <div key={l.name} className="flex items-center gap-3">
              <span className="font-pixel text-sm text-white w-16 shrink-0">{l.name}</span>
              <div className="flex-1 h-1.5 bg-quest-navy-deep border border-quest-gold/30 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-quest-gold-deep to-quest-gold"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(l.value / l.max) * 100}%` }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <span className="font-display text-[7px] text-quest-gold bg-quest-gold/10 border border-quest-gold/40 px-1.5 py-0.5 tracking-wide whitespace-nowrap shrink-0">
                {l.level}{l.note ? ` · ${l.note}` : ""}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
