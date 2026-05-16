import { createHmac, timingSafeEqual } from "crypto";

export const adminSessionCookieName = "airport_admin_session";
export const adminSessionMaxAge = 60 * 60 * 8;

type AdminSessionPayload = {
  username: string;
  expiresAt: number;
};

function getAdminUsername() {
  return process.env.ADMIN_USERNAME || (process.env.NODE_ENV === "production" ? "" : "baioowen");
}

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || (process.env.NODE_ENV === "production" ? "" : "280950");
}

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "local-admin-session-secret";
}

function toBase64Url(value: string | Buffer) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function fromBase64Url(value: string) {
  const padded = `${value}${"=".repeat((4 - (value.length % 4)) % 4)}`;
  return Buffer.from(padded.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8");
}

function sign(value: string) {
  return toBase64Url(createHmac("sha256", getSessionSecret()).update(value).digest());
}

function constantTimeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) return false;
  return timingSafeEqual(leftBuffer, rightBuffer);
}

export function isValidAdminLogin(username: string, password: string) {
  const expectedUsername = getAdminUsername();
  const expectedPassword = getAdminPassword();

  if (!expectedUsername || !expectedPassword) return false;

  return constantTimeEqual(username, expectedUsername) && constantTimeEqual(password, expectedPassword);
}

export function createAdminSessionToken(username: string) {
  const payload: AdminSessionPayload = {
    username,
    expiresAt: Date.now() + adminSessionMaxAge * 1000
  };
  const encodedPayload = toBase64Url(JSON.stringify(payload));

  return `${encodedPayload}.${sign(encodedPayload)}`;
}

export function verifyAdminSessionToken(token?: string) {
  if (!token) return null;

  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature || !constantTimeEqual(signature, sign(encodedPayload))) {
    return null;
  }

  try {
    const payload = JSON.parse(fromBase64Url(encodedPayload)) as AdminSessionPayload;
    if (!payload.username || payload.expiresAt < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}
