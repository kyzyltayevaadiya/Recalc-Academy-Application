import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PROFILE } from "@/lib/questData";
import ParticleField from "@/components/rpg/ParticleField";

const PDF_URL = "/evidence/evidence-of-achievements.pdf";

// Bulk-import every rasterized page, sorted by filename (page-01.jpg, page-02.jpg, ...)
// so the deck of images always matches the source document's real page order.
const modules = import.meta.glob("../assets/evidence/*.jpg", { eager: true, import: "default" });
const PAGES = Object.keys(modules)
  .sort()
  .map((k) => modules[k]);

// Same treatment as the CV page — the untouched document as a plain image,
// no PDF-reader chrome — but for a multi-page document, framed as a book
// you page through instead of one long scroll. The whole layout is a fixed
// h-screen column (header / title / page / nav) with the page image capped
// to whatever vertical room is left, so a single page always fits on screen
// with no scrolling — the point of paging through it in the first place.
export default function EvidenceBook() {
  const [page, setPage] = useState(0);
  const total = PAGES.length;

  const go = useCallback((next) => {
    setPage(Math.min(total - 1, Math.max(0, next)));
  }, [total]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") go(page + 1);
      if (e.key === "ArrowLeft") go(page - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [page, go]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-quest-navy-deep to-quest-navy px-4 py-3 flex flex-col items-center">
      <ParticleField variant="stars" count={50} />

      <div className="relative z-10 w-full max-w-3xl h-full min-h-0 flex flex-col items-center">
        <div className="flex items-center justify-between w-full shrink-0">
          <Link
            to="/"
            className="font-display text-[9px] text-quest-gold/80 hover:text-quest-gold border-2 border-quest-gold/40 hover:border-quest-gold px-3 py-1.5 transition-colors"
          >
            ← BACK
          </Link>
          <div className="text-center">
            <div className="font-display text-[8px] text-quest-gold tracking-widest">EVIDENCE OF ACHIEVEMENT</div>
            <div className="font-pixel text-base sm:text-lg text-white text-shadow-pixel leading-tight">{PROFILE.name}'s Tome of Deeds</div>
          </div>
          <a
            href={PDF_URL}
            download
            className="font-display text-[9px] text-quest-navy bg-quest-gold hover:bg-white px-3 py-1.5 transition-colors"
          >
            ↓ PDF
          </a>
        </div>

        {/* Manuscript frame — aged parchment CSS, gold trim, corner flourishes.
            Sized to the page image itself, which is capped to the room left
            after the header/nav so the whole page fits without scrolling. */}
        <div className="relative flex-1 min-h-0 w-full flex items-center justify-center py-2">
          <div
            className="relative inline-block p-2 sm:p-3 scanlines max-w-full"
            style={{
              background: "linear-gradient(160deg, #cdae74 0%, #b8945a 45%, #a3803f 100%)",
              boxShadow: "0 0 0 3px #0b0f1a, 0 0 0 6px rgba(253,184,19,0.85), 0 0 0 9px #0b0f1a, inset 0 0 50px rgba(70,42,10,0.55), 0 20px 60px rgba(0,0,0,0.6)",
            }}
          >
            <span className="absolute top-2 left-2 text-quest-gold-deep/80 text-lg leading-none select-none">✦</span>
            <span className="absolute top-2 right-2 text-quest-gold-deep/80 text-lg leading-none select-none">✦</span>
            <span className="absolute bottom-2 left-2 text-quest-gold-deep/80 text-lg leading-none select-none">✦</span>
            <span className="absolute bottom-2 right-2 text-quest-gold-deep/80 text-lg leading-none select-none">✦</span>

            {/* the untouched document page, as a plain image — no PDF-reader chrome */}
            {PAGES.length > 0 && (
              <img
                src={PAGES[page]}
                alt={`${PROFILE.name} — Evidence of Achievement, page ${page + 1} of ${total}`}
                className="block select-none max-w-full object-contain"
                style={{ maxHeight: "calc(100vh - 170px)" }}
                draggable={false}
              />
            )}
          </div>
        </div>

        {/* page navigation */}
        <div className="flex items-center justify-center gap-3 shrink-0">
          <button
            onClick={() => go(page - 1)}
            disabled={page === 0}
            className="font-display text-[9px] text-quest-navy bg-quest-gold hover:bg-white disabled:opacity-30 disabled:pointer-events-none px-3 py-2 transition-colors"
            aria-label="Previous page"
          >
            ◀ PREV
          </button>

          <div className="hud-glass border border-quest-gold/40 px-3 py-1.5 flex items-center gap-2">
            <input
              type="number"
              min={1}
              max={total}
              value={page + 1}
              onChange={(e) => go(Number(e.target.value) - 1)}
              className="w-10 bg-transparent text-center font-pixel text-base text-quest-gold outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="font-body text-xs text-white/50">/ {total}</span>
          </div>

          <button
            onClick={() => go(page + 1)}
            disabled={page === total - 1}
            className="font-display text-[9px] text-quest-navy bg-quest-gold hover:bg-white disabled:opacity-30 disabled:pointer-events-none px-3 py-2 transition-colors"
            aria-label="Next page"
          >
            NEXT ▶
          </button>
        </div>
      </div>
    </div>
  );
}
