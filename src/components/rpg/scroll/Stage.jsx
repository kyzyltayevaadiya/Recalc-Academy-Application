import React, { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

// Hook: track 0..1 scroll progress across this stage's own height.
export function useStage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return { ref, progress: scrollYProgress };
}

// Scroll = controller. Returns "walk" while scrolling, "run" when fast, "idle" when stopped.
export function usePace(progress) {
  const [pace, setPace] = useState("idle");
  const last = useRef({ v: 0, t: 0 });
  const idleTimer = useRef(null);

  useMotionValueEvent(progress, "change", (v) => {
    const now = performance.now();
    const dt = now - last.current.t;
    if (dt > 30) {
      const vel = Math.abs(v - last.current.v) / dt * 1000;
      setPace(vel > 0.3 ? "run" : "walk");
      last.current = { v, t: now };
    }
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setPace("idle"), 600);
  });

  useEffect(() => () => clearTimeout(idleTimer.current), []);
  return pace;
}

// Pinned cinematic stage: a tall scroll track with a sticky full-screen viewport.
// Scroll inside it advances the scene instead of moving the page.
export default function Stage({ vh = 300, id, stageRef, className = "", children }) {
  return (
    <section id={id} ref={stageRef} className={`relative ${className}`} style={{ height: `${vh}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden scanlines">{children}</div>
    </section>
  );
}