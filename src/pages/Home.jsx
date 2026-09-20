import React, { useState, useEffect, useRef, useCallback } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { CHAPTERS, ACHIEVEMENTS } from "@/lib/questData";
import ProgressHUD from "@/components/rpg/ProgressHUD";
import AchievementPopup from "@/components/rpg/AchievementPopup";

import HeroScene from "@/components/rpg/scenes/HeroScene";
import CharacterProfile from "@/components/rpg/scenes/CharacterProfile";
import ChapterOrigin from "@/components/rpg/scenes/ChapterOrigin";
import ChapterForest from "@/components/rpg/scenes/ChapterForest";
import ChapterMountain from "@/components/rpg/scenes/ChapterMountain";
import BossBattle from "@/components/rpg/scenes/BossBattle";
import LootSkills from "@/components/rpg/scenes/LootSkills";
import Inventory from "@/components/rpg/scenes/Inventory";
import QuestLog from "@/components/rpg/scenes/QuestLog";
import FinanceCity from "@/components/rpg/scenes/FinanceCity";
import WhyFinance from "@/components/rpg/scenes/WhyFinance";
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

  // Track active section
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
      { threshold: 0.4 }
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

  const handleProfile = useCallback(() => {
    jumpTo("profile");
  }, [jumpTo]);

  return (
    <div className="relative w-full bg-quest-navy-deep">
      <ProgressHUD chapters={CHAPTERS} activeIndex={activeIndex} progress={progress} onJump={jumpTo} />
      <AchievementPopup achievement={achievement} onDone={() => setAchievement(null)} />

      <main>
        <HeroScene onStart={handleStart} onProfile={handleProfile} />
        <CharacterProfile />
        <ChapterOrigin onAchievement={unlock} />
        <ChapterForest />
        <ChapterMountain />
        <BossBattle onAchievement={unlock} />
        <LootSkills onAchievement={unlock} />
        <Inventory />
        <QuestLog />
        <FinanceCity />
        <WhyFinance />
        <AcademyGates onAchievement={unlock} />
        <FinalBoss />
        <FinalScreen />
      </main>
    </div>
  );
}