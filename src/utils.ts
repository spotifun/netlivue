export async function sha256(message: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hash = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hash));
  const hashBinary = hashArray.map((b) => String.fromCharCode(b)).join('');
  return hashBinary;
}

export async function b64urlsafe(hash: string) {
  const hashb64 = btoa(hash);
  return hashb64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

export function getHost() {
  return window.location.origin;
}
