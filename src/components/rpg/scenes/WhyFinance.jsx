import React, { useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { WHY_FINANCE } from "@/lib/questData";
import ChapterHeading from "@/components/rpg/ChapterHeading";
import Heroine from "@/components/rpg/Heroine";
import ParticleField from "@/components/rpg/ParticleField";

// Hexagon layout, clockwise from the top — matches the order concepts are
// revealed in: BUSINESS -> CAPITAL -> STRATEGY -> PEOPLE -> RISK -> GROWTH,
// closing back to BUSINESS. Coordinates are a 0-100 box so they drive both
// the HTML node/label layer and the SVG line layer with the same numbers.
const RX = 37, RY = 31, CX = 50, CY = 50;
const NODES = WHY_FINANCE.constellations.map((label, i) => {
  const angle = -Math.PI / 2 + (i / WHY_FINANCE.constellations.length) * Math.PI * 2;
  return { label, x: CX + Math.cos(angle) * RX, y: CY + Math.sin(angle) * RY };
});

// Pacing for the sequential reveal — pure delay-based (no imperative timer
// chain needed, every step's start time is known up front).
const FINANCE_IN_DELAY = 0.15;
const FINANCE_IN_DUR = 0.75;
const FIRST_NODE_DELAY = FINANCE_IN_DELAY + FINANCE_IN_DUR - 0.15;
const LINE_STEP = 0.3;
const LINE_DUR = 0.34;
const lineDelay = (i) => FIRST_NODE_DELAY + 0.3 + i * LINE_STEP;
const nodeDelay = (i) => (i === 0 ? FIRST_NODE_DELAY : lineDelay(i - 1) + LINE_DUR * 0.6);
const ACTIVATE_DELAY = lineDelay(NODES.length - 1) + LINE_DUR + 0.15;

function Node({ n, i, hovered, setHovered, reduce }) {
  const isHovered = hovered === i;
  const dimmed = hovered != null && !isHovered;
  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{ left: `${n.x}%`, top: `${n.y}%` }}
      initial={reduce ? false : { opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
      whileInView={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
      viewport={{ once: true }}
      transition={reduce ? { duration: 0 } : { delay: nodeDelay(i), duration: 0.4, type: "spring", stiffness: 260, damping: 14 }}
      onMouseEnter={() => setHovered(i)}
      onMouseLeave={() => setHovered(null)}
    >
      <motion.div
        animate={{ scale: isHovered ? 1.12 : 1, opacity: dimmed ? 0.55 : 1 }}
        transition={{ duration: 0.25 }}
        className="relative flex items-center justify-center"
      >
        {/* breathing pulse ring, starts once revealed */}
        {!reduce && (
          <motion.div
            className="absolute rounded-full"
            style={{ width: 22, height: 22, background: "radial-gradient(circle, rgba(253,184,19,0.5) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: ACTIVATE_DELAY }}
          />
        )}
        {/* soft outer glow */}
        <div className="absolute rounded-full" style={{ width: 16, height: 16, background: "radial-gradient(circle, rgba(253,184,19,0.65) 0%, rgba(253,184,19,0) 70%)", filter: "blur(2px)" }} />
        {/* amber outer ring */}
        <div className="relative rounded-full" style={{ width: 8, height: 8, background: "#8a5a1a", boxShadow: isHovered ? "0 0 12px 3px rgba(253,184,19,0.8)" : "0 0 6px 1px rgba(253,184,19,0.5)" }}>
          {/* bright gold center */}
          <div className="absolute inset-[1.5px] rounded-full" style={{ background: "radial-gradient(circle at 35% 30%, #fff3cf 0%, #FDB813 55%, #b97a12 100%)" }} />
        </div>
      </motion.div>
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-full mt-1.5 whitespace-nowrap font-display text-[8px] sm:text-[9px] tracking-widest"
        animate={{ opacity: dimmed ? 0.35 : 0.85, color: isHovered ? "#FDB813" : "#e7e7ef" }}
        transition={{ duration: 0.25 }}
      >
        {n.label}
      </motion.div>
    </motion.div>
  );
}

export default function WhyFinance() {
  const reduce = !!useReducedMotion();
  const [hovered, setHovered] = useState(null);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const farY = useTransform(scrollYProgress, [0, 1], ["-1%", "1%"]);
  const midY = useTransform(scrollYProgress, [0, 1], ["-2.5%", "2.5%"]);
  const nearY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  const total = NODES.length;
  const lineActive = useMemo(() => (i) => hovered === i || hovered === (i + 1) % total, [hovered, total]);

  return (
    <section
      ref={sectionRef}
      id="whyfinance"
      className="relative min-h-screen w-full overflow-hidden py-20 px-4 scanlines"
      style={{ background: "radial-gradient(ellipse 90% 70% at 50% 30%, #0d1430 0%, #070a1c 45%, #050810 75%, #030409 100%)" }}
    >
      {/* vignette */}
      <div className="pointer-events-none absolute inset-0" style={{ boxShadow: "inset 0 0 18vw 4vw rgba(0,0,0,0.85)" }} />
      {/* faint nebula wisps */}
      <div className="pointer-events-none absolute left-[8%] top-[12%] w-72 h-52 rounded-full opacity-[0.07] blur-3xl" style={{ background: "radial-gradient(circle, #6a5acd 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute right-[10%] top-[20%] w-64 h-44 rounded-full opacity-[0.06] blur-3xl" style={{ background: "radial-gradient(circle, #3a6ea8 0%, transparent 70%)" }} />

      {/* three star depths */}
      <motion.div style={{ y: farY }} className="absolute inset-0"><ParticleField variant="stars" count={70} sizeRange={[0.6, 1.4]} opacityRange={[0.15, 0.45]} durRange={[4, 9]} /></motion.div>
      <motion.div style={{ y: midY }} className="absolute inset-0"><ParticleField variant="stars" count={34} sizeRange={[1.2, 2]} opacityRange={[0.35, 0.7]} durRange={[3, 6]} /></motion.div>
      <motion.div style={{ y: nearY }} className="absolute inset-0"><ParticleField variant="stars" count={12} sizeRange={[2, 3]} opacityRange={[0.6, 1]} durRange={[2, 4]} /></motion.div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <ChapterHeading chapter="REFLECTION" title={WHY_FINANCE.title} accent="text-quest-ice" />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-body text-lg text-white/85 leading-relaxed text-center mb-10"
        >
          {WHY_FINANCE.body}
        </motion.p>

        {/* Constellation map */}
        <div className="relative mx-auto mb-6" style={{ width: "clamp(320px, 78vw, 620px)", aspectRatio: "4 / 3" }}>
          {/* connecting lines — thin dark-gold base + brighter core, drawn sequentially */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible">
            <defs>
              <filter id="lineGlow" filterUnits="userSpaceOnUse" x="-10" y="-10" width="120" height="120">
                <feGaussianBlur stdDeviation="0.6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {NODES.map((n, i) => {
              const m = NODES[(i + 1) % total];
              const [x1, y1, x2, y2] = [n.x, n.y, m.x, m.y];
              const active = lineActive(i);
              return (
                <g key={i} filter="url(#lineGlow)">
                  <motion.line
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="#5a3d14" strokeWidth={0.5}
                    initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={reduce ? { duration: 0 } : { delay: lineDelay(i), duration: LINE_DUR, ease: "easeInOut" }}
                  />
                  <motion.line
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="#FDB813"
                    style={{ strokeOpacity: active ? 0.95 : 0.55, strokeWidth: active ? 0.55 : 0.3, transition: "stroke-opacity 0.25s, stroke-width 0.25s" }}
                    initial={reduce ? false : { pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={reduce ? { duration: 0 } : { delay: lineDelay(i), duration: LINE_DUR, ease: "easeInOut" }}
                  />
                </g>
              );
            })}
          </svg>

          {/* nodes + labels */}
          {NODES.map((n, i) => (
            <Node key={n.label} n={n} i={i} hovered={hovered} setHovered={setHovered} reduce={reduce} />
          ))}

          {/* FINANCE — layered pixel typography: glow behind, dark shadow, gold gradient face */}
          <motion.div
            className="absolute left-1/2 top-1/2 text-center pointer-events-none"
            initial={reduce ? false : { opacity: 0, scale: 0.92, filter: "blur(5px)", x: "-50%", y: "-50%" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)", x: "-50%", y: "-50%" }}
            viewport={{ once: true }}
            transition={reduce ? { duration: 0 } : { delay: FINANCE_IN_DELAY, duration: FINANCE_IN_DUR, ease: "easeOut" }}
          >
            <motion.div
              className="absolute inset-0 -m-6 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(253,184,19,0.35) 0%, transparent 70%)" }}
              animate={reduce ? { opacity: 0.4 } : { opacity: [0.3, 0.55, 0.3] }}
              transition={reduce ? {} : { duration: 4, repeat: Infinity, ease: "easeInOut", delay: ACTIVATE_DELAY }}
            />
            <div className="relative select-none">
              <div className="absolute inset-0 translate-x-[2px] translate-y-[3px] font-display text-2xl sm:text-4xl text-black/70" aria-hidden="true">
                {WHY_FINANCE.formed}
              </div>
              <div
                className="relative font-display text-2xl sm:text-4xl bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(to bottom, #fff6d8 0%, #FDB813 45%, #a86c10 100%)",
                  textShadow: "0 0 22px rgba(253,184,19,0.55), 0 0 42px rgba(253,184,19,0.25)",
                }}
              >
                {WHY_FINANCE.formed}
              </div>
            </div>
            {/* a few particles escaping outward once fully activated */}
            {!reduce && [0, 1, 2].map((k) => (
              <motion.div
                key={k}
                className="absolute left-1/2 top-1/2 w-[3px] h-[3px] rounded-full bg-quest-gold"
                style={{ boxShadow: "0 0 4px #FDB813" }}
                initial={{ opacity: 0, x: 0, y: 0 }}
                animate={{ opacity: [0, 1, 0], x: [0, (k - 1) * 26], y: [0, -18 - k * 4] }}
                transition={{ delay: ACTIVATE_DELAY + k * 0.12, duration: 1.1, ease: "easeOut" }}
              />
            ))}
          </motion.div>
        </div>

        {/* Character by campfire — one small foreground vignette, not two loose sprites */}
        <motion.div style={{ y: nearY }} className="relative flex justify-center items-end mt-2" aria-hidden="false">
          {/* ground silhouette + warm firelight pool beneath the pair */}
          <svg viewBox="0 0 400 40" preserveAspectRatio="none" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] max-w-md h-10 opacity-90">
            <polygon points="0,40 0,20 60,13 130,22 200,10 270,21 340,14 400,19 400,40" fill="#040806" />
          </svg>
          <div className="absolute bottom-1 left-1/2 -translate-x-[46px] w-36 h-8 rounded-[50%] blur-xl" style={{ background: "radial-gradient(ellipse, rgba(255,140,40,0.28) 0%, transparent 75%)" }} />

          <div className="relative flex items-end">
            <Heroine state="sit" size={84} />
            {/* campfire — pixel-built, not an emoji or flat circle */}
            <div className="relative ml-1 mb-1" style={{ width: 30, height: 40 }}>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-6 rounded-[50%] blur-md" style={{ background: "radial-gradient(ellipse, rgba(255,120,30,0.35) 0%, transparent 75%)" }} />
              <div className="absolute bottom-1.5 left-1/2 -translate-x-[9px] w-4 h-1 bg-[#2a1c10] -rotate-6" />
              <div className="absolute bottom-1.5 left-1/2 translate-x-[1px] w-4 h-1 bg-[#241a10] rotate-6" />
              <motion.div
                className="absolute bottom-2.5 left-1/2 -translate-x-1/2"
                style={{ transformOrigin: "bottom" }}
                animate={reduce ? {} : { scaleY: [1, 1.16, 0.94, 1.08, 1], scaleX: [1, 0.93, 1.05, 0.97, 1] }}
                transition={reduce ? {} : { duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-4 h-7 rounded-t-full" style={{ background: "linear-gradient(to top, #ff5a1a 0%, #ffb020 55%, #ffe9a8 100%)", boxShadow: "0 0 10px 2px rgba(255,140,30,0.5)" }} />
              </motion.div>
              {!reduce && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14">
                  <ParticleField variant="embers" count={3} sizeRange={[1, 1.6]} opacityRange={[0.4, 0.85]} durRange={[2, 3.5]} />
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
