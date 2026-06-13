import { deleteCachedActivity } from "../../lib/db";
import { requireUser } from "../../lib/session";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const athleteId = requireUser(req, res);
  if (!athleteId) return;

  try {
    const { activity_id } = req.body;
    if (!activity_id || !/^\d+$/.test(String(activity_id))) {
      return res.status(400).json({ error: "valid numeric activity_id required" });
    }
    await deleteCachedActivity(athleteId, activity_id);
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
