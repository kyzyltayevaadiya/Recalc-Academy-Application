import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const C = {
  hair: "#6E3420", hairHi: "#8A4530", hairDk: "#4E2416",
  skin: "#F5CFA8", skinDk: "#E2B183",
  jacket: "#2E3A6E", jacketDk: "#232C58",
  gold: "#FDB813", scarf: "#C8102E", scarfDk: "#9C1024",
  bag: "#8A5A2A", bagDk: "#6B4420",
  pants: "#3A3F5C", boot: "#241A2E",
};

// Arm poses per state. r = rotate keyframes (array = loop), d = duration, delay = phase offset.
const ARMS = {
  idle: { back: { r: [3, -3, 3], d: 3 }, front: { r: [-3, 3, -3], d: 3 } },
  look: { back: { r: 5 }, front: { r: -5 } },
  walk: { back: { r: [16, -16, 16], d: 0.55 }, front: { r: [-16, 16, -16], d: 0.55, delay: 0.28 } },
  run: { back: { r: [34, -34, 34], d: 0.26 }, front: { r: [-34, 34, -34], d: 0.26, delay: 0.13 } },
  climb: { back: { r: [-150, -158, -150], d: 0.6 }, front: { r: [-158, -150, -158], d: 0.6 } },
  sit: { back: { r: 25 }, front: { r: -12 } },
  read: { back: { r: -50 }, front: { r: -50 } },
  discover: { back: { r: 12 }, front: { r: -165 } },
  celebrate: { back: { r: -160 }, front: { r: 160 } },
  dodge: { back: { r: 40 }, front: { r: 30 } },
  attack: { back: { r: -30 }, front: { r: [-80, 55, -80], d: 0.4 } },
  knocked: { back: { r: 70 }, front: { r: 70 } },
  rise: { back: { r: 80 }, front: { r: -35 } },
  open: { back: { r: -40 }, front: { r: -40 } },
  ride: { back: { r: -75 }, front: { r: -75 } },
};

const legStyle = { transformBox: "fill-box", transformOrigin: "50% 8%" };
const armStyle = { transformBox: "fill-box", transformOrigin: "50% 10%" };
const headStyle = { transformBox: "fill-box", transformOrigin: "50% 100%" };
const hairStyle = { transformBox: "fill-box", transformOrigin: "50% 0%" };

