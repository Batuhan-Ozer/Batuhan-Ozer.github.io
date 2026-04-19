import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE_NAME = "admin_session";

function sign(value: string) {
  const secret = process.env.SESSION_SECRET || "default-secret";
  return crypto.createHmac("sha256", secret).update(value).digest("hex");
}

export function createSessionValue() {
  const value = "authenticated";
  const signature = sign(value);
  return `${value}.${signature}`;
}

export function isValidSession(session: string | undefined) {
  if (!session) return false;

  const [value, signature] = session.split(".");
  if (!value || !signature) return false;

  return sign(value) === signature && value === "authenticated";
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME)?.value;
  return isValidSession(session);
}

export { COOKIE_NAME };