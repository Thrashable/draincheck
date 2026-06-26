// SubScan Extraction Engine v2 — Smart email classification with charge history

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

// ─── Utility Extractors ────────────────────────────────────────

function extractAllPrices(text) {
  const prices = [];
  const pattern = /\$(\d{1,4}\.\d{2})\b/g;
  let m;
  while ((m = pattern.exec(text)) !== null) {
    const val = parseFloat(m[1]);
    if (val > 0 && val < 10000) prices.push(val);
  }
  // Also try other patterns if none found
  if (prices.length === 0) {
    const fallbacks = [
      /USD\s*(\d+(?:\.\d{2})?)/i,
      /amount[:\s]*\$?(\d+(?:\.\d{2})?)/i,
      /total[:\s]*\$?(\d+(?:\.\d{2})?)/i,
      /charged?\s*\$?(\d+(?:\.\d{2})?)/i,
      /payment\s*(?:of\s*)?\$?(\d+(?:\.\d{2})?)/i,
      /price[:\s]*\$?(\d+(?:\.\d{2})?)/i,
      /billed?\s*\$?(\d+(?:\.\d{2})?)/i,
      /invoice\s*(?:total|amount)?[:\s]*\$?(\d+(?:\.\d{2})?)/i,
      /you (?:paid|were charged)\s*\$?(\d+(?:\.\d{2})?)/i,
    ];
    for (const p of fallbacks) {
      const fm = text.match(p);
      if (fm) {
        const val = parseFloat(fm[1]);
        if (val > 0 && val < 10000) { prices.push(val); break; }
      }
    }
  }
  return prices;
}

function extractPrice(text) {
  const prices = extractAllPrices(text);
  return prices.length > 0 ? prices[0] : null;
}

function extractCardInfo(text) {
  let last4 = null;
  let cardType = null;

  // Match last 4 digits — many patterns
  const last4Patterns = [
    /(?:visa|mastercard|master\s*card|amex|american\s*express|discover)\s*(?:ending\s+(?:in|with)|[•·*x]{2,4}[\s-]*)\s*(\d{4})/i,
    /(?:ending\s+(?:in|with)|ends?\s+(?:in|with))\s*(\d{4})/i,
    /[•·]{2,4}\s*(\d{4})/,
    /\*{2,4}\s*(\d{4})/,
    /x{2,4}[\s-]*(\d{4})/i,
    /\.{4}\s*(\d{4})/,
    /card\s+(?:number\s+)?(?:ending\s+)?(?:in\s+)?(?:\S+\s+)?(\d{4})\b/i,
    /last\s*(?:four|4)\s*(?:digits?)?\s*[:\s]*(\d{4})/i,
  ];
  for (const p of last4Patterns) {
    const m = text.match(p);
    if (m) { last4 = m[1]; break; }
  }

  // Detect card type — check more specifically
  if (/\bvisa\b/i.test(text)) cardType = 'Visa';
  else if (/\b(?:mastercard|master\s*card)\b/i.test(text)) cardType = 'Mastercard';
  else if (/\b(?:amex|american\s*express)\b/i.test(text)) cardType = 'American Express';
  else if (/\bdiscover\b/i.test(text)) cardType = 'Discover';
  else if (/\b(?:maestro)\b/i.test(text)) cardType = 'Maestro';
  else if (/\b(?:jcb)\b/i.test(text)) cardType = 'JCB';
  else if (/\b(?:unionpay|union\s*pay)\b/i.test(text)) cardType = 'UnionPay';
  else if (/\b(?:diners\s*club)\b/i.test(text)) cardType = 'Diners Club';
  else if (/\b(?:apple\s*pay)\b/i.test(text)) cardType = 'Apple Pay';
  else if (/\b(?:google\s*pay)\b/i.test(text)) cardType = 'Google Pay';
  else if (/\bpaypal\b/i.test(text)) cardType = 'PayPal';
  else if (/\b(?:debit\s*card)\b/i.test(text)) cardType = 'Debit Card';
  // Only say "Credit Card" if we at least have last4
  else if (last4 && /\b(?:credit\s*card)\b/i.test(text)) cardType = 'Credit Card';

  if (!last4 && !cardType) return null;
  return { last4, cardType };
}

function extractFrequency(text) {
  const lower = text.toLowerCase();
  if (/\b(annual|yearly|year|per year|\/yr|\/year)\b/.test(lower)) return 'Yearly';
  if (/\b(monthly|month|per month|\/mo|\/month)\b/.test(lower)) return 'Monthly';
  if (/\b(weekly|week|per week)\b/.test(lower)) return 'Weekly';
  return 'Unknown';
}

