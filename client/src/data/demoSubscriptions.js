// Fictional sample data for the public demo (no real account, no PII).
// Shape matches the live extractor output in netlify/shared/extract.mjs so the
// dashboard renders identically to a real scan. gmail_message_id is null so the
// "View in Gmail" deep links don't appear in the demo.

export const DEMO_LAST_SCANNED = '2026-06-24T15:30:00.000Z';

export const DEMO_SUBSCRIPTIONS = [
  {
    id: 'demo-adobe', name: 'Adobe Creative Cloud', category: 'Productivity', plan_name: 'All Apps',
    price: 59.99, frequency: 'Monthly', type: 'subscription', is_recurring: true, status: 'active',
    description: null, renewal_date: '2026-07-09', source_email: 'mail@adobe.com',
    subject: 'Your Creative Cloud receipt', email_date: '2026-06-09', gmail_message_id: null,
    source_email_ids: ['d1', 'd2', 'd3'], card_last4: '4242', card_type: 'Visa', card_display: 'Visa ···· 4242',
    total_charges: 7, failed_charges: 0, total_spent: 419.93, first_charge_date: '2025-12-09', last_charge_date: '2026-06-09',
  },
  {
    id: 'demo-planetfitness', name: 'Planet Fitness', category: 'Health', plan_name: 'Black Card',
    price: 24.99, frequency: 'Monthly', type: 'subscription', is_recurring: true, status: 'payment_issue',
    description: null, renewal_date: '2026-07-17', source_email: 'billing@planetfitness.com',
    subject: 'Action required: payment method', email_date: '2026-06-17', gmail_message_id: null,
    source_email_ids: ['p1', 'p2'], card_last4: '1881', card_type: 'Mastercard', card_display: 'Mastercard ···· 1881',
    total_charges: 9, failed_charges: 1, total_spent: 224.91, first_charge_date: '2025-09-17', last_charge_date: '2026-06-17',
  },
  {
    id: 'demo-netflix', name: 'Netflix', category: 'Entertainment', plan_name: 'Premium',
    price: 22.99, frequency: 'Monthly', type: 'subscription', is_recurring: true, status: 'active',
    description: null, renewal_date: '2026-07-12', source_email: 'info@netflix.com',
    subject: 'Your Netflix receipt', email_date: '2026-06-12', gmail_message_id: null,
    source_email_ids: ['n1', 'n2', 'n3'], card_last4: '4242', card_type: 'Visa', card_display: 'Visa ···· 4242',
    total_charges: 11, failed_charges: 0, total_spent: 252.89, first_charge_date: '2025-08-12', last_charge_date: '2026-06-12',
  },
  {
    id: 'demo-chatgpt', name: 'ChatGPT Plus', category: 'Productivity', plan_name: 'Plus',
    price: 20.00, frequency: 'Monthly', type: 'subscription', is_recurring: true, status: 'active',
    description: null, renewal_date: '2026-07-03', source_email: 'noreply@openai.com',
    subject: 'Your ChatGPT Plus receipt', email_date: '2026-06-03', gmail_message_id: null,
    source_email_ids: ['c1', 'c2'], card_last4: '4242', card_type: 'Visa', card_display: 'Visa ···· 4242',
    total_charges: 8, failed_charges: 0, total_spent: 160.00, first_charge_date: '2025-11-03', last_charge_date: '2026-06-03',
  },
  {
    id: 'demo-nyt', name: 'New York Times', category: 'News', plan_name: 'All Access',
    price: 17.00, frequency: 'Monthly', type: 'subscription', is_recurring: true, status: 'active',
    description: null, renewal_date: '2026-07-21', source_email: 'noreply@nytimes.com',
    subject: 'Your subscription renewal', email_date: '2026-06-21', gmail_message_id: null,
    source_email_ids: ['t1'], card_last4: '1881', card_type: 'Mastercard', card_display: 'Mastercard ···· 1881',
    total_charges: 5, failed_charges: 0, total_spent: 85.00, first_charge_date: '2026-02-21', last_charge_date: '2026-06-21',
  },
  {
    id: 'demo-amazonprime', name: 'Amazon Prime', category: 'Shopping', plan_name: null,
    price: 14.99, frequency: 'Monthly', type: 'subscription', is_recurring: true, status: 'active',
    description: null, renewal_date: '2026-07-06', source_email: 'auto-confirm@amazon.com',
    subject: 'Your Prime membership', email_date: '2026-06-06', gmail_message_id: null,
    source_email_ids: ['a1', 'a2'], card_last4: '7733', card_type: 'Visa', card_display: 'Visa ···· 7733',
    total_charges: 12, failed_charges: 0, total_spent: 179.88, first_charge_date: '2025-07-06', last_charge_date: '2026-06-06',
  },
  {
    id: 'demo-youtube', name: 'YouTube Premium', category: 'Entertainment', plan_name: 'Individual',
    price: 13.99, frequency: 'Monthly', type: 'subscription', is_recurring: true, status: 'active',
    description: null, renewal_date: '2026-07-14', source_email: 'payments-noreply@google.com',
    subject: 'Your YouTube Premium receipt', email_date: '2026-06-14', gmail_message_id: null,
    source_email_ids: ['y1'], card_last4: '7733', card_type: 'Visa', card_display: 'Visa ···· 7733',
    total_charges: 6, failed_charges: 0, total_spent: 83.94, first_charge_date: '2026-01-14', last_charge_date: '2026-06-14',
  },
  {
    id: 'demo-spotify', name: 'Spotify', category: 'Music', plan_name: 'Premium',
    price: 11.99, frequency: 'Monthly', type: 'subscription', is_recurring: true, status: 'active',
    description: null, renewal_date: '2026-07-19', source_email: 'no-reply@spotify.com',
    subject: 'Your Spotify Premium receipt', email_date: '2026-06-19', gmail_message_id: null,
    source_email_ids: ['s1', 's2'], card_last4: '1881', card_type: 'Mastercard', card_display: 'Mastercard ···· 1881',
    total_charges: 10, failed_charges: 0, total_spent: 119.90, first_charge_date: '2025-09-19', last_charge_date: '2026-06-19',
  },
  {
    id: 'demo-notion', name: 'Notion', category: 'Productivity', plan_name: 'Plus',
    price: 10.00, frequency: 'Monthly', type: 'subscription', is_recurring: true, status: 'active',
    description: null, renewal_date: '2026-07-02', source_email: 'team@makenotion.com',
    subject: 'Your Notion invoice', email_date: '2026-06-02', gmail_message_id: null,
    source_email_ids: ['no1'], card_last4: '4242', card_type: 'Visa', card_display: 'Visa ···· 4242',
    total_charges: 4, failed_charges: 0, total_spent: 40.00, first_charge_date: '2026-03-02', last_charge_date: '2026-06-02',
  },
  {
    id: 'demo-icloud', name: 'iCloud+', category: 'Cloud', plan_name: '200GB',
    price: 2.99, frequency: 'Monthly', type: 'subscription', is_recurring: true, status: 'active',
    description: null, renewal_date: '2026-07-08', source_email: 'no_reply@email.apple.com',
    subject: 'Your Apple receipt', email_date: '2026-06-08', gmail_message_id: null,
    source_email_ids: ['i1'], card_last4: '4242', card_type: 'Visa', card_display: 'Visa ···· 4242',
    total_charges: 12, failed_charges: 0, total_spent: 35.88, first_charge_date: '2025-07-08', last_charge_date: '2026-06-08',
  },
  {
    id: 'demo-disney', name: 'Disney+', category: 'Entertainment', plan_name: 'Standard',
    price: 9.99, frequency: 'Monthly', type: 'subscription', is_recurring: true, status: 'cancelled',
    description: null, renewal_date: null, source_email: 'disneyplus@mail.disneyplus.com',
    subject: "We're sorry to see you go", email_date: '2026-05-28', gmail_message_id: null,
    source_email_ids: ['ds1', 'ds2'], card_last4: '1881', card_type: 'Mastercard', card_display: 'Mastercard ···· 1881',
    total_charges: 6, failed_charges: 0, total_spent: 59.94, first_charge_date: '2025-11-28', last_charge_date: '2026-04-28',
  },
  // ── One-time payments ──
  {
    id: 'demo-steam', name: 'Steam', category: 'Entertainment', plan_name: null,
    price: 59.99, frequency: 'One-time', type: 'one-time', is_recurring: false, status: 'active',
    description: 'Baldur’s Gate 3 — game purchase', renewal_date: null, source_email: 'noreply@steampowered.com',
    subject: 'Your Steam purchase receipt', email_date: '2026-05-30', gmail_message_id: null,
    source_email_ids: ['st1'], card_last4: '4242', card_type: 'Visa', card_display: 'Visa ···· 4242',
    total_charges: 1, failed_charges: 0, total_spent: 59.99, first_charge_date: '2026-05-30', last_charge_date: '2026-05-30',
  },
  {
    id: 'demo-doordash', name: 'DoorDash', category: 'Shopping', plan_name: null,
    price: 41.27, frequency: 'One-time', type: 'one-time', is_recurring: false, status: 'active',
    description: 'Order from Chipotle', renewal_date: null, source_email: 'no-reply@doordash.com',
    subject: 'Your DoorDash order receipt', email_date: '2026-06-11', gmail_message_id: null,
    source_email_ids: ['dd1'], card_last4: '7733', card_type: 'Visa', card_display: 'Visa ···· 7733',
    total_charges: 1, failed_charges: 0, total_spent: 41.27, first_charge_date: '2026-06-11', last_charge_date: '2026-06-11',
  },
];
