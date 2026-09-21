import React, { useState, useEffect, useRef, useCallback } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { CHAPTERS, ACHIEVEMENTS } from "@/lib/questData";
import ProgressHUD from "@/components/rpg/ProgressHUD";
import AchievementPopup from "@/components/rpg/AchievementPopup";

import HeroScene from "@/components/rpg/scenes/HeroScene";
import CharacterProfile from "@/components/rpg/scenes/CharacterProfile";
import JourneyTrail from "@/components/rpg/scenes/JourneyTrail";
import ForestPassage from "@/components/rpg/scenes/cinematic/ForestPassage";
import ChapterForest from "@/components/rpg/scenes/ChapterForest";
import MountainPassage from "@/components/rpg/scenes/cinematic/MountainPassage";
import DragonEncounter from "@/components/rpg/scenes/cinematic/DragonEncounter";
import BossBattleCinematic from "@/components/rpg/scenes/cinematic/BossBattleCinematic";
import LootSkills from "@/components/rpg/scenes/LootSkills";
import Inventory from "@/components/rpg/scenes/Inventory";
import DragonFlight from "@/components/rpg/scenes/cinematic/DragonFlight";
import CityArrival from "@/components/rpg/scenes/cinematic/CityArrival";
import FinanceCity from "@/components/rpg/scenes/FinanceCity";
import WhyFinance from "@/components/rpg/scenes/WhyFinance";
import AcademySunrise from "@/components/rpg/scenes/cinematic/AcademySunrise";
import AcademyGates from "@/components/rpg/scenes/AcademyGates";
import FinalBoss from "@/components/rpg/scenes/FinalBoss";
import FinalScreen from "@/components/rpg/scenes/FinalScreen";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [achievement, setAchievement] = useState(null);
  const unlocked = useRef(new Set());

  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setProgress(v));

  // Track the chapter band crossing the middle of the screen.
  // (Tall pinned stages never fill 40% of the viewport, so use a center line.)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const idx = CHAPTERS.findIndex((c) => c.id === id);
            if (idx >= 0) setActiveIndex(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    CHAPTERS.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const unlock = useCallback((id) => {
    if (unlocked.current.has(id)) return;
    unlocked.current.add(id);
    const a = ACHIEVEMENTS.find((x) => x.id === id);
    if (a) setAchievement(a);
  }, []);

  const jumpTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleStart = useCallback(() => {
    unlock("start");
    jumpTo("profile");
  }, [unlock, jumpTo]);

  return (
    <div className="relative w-full bg-quest-navy-deep">
      <ProgressHUD chapters={CHAPTERS} activeIndex={activeIndex} progress={progress} onJump={jumpTo} />
      <AchievementPopup achievement={achievement} onDone={() => setAchievement(null)} />

      <main>
        {/* title screen */}
        <HeroScene onStart={handleStart} />
        {/* calm beat — who she is */}
        <CharacterProfile />
        {/* the resume, as a rideable trail through real milestones */}
        <JourneyTrail onAchievement={unlock} />

        {/* WOW 1 — she leaves home and travels into the unknown forest */}
        <ForestPassage />
        {/* calm beat — the crossroads decision */}
        <ChapterForest />

        {/* WOW 2 — the forest falls away and a mountain emerges; the climb */}
        <MountainPassage />

        {/* WOW 3 + 4 — the encounter and the full scroll-controlled boss battle */}
        <DragonEncounter />
        <BossBattleCinematic onAchievement={unlock} />

        {/* calm beats — the loot, her inventory */}
        <LootSkills onAchievement={unlock} />
        <Inventory />

        {/* WOW 5 + 6 — dragon flight and the City of Capital reveal */}
        <DragonFlight />
        <CityArrival />
        <FinanceCity />
        <WhyFinance />

        {/* WOW 7 — sunrise at the academy gates */}
        <AcademySunrise onAchievement={unlock} />
        <AcademyGates onAchievement={unlock} />

        <FinalBoss />
        <FinalScreen />
      </main>
    </div>
  );
}