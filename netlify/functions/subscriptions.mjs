import { getAuthFromCookie } from '../shared/crypto.mjs';

export default async (req) => {
  const auth = getAuthFromCookie(req.headers.get('cookie'));
  if (!auth) {
    return Response.json({ error: 'Not authenticated' }, { status: 401 });
  }

  // No persistent storage in serverless — return empty so user scans fresh each session
  return Response.json({ subscriptions: [], lastScanned: null });
};
