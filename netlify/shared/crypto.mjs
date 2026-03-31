import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';

function getKey() {
  const secret = process.env.SESSION_SECRET || 'subscan-session-secret-2026';
  return crypto.createHash('sha256').update(secret).digest();
}

export function encrypt(data) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, getKey(), iv);
  let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const tag = cipher.getAuthTag().toString('hex');
  return `${iv.toString('hex')}.${tag}.${encrypted}`;
}

export function decrypt(token) {
  try {
    const [ivHex, tagHex, encrypted] = token.split('.');
    const decipher = crypto.createDecipheriv(ALGORITHM, getKey(), Buffer.from(ivHex, 'hex'));
    decipher.setAuthTag(Buffer.from(tagHex, 'hex'));
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return JSON.parse(decrypted);
  } catch {
    return null;
  }
}

export function getAuthFromCookie(cookieHeader) {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/subscan_auth=([^;]+)/);
  if (!match) return null;
  return decrypt(decodeURIComponent(match[1]));
}

export function makeAuthCookie(data, clear = false) {
  if (clear) {
    return 'subscan_auth=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0';
  }
  const encrypted = encrypt(data);
  return `subscan_auth=${encodeURIComponent(encrypted)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=86400`;
}
