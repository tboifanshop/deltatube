import { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Typography, Box, Stack } from '@mui/material';
import { CheckCircle, Favorite, FavoriteBorder } from '@mui/icons-material';

import { Videos, Loader } from './';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import ExplosionEffect from './ui/ExplosionEffect';

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const [liked, setLiked] = useState(false);
  const [explosion, setExplosion] = useState(null);
  const { id } = useParams();

  const handleExplosionDone = useCallback(() => setExplosion(null), []);

  const handleLike = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top  + rect.height / 2;
    setLiked((prev) => !prev);
    setExplosion({ x, y });
  };

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
    .then(data => setVideoDetail(data.items[0]));

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
    .then(data => setVideos(data.items));
  }, [id]);

  if(!videoDetail?.snippet) return <Loader />;
  const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: 'column', md: 'row' }}>
        <Box flex={1}>
          <Box sx={{ width: '100%', position: 'sticky', top: '86px' }}>
            <ReactPlayer 
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Typography color="#fff" variant='h5' fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack 
              direction="row" 
              justifyContent="space-between"
              sx={{ color: '#fff'}}
              py={2} px={2}
            >
              <Link to={`/channel/${channelId}`} >
                <Typography variant={{ sm: 'subtitle1', md: 'h6' }} color="#fff">
                  {channelTitle}
                  <CheckCircle sx={{ fontSize: '12px', color: 'gray', ml: '5px' }} />
                </Typography>
              </Link>
              <Stack direction='row' gap="20px">
                <Typography variant='body1' sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <button
                  onClick={handleLike}
                  aria-label="Like this video"
                  aria-pressed={liked}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'transparent',
                    border: liked ? '2px solid #ff3300' : '2px solid #555',
                    borderRadius: 0,
                    color: liked ? '#ff3300' : '#aaa',
                    cursor: 'pointer',
                    padding: '4px 12px',
                    fontFamily: 'inherit',
                    fontSize: '0.9rem',
                    transition: 'all 0.15s',
                  }}
                >
                  {liked ? <Favorite sx={{ fontSize: '16px' }} /> : <FavoriteBorder sx={{ fontSize: '16px' }} />}
                  {(parseInt(likeCount) + (liked ? 1 : 0)).toLocaleString()} likes
                </button>
              </Stack>
            </Stack>
          </Box>
        </Box>

        <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center">
        <Videos videos={videos} direction="column" />
        </Box>

      </Stack>
      {explosion && (
        <ExplosionEffect x={explosion.x} y={explosion.y} onDone={handleExplosionDone} />
      )}
    </Box>
  )
}

export default VideoDetail;