function extractPlanName(text) {
  const lower = text.toLowerCase();
  const patterns = [
    /\b(premium|pro|plus|basic|starter|standard|enterprise|business|family|individual|student|lite|free|unlimited)\s*(?:plan|tier|membership)?\b/i,
    /plan[:\s]+"?([^"\n,]+)"?/i,
    /(?:your|the)\s+(\w+\s*(?:plan|tier|membership))/i,
  ];
  for (const p of patterns) {
    const m = text.match(p);
    if (m) {
      const name = m[1].trim();
      if (name.length > 1 && name.length < 40) return name.charAt(0).toUpperCase() + name.slice(1);
    }
  }
  return null;
}

function parseEmailDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? null : d;
}

function extractDate(text) {
  const iso = text.match(/(\d{4}-\d{2}-\d{2})/);
  if (iso) return iso[1];
  const months = { jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06', jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12' };
  const dateMatch = text.match(/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\w*\s+(\d{1,2}),?\s*(\d{4})\b/i);
  if (dateMatch) {
    const mon = months[dateMatch[1].toLowerCase().slice(0, 3)];
    const day = dateMatch[2].padStart(2, '0');
    return `${dateMatch[3]}-${mon}-${day}`;
  }
  return null;
}

function extractSenderEmail(from) {
  const emailMatch = from.match(/<([^>]+)>/);
  if (emailMatch) return emailMatch[1].toLowerCase();
  const atMatch = from.match(/[\w.+-]+@[\w.-]+/);
  if (atMatch) return atMatch[0].toLowerCase();
  return from;
}

function extractDomain(from) {
  const email = extractSenderEmail(from);
  const parts = email.split('@');
  return parts.length > 1 ? parts[1] : email;
}

