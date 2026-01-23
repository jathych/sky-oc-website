const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

async function hmacSha256(secret: string, data: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const key = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function createSession(): Promise<string> {
  const timestamp = Date.now().toString();
  const secret = process.env.SESSION_SECRET || '';
  const hash = await hmacSha256(secret, timestamp);
  return `${timestamp}|${hash}`;
}

export async function verifySession(token: string): Promise<boolean> {
  try {
    const [timestamp, hash] = token.split('|');
    const secret = process.env.SESSION_SECRET || '';
    const expectedHash = await hmacSha256(secret, timestamp);

    if (hash !== expectedHash) return false;

    const age = Date.now() - parseInt(timestamp);
    return age < SESSION_DURATION;
  } catch {
    return false;
  }
}

export function verifyPassword(password: string): boolean {
  return password === process.env.ADMIN_PASSWORD;
}
