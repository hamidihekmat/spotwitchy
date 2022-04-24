import type { NextPage } from 'next';
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
  Switch,
  Modal,
  Divider,
  useTheme,
  useModal,
  Button,
  Row,
} from '@nextui-org/react';
import { useTheme as useNextTheme } from 'next-themes';

import { CopyIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';

import useCopy from 'use-copy';

import { SPOTIFY_DEVELOPER_DASHBOARD } from '../constant';
import { DemoSpotifyWidget } from '../components/spotify-demo';
import { Leva } from 'leva';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/auth';

const SHOW_TIMEOUT = 1500;
const COPY_TIMEOUT = 3000;
const REDIRECT_URI = 'https://spotwitchy.vercel.app/api/spotify/callback';

const Home: NextPage = ({}) => {
  const [auth] = useAuth();
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();
  const { setVisible, visible, bindings } = useModal();
  const closeHandler = () => {
    setVisible(false);
  };

  const [copied, copy, setCopied] = useCopy(REDIRECT_URI);
  const [levaRef, setRef] = useState<HTMLSpanElement | null>(null);
  const copyText = () => {
    copy();

    setTimeout(() => {
      setCopied(false);
    }, COPY_TIMEOUT);
  };

  useEffect(() => {
    if (!levaRef) return;
    if (auth) setVisible(true);

    const timeOut = setTimeout(() => {
      levaRef.querySelector('i')?.click();
    }, SHOW_TIMEOUT);

    return () => clearTimeout(timeOut);
  }, [levaRef, auth]); // eslint-disable-line

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
      <Modal
        {...bindings}
        closeButton
        aria-labelledby="modal-title"
        blur
        open={visible}
        animated
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text h5>Your account is already activated!</Text>
        </Modal.Header>
        <Divider />
        <Modal.Body>
          <Text>
            It seems that you have already been through the activation process,
            if you would like to customize your widget. You can go to customize
            page.
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button auto size="sm" color="error" bordered onClick={closeHandler}>
            Cancel
          </Button>
          <NextLink href={{ pathname: '/customize' }} passHref>
            <Button auto size="sm" color="gradient" bordered>
              Customize Page
            </Button>
          </NextLink>
        </Modal.Footer>
      </Modal>
      <Container>
        <Container
          css={{
            margin: 0,
            padding: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text
            h1
            css={{
              display: 'block',
              textGradient: '45deg, $blue500 -20%, $pink500 50%',
            }}
          >
            Welcome to Spotwitchy
          </Text>

          <Switch
            css={{ display: 'block' }}
            checked={isDark}
            shadow
            size="sm"
            onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
            iconOn={<MoonIcon />}
            iconOff={<SunIcon />}
          />
        </Container>

        <Spacer y={0.5} />

        <Text
          h4
          weight="normal"
          css={{
            textAlign: 'start',
            letterSpacing: '$wider',
          }}
        >
          Slick and customizable Spotify Widget
        </Text>

        <Text h4 weight="normal">
          Always online
        </Text>
        <Text h4 weight="normal">
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
          <DemoSpotifyWidget css={{ padding: '0' }} />
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
        <Text h4>
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
                {REDIRECT_URI}
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
            <NextLink href="/customize" passHref>
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
