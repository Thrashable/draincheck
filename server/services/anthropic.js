// Local subscription extraction — no external API needed

const KNOWN_SERVICES = {
  'netflix': { name: 'Netflix', category: 'Entertainment' },
  'hulu': { name: 'Hulu', category: 'Entertainment' },
  'disney+': { name: 'Disney+', category: 'Entertainment' },
  'disneyplus': { name: 'Disney+', category: 'Entertainment' },
  'hbo': { name: 'HBO Max', category: 'Entertainment' },
  'max.com': { name: 'HBO Max', category: 'Entertainment' },
  'paramount': { name: 'Paramount+', category: 'Entertainment' },
  'peacock': { name: 'Peacock', category: 'Entertainment' },
  'crunchyroll': { name: 'Crunchyroll', category: 'Entertainment' },
  'audible': { name: 'Audible', category: 'Entertainment' },
  'twitch': { name: 'Twitch', category: 'Entertainment' },
  'youtube premium': { name: 'YouTube Premium', category: 'Entertainment' },
  'youtube': { name: 'YouTube', category: 'Entertainment' },
  'prime video': { name: 'Prime Video', category: 'Entertainment' },
  'apple tv': { name: 'Apple TV+', category: 'Entertainment' },
  'capcut': { name: 'CapCut', category: 'Entertainment' },
  'spotify': { name: 'Spotify', category: 'Music' },
  'apple music': { name: 'Apple Music', category: 'Music' },
  'youtube music': { name: 'YouTube Music', category: 'Music' },
  'tidal': { name: 'Tidal', category: 'Music' },
  'soundcloud': { name: 'SoundCloud', category: 'Music' },
  'deezer': { name: 'Deezer', category: 'Music' },
  'notion': { name: 'Notion', category: 'Productivity' },
  'figma': { name: 'Figma', category: 'Productivity' },
  'slack': { name: 'Slack', category: 'Productivity' },
  'zoom': { name: 'Zoom', category: 'Productivity' },
  'adobe.com': { name: 'Adobe Creative Cloud', category: 'Productivity' },
  'creativecloud': { name: 'Adobe Creative Cloud', category: 'Productivity' },
  'canva': { name: 'Canva', category: 'Productivity' },
  'dropbox': { name: 'Dropbox', category: 'Productivity' },
  'linear': { name: 'Linear', category: 'Productivity' },
  'asana': { name: 'Asana', category: 'Productivity' },
  'grammarly': { name: 'Grammarly', category: 'Productivity' },
  'todoist': { name: 'Todoist', category: 'Productivity' },
  'microsoft 365': { name: 'Microsoft 365', category: 'Productivity' },
  'office 365': { name: 'Microsoft 365', category: 'Productivity' },
  'chatgpt': { name: 'ChatGPT Plus', category: 'Productivity' },
  'openai': { name: 'ChatGPT Plus', category: 'Productivity' },
  'claude': { name: 'Claude Pro', category: 'Productivity' },
  'anthropic': { name: 'Claude Pro', category: 'Productivity' },
  'aws': { name: 'AWS', category: 'Cloud' },
  'amazon web services': { name: 'AWS', category: 'Cloud' },
  'google cloud': { name: 'Google Cloud', category: 'Cloud' },
  'azure': { name: 'Azure', category: 'Cloud' },
  'vercel': { name: 'Vercel', category: 'Cloud' },
  'heroku': { name: 'Heroku', category: 'Cloud' },
  'digitalocean': { name: 'DigitalOcean', category: 'Cloud' },
  'cloudflare': { name: 'Cloudflare', category: 'Cloud' },
  'github': { name: 'GitHub', category: 'Cloud' },
  'gitlab': { name: 'GitLab', category: 'Cloud' },
  'tradingview': { name: 'TradingView', category: 'Finance' },
  'robinhood': { name: 'Robinhood', category: 'Finance' },
  'coinbase': { name: 'Coinbase', category: 'Finance' },
  'ynab': { name: 'YNAB', category: 'Finance' },
  'quickbooks': { name: 'QuickBooks', category: 'Finance' },
  'stripe': { name: 'Stripe', category: 'Finance' },
  'headspace': { name: 'Headspace', category: 'Health' },
  'calm': { name: 'Calm', category: 'Health' },
  'peloton': { name: 'Peloton', category: 'Health' },
  'strava': { name: 'Strava', category: 'Health' },
  'myfitnesspal': { name: 'MyFitnessPal', category: 'Health' },
  'whoop': { name: 'Whoop', category: 'Health' },
  'noom': { name: 'Noom', category: 'Health' },
  'amazon prime': { name: 'Amazon Prime', category: 'Shopping' },
  'walmart+': { name: 'Walmart+', category: 'Shopping' },
  'walmart plus': { name: 'Walmart+', category: 'Shopping' },
  'instacart': { name: 'Instacart', category: 'Shopping' },
  'doordash': { name: 'DoorDash DashPass', category: 'Shopping' },
  'dashpass': { name: 'DoorDash DashPass', category: 'Shopping' },
  'ubereats': { name: 'Uber Eats', category: 'Shopping' },
  'uber eats': { name: 'Uber Eats', category: 'Shopping' },
  'nytimes': { name: 'New York Times', category: 'News' },
  'new york times': { name: 'New York Times', category: 'News' },
  'wsj': { name: 'Wall Street Journal', category: 'News' },
  'wall street journal': { name: 'Wall Street Journal', category: 'News' },
  'washington post': { name: 'Washington Post', category: 'News' },
  'substack': { name: 'Substack', category: 'News' },
  'medium': { name: 'Medium', category: 'News' },
  'economist': { name: 'The Economist', category: 'News' },
  'google one': { name: 'Google One', category: 'Cloud' },
  'google workspace': { name: 'Google Workspace', category: 'Productivity' },
  'icloud': { name: 'iCloud+', category: 'Cloud' },
  'apple.com/bill': { name: 'Apple Subscription', category: 'Other' },
  'expressvpn': { name: 'ExpressVPN', category: 'Other' },
  'nordvpn': { name: 'NordVPN', category: 'Other' },
  '1password': { name: '1Password', category: 'Productivity' },
  'lastpass': { name: 'LastPass', category: 'Productivity' },
  'bitwarden': { name: 'Bitwarden', category: 'Productivity' },
};

