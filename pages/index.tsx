import type { NextPage } from 'next';
import {
  Container,
  Spacer,
  Text,
  Image,
  Collapse,
  Link,
} from '@nextui-org/react';

const SPOTIFY_DEVELOPER_DASHBOARD =
  'https://developer.spotify.com/dashboard/login';

const REDIRECT_URL =
  'https://arc7-spotify.vercel.app/api/auth/callback/spotify';

const Home: NextPage = () => {
  return (
    <Container
      css={{
        display: 'grid',
        placeItems: 'center',
        marginTop: '5rem',
        maxWidth: '800px',
      }}
    >
      <Container css={{}}>
        <Text
          h1
          css={{
            textGradient: '45deg, $blue500 -20%, $pink500 50%',
          }}
        >
          Welcome To Spotwitchy!
        </Text>
        <Spacer y={1} />
        <Text h3>One Time Activation</Text>
        <Spacer y={0.8} />
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
            <Text>
              Visit Spotify developer dashboard and login to your account.
            </Text>
            <Spacer y={0.5} />
            <Image
              src="step1.png"
              alt="Spotify Developer Dashboard"
              objectFit="cover"
            />
            <Spacer y={0.5} />
            <Link target="_blank" href={SPOTIFY_DEVELOPER_DASHBOARD}>
              Spotify Developer DashBoard
            </Link>
          </Collapse>
          <Collapse
            title="Step 2"
            subtitle="Good things comes to those who wait. ⏱"
          >
            <Text>
              That was easy right? Now click on {'"Create An App"'} button and
              name your app whatever you want.
            </Text>
            <Spacer y={0.5} />
            <Image src="step2.png" alt="Create New App" objectFit="cover" />
            <Spacer y={0.5} />
            <Text>
              Click on the {`'Edit Settings'`} button and add this to your
              Redirect URIs:
            </Text>
            <Spacer y={0.5} />
            <Text blockquote>
              {process.env.SPOTIFY_REDIRECT_URI ||
                'http://localhost:3000/api/spotify/callback'}
            </Text>
            <Spacer y={0.5} />
            <Image
              src="step2-part3.png"
              alt="Edit Settings"
              objectFit="cover"
            />
            <Spacer y={0.5} />
            Save and you are almost done!
          </Collapse>
          <Collapse
            title="Step 3"
            subtitle="Congratulations you made it here! 🎉"
          >
            <Text>
              Keep a note of your {`'Client ID'`} and {`'Client Secret'`}, you
              need it to activate your account.
            </Text>
            <Spacer y={0.5} />
            <Link href="/activate">Activate Account</Link>
          </Collapse>
        </Collapse.Group>
      </Container>
    </Container>
  );
};

export default Home;
