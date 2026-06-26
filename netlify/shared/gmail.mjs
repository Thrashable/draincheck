import { google } from 'googleapis';

const SEARCH_QUERIES = [
  'subject:(receipt OR invoice) newer_than:12m',
  'subject:(subscription renew OR renewal OR renews) newer_than:12m',
  'subject:(welcome to OR thanks for subscribing OR confirm your subscription) newer_than:12m',
  'subject:(charge OR payment OR billing) from:(noreply OR no-reply OR billing OR payments) newer_than:12m',
];

export function getOAuth2Client() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
}

export function getAuthUrl() {
  const client = getOAuth2Client();
  return client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/gmail.readonly',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
  });
}

export async function getTokens(code) {
  const client = getOAuth2Client();
  const { tokens } = await client.getToken(code);
  return tokens;
}

export async function getUserEmail(tokens) {
  const client = getOAuth2Client();
  client.setCredentials(tokens);
  const oauth2 = google.oauth2({ version: 'v2', auth: client });
  const { data } = await oauth2.userinfo.get();
  return data.email;
}

function decodeBody(payload) {
  if (payload.body?.data) {
    return Buffer.from(payload.body.data, 'base64url').toString('utf-8');
  }
  if (payload.parts) {
    for (const part of payload.parts) {
      if (part.mimeType === 'text/plain' && part.body?.data) {
        return Buffer.from(part.body.data, 'base64url').toString('utf-8');
      }
    }
    for (const part of payload.parts) {
      const nested = decodeBody(part);
      if (nested) return nested;
    }
  }
  return '';
}

export async function searchGmail(tokens) {
  const client = getOAuth2Client();
  client.setCredentials(tokens);
  const gmail = google.gmail({ version: 'v1', auth: client });

  const allMessageIds = new Set();

  const searchResults = await Promise.all(
    SEARCH_QUERIES.map(q =>
      gmail.users.messages.list({ userId: 'me', q, maxResults: 50 })
    )
  );

  for (const res of searchResults) {
    if (res.data.messages) {
      for (const m of res.data.messages) {
        allMessageIds.add(m.id);
      }
    }
  }

  const messageIds = [...allMessageIds].slice(0, 150);

  const emails = [];
  for (let i = 0; i < messageIds.length; i += 20) {
    const batch = messageIds.slice(i, i + 20);
    const messages = await Promise.all(
      batch.map(id =>
        gmail.users.messages.get({ userId: 'me', id, format: 'full' })
      )
    );

    for (const msg of messages) {
      const headers = msg.data.payload?.headers || [];
      const getHeader = (name) => headers.find(h => h.name.toLowerCase() === name.toLowerCase())?.value || '';

      const bodyText = decodeBody(msg.data.payload || {});

      emails.push({
        messageId: msg.data.id,
        from: getHeader('From'),
        subject: getHeader('Subject'),
        date: getHeader('Date'),
        snippet: msg.data.snippet?.substring(0, 200) || '',
        body: bodyText.substring(0, 2000),
      });
    }
  }

  return emails;
}
