import { getValidAccessToken, backfillBestEfforts, normalizeEffortName, getTopBestEfforts, countUnsyncedRuns } from "../../lib/db";
import { requireUser } from "../../lib/session";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  const athleteId = requireUser(req, res);
  if (!athleteId) return;

  try {
    const accessToken = await getValidAccessToken(athleteId);
    if (!accessToken) return res.status(401).json({ error: "Not authenticated" });

    await backfillBestEfforts(athleteId, 3);

    const { name, limit } = req.query;
    const efforts = name
      ? await getTopBestEfforts(athleteId, normalizeEffortName(name), limit ? parseInt(limit) : 15)
      : [];
    const remaining = await countUnsyncedRuns(athleteId);

    res.status(200).json({ efforts, remaining });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
