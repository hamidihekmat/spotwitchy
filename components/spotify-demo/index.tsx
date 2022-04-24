import { CSS, styled } from '@stitches/react';
import { useSpotifyConfig } from './config';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const spotifySongs = [
  {
    id: 'levaWithU',
    cover: '/cover_art.jpeg',
    songName: 'Lies',
    artist: 'KLOUD',
    status: 'Now Playing',
    percent: 7,
  },
];

const TICK = 1500;

const useDuration = () => {
  const [duration, setDuration] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (duration === 100) {
        setDuration(0);
      } else {
        setDuration((prev) => prev + 1);
      }
    }, TICK);

    return () => clearInterval(intervalId);
  }, [duration]);

  return duration;
};

export const DemoSpotifyWidget = ({ css }: { css?: CSS }) => {
  const [song] = spotifySongs;
  const percent = useDuration();
  const {
    gradientColor,
    songStatusColor,
    songTitleColor,
    artistColor,
    percentColor,
    showPercent,
  } = useSpotifyConfig();

  return (
    <Box
      key={song.id}
      css={{
        position: 'relative',
        padding: '1rem',
        ...css,
      }}
    >
      <CoverImage
        initial={{ scale: 0.96, filter: 'brightness(0.2)' }}
        animate={{ scale: 1, filter: 'brightness(1)' }}
        transition={{ duration: 0.5 }}
        exit={{ filter: 'brightness(0.2)' }}
        style={{ backgroundImage: `url(${song.cover})` }}
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
        {song.status}
      </Status>
      <SongTitle
        initial={{ scale: 0.95, opacity: 0, translateY: 50 }}
        animate={{ scale: 1, opacity: 1, translateY: 0 }}
        transition={{ duration: 0.25, delay: 0.6 }}
        exit={{ opacity: 0, scale: 0 }}
        css={{ $$songTitleColor: songTitleColor }}
      >
        {song.songName.length > 16
          ? `${song.songName.substring(0, 16).trimEnd()}...`
          : song.songName}
      </SongTitle>
      <Artist
        initial={{ scale: 0.95, opacity: 0, translateY: 50 }}
        animate={{ scale: 1, opacity: 1, translateY: 0 }}
        transition={{ duration: 0.25, delay: 0.7 }}
        exit={{ opacity: 0, scale: 0 }}
        css={{ $$artistColor: artistColor }}
      >
        {song.artist.length > 18
          ? `${song.artist.substring(0, 18).trimEnd()}...`
          : song.artist}
      </Artist>
    </Box>
  );
};

const Box = styled('div', {});

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
