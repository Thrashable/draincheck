import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '..', 'subscan.db');

const db = new Database(dbPath);

db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_email TEXT NOT NULL,
    name TEXT NOT NULL,
    price REAL,
    frequency TEXT,
    renewal_date TEXT,
    cancellation_url TEXT,
    source_email TEXT,
    category TEXT,
    scanned_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export function saveSubscriptions(userEmail, subscriptions) {
  const del = db.prepare('DELETE FROM subscriptions WHERE user_email = ?');
  const insert = db.prepare(`
    INSERT INTO subscriptions (user_email, name, price, frequency, renewal_date, cancellation_url, source_email, category)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const tx = db.transaction((subs) => {
    del.run(userEmail);
    for (const s of subs) {
      insert.run(
        userEmail,
        s.name,
        s.price ?? null,
        s.frequency ?? 'Unknown',
        s.renewal_date ?? null,
        s.cancellation_url ?? null,
        s.source_email ?? null,
        s.category ?? 'Other'
      );
    }
  });

  tx(subscriptions);
}

export function getSubscriptions(userEmail) {
  return db.prepare('SELECT * FROM subscriptions WHERE user_email = ? ORDER BY category, name').all(userEmail);
}

export function getLastScanned(userEmail) {
  const row = db.prepare('SELECT MAX(scanned_at) as last_scanned FROM subscriptions WHERE user_email = ?').get(userEmail);
  return row?.last_scanned ?? null;
}

export default db;
