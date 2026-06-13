import { getStoredTokens } from "../../../lib/db";
import { getSessionAthleteId } from "../../../lib/session";

export default async function handler(req, res) {
  try {
    const athleteId = getSessionAthleteId(req);
    if (!athleteId) {
      return res.status(200).json({ connected: false });
    }

    const user = await getStoredTokens(athleteId);
    if (!user) {
      return res.status(200).json({ connected: false });
    }

    res.status(200).json({
      connected: true,
      athleteId: String(user.athlete_id),
      firstName: user.first_name,
      profileUrl: user.profile_url,
    });
  } catch (e) {
    res.status(500).json({ connected: false, error: e.message });
  }
}
