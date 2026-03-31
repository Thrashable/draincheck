import { Router } from 'express';
import { getAuthUrl, getTokens, getUserEmail } from '../services/gmail.js';

const router = Router();

router.get('/google', (req, res) => {
  const url = getAuthUrl();
  res.redirect(url);
});

router.get('/google/callback', async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) return res.status(400).send('Missing authorization code');

    const tokens = await getTokens(code);
    const email = await getUserEmail(tokens);

    req.session.tokens = tokens;
    req.session.userEmail = email;

    res.redirect('http://localhost:5173');
  } catch (err) {
    console.error('OAuth callback error:', err);
    res.status(500).send('Authentication failed. Check your Google OAuth credentials.');
  }
});

router.get('/me', (req, res) => {
  if (!req.session.tokens) {
    return res.json({ authenticated: false });
  }
  res.json({ authenticated: true, email: req.session.userEmail });
});

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ ok: true });
});

export default router;
