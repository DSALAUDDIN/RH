import crypto from 'node:crypto';

const ALGORITHM = 'aes-256-gcm';
const PREFIX = 'enc:v1:';

/**
 * Returns a 32-byte encryption key derived from SEO_TOKEN_ENCRYPTION_KEY or JWT_SECRET.
 */
function getEncryptionKey(): Buffer {
  const secret = process.env.SEO_TOKEN_ENCRYPTION_KEY || process.env.JWT_SECRET || 'dev-fallback-key-do-not-use-in-production-12345';
  return crypto.createHash('sha256').update(secret).digest();
}

/**
 * Encrypts a sensitive string (e.g. OAuth refresh token) using AES-256-GCM.
 * Output format: enc:v1:<iv_hex>:<auth_tag_hex>:<cipher_hex>
 */
export function encryptToken(plainText: string): string {
  if (!plainText) return plainText;
  // If already encrypted, return as is
  if (plainText.startsWith(PREFIX)) return plainText;

  const key = getEncryptionKey();
  const iv = crypto.randomBytes(12); // 96-bit IV recommended for GCM
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  const encrypted = Buffer.concat([cipher.update(plainText, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return `${PREFIX}${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted.toString('hex')}`;
}

/**
 * Decrypts a token encrypted with encryptToken.
 * Gracefully handles legacy plaintext tokens for backward compatibility.
 */
export function decryptToken(cipherText: string | null | undefined): string | null {
  if (!cipherText) return null;

  // If not encrypted with our format, return plaintext (backward compatibility)
  if (!cipherText.startsWith(PREFIX)) {
    return cipherText;
  }

  try {
    const parts = cipherText.slice(PREFIX.length).split(':');
    if (parts.length !== 3) {
      throw new Error('Invalid token ciphertext format.');
    }

    const [ivHex, authTagHex, encryptedHex] = parts;
    const key = getEncryptionKey();
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    const encrypted = Buffer.from(encryptedHex, 'hex');

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);

    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted.toString('utf8');
  } catch (error) {
    console.error('[Token Decryption] Failed to decrypt stored token. Key mismatch or corrupted ciphertext.');
    return null;
  }
}
