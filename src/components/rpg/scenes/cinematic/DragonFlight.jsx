import React, { useEffect, useState } from "react";
import { motion, useTransform, useMotionValueEvent } from "framer-motion";
import Stage, { useStage } from "@/components/rpg/scroll/Stage";
import Heroine from "@/components/rpg/Heroine";
import Dragon from "@/components/rpg/Dragon";
import ParticleField from "@/components/rpg/ParticleField";

/* ------------------------------------------------------------------ *
 * Ridge geometry — deterministic (no Math.random at render time), the  *
 * same technique used for the forest-passage skyline, reused here for *
 * a believable mountain silhouette instead of flat CSS triangles.      *
 * ------------------------------------------------------------------ */
function ridgeLine(count, width, baseY, amp1, amp2, f1, f2, phase) {
  const pts = [];
  for (let i = 0; i <= count; i++) {
    const x = (i / count) * width;
    const y = baseY - amp1 * Math.sin(i * f1 + phase) - amp2 * Math.sin(i * f2 + phase * 1.6);
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return pts.join(" ");
}
const RIDGE_W = 1000;
const FAR_RIDGE = ridgeLine(24, RIDGE_W, 130, 20, 8, 0.42, 1.05, 0.5);
const MID_RIDGE = ridgeLine(22, RIDGE_W, 150, 34, 13, 0.55, 1.3, 2.2);
const PINE_EDGE = ridgeLine(70, RIDGE_W, 26, 9, 4, 2.1, 4.6, 1.1);

/* Distant ruined tower on a far peak — a small silhouette, not a full city. */
function DistantCastle({ w = 46 }) {
  return (
    <svg width={w} height={w * 0.72} viewBox="0 0 46 33" shapeRendering="crispEdges" className="opacity-70">
      <rect x="3" y="16" width="7" height="17" fill="#2a3350" />
      <rect x="14" y="7" width="9" height="26" fill="#2a3350" />
      <polygon points="14,7 18.5,0 23,7" fill="#2a3350" />
      <rect x="27" y="14" width="7" height="19" fill="#2a3350" />
      <rect x="37" y="10" width="8" height="23" fill="#2a3350" />
      <polygon points="37,10 41,3 45,10" fill="#2a3350" />
    </svg>
  );
}

/* A winding river catching the sky's light, threading through the valley —
 * a deterministic sine meander (same technique as the ridge silhouettes)
 * so it reads as continuous, gently curving water across the whole span. */
function riverPath(w, h, segments) {
  const midY = h * 0.5;
  const amp = h * 0.32;
  let d = `M0,${midY.toFixed(1)}`;
  for (let i = 1; i <= segments; i++) {
    const x = (i / segments) * w;
    const y = midY + amp * Math.sin(i * 0.75) + (h * 0.08) * Math.sin(i * 1.9);
    const cx = x - (w / segments) / 2;
    const cy = midY + amp * Math.sin((i - 0.5) * 0.75);
    d += ` Q${cx.toFixed(1)},${cy.toFixed(1)} ${x.toFixed(1)},${y.toFixed(1)}`;
  }
  return d;
}
function River({ w = 480, h = 70 }) {
  const d = riverPath(w, h, Math.round(w / 130));
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="opacity-75">
      <path d={d} stroke="#6f9dc0" strokeWidth={h * 0.16} fill="none" strokeLinecap="round" />
      <path d={d} stroke="#eecf8e" strokeWidth={h * 0.035} fill="none" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

/* An organic forest patch — overlapping rounded blobs, never a rectangle. */
function ForestPatch({ w = 90, tone = 0 }) {
  const fills = ["#0d2a1c", "#123324", "#0a2218", "#16402c"];
  const c1 = fills[tone % fills.length];
  const c2 = fills[(tone + 2) % fills.length];
  return (
    <div className="relative shrink-0" style={{ width: w, height: w * 0.5 }}>
      <div className="absolute left-0 bottom-0 w-[55%] h-[85%] rounded-[45%]" style={{ background: c1 }} />
      <div className="absolute left-[30%] bottom-0 w-[60%] h-full rounded-[45%]" style={{ background: c2 }} />
      <div className="absolute left-[62%] bottom-0 w-[42%] h-[70%] rounded-[45%]" style={{ background: c1 }} />
    </div>
  );
}

/* Dark pine silhouette for the foreground — largest, closest, fastest. */
function ForegroundPine({ h = 90, flip = false }) {
  return (
    <svg width={h * 0.62} height={h} viewBox="0 0 16 24" preserveAspectRatio="none" shapeRendering="crispEdges"
      className="shrink-0" style={{ transform: flip ? "scaleX(-1)" : undefined }}>
      <rect x="7" y="18" width="2" height="6" fill="#050d07" />
      <polygon points="8,0 1,10 15,10" fill="#0a1810" />
      <polygon points="8,5 0,15 16,15" fill="#071209" />
      <polygon points="8,9 1.5,19 14.5,19" fill="#050d07" />
    </svg>
  );
}

/* A pixel-block cloud puff for the sky layer — crisp, not a blurred blob. */
const CLOUD_TONES = { pale: "#cdd8ea", warm: "#e2d0c2", mauve: "#b6a3c4" };
function SkyCloud({ top, scale = 1, tone = "pale", opacity = 0.55, delay = 0, dur = 150 }) {
  const fill = CLOUD_TONES[tone];
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ top, opacity }}
      initial={{ x: "-24vw" }}
      animate={{ x: "124vw" }}
      transition={{ duration: dur, repeat: Infinity, delay, ease: "linear" }}
    >
      <div className="relative" style={{ width: 46 * scale, height: 20 * scale }}>
        <div className="absolute left-0 top-[40%] w-[24%] h-[35%]" style={{ background: fill }} />
        <div className="absolute left-[14%] top-0 w-[28%] h-[55%]" style={{ background: fill }} />
        <div className="absolute left-[38%] top-[15%] w-[30%] h-[45%]" style={{ background: fill }} />
        <div className="absolute left-[62%] top-[35%] w-[22%] h-[35%]" style={{ background: fill }} />
        <div className="absolute left-[8%] top-[55%] w-[70%] h-[25%]" style={{ background: fill }} />
      </div>
    </motion.div>
  );
}

