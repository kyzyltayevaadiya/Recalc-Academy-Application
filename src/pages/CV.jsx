import React from "react";
import { Link } from "react-router-dom";
import { PROFILE } from "@/lib/questData";
import ParticleField from "@/components/rpg/ParticleField";
import cvPage from "@/assets/cv-page.png";

const CV_URL = "/cv/adiya-kyzyltayeva-resume.pdf";

// Shows the résumé as a plain, full-resolution image of the page — not a
// browser PDF plugin, so there's no reader chrome (toolbar, thumbnail rail)
// to fight with. The underlying PDF is still available as-is via Download.
// This page only supplies the frame around it: an aged-manuscript panel in
// the site's pixel-RPG palette, built from CSS, not a generated image.
export default function CV() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-quest-navy-deep to-quest-navy px-4 py-10 flex flex-col items-center">
      <ParticleField variant="stars" count={50} />

      <div className="relative z-10 w-full max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/"
            className="font-display text-[10px] text-quest-gold/80 hover:text-quest-gold border-2 border-quest-gold/40 hover:border-quest-gold px-4 py-2 transition-colors"
          >
            ← BACK TO THE QUEST
          </Link>
          <a
            href={CV_URL}
            download
            className="font-display text-[10px] text-quest-navy bg-quest-gold hover:bg-white px-4 py-2 transition-colors"
          >
            ↓ DOWNLOAD PDF
          </a>
        </div>

        <div className="text-center mb-4">
          <div className="font-display text-[10px] text-quest-gold tracking-widest">ANCIENT RECORDS</div>
          <div className="font-pixel text-2xl text-white text-shadow-pixel mt-1">{PROFILE.name}'s Character Dossier</div>
        </div>

        {/* Manuscript frame — aged parchment CSS, gold trim, corner flourishes */}
        <div
          className="relative p-3 sm:p-5 scanlines"
          style={{
            background: "linear-gradient(160deg, #cdae74 0%, #b8945a 45%, #a3803f 100%)",
            boxShadow: "0 0 0 3px #0b0f1a, 0 0 0 6px rgba(253,184,19,0.85), 0 0 0 9px #0b0f1a, inset 0 0 50px rgba(70,42,10,0.55), 0 20px 60px rgba(0,0,0,0.6)",
          }}
        >
          {/* corner flourishes */}
          <span className="absolute top-2 left-2 text-quest-gold-deep/80 text-lg leading-none select-none">✦</span>
          <span className="absolute top-2 right-2 text-quest-gold-deep/80 text-lg leading-none select-none">✦</span>
          <span className="absolute bottom-2 left-2 text-quest-gold-deep/80 text-lg leading-none select-none">✦</span>
          <span className="absolute bottom-2 right-2 text-quest-gold-deep/80 text-lg leading-none select-none">✦</span>

          {/* the untouched document, as a plain image — no PDF-reader chrome */}
          <img src={cvPage} alt={`${PROFILE.name} — résumé`} className="relative w-full h-auto block" />
        </div>
      </div>
    </div>
  );
}
