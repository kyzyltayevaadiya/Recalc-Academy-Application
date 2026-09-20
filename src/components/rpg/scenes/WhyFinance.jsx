import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { WHY_FINANCE } from "@/lib/questData";
import ChapterHeading from "@/components/rpg/ChapterHeading";
import Heroine from "@/components/rpg/Heroine";
import ParticleField from "@/components/rpg/ParticleField";

export default function WhyFinance() {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setConnected(true), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="whyfinance" className="relative min-h-screen w-full overflow-hidden py-20 px-4 scanlines"
      style={{ background: "linear-gradient(to bottom, #050B14 0%, #0a0a1f 60%, #050B14 100%)" }}>
      <ParticleField variant="stars" count={70} />

      <div className="relative z-10 max-w-3xl mx-auto">
        <ChapterHeading chapter="REFLECTION" title={WHY_FINANCE.title} accent="text-quest-ice" />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-body text-lg text-white/85 leading-relaxed text-center mb-12"
        >
          {WHY_FINANCE.body}
        </motion.p>

        {/* Constellation map */}
        <div className="relative h-72 mb-12">
          <svg viewBox="0 0 400 280" className="w-full h-full">
            {/* Stars positioned around a circle */}
            {WHY_FINANCE.constellations.map((label, i) => {
              const angle = (i / WHY_FINANCE.constellations.length) * Math.PI * 2 - Math.PI / 2;
              const cx = 200 + Math.cos(angle) * 120;
              const cy = 140 + Math.sin(angle) * 90;
              return (
                <g key={label}>
                  <motion.circle
                    cx={cx} cy={cy} r={4}
                    fill="#FDB813"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    style={{ filter: "drop-shadow(0 0 6px #FDB813)" }}
                  />
                  <motion.text
                    x={cx} y={cy - 10}
                    textAnchor="middle"
                    className="font-pixel"
                    fill="#ffffff"
                    fontSize="13"
                    opacity={0.7}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.7 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.2 }}
                  >
                    {label}
                  </motion.text>
                </g>
              );
            })}
            {/* Connecting lines */}
            {connected && WHY_FINANCE.constellations.map((_, i) => {
              const a = (i / WHY_FINANCE.constellations.length) * Math.PI * 2 - Math.PI / 2;
              const b = ((i + 1) / WHY_FINANCE.constellations.length) * Math.PI * 2 - Math.PI / 2;
              const x1 = 200 + Math.cos(a) * 120, y1 = 140 + Math.sin(a) * 90;
              const x2 = 200 + Math.cos(b) * 120, y2 = 140 + Math.sin(b) * 90;
              return (
                <motion.line
                  key={i}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="#FDB813" strokeWidth={1} opacity={0.5}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                />
              );
            })}
            {/* Center formed word */}
            <motion.text
              x={200} y={148}
              textAnchor="middle"
              fill="#FDB813"
              fontSize="26"
              className="font-display"
              initial={{ opacity: 0, scale: 0 }}
              animate={connected ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.8, type: "spring" }}
              style={{ filter: "drop-shadow(0 0 10px #FDB813)" }}
            >
              {WHY_FINANCE.formed}
            </motion.text>
          </svg>
        </div>

        {/* Character by campfire */}
        <div className="flex justify-center items-end gap-6">
          <Heroine state="sit" size={80} />
          <div className="text-5xl animate-flicker">🔥</div>
        </div>
      </div>
    </section>
  );
}