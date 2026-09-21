import React, { useState } from "react";
import { motion, useTransform, useMotionValueEvent } from "framer-motion";
import Stage, { useStage, usePace } from "@/components/rpg/scroll/Stage";
import Heroine from "@/components/rpg/Heroine";
import ParticleField from "@/components/rpg/ParticleField";
import { FOREST } from "@/lib/questData";

/* ------------------------------------------------------------------ *
 * Ridge geometry — deterministic (no Math.random at render time) so   *
 * the mountain skyline never reflows, built once at module load.      *
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
const RIDGE_W = 900;
const FAR_RIDGE = ridgeLine(26, RIDGE_W, 118, 18, 7, 0.5, 1.25, 0.4);
const NEAR_RIDGE = ridgeLine(20, RIDGE_W, 150, 30, 12, 0.6, 1.05, 2.3);

/* ------------------------------------------------------------------ *
 * Trees — a handful of shape variants over a handful of shade         *
 * variants, so a hillside of them never repeats the same cutout.      *
 * Canopy and trunk overlap by one viewBox unit — no seam, no floating.*
 * ------------------------------------------------------------------ */
const TREE_PALETTES = [
  { c1: "#123324", c2: "#0d2a1c", trunk: "#0a140d", hi: "#1a4530" },
  { c1: "#16402c", c2: "#0f3222", trunk: "#0a140d", hi: "#1f5238" },
  { c1: "#0f2c20", c2: "#0a2218", trunk: "#08110c", hi: "#164028" },
  { c1: "#1a4a30", c2: "#123824", trunk: "#0a140d", hi: "#245a3c" },
];
const TREE_SHAPES = [
  { c1: "7,0 1,8 13,8", c2: "7,4 0,13 14,13", hi: "2,10 5,10 5,12 2,12" },
  { c1: "7,1 0,9 14,9", c2: "7,5 -0.5,14 14.5,14", hi: "1,11 5,11 5,13 1,13" },
  { c1: "7,0 3,7 11,7", c2: "7,3 2,13 12,13", hi: "3,10 5.5,10 5.5,12 3,12" },
  { c1: "6,0 0,8 12,8", c2: "6,4 -1,13 13,13", hi: "1,10 4,10 4,12 1,12" },
];

function Tree({ h, variant = 0, shape = 0, sway = 0 }) {
  const p = TREE_PALETTES[variant % TREE_PALETTES.length];
  const s = TREE_SHAPES[shape % TREE_SHAPES.length];
  return (
    <motion.svg
      width={h * 0.68}
      height={h}
      viewBox="0 0 14 20"
      preserveAspectRatio="none"
      shapeRendering="crispEdges"
      className="shrink-0"
      style={{ transformOrigin: "50% 100%" }}
      animate={{ rotate: [-1.1, 1.1, -1.1] }}
      transition={{ duration: 5 + (sway % 4), repeat: Infinity, ease: "easeInOut", delay: sway * 0.3 }}
    >
      <rect x="6" y="12" width="2" height="8" fill={p.trunk} />
      <polygon points={s.c1} fill={p.c1} />
      <polygon points={s.c2} fill={p.c2} />
      <polygon points={s.hi} fill={p.hi} />
    </motion.svg>
  );
}

