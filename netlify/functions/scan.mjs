import { getAuthFromCookie } from '../shared/crypto.mjs';
import { searchGmail } from '../shared/gmail.mjs';
import { extractSubscriptions } from '../shared/extract.mjs';

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const auth = getAuthFromCookie(req.headers.get('cookie'));
  if (!auth) {
    return Response.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const emails = await searchGmail(auth.tokens);

    if (emails.length === 0) {
      return Response.json({ subscriptions: [], message: 'No subscription-related emails found.' });
    }

    const subscriptions = await extractSubscriptions(emails);

    // Add IDs for frontend keying
    const withIds = subscriptions.map((s, i) => ({ ...s, id: i + 1 }));

    return Response.json({ subscriptions: withIds, emailsScanned: emails.length });
  } catch (err) {
    console.error('Scan error:', err);
    return Response.json({ error: 'Failed to scan Gmail. Please try again.' }, { status: 500 });
  }
};
