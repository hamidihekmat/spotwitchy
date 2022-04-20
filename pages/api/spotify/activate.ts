import type { NextApiHandler } from 'next';
import { v4 as uuid } from 'uuid';
import { stringify } from 'querystring';
import { SPOTIFY_SCOPES, SPOTIFY_AUTHORIZE_URL } from '../../../constant';
import { setCookie } from 'nookies';

import { redis } from '../../../upstash';

const handler: NextApiHandler = (req, res) => {
  if (req.method === 'POST') {
    console.log(req.body);
    const { clientId, clientSecret } = req.body;
    const state = uuid();

    redis.set(state, { clientId, clientSecret });
    const params = stringify({
      response_type: 'code',
      client_id: clientId,
      scope: SPOTIFY_SCOPES.join(' '),
      redirect_uri:
        process.env.SPOTIFY_REDIRECT_URI ||
        'http://localhost:3000/api/spotify/callback',
      state: state,
    });

    const secure = !req.headers.host?.includes('localhost');
    setCookie({ res }, 'state', state, {
      maxAge: 3600,
      secure: secure,
      httpOnly: true,
      path: '/',
    });

    const url = `${SPOTIFY_AUTHORIZE_URL}?${params}`;

    res.status(200).send({ redirect_url: url });
  } else {
    res.status(405).send('Method not Allowed');
  }
};

export default handler;
