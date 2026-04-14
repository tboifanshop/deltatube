import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import { fetchFromAPI } from '../utils/fetchFromAPI';
import { Videos } from './';

const JOHN_MURSTON_QUERY = 'john murston';
const TAKEOVER_EXCLUDED_QUERIES = new Set(['jack murston']);

export const normalizeSearchTerm = (term = '') =>
  term
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase();

export const isJohnMurstonTakeoverSearch = (term = '') => {
  const normalizedTerm = normalizeSearchTerm(term);
  if (TAKEOVER_EXCLUDED_QUERIES.has(normalizedTerm)) return false;

  return normalizedTerm === JOHN_MURSTON_QUERY;
};

const SearchFeed = () => {
  const [videos, setVideos] = useState([]);
  const { searchTerm } = useParams();
  const isJohnMurstonTakeover = isJohnMurstonTakeoverSearch(searchTerm);

  useEffect(() => {
    if (isJohnMurstonTakeover) {
      setVideos([]);
      return;
    }

    fetchFromAPI(`search?part=snippet&q=${searchTerm}`)
      .then((data) => setVideos(data.items));
  }, [searchTerm, isJohnMurstonTakeover]);

  return (
    <Box
      p={2}
      className={isJohnMurstonTakeover ? 'john-murston-takeover' : undefined}
      sx={{ overflowY: 'auto', height: '90vh', flex: 2 }}
    >
      <Typography 
        variant='h4' 
        fontWeight="bold" 
        mb={2}
        sx={{ color: 'white' }}
      >
        Search Results for: <span style={{
          color: '#F31503',
        }}>{ searchTerm }</span> videos
      </Typography>

      {isJohnMurstonTakeover ? (
        <Box
          className="john-murston-takeover-grid"
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 2,
          }}
        >
          {Array.from({ length: 18 }, (_, index) => (
            <Box key={index} className="john-murston-takeover-tile" sx={{ minHeight: 140 }} />
          ))}
        </Box>
      ) : (
        <Videos videos={videos} />
      )}
    </Box>
  )
}

export default SearchFeed;
