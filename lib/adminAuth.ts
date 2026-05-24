import { cookies } from 'next/headers';
import crypto from 'crypto';

const COOKIE_NAME = 'city_baker_admin';

function secret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.NEXTAUTH_SECRET || 'dev-city-baker-secret';
}

export function signAdminSession(email: string) {
  const payload = Buffer.from(JSON.stringify({ email, ts: Date.now() })).toString('base64url');
  const sig = crypto.createHmac('sha256', secret()).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}

export function verifyAdminSession(token?: string | null) {
  if (!token || !token.includes('.')) return null;
  const [payload, sig] = token.split('.');
  const expected = crypto.createHmac('sha256', secret()).update(payload).digest('base64url');
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as { email: string; ts: number };
    const maxAgeMs = 1000 * 60 * 60 * 24 * 7;
    if (Date.now() - data.ts > maxAgeMs) return null;
    return data;
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const store = await cookies();
  const session = verifyAdminSession(store.get(COOKIE_NAME)?.value);
  if (!session) throw new Error('UNAUTHORIZED');
  return session;
}

export { COOKIE_NAME };
