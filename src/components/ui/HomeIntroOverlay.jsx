import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const CURSOR_IMAGE_SRC = `${(process.env.PUBLIC_URL || "").replace(/\/$/, "")}/images/Reaching for digital assistance.png`;
const ZOOM_DURATION_MS = 1700;
const BLACK_HOLD_DURATION_MS = 300;
const FADE_OUT_DURATION_MS = 500;
const CLOSET_FALL_SFX_SRC = `${(process.env.PUBLIC_URL || "").replace(/\/$/, "")}/sfx/deltarune-closet-fall.mp3`;

let hasPlayedIntroOverlay = false;

const HomeIntroOverlay = () => {
  const location = useLocation();
  const initialPathRef = useRef(location.pathname);
  const timeoutIdsRef = useRef([]);
  const isFadingRef = useRef(false);
  const audioRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const clearTimers = useCallback(() => {
    timeoutIdsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
    timeoutIdsRef.current = [];
  }, []);

  const finishOverlay = useCallback(() => {
    clearTimers();
    timeoutIdsRef.current.push(
      setTimeout(() => {
        setIsActive(false);
      }, FADE_OUT_DURATION_MS),
    );
  }, [clearTimers]);

  const startFadeOut = useCallback(() => {
    if (isFadingRef.current) return;

    isFadingRef.current = true;
    setIsFadingOut(true);
    finishOverlay();
  }, [finishOverlay]);

  useEffect(() => {
    if (hasPlayedIntroOverlay || initialPathRef.current !== "/") return;

    hasPlayedIntroOverlay = true;
    setIsActive(true);

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reduceMotionEnabled = reduceMotionQuery.matches;
    setIsReducedMotion(reduceMotionEnabled);

    if (reduceMotionEnabled) {
      startFadeOut();
      return;
    }

    if (!audioRef.current) {
      audioRef.current = new Audio(CLOSET_FALL_SFX_SRC);
    }
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});

    timeoutIdsRef.current.push(
      setTimeout(() => {
        startFadeOut();
      }, ZOOM_DURATION_MS + BLACK_HOLD_DURATION_MS),
    );

    return () => {
      clearTimers();
    };
  }, [clearTimers, startFadeOut]);

  useEffect(() => {
    if (!isActive) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape" || event.key === " " || event.key === "Enter") {
        event.preventDefault();
        startFadeOut();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isActive, startFadeOut]);

  useEffect(() => {
    return () => {
      clearTimers();
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [clearTimers]);

  if (!isActive) return null;

  return (
    <div
      aria-hidden="true"
      onClick={startFadeOut}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        backgroundColor: "#000",
        opacity: isFadingOut ? 0 : 1,
        transition: `opacity ${FADE_OUT_DURATION_MS}ms linear`,
        overflow: "hidden",
      }}
    >
      {!isReducedMotion && (
        <>
          <style>{`
            @keyframes deltatube-home-intro-cursor-zoom {
              0% {
                transform: translate(-50%, -50%) scale(16);
                opacity: 1;
              }
              88% {
                opacity: 1;
              }
              100% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 0;
              }
            }
          `}</style>
          <img
            alt=""
            src={CURSOR_IMAGE_SRC}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: "min(34vw, 520px)",
              maxWidth: "80vw",
              height: "auto",
              transformOrigin: "center center",
              animation: `deltatube-home-intro-cursor-zoom ${ZOOM_DURATION_MS}ms cubic-bezier(0.2, 0.65, 0.25, 1) forwards`,
              pointerEvents: "none",
              userSelect: "none",
            }}
          />
        </>
      )}
    </div>
  );
};

export default HomeIntroOverlay;
