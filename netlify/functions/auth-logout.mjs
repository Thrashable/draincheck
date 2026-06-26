import { makeAuthCookie } from '../shared/crypto.mjs';

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  return Response.json({ ok: true }, {
    headers: {
      'Set-Cookie': makeAuthCookie(null, true),
    },
  });
};
