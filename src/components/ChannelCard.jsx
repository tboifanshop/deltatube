import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Box, CardContent, CardMedia } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { demoProfilePicture } from '../utils/constants';
import ExplosionEffect from './ui/ExplosionEffect';

const ChannelCard = ({ channelDetail, marginTop }) => {
  const [subscribed, setSubscribed] = useState(false);
  const [explosion, setExplosion] = useState(null);
  const handleExplosionDone = useCallback(() => setExplosion(null), []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    setSubscribed((prev) => !prev);
    setExplosion({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  };

  return (
    <>
    <Box
   sx={{
    boxShadow: 'none',
    borderRadius: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: { xs: '356px', md: '320px'},
    height: '326px',
    margin: 'auto',
    marginTop,
   }}
  >
    <Link to={`/channel/${channelDetail?.id?.channelId}`}>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center',
          color: '#fff'
        }}
      >
        <CardMedia
          image={channelDetail?.snippet?.thumbnails?.high?.url || demoProfilePicture}
          alt={channelDetail?.snippet?.title}
          sx={{ borderRadius: '50%', height: '180px', width: '180px', mb: 2, border: '1px solid #e3e3e3' }}
        />
        <Typography variant='h6'>
          {channelDetail?.snippet?.title}
          <CheckCircleIcon sx={{ fontSize: '14px', color: 'gray', ml: '5px' }} />
        </Typography>
        {channelDetail?.statistics?.subscriberCount && (
          <Typography>
            {parseInt(channelDetail?.statistics?.subscriberCount).toLocaleString()} Subscribers
          </Typography>
        )}
      </CardContent>
    </Link>
    <button
      onClick={handleSubscribe}
      style={{
        display: 'block',
        margin: '8px auto 0',
        background: subscribed ? '#ff3300' : 'transparent',
        border: '2px solid #ff3300',
        borderRadius: 0,
        color: subscribed ? '#fff' : '#ff3300',
        cursor: 'pointer',
        padding: '6px 20px',
        fontFamily: 'inherit',
        fontSize: '0.85rem',
        letterSpacing: '0.5px',
        transition: 'all 0.15s',
      }}
    >
      {subscribed ? 'SUBSCRIBED' : 'SUBSCRIBE'}
    </button>
  </Box>
  {explosion && (
    <ExplosionEffect x={explosion.x} y={explosion.y} onDone={handleExplosionDone} />
  )}
  </>
  );
};

export default ChannelCard;