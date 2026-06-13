import crypto from "crypto";

const SECRET = process.env.SESSION_SECRET;

function sign(athleteId) {
  return crypto.createHmac("sha256", SECRET).update(String(athleteId)).digest("hex");
}

export function sessionCookie(athleteId) {
  const sig = sign(athleteId);
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `session=${athleteId}.${sig}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 365}${secure}`;
}

export function clearSessionCookie() {
  return `session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

export function getSessionAthleteId(req) {
  const raw = req.cookies?.session;
  if (!raw) return null;
  const [athleteId, sig] = raw.split(".");
  if (!athleteId || !sig) return null;

  const expected = sign(athleteId);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

  return Number(athleteId);
}

// Used by every data API route. Writes 401 and returns null if no session.
export function requireUser(req, res) {
  const athleteId = getSessionAthleteId(req);
  if (!athleteId) {
    res.status(401).json({ error: "Not signed in" });
    return null;
  }
  return athleteId;
}
