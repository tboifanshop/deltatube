import { useEffect, useRef, useState } from "react";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { logo } from "../utils/constants";
import SearchBar from "./SearchBar";
import DeltaruneTransitionOverlay from "./ui/DeltaruneTransitionOverlay";

const publicUrl = (process.env.PUBLIC_URL || '').replace(/\/$/, '');
const SHORTS_URL = `${publicUrl}/shorts.html`;
const TRANSITION_DURATION_MS = 1200;

const Navbar = () => {
  const [isTransitionActive, setIsTransitionActive] = useState(false);
  const audioRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const startShortsTransition = (event) => {
    if (isTransitionActive) {
      event.preventDefault();
      return;
    }

    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    event.preventDefault();
    setIsTransitionActive(true);

    try {
      if (!audioRef.current) {
        audioRef.current = new Audio(`${publicUrl}/sfx/deltarune-closet-fall.mp3`);
      }
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    } catch (_) {}

    timeoutRef.current = setTimeout(() => {
      window.location.assign(SHORTS_URL);
    }, TRANSITION_DURATION_MS);
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      p={2}
      sx={{
        position: 'sticky',
        background: '#000',
        top: 0,
        justifyContent: 'space-between'
      }}
    >
      <Link to="/" aria-label="Home" style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logo} alt="DeltaTube logo" height={45}/>
      </Link>
      <a
        href={SHORTS_URL}
        onClick={startShortsTransition}
        style={{
          color: '#5fa8d3',
          fontFamily: "'8bitoperator JVE', monospace",
          fontSize: '13px',
          textDecoration: 'none',
          padding: '4px 10px',
          border: '1px solid #5fa8d3',
          borderRadius: '2px',
          whiteSpace: 'nowrap',
        }}
      >
        ▶ Shorts
      </a>
      <SearchBar />
      <DeltaruneTransitionOverlay active={isTransitionActive} />
    </Stack>
  );
};

export default Navbar;
