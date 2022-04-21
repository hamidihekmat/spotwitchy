import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';

import { Container, Text, Spacer } from '@nextui-org/react';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

const SuccessPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ spotifyId }) => {
  useEffect(() => {
    confetti({
      zIndex: 999,
      particleCount: 50,
      spread: 40,
      origin: { x: 0.5, y: 0.5 },
    });
  }, []);
  return (
    <Container
      css={{
        display: 'grid',
        placeItems: 'center',
        marginTop: '8rem',
        marginBottom: '3rem',
        maxWidth: '800px',
      }}
    >
      <Container
        css={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Text
          css={{
            textAlign: 'center',
            textGradient: '45deg, $blue500 -20%, $pink500 50%',
          }}
          h1
        >
          Your account is activated!
        </Text>

        <Spacer y={2} />
        <Text h3>{spotifyId}</Text>
      </Container>
    </Container>
  );
};

type GetServerSideReturn = {
  spotifyId: string;
};

export const getServerSideProps: GetServerSideProps<
  GetServerSideReturn
> = async (context) => {
  const { spotifyId } = context.req.cookies;

  if (!spotifyId) {
    // redirect to error page
  }

  return {
    props: {
      spotifyId,
    },
  };
};

export default SuccessPage;
