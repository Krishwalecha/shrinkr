import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";

// Lenis used to run globally for the whole app, including the dashboard.
// Its continuous requestAnimationFrame loop fights with Radix's scroll-lock
// (used by the mobile sidebar Sheet, dropdowns, dialogs) and with the
// sidebar's own internal scroll container, which is what caused the visible
// lag when opening/closing the sidebar. The dashboard is app UI, not a
// marketing scroll page, so smooth-scroll only needs to run on the public
// pages — it's now mounted/torn down per route instead of once globally.
export function SmoothScroll() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  const rafRef = useRef(null);

  useEffect(() => {
    if (isDashboard) return undefined;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
    });

    function raf(time) {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }

    rafRef.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafRef.current);
      lenis.destroy();
    };
  }, [isDashboard]);

  return null;
}
