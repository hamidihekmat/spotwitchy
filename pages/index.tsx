import type {
  GetServerSideProps,
  GetStaticProps,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import NextLink from 'next/link';
import {
  Container,
  Spacer,
  Text,
  Image,
  Collapse,
  Link,
  Tooltip,
  Card,
} from '@nextui-org/react';

import { CopyIcon } from '@radix-ui/react-icons';

import useCopy from 'use-copy';

import { SPOTIFY_DEVELOPER_DASHBOARD } from '../constant';
import { SpotifyWidget } from '../components/spotify';
import { Leva } from 'leva';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const SHOW_TIMEOUT = 1500;

type GetStaticSideResult = {
  redirectUri: string;
};

export const getStaticSideProps: GetStaticProps<
  GetStaticSideResult
> = async () => {
  const redirectUri =
    process.env.VERCEL_URL || 'http://localhost:3000/api/spotify/callback';
  return {
    props: {
      redirectUri,
    },
  };
};

const Home: NextPage<InferGetStaticPropsType<typeof getStaticSideProps>> = ({
  redirectUri,
}) => {
  const [copied, copy, setCopied] = useCopy(redirectUri);
  const [levaRef, setRef] = useState<HTMLSpanElement | null>(null);
  const copyText = () => {
    copy();

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  useEffect(() => {
    if (!levaRef) return;

    const timeOut = setTimeout(() => {
      levaRef.querySelector('i')?.click();
    }, SHOW_TIMEOUT);

    return () => clearTimeout(timeOut);
  }, [levaRef]);

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
          Welcome to Spotwitchy
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
          Slick and customizable Spotify Widget
        </Text>

        <Text
          h4
          css={{
            color: 'Gainsboro',
          }}
        >
          Always online
        </Text>
        <Text
          h4
          css={{
            color: 'Gainsboro',
          }}
        >
          Real time customizability
        </Text>
        <Spacer y={2} />

        <Text h3>Try it out</Text>
        <Spacer y={1} />

        <Container
          css={{
            position: 'relative',
            alignSelf: 'flex-start',
            padding: 0,
            margin: 0,
          }}
          fluid
        >
          <SpotifyWidget css={{ padding: '0' }} />
          <Container
            css={{
              position: 'absolute',

              width: '300px',
              top: 0,
              right: '-2rem',
            }}
          >
            <span ref={setRef}>
              <Leva hideCopyButton fill titleBar oneLineLabels collapsed />
            </span>
          </Container>
        </Container>
        <Spacer y={2.5} />
        <Text h3>One Time Activation</Text>
        <Spacer y={0.5} />
        <Text h4 css={{ color: 'Gainsboro' }}>
          In order to use the Spotify widget, you must first follow the
          instruction to activate your spotify account.
        </Text>
      </Container>
      <Spacer y={2.5} />
      <Container>
        <Collapse.Group bordered>
          <Collapse title="Step 1">
            <Text blockquote>
              Visit Spotify developer dashboard and login to your account.
            </Text>
            <Spacer y={1} />
            <Image
              showSkeleton
              loading="lazy"
              maxDelay={1000}
              src="step1.png"
              alt="Spotify Developer Dashboard"
              objectFit="cover"
            />
            <Spacer y={1} />
            <NextLink href={SPOTIFY_DEVELOPER_DASHBOARD} passHref>
              <Link target="_blank">
                <Text blockquote weight="bold" css={{ color: '#1FB953' }}>
                  Spotify Developer DashBoard
                </Text>
              </Link>
            </NextLink>
          </Collapse>
          <Collapse title="Step 2">
            <Text blockquote>
              That was easy right? Now click on {'"Create An App"'} button and
              name your app whatever you want.
            </Text>
            <Spacer y={1} />
            <Image
              showSkeleton
              loading="lazy"
              maxDelay={1000}
              src="step2.png"
              alt="Create New App"
              objectFit="cover"
            />
            <Spacer y={1} />
            <Text blockquote>
              Click on the {`'Edit Settings'`} button and add this to your
              Redirect URIs:
            </Text>
            <Spacer y={1} />
            <Card>
              <Text
                css={{ display: 'flex', justifyContent: 'space-between' }}
                blockquote
              >
                {redirectUri}
                <span>
                  <Tooltip
                    css={{ transform: 'translate(-2rem, -6.5rem)' }}
                    content={copied ? 'Copied' : 'Copy'}
                    placement="top"
                  >
                    <CopyIcon
                      style={{ position: 'relative', zIndex: 9999 }}
                      onClick={copyText}
                    />
                  </Tooltip>
                </span>
              </Text>
            </Card>

            <Spacer y={1} />
            <Image
              showSkeleton
              loading="lazy"
              maxDelay={1000}
              src="step2-part3.png"
              alt="Edit Settings"
              objectFit="cover"
            />
            <Spacer y={1} />
            <Text blockquote>Save and you are almost done!</Text>
          </Collapse>
          <Collapse title="Step 3">
            <Text blockquote>
              Keep a note of your {`'Client ID'`} and {`'Client Secret'`}, you
              need it to activate your account. Click {`'Show Client Secret'`}{' '}
              to reveal client secret...
            </Text>
            <Spacer y={1} />
            <NextLink href={{ pathname: '/activate' }} passHref>
              <Link icon css={{ gap: '0.5rem' }}>
                <Text
                  weight="bold"
                  css={{ textGradient: '45deg, $blue500 -20%, $pink500 50%' }}
                >
                  Activate Account
                </Text>
              </Link>
            </NextLink>
          </Collapse>
        </Collapse.Group>
      </Container>
    </Container>
  );
};

export default Home;
