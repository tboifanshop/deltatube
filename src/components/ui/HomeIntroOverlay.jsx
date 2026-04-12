import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

const INTRO_DURATION_MS = 2200;
const REDUCED_INTRO_DURATION_MS = 250;
const publicUrl = (process.env.PUBLIC_URL || "").replace(/\/$/, "");

const HomeIntroOverlay = () => {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(() => pathname === "/");

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return false;
    }
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (!isVisible) return undefined;

    const finishIntro = () => setIsVisible(false);
    const timeout = window.setTimeout(
      finishIntro,
      prefersReducedMotion ? REDUCED_INTRO_DURATION_MS : INTRO_DURATION_MS
    );

    window.addEventListener("keydown", finishIntro);

    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("keydown", finishIntro);
    };
  }, [isVisible, prefersReducedMotion]);

  if (!isVisible) return null;

  const durationMs = prefersReducedMotion ? REDUCED_INTRO_DURATION_MS : INTRO_DURATION_MS;
  const cursorSrc = `${publicUrl}/images/Reaching%20for%20digital%20assistance.png`;

  return (
    <div
      onClick={() => setIsVisible(false)}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 13000,
        background: "#000",
        animation: `dt-home-intro-black-fade ${durationMs}ms ease-out forwards`,
      }}
    >
      <style>{`
        @keyframes dt-home-intro-cursor-zoom-out {
          0% {
            transform: translate(-50%, -50%) scale(6);
            opacity: 0.95;
          }
          80% {
            transform: translate(-50%, -50%) scale(0.08);
            opacity: 0.7;
          }
          100% {
            transform: translate(-50%, -50%) scale(0.02);
            opacity: 0;
          }
        }

        @keyframes dt-home-intro-black-fade {
          0%,
          74% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>

      {!prefersReducedMotion && (
        <img
          src={cursorSrc}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "140px",
            height: "140px",
            objectFit: "contain",
            pointerEvents: "none",
            filter: "drop-shadow(0 0 10px rgba(255,255,255,0.35))",
            animation: `dt-home-intro-cursor-zoom-out ${Math.round(durationMs * 0.74)}ms cubic-bezier(0.28, 0.05, 0.95, 1) forwards`,
          }}
        />
      )}
    </div>
  );
};

export default HomeIntroOverlay;