/* A distant bird — a solid silhouette that squashes vertically for a wingbeat. */
function Bird({ top, delay = 0, dur = 22 }) {
  return (
    <motion.div className="absolute pointer-events-none" style={{ top }}
      initial={{ x: "-6vw" }} animate={{ x: "110vw" }} transition={{ duration: dur, repeat: Infinity, delay, ease: "linear" }}>
      <motion.svg width="10" height="6" viewBox="0 0 11 6" style={{ transformOrigin: "50% 50%" }}
        animate={{ scaleY: [1, 0.3, 1] }} transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}>
        <polygon points="0,1.5 5.5,5 11,1.5 5.5,3" fill="#1c2438" />
      </motion.svg>
    </motion.div>
  );
}

// Tracks the viewport width so the dragon (and the rider scaled off it) stay
// a believable, responsive size — never absurdly large on a phone, never
// tiny on an ultrawide desktop — without hardcoding one fixed px value.
function useDragonWidth() {
  const [vw, setVw] = useState(() => (typeof window !== "undefined" ? window.innerWidth : 1280));
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return Math.min(620, Math.max(230, vw * 0.52));
}

const FOREST_ROW = Array.from({ length: 9 });

// WOW 5: she mounts the tamed dragon and they launch off the mountain.
// The whole world becomes a layered aerial landscape scrolling beneath her —
// mountains, forest, a winding river, a distant ruin — until golden lights
// appear far on the horizon. The dragon+rider are one composition: a static
// wrapper centers them in the frame, a scroll-driven layer handles the
// launch/pan, and an inner layer carries the continuous flight bob — the
// rider is anchored to the dragon's own drawn saddle, not bounced separately.
export default function DragonFlight() {
  const { ref, progress } = useStage();
  const [beat, setBeat] = useState("mount");
  useMotionValueEvent(progress, "change", (v) =>
    setBeat(v < 0.12 ? "mount" : v < 0.84 ? "fly" : "horizon"));

  const dragonW = useDragonWidth();
  const riderW = dragonW * 0.165;

  const farX = useTransform(progress, [0.12, 0.84], ["0vw", "-70vw"]);
  const midX = useTransform(progress, [0.12, 0.84], ["0vw", "-130vw"]);
  const forestX = useTransform(progress, [0.12, 0.84], ["0vw", "-210vw"]);
  const fgX = useTransform(progress, [0.12, 0.84], ["0vw", "-280vw"]);
  const mistX = useTransform(progress, [0, 1], ["0vw", "-18vw"]);

  const mountX = useTransform(progress, [0, 0.12], ["-4vw", "0vw"]);
  const mountY = useTransform(progress, [0, 0.12, 0.5, 0.84], ["26vh", "0vh", "-3vh", "2vh"]);
  const toastOp = useTransform(progress, [0.02, 0.06, 0.12], [0, 1, 0]);
  const ledgeOp = useTransform(progress, [0.04, 0.2], [1, 0]);
  const fgCloud1 = useTransform(progress, [0.3, 0.44], ["125vw", "-140vw"]);
  const fgCloud2 = useTransform(progress, [0.6, 0.74], ["125vw", "-140vw"]);
  const cityScale = useTransform(progress, [0.84, 0.99], [0.35, 1.5]);
  const cityOp = useTransform(progress, [0.84, 0.92], [0, 1]);
  const cityTextOp = useTransform(progress, [0.87, 0.93], [0, 1]);

  return (
    <Stage vh={430} id="flight" stageRef={ref} className="bg-quest-navy-deep">
      {/* FAR BACKGROUND — atmospheric dusk sky */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #101c3c 0%, #223a68 32%, #3f5c8e 55%, #7590ae 78%, #a6bcd2 100%)" }} />
      <div className="absolute left-[16%] top-[8%] w-36 h-36 bg-amber-100/50 blur-3xl rounded-full" />
      <ParticleField variant="stars" count={26} />
      <SkyCloud top="6%" scale={0.7} tone="mauve" opacity={0.3} delay={0} dur={190} />
      <SkyCloud top="13%" scale={1.05} tone="pale" opacity={0.5} delay={20} dur={140} />
      <SkyCloud top="20%" scale={0.85} tone="warm" opacity={0.4} delay={55} dur={165} />
      <Bird top="16%" delay={3} dur={24} />
      <Bird top="21%" delay={12} dur={28} />

      {/* far mountains — pale, low-contrast, soft glow behind two peaks */}
      <motion.div style={{ x: farX }} className="absolute bottom-[38%] left-0 w-[130%] h-[34%] opacity-70 will-change-transform">
        <div className="absolute left-[18%] top-[6%] w-24 h-16 bg-amber-100/25 blur-2xl rounded-full" />
        <div className="absolute left-[62%] top-0 w-20 h-14 bg-white/15 blur-2xl rounded-full" />
        <svg viewBox={`0 0 ${RIDGE_W} 200`} preserveAspectRatio="none" className="w-full h-full">
          <polygon points={`0,200 ${FAR_RIDGE} ${RIDGE_W},200`} fill="#7c8bab" />
        </svg>
        <div className="absolute left-[58%] bottom-[58%] z-10"><DistantCastle w={40} /></div>
      </motion.div>

      {/* mist between far and mid layers */}
      <motion.div style={{ x: mistX }} className="absolute bottom-[33%] left-0 w-[140%] h-[5%] bg-white/10 blur-xl will-change-transform pointer-events-none" />

      {/* MID BACKGROUND — more detailed range + pine tree line at its base */}
      <motion.div style={{ x: midX }} className="absolute bottom-[26%] left-0 w-[160%] h-[30%] opacity-85 will-change-transform">
        <svg viewBox={`0 0 ${RIDGE_W} 200`} preserveAspectRatio="none" className="w-full h-full">
          <polygon points={`0,200 ${MID_RIDGE} ${RIDGE_W},200`} fill="#4c5d74" />
        </svg>
      </motion.div>
      <motion.div style={{ x: midX }} className="absolute bottom-[24%] left-0 w-[160%] h-[7%] opacity-90 will-change-transform">
        <svg viewBox={`0 0 ${RIDGE_W} 40`} preserveAspectRatio="none" className="w-full h-full">
          <polygon points={`0,40 ${PINE_EDGE} ${RIDGE_W},40`} fill="#1c2c22" />
        </svg>
      </motion.div>
      <div className="absolute bottom-[22%] left-0 right-0 h-10 bg-gradient-to-t from-[#2a3c34]/30 to-transparent blur-md pointer-events-none" />

      {/* LOWER LANDSCAPE — valley forest patches + a winding river */}
      <motion.div style={{ x: forestX }} className="absolute bottom-[6%] left-0 w-[280%] h-[22%] will-change-transform">
        <div className="absolute inset-x-0 bottom-[38%]">
          <River w={2600} h={110} />
        </div>
        <div className="absolute bottom-0 left-0 w-full flex items-end gap-6">
          {FOREST_ROW.map((_, i) => <ForestPatch key={i} w={70 + (i % 3) * 26} tone={i} />)}
        </div>
      </motion.div>

      {/* natural terrain edge under the forest — jagged, not a flat green bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[7%]" style={{ background: "linear-gradient(to bottom, #142418 0%, #060e09 100%)" }} />
      <svg viewBox={`0 0 ${RIDGE_W} 16`} preserveAspectRatio="none" className="absolute bottom-[6.5%] left-0 w-full h-4">
        <polygon points={`0,16 ${ridgeLine(40, RIDGE_W, 8, 3, 1.4, 0.9, 2.2, 0.7)} ${RIDGE_W},16`} fill="#16281c" />
      </svg>

      {/* the launch ledge she takes off from, falling away behind */}
      <motion.div style={{ opacity: ledgeOp }} className="absolute bottom-0 left-0 w-[42vw] h-[24%] will-change-transform">
        <svg viewBox="0 0 200 100" preserveAspectRatio="none" className="w-full h-full">
          <polygon points={`0,100 ${ridgeLine(16, 200, 40, 18, 8, 0.7, 1.6, 1.2)} 200,0 200,100`} fill="#0e1a28" />
        </svg>
      </motion.div>

      {/* DRAGON + RIDER — one composition, centered as the section's focal point */}
      <div className="absolute left-[9%] sm:left-[12%] top-[65%] -translate-y-1/2 z-20 inline-block will-change-transform">
        <motion.div style={{ x: mountX, y: mountY }} className="relative inline-block will-change-transform">
          <motion.div
            animate={{ y: [-9, 9, -9], rotate: [-1, 1, -1] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
            className="relative inline-block will-change-transform"
          >
            <Dragon state="ride" facing="right" size={dragonW} />
            {/* anchored to the dragon's own drawn saddle, just behind the neck */}
            <div className="absolute" style={{ left: "43%", top: "39%", width: `${riderW}px` }}>
              <Heroine state={beat === "horizon" ? "discover" : "ride"} facing="right" size={riderW} />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* clouds that sweep IN FRONT of the camera — motion-blurred, foreground */}
      <motion.div style={{ x: fgCloud1 }} className="absolute top-[8%] left-0 w-[130vw] h-[38vh] bg-white/70 blur-3xl rounded-full z-40 will-change-transform pointer-events-none" />
      <motion.div style={{ x: fgCloud2 }} className="absolute top-[50%] left-0 w-[120vw] h-[28vh] bg-white/60 blur-3xl rounded-full z-40 will-change-transform pointer-events-none" />

      {/* FOREGROUND — dark pine tops brushing past the bottom corners, fastest layer */}
      <motion.div style={{ x: fgX }} className="absolute -bottom-2 left-0 w-[400%] flex items-end gap-3 z-30 will-change-transform pointer-events-none">
        {Array.from({ length: 100 }).map((_, i) => <ForegroundPine key={i} h={72 + (i % 3) * 30} flip={i % 2 === 0} />)}
      </motion.div>

      {/* mount toast */}
      <motion.div style={{ opacity: toastOp }} className="absolute top-[16%] left-1/2 -translate-x-1/2 z-30 hud-glass border-2 border-quest-gold/60 px-6 py-3 scanlines pointer-events-none">
        <div className="font-display text-[8px] text-quest-gold">MOUNTED</div>
        <div className="font-pixel text-xl text-white">UNCERTAINTY — TAMED</div>
      </motion.div>

      {/* a city of gold appears on the horizon */}
      <motion.div style={{ scale: cityScale, opacity: cityOp }} className="absolute right-[10%] bottom-[38%] z-10 will-change-transform">
        <div className="relative w-40 h-20">
          <div className="absolute inset-0 bg-quest-gold/30 blur-xl rounded-full" />
          {[[0, 14], [10, 4], [18, 18], [28, 8], [38, 15], [48, 5], [58, 12], [68, 3], [76, 16], [86, 8], [94, 13], [30, 30], [55, 26], [12, 34]].map(([x, y], i) => (
            <div key={i} className="absolute w-1.5 h-1.5 bg-quest-gold rounded-full animate-twinkle" style={{ left: x, top: y, animationDelay: `${i * 0.4}s` }} />
          ))}
        </div>
      </motion.div>
      <motion.div style={{ opacity: cityTextOp }} className="absolute left-1/2 top-[14%] -translate-x-1/2 z-30 text-center pointer-events-none">
        <div className="font-pixel text-3xl sm:text-5xl text-quest-gold text-shadow-glow">A CITY OF GOLD ON THE HORIZON</div>
        <div className="font-display text-[9px] text-white/70 mt-3 animate-pulse">KEEP SCROLLING — DESCEND TOWARD THE LIGHTS</div>
      </motion.div>
    </Stage>
  );
}
