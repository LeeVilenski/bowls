import {
  getCustomExercises, saveCustomExercise, deleteCustomExercise,
  getCustomMuscleGroups, saveCustomMuscleGroup, deleteCustomMuscleGroup,
} from "../../lib/db";
import { requireUser } from "../../lib/session";

export default async function handler(req, res) {
  const athleteId = requireUser(req, res);
  if (!athleteId) return;

  const { type } = req.query; // "exercises" or "muscles"

  if (req.method === "GET") {
    try {
      const exercises = await getCustomExercises(athleteId);
      const muscles = await getCustomMuscleGroups(athleteId);
      res.status(200).json({ exercises, muscles });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }

  } else if (req.method === "POST") {
    try {
      const { kind, data } = req.body;
      if (kind === "exercise") await saveCustomExercise(athleteId, data);
      else if (kind === "muscle") await saveCustomMuscleGroup(athleteId, data);
      else return res.status(400).json({ error: "kind must be exercise or muscle" });
      res.status(200).json({ ok: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }

  } else if (req.method === "DELETE") {
    try {
      const { kind, id } = req.body;
      if (kind === "exercise") await deleteCustomExercise(athleteId, id);
      else if (kind === "muscle") await deleteCustomMuscleGroup(athleteId, id);
      else return res.status(400).json({ error: "kind must be exercise or muscle" });
      res.status(200).json({ ok: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }

  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
