import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';

const KILLER_QUEEN_QUERY = 'why queen is so sexy deltarune';
// Must match the kq-slide-up animation duration in index.css
const EASTER_EGG_DELAY_MS = 700;

// Falls back to emoji if the image hasn't been added to public/images/deltarune_queen.webp yet
const KillerQueenImage = () => {
  const [useFallback, setUseFallback] = useState(false);
  if (useFallback) {
    return (
      <>
        <span style={{ fontSize: '2.4rem', filter: 'drop-shadow(0 0 6px #4fc3f7)' }}>👑</span>
        <span className="killer-queen-label">QUEEN</span>
      </>
    );
  }
  return (
    <img
      src={process.env.PUBLIC_URL + '/images/deltarune_queen.webp'}
      alt="Queen"
      className="killer-queen-img"
      onError={() => setUseFallback(true)}
    />
  );
};

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [killerQueenActive, setKillerQueenActive] = useState(false);
  const audioRef = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!searchTerm) return;

    // Easter egg: trigger Queen when "deltarune" is NOT in the query
    if (!/deltarune/i.test(searchTerm)) {
      setKillerQueenActive(true);

      // Play the Queen laugh (public/sfx/ohohohoh.mp3)
      try {
        if (!audioRef.current) {
          audioRef.current = new Audio(process.env.PUBLIC_URL + '/sfx/ohohohoh.mp3');
        }
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      } catch (_) {}

      // After animation starts, overwrite query and navigate
      setTimeout(() => {
        setKillerQueenActive(false);
        setSearchTerm('');
        navigate(`/search/${encodeURIComponent(KILLER_QUEEN_QUERY)}`);
      }, EASTER_EGG_DELAY_MS);

      return;
    }

    navigate(`/search/${searchTerm}`);
    setSearchTerm('');
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        borderRadius: 20,
        border: '1px solid #e3e3e3',
        pl: 2,
        boxShadow: 'none',
        mr: { sm: 5 },
        position: 'relative',
        overflow: 'visible',
      }}
    >
      {/* Queen Easter egg — slides up when a non-deltarune search is submitted */}
      <div
        aria-hidden="true"
        className={`killer-queen-egg${killerQueenActive ? ' killer-queen-egg--active' : ''}`}
      >
        <KillerQueenImage />
      </div>

      <input
        className='search-bar'
        placeholder='Search...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <IconButton type='submit'
        sx={{ p: '10px', color: 'red' }}
      >
        <Search />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;