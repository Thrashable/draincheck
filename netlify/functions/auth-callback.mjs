import { getTokens, getUserEmail } from '../shared/gmail.mjs';
import { makeAuthCookie } from '../shared/crypto.mjs';

export default async (req) => {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');

    if (!code) {
      return new Response('Missing authorization code', { status: 400 });
    }

    const tokens = await getTokens(code);
    const email = await getUserEmail(tokens);

    const cookie = makeAuthCookie({ tokens, email });
    const siteUrl = process.env.URL || 'http://localhost:8888';

    return new Response(null, {
      status: 302,
      headers: {
        Location: siteUrl,
        'Set-Cookie': cookie,
      },
    });
  } catch (err) {
    console.error('OAuth callback error:', err);
    return new Response('Authentication failed. Check your Google OAuth credentials.', { status: 500 });
  }
};
