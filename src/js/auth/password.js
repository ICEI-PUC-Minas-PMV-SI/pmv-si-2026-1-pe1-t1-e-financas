function bytesToBase64(bytes) {
  let binary = "";

  bytes.forEach(byte => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary);
}

export function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

export function createSalt(cryptoApi = globalThis.crypto) {
  return bytesToBase64(cryptoApi.getRandomValues(new Uint8Array(16)));
}

export async function hashPassword(
  password,
  salt,
  cryptoApi = globalThis.crypto
) {
  const bytes = new TextEncoder().encode(`${salt}:${password}`);
  const digest = await cryptoApi.subtle.digest("SHA-256", bytes);

  return bytesToBase64(new Uint8Array(digest));
}
