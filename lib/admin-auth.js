import crypto from "node:crypto";

const COOKIE_NAME = "mickey_admin";

function secret() {
  return process.env.ADMIN_SECRET || "development-only-change-me";
}

export function createAdminToken() {
  const expires = Date.now() + 1000 * 60 * 60 * 8;
  const value = String(expires);
  const signature = crypto.createHmac("sha256", secret()).update(value).digest("hex");
  return `${value}.${signature}`;
}

export function isAdminRequest(request) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  const [expires, signature] = token.split(".");
  if (!expires || !signature || Number(expires) < Date.now()) return false;
  const expected = crypto.createHmac("sha256", secret()).update(expires).digest("hex");
  return signature.length === expected.length && crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

export function adminCookie(token) {
  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=28800${process.env.NODE_ENV === "production" ? "; Secure" : ""}`;
}
