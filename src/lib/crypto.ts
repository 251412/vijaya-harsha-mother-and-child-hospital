import crypto from "crypto";

const TOKEN_SECRET = process.env.ACTION_TOKEN_SECRET || "vijaya_harsha_token_secret_salt_default";

/**
 * Generates a high-entropy cryptographically secure raw token (64 hex characters)
 */
export function generateActionToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

/**
 * Computes a secure SHA-256 digest of the token with a pepper salt
 * This hash is what gets stored in the MongoDB database
 */
export function hashActionToken(rawToken: string): string {
  return crypto
    .createHmac("sha256", TOKEN_SECRET)
    .update(rawToken.trim())
    .digest("hex");
}

/**
 * Generates human-readable, unique appointment tracking IDs (e.g. VHM-2026-8742)
 */
export function generateAppointmentId(): string {
  const year = new Date().getFullYear();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `VHM-${year}-${randomSuffix}`;
}
