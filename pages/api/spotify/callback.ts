import { NextApiHandler } from 'next';
import nookies from 'nookies';
import {
  EMAIL_COOKIE_NAME,
  SPOTIFY_API_TOKEN_URL,
  SPOTIFY_PROFILE_URL,
  TOKEN_COOKIE_NAME,
} from '../../../constant';
import { SpotifyCredentials } from '../../../types';
import { redis } from '../../../upstash';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    const stateFromCookie = nookies.get({ req }).state;
    const stateFromQuery = req.query.state;

    if (
      typeof stateFromCookie === 'string' &&
      typeof stateFromQuery === 'string' &&
      stateFromCookie === stateFromQuery &&
      typeof req.query.code === 'string'
    ) {
      const credentials = (await redis.get(
        stateFromCookie || stateFromQuery
      )) as SpotifyCredentials;

      const params = new URLSearchParams({
        grant_type: 'authorization_code',
        code: req.query.code,
        redirect_uri:
          process.env.SPOTIFY_REDIRECT_URI ||
          'http://localhost:3000/api/spotify/callback',
        client_id: credentials.clientId,
        client_secret: credentials.clientSecret,
      });

      const headers = await fetch(SPOTIFY_API_TOKEN_URL, {
        method: 'POST',
        body: params,
      });

      if (headers.ok) {
        const response = await headers.json();

        const profile = await fetch(SPOTIFY_PROFILE_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${response.access_token}`,
          },
        });

        const { email } = await profile.json();

        await redis.set(email, response);
        await redis.del(stateFromCookie || stateFromQuery);

        nookies.set({ res }, TOKEN_COOKIE_NAME, response.refresh_token, {
          httpOnly: true,
          path: '/',
        });

        nookies.set({ res }, EMAIL_COOKIE_NAME, email, {
          httpOnly: true,
          path: '/',
        });

        res.redirect('/success');
      } else {
        res.status(403);
      }
    }
  } else {
    res.status(405);
  }
};

export default handler;
