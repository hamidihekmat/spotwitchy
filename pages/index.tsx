import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
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

type GetStaticResult = {
  redirectUri: string;
};

export const getStaticSideProps: GetStaticProps<GetStaticResult> = async () => {
  const redirectUri =
    process.env.SPOTIFY_REDIRECT_URI ||
    'http://localhost:3000/api/spotify/callback';
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

  const copyText = () => {
    copy();

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };
  return (
    <Container
      css={{
        display: 'grid',
        placeItems: 'center',
        marginTop: '5rem',
        marginBottom: '3rem',
        maxWidth: '800px',
      }}
    >
      <Container>
        <Text
          h1
          css={{
            textGradient: '45deg, $blue500 -20%, $pink500 50%',
          }}
        >
          Welcome To Spotwitchy!
        </Text>
        <Spacer y={2} />
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
          <Collapse
            title="Step 1"
            subtitle="Your journey begins here, click me! 😄"
          >
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
          <Collapse
            title="Step 2"
            subtitle="Good things comes to those who wait... ⏱"
          >
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
          <Collapse
            title="Step 3"
            subtitle="Congratulations, you made it here! 🎉"
          >
            <Text blockquote>
              Keep a note of your {`'Client ID'`} and {`'Client Secret'`}, you
              need it to activate your account. Click {`'Show Client Secret'`}{' '}
              to reveal client secret...
            </Text>
            <Spacer y={1} />
            <NextLink href={{ pathname: '/activate' }} passHref>
              <Link>
                <Text
                  blockquote
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
