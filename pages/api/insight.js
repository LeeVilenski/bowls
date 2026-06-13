import { requireUser } from "../../lib/session";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const athleteId = requireUser(req, res);
  if (!athleteId) return;

  const { recentRuns, strengthSummary, strengthCount, runCount } = req.body;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 150,
        system: "You are a direct, data-driven running coach. 2-3 sentences max. Be specific about the actual numbers given. Honest, no fluff.",
        messages: [{
          role: "user",
          content: `My Strava data:
- Total runs: ${runCount}, recent: ${recentRuns}
- Strength sessions ever: ${strengthCount} — ${strengthSummary}

Give me one sharp insight about my strength-to-running ratio and what I should do next.`,
        }],
      }),
    });

    const data = await response.json();
    const insight = data.content?.[0]?.text || "Keep at it.";
    res.status(200).json({ insight });
  } catch (e) {
    res.status(200).json({ insight: "Couldn't load insight right now." });
  }
}