function identifyService(email) {
  const fromDomain = extractDomain(email.from);
  const fromAndSubject = `${email.from} ${email.subject}`.toLowerCase();

  for (const [keyword, service] of Object.entries(KNOWN_SERVICES)) {
    const clean = keyword.replace(/[^a-z0-9]/g, '');
    if (fromDomain.includes(clean)) return service;
  }
  for (const [keyword, service] of Object.entries(KNOWN_SERVICES)) {
    if (fromAndSubject.includes(keyword)) return service;
  }

  const fromName = email.from.replace(/<[^>]+>/, '').replace(/"/g, '').trim();
  if (fromName && fromName !== extractSenderEmail(email.from)) {
    return { name: fromName, category: 'Other' };
  }
  return null;
}

// ─── Email Classification ──────────────────────────────────────

const RECURRING_SIGNALS = /\b(subscription|membership|your plan|your membership|recurring|auto[- ]?renew|billing cycle|next billing|renewal date|renews on|renews? (?:on|at)|cancel anytime|cancel your|plan renewal|monthly plan|yearly plan|annual plan|signed up|welcome to your|new member|member since|billing period)\b/i;

const ONETIME_SIGNALS = /\b(rental|rented|one[- ]?time|single purchase|order confirmed|order receipt|your order|purchase confirmation|thank you for your purchase|movie rental|game purchase|day pass|guest pass|gift card|e-?gift|one[- ]?time purchase|pay as you go)\b/i;

const FAILED_SIGNALS = /\b(payment failed|charge declined|billing issue|update your payment|unsuccessful payment|could not process|payment retry|unable to charge|action required.*payment|payment method.*expired|card.*declined|failed to process|past due)\b/i;

const CANCELLATION_SIGNALS = /\b(cancel(?:led|lation)|unsubscribed|subscription ended|membership ended|account closed|service discontinued|no longer active|goodbye|we.?re sorry to see you go|you.?ve cancelled)\b/i;

const WELCOME_SIGNALS = /\b(welcome to|thanks for signing up|thanks for joining|thank you for signing up|you.?re all set|account created|getting started|new member|membership activated|subscription activated|your new plan)\b/i;

const RENEWAL_SIGNALS = /\b(renewal|renewed|has been renewed|auto[- ]?renewed|next billing date|upcoming charge|will be charged|scheduled payment|next payment)\b/i;

function classifyEmail(email) {
  const text = `${email.subject} ${email.snippet} ${email.body}`.toLowerCase();

  const isFailed = FAILED_SIGNALS.test(text);
  const isCancellation = CANCELLATION_SIGNALS.test(text);
  const isWelcome = WELCOME_SIGNALS.test(text);
  const isRenewal = RENEWAL_SIGNALS.test(text);
  const hasRecurring = RECURRING_SIGNALS.test(text);
  const hasOneTime = ONETIME_SIGNALS.test(text);

  if (isFailed) return 'failed';
  if (isCancellation) return 'cancellation';
  if (isWelcome) return 'welcome';
  if (isRenewal) return 'renewal';
  if (hasRecurring && !hasOneTime) return 'subscription_receipt';
  if (hasOneTime && !hasRecurring) return 'onetime_receipt';
  // Generic receipt
  return 'receipt';
}

// ─── Priority: subscription emails > one-time receipts ─────────

function emailPriority(classification) {
  const order = {
    welcome: 6,
    renewal: 5,
    subscription_receipt: 4,
    receipt: 2,
    onetime_receipt: 1,
    failed: 0,
    cancellation: 0,
  };
  return order[classification] ?? 1;
}

// ─── Determine recurring vs one-time for a group of emails ─────

function determineRecurring(emailGroup) {
  let hasRecurringEvidence = false;
  let hasOneTimeEvidence = false;
  let uniqueChargeDates = new Set();

  for (const { email, classification, fullText } of emailGroup) {
    if (['welcome', 'renewal', 'subscription_receipt'].includes(classification)) {
      hasRecurringEvidence = true;
    }
    if (classification === 'onetime_receipt') {
      hasOneTimeEvidence = true;
    }
    // Count unique charge dates (receipts on different dates = likely recurring)
    if (['receipt', 'subscription_receipt', 'onetime_receipt'].includes(classification)) {
      const d = parseEmailDate(email.date);
      if (d) uniqueChargeDates.add(d.toISOString().slice(0, 10));
    }
  }

  // Multiple charges on different dates → likely subscription
  if (uniqueChargeDates.size >= 2) hasRecurringEvidence = true;

  // If BOTH signals, recurring evidence wins (business has both sub and one-time)
  if (hasRecurringEvidence) return true;
  // Default: one-time (err on side of caution)
  return false;
}

// ─── Status Detection ──────────────────────────────────────────

function determineStatus(emailGroup) {
  const classifications = emailGroup.map(e => e.classification);
  if (classifications.includes('cancellation')) return 'cancelled';
  // If most recent email is a failed payment, mark as payment_issue
  const sorted = [...emailGroup].sort((a, b) => {
    const da = parseEmailDate(a.email.date);
    const db = parseEmailDate(b.email.date);
    return (db?.getTime() || 0) - (da?.getTime() || 0);
  });
  if (sorted.length > 0 && sorted[0].classification === 'failed') return 'payment_issue';
  return 'active';
}

// ─── Description extractor for one-time payments ───────────────

function extractDescription(email) {
  const subject = (email.subject || '').trim();
  // Clean up common prefixes
  let desc = subject
    .replace(/^(re:|fwd?:|fw:)\s*/i, '')
    .replace(/^your\s+(receipt|order|purchase|payment|booking|confirmation)\s*(for|from|:|-|–)?\s*/i, '')
    .trim();
  // If subject is too generic or empty, try snippet
  if (!desc || desc.length < 3) {
    desc = (email.snippet || '').substring(0, 80).trim();
  }
  return desc.length > 80 ? desc.substring(0, 77) + '...' : desc;
}

// ─── Main Extraction ───────────────────────────────────────────

export async function extractSubscriptions(emails) {
  // Step 1: Identify service for each email and group by service
  const groups = new Map(); // serviceName → [{ email, service, classification, fullText }]

  for (const email of emails) {
    const service = identifyService(email);
    if (!service) continue;

    const key = service.name.toLowerCase();
    const fullText = `${email.subject} ${email.snippet} ${email.body}`;
    const classification = classifyEmail(email);

    if (!groups.has(key)) groups.set(key, { service, emails: [] });
    groups.get(key).emails.push({ email, classification, fullText });
  }

  // Step 2: Analyze each group
  const results = [];

  for (const [key, group] of groups) {
    const { service, emails: emailGroup } = group;
    const isRecurring = determineRecurring(emailGroup);
    const status = determineStatus(emailGroup);

    // Sort emails by priority (subscription/welcome emails first)
    const sorted = [...emailGroup].sort((a, b) => emailPriority(b.classification) - emailPriority(a.classification));

    // Best email = highest priority (subscription emails over one-time receipts)
    const bestEmail = sorted[0];

    // Collect all charge data
    let bestPrice = null;
    let bestFrequency = 'Unknown';
    let bestCardInfo = null;
    let bestPlanName = null;
    let bestRenewalDate = null;
    let totalSpent = 0;
    let chargeCount = 0;
    let failedCount = 0;
    let firstChargeDate = null;
    let lastChargeDate = null;
    const allMessageIds = [];

    for (const { email, classification, fullText } of emailGroup) {
      const price = extractPrice(fullText);
      const freq = extractFrequency(fullText);
      const card = extractCardInfo(fullText);
      const plan = extractPlanName(fullText);
      const renewal = extractDate(fullText);
      const emailDate = parseEmailDate(email.date);

      // Track message IDs
      if (email.messageId) allMessageIds.push(email.messageId);

      // Count charges and failed payments
      if (classification === 'failed') {
        failedCount++;
      } else if (['receipt', 'subscription_receipt', 'onetime_receipt', 'renewal'].includes(classification)) {
        if (price != null) {
          chargeCount++;
          totalSpent += price;
        }
        // Track date range
        if (emailDate) {
          if (!firstChargeDate || emailDate < firstChargeDate) firstChargeDate = emailDate;
          if (!lastChargeDate || emailDate > lastChargeDate) lastChargeDate = emailDate;
        }
      }

      // Use best available data (prefer subscription/welcome email data)
      if (!bestPrice && price != null) bestPrice = price;
      if (bestFrequency === 'Unknown' && freq !== 'Unknown') bestFrequency = freq;
      if (!bestRenewalDate && renewal) bestRenewalDate = renewal;
      if (!bestPlanName && plan) bestPlanName = plan;

      // Card info: prefer most specific (type + last4 over just type)
      if (card) {
        if (!bestCardInfo) {
          bestCardInfo = card;
        } else {
          if (!bestCardInfo.last4 && card.last4) bestCardInfo.last4 = card.last4;
          if ((!bestCardInfo.cardType || bestCardInfo.cardType === 'Credit Card') && card.cardType && card.cardType !== 'Credit Card') {
            bestCardInfo.cardType = card.cardType;
          }
        }
      }
    }

    // Override price from best (subscription) email if it has one
    const bestEmailPrice = extractPrice(bestEmail.fullText);
    if (bestEmailPrice != null) bestPrice = bestEmailPrice;

    // If no charges counted but we have a price, count at least 1
    if (chargeCount === 0 && bestPrice != null) chargeCount = 1;
    if (totalSpent === 0 && bestPrice != null) totalSpent = bestPrice;

    // Card display string — never just "Credit Card"
    let cardDisplay = null;
    if (bestCardInfo) {
      if (bestCardInfo.cardType && bestCardInfo.last4 && bestCardInfo.cardType !== 'Credit Card') {
        cardDisplay = `${bestCardInfo.cardType} ···· ${bestCardInfo.last4}`;
      } else if (bestCardInfo.last4) {
        cardDisplay = `Card ···· ${bestCardInfo.last4}`;
      } else if (bestCardInfo.cardType && bestCardInfo.cardType !== 'Credit Card' && bestCardInfo.cardType !== 'Debit Card') {
        cardDisplay = bestCardInfo.cardType;
      } else {
        cardDisplay = 'Card details not found';
      }
    }

    // One-time description from the best email
    const description = !isRecurring ? extractDescription(bestEmail.email) : null;

    results.push({
      name: service.name,
      category: service.category,
      plan_name: bestPlanName,
      price: bestPrice,
      frequency: isRecurring ? bestFrequency : 'One-time',
      type: isRecurring ? 'subscription' : 'one-time',
      is_recurring: isRecurring,
      status,
      description,
      renewal_date: isRecurring ? bestRenewalDate : null,
      source_email: extractSenderEmail(bestEmail.email.from),
      subject: bestEmail.email.subject || '',
      email_date: bestEmail.email.date || '',
      gmail_message_id: bestEmail.email.messageId || null,
      source_email_ids: allMessageIds,
      card_last4: bestCardInfo?.last4 || null,
      card_type: bestCardInfo?.cardType || null,
      card_display: cardDisplay,
      total_charges: chargeCount,
      failed_charges: failedCount,
      total_spent: Math.round(totalSpent * 100) / 100,
      first_charge_date: firstChargeDate?.toISOString()?.slice(0, 10) || null,
      last_charge_date: lastChargeDate?.toISOString()?.slice(0, 10) || null,
    });
  }

  // Sort by price descending (highest cost first) as default
  results.sort((a, b) => (b.price || 0) - (a.price || 0));

  return results;
}
