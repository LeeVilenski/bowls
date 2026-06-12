import { getCustomExercises, createStravaActivity } from "../../lib/db";
import { EXERCISE_LIBRARY } from "../../lib/exercises";
import { buildExerciseBlock } from "../../lib/description";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { session, notes } = req.body;
    if (!session?.id || !session?.date) {
      return res.status(400).json({ error: "session required" });
    }

    const customExercises = await getCustomExercises();
    const allExercises = [...EXERCISE_LIBRARY, ...customExercises];

    const block = buildExerciseBlock(notes, allExercises);
    if (!block) {
      return res.status(400).json({ error: "No logged sets to push - add exercises first" });
    }
    const description = [notes?.sessionNotes, block].filter(Boolean).join("\n\n");

    const activity = await createStravaActivity({
      name: session.name,
      sportType: session.sport_type || "Workout",
      startDateLocal: `${session.date}T12:00:00`,
      elapsedTime: Math.max(60, Math.round(session.duration || 0)),
      description,
    });

    res.status(200).json({ activityId: String(activity.id) });
  } catch (e) {
    console.error("push-strava error:", e);
    res.status(500).json({ error: e.message });
  }
}
