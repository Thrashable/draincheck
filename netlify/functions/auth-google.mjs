import { getAuthUrl } from '../shared/gmail.mjs';

export default async (req) => {
  const url = getAuthUrl();
  return new Response(null, {
    status: 302,
    headers: { Location: url },
  });
};
