import { CSS, styled } from '@stitches/react';
import { useNowPlaying } from './spotify';
import { useSpotifyConfig } from './config';
import { Container, Text } from '@nextui-org/react';

import { motion } from 'framer-motion';

export const SpotifyWidget = ({ css, config }: { css?: CSS, config: ReturnType<typeof useSpotifyConfig> }) => {
  const {
    gradientColor,
    songStatusColor,
    songTitleColor,
    artistColor,
    percentColor,
    showPercent,
  } = config

  const { nowPlaying } = useNowPlaying();

  if (!nowPlaying) {
    return (
      <Container
        css={{
          width: 500,
          height: 500,
          display: 'grid',
          placeItems: 'center',
          padding: 0,
          margin: 0,
        }}
      >
        <Text>Play something on Spotify...</Text>
      </Container>
    );
  }

  const coverImage = nowPlaying.item.album.images[0].url;
  const songTitle = nowPlaying.item.name;
  const artists = nowPlaying.item.artists
    .map((artist) => artist.name)
    .join(', ');

  const percent = Math.round(
    (nowPlaying.progress_ms / nowPlaying.item.duration_ms) * 100
  );

  return (
    <Box
      key={nowPlaying.item.id}
      css={{
        ...css,
      }}
    >
      <CoverImage
        initial={{ scale: 0.96, filter: 'brightness(0.2)' }}
        animate={{ scale: 1, filter: 'brightness(1)' }}
        transition={{ duration: 0.5 }}
        exit={{ filter: 'brightness(0.2)' }}
        style={{ backgroundImage: `url(${coverImage})` }}
        css={{
          $$gradient: gradientColor,
        }}
      >
        {showPercent && (
          <Percent
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            exit={{ opacity: 0, scale: 0 }}
            css={{ $$percentColor: percentColor }}
          >
            {`${percent}%`}
          </Percent>
        )}
      </CoverImage>

      <Status
        initial={{ scale: 0.95, opacity: 0, translateY: 50 }}
        animate={{ scale: 1, opacity: 1, translateY: 0 }}
        transition={{ duration: 0.25, delay: 0.5 }}
        exit={{ opacity: 0, scale: 0 }}
        css={{ $$songStatusColor: songStatusColor }}
      >
        {nowPlaying.is_playing ? 'Now Playing' : 'Paused'}
      </Status>
      <SongTitle
        initial={{ scale: 0.95, opacity: 0, translateY: 50 }}
        animate={{ scale: 1, opacity: 1, translateY: 0 }}
        transition={{ duration: 0.25, delay: 0.6 }}
        exit={{ opacity: 0, scale: 0 }}
        css={{ $$songTitleColor: songTitleColor }}
      >
        {songTitle.length > 16
          ? `${songTitle.substring(0, 16).trimEnd()}...`
          : songTitle}
      </SongTitle>
      <Artist
        initial={{ scale: 0.95, opacity: 0, translateY: 50 }}
        animate={{ scale: 1, opacity: 1, translateY: 0 }}
        transition={{ duration: 0.25, delay: 0.7 }}
        exit={{ opacity: 0, scale: 0 }}
        css={{ $$artistColor: artistColor }}
      >
        {artists.length > 18
          ? `${artists.substring(0, 18).trimEnd()}...`
          : artists}
      </Artist>
    </Box>
  );
};

const Box = styled('div', {
  overflow: 'hidden',
});

const CoverImage = styled(motion.div, {
  position: 'relative',
  width: '500px',
  aspectRatio: '1 / 1',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  overflow: 'hidden',
  borderRadius: '25px',
  boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  $$gradient: '#000200',

  '&::after': {
    content: '',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage:
      'linear-gradient(224.11deg, rgba(19, 19, 19, 0) 37.44%, $$gradient 70.73%)',
    opacity: 0.7,
    borderRadius: '25px',
  },
});

const Status = styled(motion.h1, {
  $$songStatusColor: '#FFFFFF',
  position: 'absolute',
  bottom: 120,
  left: 36,
  fontFamily: 'Helvetica',
  fontStyle: 'normal',
  fontWeight: 'lighter',
  fontSize: '38px',
  lineHeight: '28px',
  textShadow: '4px 4px 40px rgba(0, 0, 0, 0.5)',
  color: '$$songStatusColor',
});

const SongTitle = styled(motion.h1, {
  $$songTitleColor: '#FFFFFF',
  position: 'absolute',
  bottom: 60,
  left: 35,
  fontFamily: 'Helvetica',
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '48px',
  lineHeight: '28px',
  textShadow: '4px 4px 40px rgba(0, 0, 0, 0.5)',
  color: '$$songTitleColor',
});

const Artist = styled(motion.h1, {
  $$artistColor: '#E5E5E5',
  position: 'absolute',
  bottom: 15,
  left: 35,
  fontFamily: 'Helvetica',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '38px',
  lineHeight: '28px',
  textShadow: '4px 4px 40px rgba(0, 0, 0, 0.5)',
  color: '$$artistColor',
});

const Percent = styled(motion.h1, {
  $$percentColor: '#E5E5E5',
  position: 'absolute',
  top: 20,
  right: 40,
  fontFamily: 'Helvetica',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '40px',
  lineHeight: '28px',
  textShadow: '4px 4px 40px rgba(0, 0, 0, 0.5)',
  color: '$$percentColor',
});
