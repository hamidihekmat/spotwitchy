import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';

import { Button, Container, Spacer, Text } from '@nextui-org/react';
import { SpotifyWidget } from '../components/spotify';
import { Leva } from 'leva';
import toast from 'react-hot-toast';
import { ClipboardCopyIcon } from '@radix-ui/react-icons';
import { useSpotifyConfig } from '../components/spotify/config';

const notifyCopy = () =>
  toast('Copied OBS Link', {
    icon: <ClipboardCopyIcon />,
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
    position: 'bottom-center',
  });

type GetServerSideResult = {
  spotifyId: string;
};

export const getServerSideProps: GetServerSideProps<
  GetServerSideResult
> = async ({ req }) => {
  const spotifyId = req.cookies['spotifyId'];
  return {
    props: {
      spotifyId,
    },
  };
};

const CustomizePage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ spotifyId }) => {
  const config = useSpotifyConfig();

  return (
    <Container
      css={{
        display: 'grid',
        placeItems: 'center',
        marginTop: '3rem',
        marginBottom: '3rem',
        maxWidth: '900px',
      }}
    >
      <Container>
        <Text
          h1
          css={{
            textGradient: '45deg, $blue500 -20%, $pink500 50%',
          }}
        >
          Style Your Widget
        </Text>
        <Spacer y={0.5} />

        <Text
          h4
          css={{
            color: 'Gainsboro',
            textAlign: 'start',
            letterSpacing: '$wider',
          }}
        >
          Customize to your liking
        </Text>
        <Text
          h4
          css={{
            color: 'Gainsboro',
            textAlign: 'start',
            letterSpacing: '$wider',
          }}
        >
          Generate link for obs browser source
        </Text>
        <Spacer y={2.5} />
        <Container
          css={{
            position: 'relative',
            justifySelf: 'flex-start',
            padding: 0,
            margin: 0,
          }}
        >
          <SpotifyWidget config={config} />
          <Container
            css={{
              position: 'absolute',

              width: '300px',
              top: 0,
              right: '0rem',
            }}
          >
            <Leva hideCopyButton fill titleBar oneLineLabels />
          </Container>
        </Container>
      </Container>
      <Spacer y={1.5} />
      <Button
        color="gradient"
        bordered
        onClick={() => {
          notifyCopy();
          const searchParams = new URLSearchParams({
            gradientColor: config.gradientColor,
            songStatusColor: config.songStatusColor,
            songTitleColor: config.songTitleColor,
            artistColor: config.artistColor,
            showPercent: String(config.showPercent),
            spotifyId,
          });
          navigator.clipboard.writeText(
            `${window.location.hostname}/preview/?${searchParams.toString()}`
          );
        }}
        css={{ placeSelf: 'self-start', marginLeft: '1.5rem' }}
      >
        Copy OBS Link
      </Button>
    </Container>
  );
};

export default CustomizePage;