// Extract price from text like "$9.99", "9.99 USD", "$14.99/mo"
function extractPrice(text) {
  const patterns = [
    /\$(\d+(?:\.\d{2})?)/,
    /USD\s*(\d+(?:\.\d{2})?)/,
    /(\d+(?:\.\d{2})?)\s*(?:USD|usd)/,
    /amount[:\s]*\$?(\d+(?:\.\d{2})?)/i,
    /total[:\s]*\$?(\d+(?:\.\d{2})?)/i,
    /charged?\s*\$?(\d+(?:\.\d{2})?)/i,
    /payment\s*(?:of\s*)?\$?(\d+(?:\.\d{2})?)/i,
  ];
  for (const p of patterns) {
    const m = text.match(p);
    if (m) {
      const val = parseFloat(m[1]);
      if (val > 0 && val < 10000) return val;
    }
  }
  return null;
}

// Detect frequency from text
function extractFrequency(text) {
  const lower = text.toLowerCase();
  if (/\b(annual|yearly|year|per year|\/yr|\/year)\b/.test(lower)) return 'Yearly';
  if (/\b(monthly|month|per month|\/mo|\/month)\b/.test(lower)) return 'Monthly';
  if (/\b(weekly|week|per week)\b/.test(lower)) return 'Weekly';
  return 'Unknown';
}

// Extract a date from text
function extractDate(text) {
  // ISO format
  const iso = text.match(/(\d{4}-\d{2}-\d{2})/);
  if (iso) return iso[1];

  // Common formats like "April 15, 2026" or "Apr 15 2026"
  const months = { jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06', jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12' };
  const dateMatch = text.match(/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\w*\s+(\d{1,2}),?\s*(\d{4})\b/i);
  if (dateMatch) {
    const mon = months[dateMatch[1].toLowerCase().slice(0, 3)];
    const day = dateMatch[2].padStart(2, '0');
    return `${dateMatch[3]}-${mon}-${day}`;
  }
  return null;
}

// Extract sender email/domain from From header
function extractSenderEmail(from) {
  const emailMatch = from.match(/<([^>]+)>/);
  if (emailMatch) return emailMatch[1].toLowerCase();
  const atMatch = from.match(/[\w.+-]+@[\w.-]+/);
  if (atMatch) return atMatch[0].toLowerCase();
  return from;
}

// Extract sender domain
function extractDomain(from) {
  const email = extractSenderEmail(from);
  const parts = email.split('@');
  return parts.length > 1 ? parts[1] : email;
}

// Try to identify a known service from email fields
function identifyService(email) {
  const fromDomain = extractDomain(email.from);
  const fromAndSubject = `${email.from} ${email.subject}`.toLowerCase();

  // First pass: match on sender domain (most reliable)
  for (const [keyword, service] of Object.entries(KNOWN_SERVICES)) {
    const clean = keyword.replace(/[^a-z0-9]/g, '');
    if (fromDomain.includes(clean)) {
      return service;
    }
  }

  // Second pass: match on from + subject (avoids body false positives)
  for (const [keyword, service] of Object.entries(KNOWN_SERVICES)) {
    if (fromAndSubject.includes(keyword)) {
      return service;
    }
  }

  // Fallback: try to clean up the sender name as the service name
  const fromName = email.from.replace(/<[^>]+>/, '').replace(/"/g, '').trim();
  if (fromName && fromName !== extractSenderEmail(email.from)) {
    return { name: fromName, category: 'Other' };
  }

  return null;
}

export async function extractSubscriptions(emails) {
  const seen = new Map(); // name -> subscription data

  for (const email of emails) {
    const service = identifyService(email);
    if (!service) continue;

    const key = service.name.toLowerCase();
    const fullText = `${email.subject} ${email.snippet} ${email.body}`;

    if (!seen.has(key)) {
      seen.set(key, {
        name: service.name,
        price: extractPrice(fullText),
        frequency: extractFrequency(fullText),
        renewal_date: extractDate(fullText),
        cancellation_url: null,
        source_email: extractSenderEmail(email.from),
        category: service.category,
      });
    } else {
      // Merge: fill in missing fields from additional emails
      const existing = seen.get(key);
      if (!existing.price) existing.price = extractPrice(fullText);
      if (existing.frequency === 'Unknown') existing.frequency = extractFrequency(fullText);
      if (!existing.renewal_date) existing.renewal_date = extractDate(fullText);
    }
  }

  return [...seen.values()];
}
