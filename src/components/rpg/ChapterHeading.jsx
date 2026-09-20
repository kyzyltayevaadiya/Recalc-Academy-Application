import React from "react";
import { motion } from "framer-motion";

// Reusable chapter heading: small chapter tag + big pixel title.
export default function ChapterHeading({ chapter, title, accent = "text-quest-gold", align = "center" }) {
  return (
    <div className={`mb-10 ${align === "center" ? "text-center" : "text-left"}`}>
      {chapter && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className={`font-display text-[10px] sm:text-xs ${accent} mb-3 tracking-widest`}
        >
          {chapter}
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="font-display text-2xl sm:text-3xl md:text-4xl text-white leading-tight text-shadow-pixel"
      >
        {title}
      </motion.h2>
    </div>
  );
}