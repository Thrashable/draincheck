import { Router } from 'express';
import { searchGmail } from '../services/gmail.js';
import { extractSubscriptions } from '../services/anthropic.js';
import { saveSubscriptions, getSubscriptions, getLastScanned } from '../db/sqlite.js';

const router = Router();

function requireAuth(req, res, next) {
  if (!req.session.tokens) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  next();
}

router.post('/scan', requireAuth, async (req, res) => {
  try {
    const emails = await searchGmail(req.session.tokens);

    if (emails.length === 0) {
      return res.json({ subscriptions: [], message: 'No subscription-related emails found.' });
    }

    const subscriptions = await extractSubscriptions(emails);
    saveSubscriptions(req.session.userEmail, subscriptions);

    const saved = getSubscriptions(req.session.userEmail);
    res.json({ subscriptions: saved, emailsScanned: emails.length });
  } catch (err) {
    console.error('Scan error:', err);
    res.status(500).json({ error: 'Failed to scan Gmail. Please try again.' });
  }
});

router.get('/subscriptions', requireAuth, (req, res) => {
  const subscriptions = getSubscriptions(req.session.userEmail);
  const lastScanned = getLastScanned(req.session.userEmail);
  res.json({ subscriptions, lastScanned });
});

export default router;
