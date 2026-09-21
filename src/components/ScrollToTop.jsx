import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const getHashId = (hash) => {
  const rawId = hash.slice(1);

  try {
    return decodeURIComponent(rawId);
  } catch {
    return rawId;
  }
};

const scrollKey = (pathname) => `scrollY:${pathname}`;

// Remembers how far down each route was scrolled, so leaving a page (e.g.
// clicking through to /cv) and coming back — via a "back" link or the
// browser's own back button — restores the exact spot instead of dumping
// the visitor back at the top of this very long scroll-driven page.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const restoring = useRef(false);

  // continuously record scroll position for the route currently on screen
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (restoring.current) return;
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        sessionStorage.setItem(scrollKey(pathname), String(window.scrollY));
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // on route change, jump to a hash target, restore a remembered position,
  // or land at the top — in that priority order
  useEffect(() => {
    if (hash) {
      const id = getHashId(hash);
      const timer = window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 50);
      return () => window.clearTimeout(timer);
    }

    const saved = sessionStorage.getItem(scrollKey(pathname));
    if (saved == null) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }

    // the page (esp. this one, with many vh-tall scroll-driven sections)
    // may not have laid out to its full height yet right after mounting —
    // wait until there's enough room to actually reach the saved position.
    const target = Number(saved);
    restoring.current = true;
    let cancelled = false;
    const tryRestore = (attempts) => {
      if (cancelled) return;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll >= target || attempts > 30) {
        window.scrollTo({ top: target, left: 0, behavior: "instant" });
        restoring.current = false;
      } else {
        requestAnimationFrame(() => tryRestore(attempts + 1));
      }
    };
    tryRestore(0);
    return () => {
      cancelled = true;
      restoring.current = false;
    };
  }, [pathname, hash]);

  return null;
}
