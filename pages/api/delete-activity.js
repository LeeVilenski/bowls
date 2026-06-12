import { deleteCachedActivity } from "../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    const { activity_id } = req.body;
    if (!activity_id || !/^\d+$/.test(String(activity_id))) {
      return res.status(400).json({ error: "valid numeric activity_id required" });
    }
    await deleteCachedActivity(activity_id);
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
