import type { NextPage } from 'next';
import NextLink from 'next/link';
import {
  Container,
  Button,
  Input,
  Spacer,
  Text,
  Link,
} from '@nextui-org/react';

import { ArrowLeftIcon, CheckIcon } from '@radix-ui/react-icons';

import { useInput } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { submitCredentials } from '../api';
import toast from 'react-hot-toast';

const Home: NextPage = () => {
  const router = useRouter();
  const [redirectURL, setRedirectURL] = useState('');
  const {
    value: clientId,
    reset: resetClientId,
    bindings: clientIdBindings,
  } = useInput('');
  const {
    value: clientSecret,
    reset: resetClientSecret,
    bindings: clientSecretBindings,
  } = useInput('');

  useEffect(() => {
    if (!redirectURL) return;

    router.push(redirectURL);
  }, [redirectURL, router]);

  const handleSubmit = async () => {
    if (!clientId || !clientSecret) {
      return;
    }
    const { redirect_url } = await submitCredentials({
      clientId,
      clientSecret,
    });

    if (redirect_url) {
      setRedirectURL(redirect_url);
    }
  };

  return (
    <Container
      css={{
        display: 'grid',
        placeItems: 'center',
        marginTop: '4rem',
        maxWidth: '800px',
      }}
    >
      <NextLink href={{ pathname: '/' }} passHref>
        <Link
          css={{
            placeSelf: 'flex-start',
            marginLeft: '5rem',
          }}
        >
          <ArrowLeftIcon />
        </Link>
      </NextLink>
      <Text
        h2
        css={{
          textGradient: '45deg, $blue500 -20%, $pink500 50%',
          textAlign: 'center',
        }}
      >
        Activate Spotify Account
      </Text>
      <Container
        css={{
          maxW: '400px',
          padding: '2rem 1rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Input
          {...clientIdBindings}
          onClearClick={resetClientId}
          clearable
          label="Client ID"
          placeholder="Enter Client ID"
          initialValue={clientId}
        />

        <Spacer y={1} />
        <Input
          {...clientSecretBindings}
          onClearClick={resetClientSecret}
          clearable
          label="Client Secret"
          placeholder="Enter Client Secret"
          initialValue={clientSecret}
        />
        <Spacer y={1} />
        <Button onClick={handleSubmit} shadow color="gradient" auto>
          Activate
        </Button>
        <Spacer y={1} />
        <Container css={{ padding: 0, margin: 0 }}>
          <Link href="#">Need Help?</Link>
        </Container>
      </Container>
    </Container>
  );
};

export default Home;
