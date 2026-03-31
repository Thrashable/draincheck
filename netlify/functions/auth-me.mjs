import { getAuthFromCookie } from '../shared/crypto.mjs';

export default async (req) => {
  const auth = getAuthFromCookie(req.headers.get('cookie'));

  if (!auth) {
    return Response.json({ authenticated: false });
  }

  return Response.json({ authenticated: true, email: auth.email });
};