// Female pixel-art heroine: explorer, builder, future finance professional.
// States: idle walk run climb look sit read discover celebrate dodge attack knocked rise open ride
export default function Heroine({ state = "idle", facing = "right", size = 96, className = "" }) {
  const reduce = !!useReducedMotion();
  const moving = state === "walk" || state === "run";
  const speed = state === "run" ? 0.26 : 0.55;
  const hurt = state === "knocked";
  const happy = state === "celebrate" || state === "discover";

  const face = hurt ? "hurt" : happy ? "happy" : state === "attack" || state === "dodge" ? "focus" : "soft";

  const bob =
    state === "celebrate" ? { y: [0, -8, 0] } :
    moving ? { y: [0, -2, 0] } :
    state === "idle" || state === "look" ? { y: [0, -1, 0] } : {};
  const bobT = state === "celebrate"
    ? { duration: 0.45, repeat: Infinity, ease: "easeOut" }
    : moving ? { duration: speed, repeat: Infinity, ease: "easeInOut" }
    : { duration: 3, repeat: Infinity, ease: "easeInOut" };

  const climb = state === "climb";
  const legSwing = state === "run" ? 26 : state === "walk" ? 13 : climb ? 9 : 0;
  const legDur = climb ? 0.6 : speed;
  const legAnim = legSwing && !reduce ? { rotate: [legSwing, -legSwing, legSwing] } : {};
  const legT = legSwing && !reduce ? { duration: legDur, repeat: Infinity, ease: "easeInOut" } : {};
  const legT2 = legSwing && !reduce ? { ...legT, delay: legDur / 2 } : {};

  const A = ARMS[state] || ARMS.idle;
  const mk = (p) => (!p || reduce) ? { animate: {}, transition: {} } : ({
    animate: { rotate: p.r },
    transition: { duration: p.d ?? (moving ? speed : 0.4), repeat: Array.isArray(p.r) ? Infinity : 0, delay: p.delay ?? 0, ease: "easeInOut" },
  });
  const backArm = mk(A.back);
  const frontArm = mk(A.front);
  const streaming = state === "run" || state === "ride";

  return (
    <div className={`relative ${className}`} style={{ width: size, height: (size * 4) / 3 }}>
      {state === "discover" && !reduce && (
        <motion.span
          className="absolute -top-5 left-1/2 -translate-x-1/2 font-display text-sm text-quest-gold text-shadow-glow"
          animate={{ y: [0, -6, 0], opacity: [1, 0.7, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >!</motion.span>
      )}
      {state === "celebrate" && !reduce && (
        <>
          <motion.span className="absolute -top-4 left-0 text-quest-gold text-lg" animate={{ y: [0, -12, 0], opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity }}>✦</motion.span>
          <motion.span className="absolute -top-7 right-0 text-quest-gold text-lg" animate={{ y: [0, -14, 0], opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}>✦</motion.span>
        </>
      )}

      <div className="w-full h-full" style={{ transform: facing === "left" ? "scaleX(-1)" : undefined }}>
        <motion.div className="w-full h-full" animate={reduce ? {} : bob} transition={bobT}>
          <motion.svg
            viewBox="0 0 18 24"
            width="100%"
            height="100%"
            shapeRendering="crispEdges"
            animate={hurt ? { rotate: 78, y: 5 } : { rotate: 0, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
          >
            {/* flowing hair — behind the body */}
            <motion.g style={hairStyle}
              animate={reduce ? {} : streaming ? { skewX: -6 } : { rotate: [-2.5, 2.5, -2.5] }}
              transition={streaming ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}>
              <rect x="4" y="2" width="3" height="10" fill={C.hairDk} />
              <rect x="5" y="3" width="3" height="12" fill={C.hair} />
              <rect x="4" y="13" width="3" height="4" fill={C.hair} />
              <rect x="6" y="4" width="1" height="2" fill={C.hairHi} />
            </motion.g>

            {/* scarf tail */}
            <motion.g style={{ transformBox: "fill-box", transformOrigin: "100% 0%" }}
              animate={reduce ? {} : streaming ? { rotate: [-28, -18, -28] } : { rotate: [-6, 8, -6] }}
              transition={{ duration: streaming ? 1.1 : 2.2, repeat: Infinity, ease: "easeInOut" }}>
              <rect x="3" y="8" width="4" height="2" fill={C.scarf} />
              <rect x="1" y="9" width="3" height="2" fill={C.scarfDk} />
            </motion.g>

            {/* legs */}
            {state === "sit" ? (
              <g>
                <rect x="6" y="16" width="7" height="2" fill={C.pants} />
                <rect x="6" y="18" width="2" height="2" fill={C.boot} />
              </g>
            ) : state === "ride" ? (
              <g>
                <rect x="5" y="15" width="4" height="2" fill={C.pants} />
                <rect x="9" y="15" width="4" height="2" fill={C.pants} />
                <rect x="4" y="16" width="2" height="2" fill={C.boot} />
                <rect x="12" y="16" width="2" height="2" fill={C.boot} />
              </g>
            ) : state === "rise" ? (
              <g>
                <rect x="6" y="15" width="2" height="4" fill={C.pants} />
                <rect x="8" y="17" width="4" height="2" fill={C.pants} />
                <rect x="6" y="19" width="2" height="2" fill={C.boot} />
              </g>
            ) : (
              <>
                <motion.g style={legStyle} animate={legAnim} transition={legT}>
                  <rect x="6" y="15" width="2" height="5" fill={C.pants} />
                  <rect x="6" y="19" width="2" height="2" fill={C.boot} />
                </motion.g>
                <motion.g style={legStyle} animate={legAnim} transition={legT2}>
                  <rect x="10" y="15" width="2" height="5" fill={C.pants} />
                  <rect x="10" y="19" width="2" height="2" fill={C.boot} />
                </motion.g>
              </>
            )}

            {/* jacket body */}
            <rect x="5" y="8" width="8" height="7" fill={C.jacket} />
            <rect x="5" y="8" width="8" height="1" fill={C.gold} />
            <rect x="5" y="14" width="8" height="2" fill={C.jacketDk} />
            <rect x="12" y="9" width="1" height="5" fill={C.jacketDk} />
            {/* satchel strap */}
            <rect x="6" y="8" width="1" height="1" fill={C.gold} />
            <rect x="7" y="9" width="1" height="1" fill={C.gold} />
            <rect x="8" y="10" width="1" height="1" fill={C.gold} />
            <rect x="9" y="11" width="1" height="1" fill={C.gold} />
            <rect x="10" y="12" width="1" height="1" fill={C.gold} />
            {/* satchel */}
            <rect x="12" y="12" width="3" height="3" fill={C.bag} />
            <rect x="12" y="12" width="3" height="1" fill={C.bagDk} />
            <rect x="13" y="13" width="1" height="1" fill={C.gold} />

            {/* scarf at neck */}
            <rect x="6" y="7" width="6" height="1.5" fill={C.scarf} />

            {/* arms */}
            <motion.g style={armStyle} {...backArm}>
              <rect x="4" y="9" width="1.5" height="5" fill={C.jacketDk} />
              <rect x="4" y="13" width="1.5" height="1" fill={C.skin} />
            </motion.g>
            <motion.g style={armStyle} {...frontArm}>
              <rect x="12.5" y="9" width="1.5" height="5" fill={C.jacket} />
              <rect x="12.5" y="13" width="1.5" height="1" fill={C.skin} />
            </motion.g>

            {/* sword while attacking */}
            {state === "attack" && (
              <motion.g style={armStyle} animate={{ rotate: [-70, 60, -70] }} transition={{ duration: 0.4, repeat: Infinity, ease: "easeIn" }}>
                <rect x="14" y="3" width="1" height="8" fill="#d8e8f0" />
                <rect x="13.5" y="10" width="2" height="1" fill={C.gold} />
              </motion.g>
            )}

            {/* map while reading */}
            {state === "read" && (
              <g>
                <rect x="8" y="10" width="5" height="4" fill="#e8d8a8" />
                <rect x="9" y="11" width="3" height="0.5" fill="#a88858" />
                <rect x="9" y="12" width="2" height="0.5" fill="#a88858" />
                <rect x="11" y="11" width="1" height="1" fill={C.scarf} />
              </g>
            )}

            {/* head */}
            <motion.g style={headStyle}
              animate={reduce ? {} : state === "look" ? { rotate: [0, 3, -2, 0] } : (state === "read" || state === "open") ? { rotate: 3 } : {}}
              transition={state === "look" ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : {}}
            >
              <rect x="6" y="2" width="6" height="6" fill={C.skin} />
              <rect x="6" y="7" width="6" height="1" fill={C.skinDk} />
              {/* bangs + side lock */}
              <rect x="5" y="1" width="8" height="2" fill={C.hair} />
              <rect x="5" y="2" width="1" height="4" fill={C.hair} />
              <rect x="6" y="2" width="1" height="1" fill={C.hairHi} />
              {/* face */}
              {face === "hurt" ? (
                <g>
                  <rect x="9" y="4" width="1" height="1" fill="#7a1a1a" />
                  <rect x="11" y="4" width="1" height="1" fill="#7a1a1a" />
                  <rect x="10" y="6" width="1" height="1" fill="#7a1a1a" />
                </g>
              ) : face === "happy" ? (
                <g>
                  <rect x="9" y="4" width="1" height="1" fill="#ffffff" />
                  <rect x="11" y="4" width="1" height="1" fill="#ffffff" />
                  <rect x="9" y="6" width="2" height="1" fill="#d94f4f" />
                </g>
              ) : (
                <g>
                  <rect x="9" y="4" width="1" height="1" fill={C.gold} />
                  <rect x="11" y="4" width="1" height="1" fill={C.gold} />
                  {face === "focus" && <rect x="9" y="3" width="2" height="1" fill={C.hairDk} />}
                  <rect x="10" y="6" width="1" height="1" fill="#c47a5a" />
                </g>
              )}
            </motion.g>
          </motion.svg>
        </motion.div>
      </div>
    </div>
  );
}