// Tiny hazy silhouettes right above the mountains — closes the gap between
// ridge and real tree line so the forest reads as continuous, not a lone
// row of cutouts on a void. Bottom edge is flush with the viewBox floor.
function FarTree({ h }) {
  return (
    <svg width={h * 0.62} height={h} viewBox="0 0 13 18" preserveAspectRatio="none" shapeRendering="crispEdges" className="shrink-0">
      <polygon points="6.5,0 1,10 12,10" fill="#4a6a5a" />
      <polygon points="6.5,3 0,18 13,18" fill="#3c5a4c" />
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 * Ground clutter — bushes, rocks, a fallen log, grass tufts.          *
 * ------------------------------------------------------------------ */
function Bush({ w = 30, tone = 0 }) {
  const fills = ["#0d2a1c", "#123324", "#0a2218"];
  return (
    <div className="relative shrink-0" style={{ width: w, height: w * 0.55 }}>
      <div className="absolute inset-0 rounded-[45%]" style={{ background: fills[tone % fills.length] }} />
      <div className="absolute left-[15%] top-[10%] w-[45%] h-[45%] rounded-full" style={{ background: fills[(tone + 1) % fills.length] }} />
    </div>
  );
}

function Rock({ w = 16 }) {
  return (
    <svg width={w} height={w * 0.6} viewBox="0 0 10 6" shapeRendering="crispEdges" className="shrink-0">
      <polygon points="0,6 1,2 4,0 8,1 10,6" fill="#3a3630" />
      <polygon points="1,6 2,3 4,2 4,6" fill="#4c473e" />
    </svg>
  );
}

function Log() {
  return (
    <svg width="34" height="10" viewBox="0 0 34 10" shapeRendering="crispEdges" className="shrink-0">
      <rect x="2" y="3" width="30" height="5" fill="#3e2a1a" />
      <rect x="2" y="3" width="30" height="1.5" fill="#523822" />
      <ellipse cx="2" cy="5.5" rx="2" ry="3" fill="#2a1c10" />
      <ellipse cx="32" cy="5.5" rx="2" ry="3" fill="#4a3320" />
    </svg>
  );
}

function GrassTuft({ h = 10, delay = 0 }) {
  return (
    <motion.svg
      width={h * 1.1} height={h} viewBox="0 0 11 10" shapeRendering="crispEdges" className="shrink-0"
      style={{ transformOrigin: "50% 100%" }}
      animate={{ rotate: [-6, 6, -6] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <polygon points="1,10 2,2 3,10" fill="#2f5a34" />
      <polygon points="4,10 5.5,0 7,10" fill="#3c6d3f" />
      <polygon points="8,10 9,3 10,10" fill="#2f5a34" />
    </motion.svg>
  );
}

/* ------------------------------------------------------------------ *
 * Village — houses with real footing: a raised earth pad, a fence     *
 * line and shrubs, not silhouettes floating on transparent air.       *
 * ------------------------------------------------------------------ */
function Hut({ w, h, wall, roof, windows, lit = true }) {
  return (
    <div className="relative shrink-0" style={{ width: w, height: h }}>
      <div className="absolute inset-0" style={{ background: wall, border: "2px solid #201509" }} />
      <div
        className="absolute left-0 w-full"
        style={{ bottom: "100%", height: h * 0.42, background: roof, clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }}
      />
      <div className="absolute left-[10%] bottom-0 w-[80%] h-[3px]" style={{ background: "#1a1108" }} />
      {lit && windows.map((left, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2"
          style={{ top: h * 0.35, left, background: "#FDB813" }}
          animate={{ opacity: [0.55, 1, 0.7, 1] }}
          transition={{ duration: 2.6 + i, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}
    </div>
  );
}

function Fence({ posts = 4 }) {
  return (
    <div className="flex items-end gap-2 shrink-0">
      {Array.from({ length: posts }).map((_, i) => (
        <div key={i} className="relative w-1 h-6 bg-[#4a3a26]">
          {i < posts - 1 && <div className="absolute left-1 top-1.5 w-4 h-[2px] bg-[#4a3a26]" />}
        </div>
      ))}
    </div>
  );
}

// A cluster of houses standing on its own visible earth pad, ringed with a
// short fence and a couple of shrubs — a believable dooryard, not silhouettes
// pinned to nothing.
function VillageCluster({ huts, withFence = true }) {
  return (
    <div className="relative shrink-0">
      <div className="flex items-end gap-3 relative z-10 pb-[6px]">
        {huts.map((hut, i) => <Hut key={i} {...hut} />)}
      </div>
      {/* earth pad the huts stand on */}
      <div
        className="absolute -inset-x-3 bottom-0 h-[14px] rounded-[50%]"
        style={{ background: "linear-gradient(to bottom, #4a3a26 0%, #3a2d1c 100%)" }}
      />
      {withFence && (
        <div className="absolute -left-8 bottom-[6px]"><Fence posts={4} /></div>
      )}
      <div className="absolute -right-6 -bottom-1"><Bush w={26} tone={1} /></div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Foreground foliage — a real leaf cluster (many small irregular leaves *
 * on twigs) instead of a couple of smooth blobs on sticks. Shared by    *
 * the drifting corner branches and the big trunk's canopy below.        *
 * ------------------------------------------------------------------ */
const LEAF_TONES = ["#0a1c12", "#0d2216", "#132c1a"];
// Hand-placed, deterministic — roughly fills a canopy-shaped cluster.
const LEAF_POSITIONS = [
  [2, 12, 9, 6, -12, 0], [11, 5, 10, 7, 18, 1], [21, 9, 9, 6, -6, 2],
  [30, 3, 9, 6, 22, 0], [4, 22, 10, 7, 6, 1], [15, 18, 11, 7, -16, 2],
  [26, 20, 9, 6, 10, 0], [35, 12, 9, 6, -22, 1], [9, 32, 9, 6, 8, 2],
  [20, 30, 10, 7, -9, 0], [31, 28, 8, 6, 18, 1], [0, 36, 8, 6, -12, 2],
  [38, 22, 8, 6, 6, 0], [17, 0, 8, 6, 26, 1],
];

function Leaf({ x, y, w, h, rot, tone }) {
  return (
    <div
      className="absolute"
      style={{
        left: x, top: y, width: w, height: h,
        background: LEAF_TONES[tone % LEAF_TONES.length],
        borderRadius: "70% 30% 70% 30%",
        transform: `rotate(${rot}deg)`,
      }}
    />
  );
}

// A cluster of small leaves on a couple of twigs — reads as foliage at a
// glance instead of a soft blob, at any scale.
function LeafCanopy({ scale = 1, flip = false }) {
  return (
    <div className="relative" style={{ width: 46 * scale, height: 40 * scale, transform: flip ? "scaleX(-1)" : undefined }}>
      <div className="absolute top-[52%] left-[8%] w-[3px] h-[44%] rotate-[22deg] origin-bottom rounded-full" style={{ background: "#0a1810" }} />
      <div className="absolute top-[46%] left-[62%] w-[3px] h-[38%] rotate-[-18deg] origin-bottom rounded-full" style={{ background: "#0a1810" }} />
      {LEAF_POSITIONS.map(([x, y, w, h, rot, tone], i) => (
        <Leaf key={i} x={x * scale} y={y * scale} w={w * scale} h={h * scale} rot={rot} tone={tone} />
      ))}
    </div>
  );
}

// Overhanging branch drifting past a top corner — canopy + the twig it
// hangs from. Dark because it's the closest thing to the camera.
function ForegroundBranch({ side = "left" }) {
  const flip = side === "right";
  return (
    <div className="absolute top-0 left-0 w-[30vw] h-[40%]" style={{ transform: flip ? "scaleX(-1)" : undefined }}>
      <div className="absolute top-0 left-[10%] w-2 h-[50%] rotate-[15deg] origin-top rounded-full" style={{ background: "#0a1810" }} />
      <div className="absolute top-[6%] left-[-4%]" style={{ transform: "scale(1.7)", transformOrigin: "top left" }}>
        <LeafCanopy />
      </div>
    </div>
  );
}

// The one big trunk that sweeps past close to the camera — full bark
// texture, taller than the viewport, with its own canopy so the leaves
// up top are visibly its branches and not an unrelated floating cluster.
function TrunkPass() {
  return (
    <div className="relative w-full h-full">
      <div
        className="absolute inset-y-0 left-[32%] w-[20%]"
        style={{ background: "linear-gradient(90deg, #040b06 0%, #0c1a10 28%, #132414 50%, #0c1a10 72%, #040b06 100%)" }}
      >
        <div className="absolute inset-y-0 left-[12%] w-[7%] bg-black/30" />
        <div className="absolute inset-y-0 left-[42%] w-[9%] bg-black/20" />
        <div className="absolute inset-y-0 left-[70%] w-[6%] bg-black/30" />
        <div className="absolute top-[28%] left-[40%] w-[18%] h-[2.5%] rounded-full bg-black/35" />
        <div className="absolute top-[58%] left-[20%] w-[14%] h-[2%] rounded-full bg-black/30" />
        <div className="absolute top-[74%] left-[55%] w-[16%] h-[2%] rounded-full bg-black/30" />
      </div>
      {/* the canopy this trunk belongs to — anchored low enough on the trunk
          (which starts 15% above the viewport) that it's still on-screen */}
      <div className="absolute top-[15%] left-[2%]" style={{ transform: "scale(2.2)", transformOrigin: "top left" }}>
        <LeafCanopy />
      </div>
      <div className="absolute top-[18%] left-[38%]" style={{ transform: "scale(1.9)", transformOrigin: "top left" }}>
        <LeafCanopy flip />
      </div>
    </div>
  );
}

// Two short wing strokes that flap via rotation — cheap, robust, reads fine
// at the tiny size a distant bird actually renders at (path-string morphing
// isn't reliably supported here, so this avoids it entirely).
// A solid filled silhouette (not stroked lines, which vanish to stray
// pixels at this size) that squashes vertically to fake a wingbeat.
function Bird({ top, delay = 0, dur = 16 }) {
  return (
    <motion.div
      className="absolute"
      style={{ top }}
      initial={{ x: "-6vw" }}
      animate={{ x: "40vw" }}
      transition={{ duration: dur, repeat: Infinity, delay, ease: "linear" }}
    >
      <motion.svg
        width="11" height="6" viewBox="0 0 11 6"
        style={{ transformOrigin: "50% 50%" }}
        animate={{ scaleY: [1, 0.3, 1] }}
        transition={{ duration: 0.45, repeat: Infinity, ease: "easeInOut" }}
      >
        <polygon points="0,1.5 5.5,5 11,1.5 5.5,3" fill="#20281c" />
      </motion.svg>
    </motion.div>
  );
}

// Unmistakably a pixel-art cloud: 4 overlapping blocks at slightly
// different heights, muted sunset tones, no blur (stays crisp/pixel).
const CLOUD_TONES = { peach: "#d9a892", lavender: "#b6a3c4", gray: "#a89890", plum: "#7d6a86" };
function Cloud({ top, scale = 1, tone = "peach", opacity = 0.55, delay = 0, dur = 140 }) {
  const fill = CLOUD_TONES[tone];
  return (
    <motion.div
      className="absolute"
      style={{ top, opacity }}
      initial={{ x: "-24vw" }}
      animate={{ x: "124vw" }}
      transition={{ duration: dur, repeat: Infinity, delay, ease: "linear" }}
    >
      <div className="relative" style={{ width: 46 * scale, height: 20 * scale, transform: `scale(${scale})`, transformOrigin: "left center" }}>
        <div className="absolute left-0 top-[40%] w-[24%] h-[35%]" style={{ background: fill }} />
        <div className="absolute left-[14%] top-0 w-[28%] h-[55%]" style={{ background: fill }} />
        <div className="absolute left-[38%] top-[15%] w-[30%] h-[45%]" style={{ background: fill }} />
        <div className="absolute left-[62%] top-[35%] w-[22%] h-[35%]" style={{ background: fill }} />
        <div className="absolute left-[8%] top-[55%] w-[70%] h-[25%]" style={{ background: fill }} />
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ *
 * Layout data                                                         *
 * ------------------------------------------------------------------ */
const TREES_FAR = Array.from({ length: 26 });
const TREES_BACK = Array.from({ length: 18 });
const TREES_MID = Array.from({ length: 13 });
const CLUTTER = Array.from({ length: 9 });
const PATH_MARKS = [3, 11, 19, 27, 35, 43, 51, 59, 67, 75, 83, 91, 99];
const BUSHES_FRINGE = [2, 9, 16, 24, 33, 41, 49, 57, 65, 73, 81, 89, 97];
const GROUND_EDGE = ridgeLine(40, 1000, 8, 3, 1.4, 0.9, 2.2, 0.7);

const VILLAGE_MAIN = [
  { w: 52, h: 38, wall: "#33251a", roof: "#7a3e24", windows: ["28%"] },
  { w: 78, h: 46, wall: "#3a2a1e", roof: "#8a4a2a", windows: ["18%"] },
  { w: 94, h: 62, wall: "#40301f", roof: "#7a3e24", windows: ["16%", "70%"] },
  { w: 62, h: 42, wall: "#362717", roof: "#8a4a2a", windows: ["35%"] },
];
const VILLAGE_LAST = [
  { w: 58, h: 40, wall: "#3a2a1e", roof: "#6e3a20", windows: ["22%", "64%"] },
];

// WOW 1: the girl physically leaves the village and travels into a darkening
// forest. One continuous parallax landscape — mountains, distant forest,
// village, midground trees, path, foreground branches — instead of flat
// isolated cutouts.
export default function ForestPassage() {
  const { ref, progress } = useStage();
  const pace = usePace(progress);
  const [phase, setPhase] = useState("travel");
  useMotionValueEvent(progress, "change", (v) => setPhase(v > 0.87 ? "arrive" : "travel"));

  const mountainFarX = useTransform(progress, [0, 1], ["0%", "-14%"]);
  const mountainNearX = useTransform(progress, [0, 1], ["0%", "-24%"]);
  const farX = useTransform(progress, [0, 1], ["0%", "-38%"]);
  const backX = useTransform(progress, [0, 1], ["0%", "-58%"]);
  const midX = useTransform(progress, [0, 1], ["0%", "-72%"]);
  const clutterX = useTransform(progress, [0, 1], ["0%", "-80%"]);
  const bushX = useTransform(progress, [0, 1], ["0%", "-90%"]);
  const cloudX = useTransform(progress, [0, 1], ["0%", "-10%"]);

  const villageMainX = useTransform(progress, [0, 1], ["0%", "-58%"]);
  const villageMainOp = useTransform(progress, [0, 0.17], [1, 0]);
  const villageLastX = useTransform(progress, [0, 1], ["0%", "-58%"]);
  const villageLastOp = useTransform(progress, [0.1, 0.34], [1, 0]);

  const darkOp = useTransform(progress, [0.28, 0.75], [0, 0.62]);
  const fireflyOp = useTransform(progress, [0.58, 0.78], [0, 1]);
  const titleOp = useTransform(progress, [0, 0.09], [1, 0]);
  const memoryOp = useTransform(progress, [0, 0.04, 0.22, 0.28], [0, 1, 1, 0]);
  const arriveOp = useTransform(progress, [0.88, 0.94], [0, 1]);
  const branch1 = useTransform(progress, [0.14, 0.4], ["110vw", "-45vw"]);
  const branch2 = useTransform(progress, [0.44, 0.7], ["115vw", "-45vw"]);
  const branch3 = useTransform(progress, [0.74, 0.97], ["110vw", "-45vw"]);

  return (
    <Stage vh={460} id="forest-passage" stageRef={ref} className="bg-quest-navy-deep">
      {/* dawn sky — softened, longer blend into forest green */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #f0a868 0%, #e0906a 18%, #b97f78 34%, #85916e 50%, #5a8461 64%, #2f5738 80%, #1c3a24 100%)" }} />
      <div className="absolute left-[10%] top-[14%] w-28 h-28 bg-amber-200/80 blur-2xl rounded-full" />
      {/* clouds — far ones smaller/fainter/slower, near ones bolder, for atmospheric depth */}
      <Cloud top="6%" scale={0.7} tone="lavender" opacity={0.35} delay={0} dur={170} />
      <Cloud top="22%" scale={0.6} tone="gray" opacity={0.3} delay={40} dur={190} />
      <Cloud top="11%" scale={1.1} tone="peach" opacity={0.6} delay={15} dur={125} />
      <Cloud top="17%" scale={0.9} tone="plum" opacity={0.45} delay={65} dur={150} />
      <motion.div style={{ x: cloudX }} className="absolute inset-0 will-change-transform">
        <Bird top="24%" delay={2} dur={16} />
        <Bird top="29%" delay={5} dur={19} />
      </motion.div>

      {/* distant mountains — cool, low-contrast, atmospheric */}
      <motion.div style={{ x: mountainFarX }} className="absolute bottom-[30%] left-0 w-[130%] h-[42%] opacity-60 will-change-transform">
        <svg viewBox={`0 0 ${RIDGE_W} 200`} preserveAspectRatio="none" className="w-full h-full">
          <polygon points={`0,200 ${FAR_RIDGE} ${RIDGE_W},200`} fill="#8b93ab" />
        </svg>
      </motion.div>
      <motion.div style={{ x: mountainNearX }} className="absolute bottom-[26%] left-0 w-[130%] h-[38%] opacity-70 will-change-transform">
        <svg viewBox={`0 0 ${RIDGE_W} 200`} preserveAspectRatio="none" className="w-full h-full">
          <polygon points={`0,200 ${NEAR_RIDGE} ${RIDGE_W},200`} fill="#5f6d78" />
        </svg>
      </motion.div>

      {/* hazy horizon forest — bridges mountains to the real tree line */}
      <motion.div style={{ x: farX }} className="absolute bottom-[26%] left-0 w-[220%] flex items-end justify-around opacity-55 will-change-transform">
        {TREES_FAR.map((_, i) => <FarTree key={i} h={32 + (i % 4) * 9} />)}
      </motion.div>
      <div className="absolute bottom-[22%] left-0 right-0 h-16 bg-gradient-to-t from-[#3a5a48]/25 to-transparent blur-md pointer-events-none" />

      {/* the home village — more houses up front, one lingering hut further along */}
      <motion.div style={{ x: villageMainX, opacity: villageMainOp }} className="absolute bottom-[23%] left-[4%] z-10 will-change-transform">
        <VillageCluster huts={VILLAGE_MAIN} />
      </motion.div>
      <motion.div style={{ x: villageLastX, opacity: villageLastOp }} className="absolute bottom-[20%] left-[34%] z-10 will-change-transform">
        <VillageCluster huts={VILLAGE_LAST} withFence={false} />
      </motion.div>

      {/* distant tree line */}
      <motion.div style={{ x: backX }} className="absolute bottom-[21%] left-0 w-[230%] flex items-end justify-around will-change-transform">
        {TREES_BACK.map((_, i) => <Tree key={i} h={68 + ((i * 37) % 60)} variant={i} shape={i} sway={i} />)}
      </motion.div>

      {/* midground forest — varied heights, organic spacing, small clearings */}
      <motion.div style={{ x: midX, gap: "clamp(4px, 2vw, 40px)" }} className="absolute bottom-[15%] left-0 w-[260%] flex items-end will-change-transform">
        {TREES_MID.map((_, i) => (
          i % 6 === 4
            ? <div key={i} style={{ width: 46 }} /> // a small clearing
            : <Tree key={i} h={128 + ((i * 53) % 110)} variant={i + 2} shape={i + 1} sway={i + 3} />
        ))}
      </motion.div>

      {/* ground-level clutter — bushes, rocks, a fallen log */}
      <motion.div style={{ x: clutterX }} className="absolute bottom-[11.5%] left-0 w-[300%] flex items-end gap-10 will-change-transform">
        {CLUTTER.map((_, i) => {
          const kind = i % 4;
          if (kind === 0) return <Bush key={i} w={22 + (i % 3) * 6} tone={i} />;
          if (kind === 1) return <Rock key={i} w={14 + (i % 3) * 4} />;
          if (kind === 2) return <Log key={i} />;
          return <GrassTuft key={i} h={10 + (i % 3) * 3} delay={i * 0.2} />;
        })}
      </motion.div>

      {/* natural terrain — jagged grass edge over layered soil, not a flat bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[16%]" style={{ background: "linear-gradient(to bottom, #17321f 0%, #0a160e 60%, #060e09 100%)" }} />
      <svg viewBox={`0 0 1000 16`} preserveAspectRatio="none" className="absolute bottom-[16%] left-0 w-full h-4">
        <polygon points={`0,16 ${GROUND_EDGE} 1000,16`} fill="#1c3a24" />
      </svg>
      <div className="absolute bottom-[13%] left-0 right-0 h-[3%] bg-[#122a1a]/70" />

      {/* the worn dirt path she actually walks on */}
      <motion.div
        style={{ x: bushX, background: "linear-gradient(to bottom, #6b5636 0%, #4a3a26 55%, #3a2d1c 100%)" }}
        className="absolute bottom-0 left-0 w-[300%] h-[8%] will-change-transform"
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#8a7048]/70" />
        {PATH_MARKS.map((p, i) => (
          <div key={i} className="absolute bottom-[20%] w-2 h-1 bg-[#2e2417]/60 rounded-full" style={{ left: `${p}%` }} />
        ))}
      </motion.div>

      {/* low grass fringing the path */}
      <motion.div style={{ x: bushX }} className="absolute bottom-[7.5%] left-0 w-[300%] flex items-end justify-around will-change-transform">
        {BUSHES_FRINGE.map((_, i) => <GrassTuft key={i} h={8 + (i % 2) * 4} delay={i * 0.15} />)}
      </motion.div>

      {/* leaves flying past */}
      <ParticleField variant="leaves" count={18} />

      {/* the heroine — world travels past her */}
      <div className="absolute bottom-[11%] left-[24%] sm:left-[28%] z-20">
        <Heroine state={phase === "arrive" ? "discover" : pace} facing="right" size={110} />
      </div>

      {/* darkening forest light + fireflies */}
      <motion.div style={{ opacity: darkOp }} className="absolute inset-0 bg-[#04120b] pointer-events-none" />
      <motion.div style={{ opacity: fireflyOp }} className="absolute inset-0">
        <ParticleField variant="fireflies" count={16} />
      </motion.div>

      {/* foreground — occasional drifting branches, and one big trunk that
          briefly passes between camera and the girl (closest layer, fastest) */}
      <motion.div style={{ x: branch1 }} className="absolute inset-0 z-40 will-change-transform pointer-events-none">
        <ForegroundBranch side="left" />
      </motion.div>
      <motion.div style={{ x: branch2 }} className="absolute -top-[15%] left-0 w-[24vw] h-[130%] z-40 will-change-transform pointer-events-none">
        <TrunkPass />
      </motion.div>
      <motion.div style={{ x: branch3 }} className="absolute inset-0 z-40 will-change-transform pointer-events-none">
        <ForegroundBranch side="right" />
      </motion.div>

      {/* chapter title at departure */}
      <motion.div style={{ opacity: titleOp }} className="absolute top-[12%] left-1/2 -translate-x-1/2 z-30 text-center">
        <div className="font-display text-[9px] text-quest-navy/80 tracking-[0.3em]">CHAPTER I</div>
        <div className="font-pixel text-4xl text-quest-navy text-shadow-pixel">INTO THE UNKNOWN</div>
      </motion.div>

      {/* the memory that opens this chapter — a proper RPG dialogue box */}
      <motion.div
        style={{ opacity: memoryOp }}
        role="log"
        className="absolute top-[22%] left-1/2 -translate-x-1/2 z-30 w-[88vw] sm:w-[520px] hud-glass rpg-border scanlines px-6 py-5 sm:px-8 sm:py-6"
      >
        <div className="font-display text-[9px] sm:text-xs text-quest-gold mb-3 tracking-wider">▶ MEMORY</div>
        <div className="font-pixel text-lg sm:text-xl leading-snug text-white">{FOREST.memory}</div>
      </motion.div>

      {/* discovery at the clearing */}
      <motion.div style={{ opacity: arriveOp }} className="absolute left-1/2 top-[20%] -translate-x-1/2 z-30 text-center hud-glass rpg-border px-8 py-5 pointer-events-none">
        <div className="font-display text-[9px] text-quest-gold tracking-widest">NEW AREA DISCOVERED</div>
        <div className="font-pixel text-3xl text-white text-shadow-pixel mt-1">THE UNKNOWN FOREST</div>
      </motion.div>
    </Stage>
  );
}
