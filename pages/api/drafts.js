import { getWorkoutDrafts, saveWorkoutDraft, deleteWorkoutDraft } from "../../lib/db";
import { requireUser } from "../../lib/session";

export default async function handler(req, res) {
  const athleteId = requireUser(req, res);
  if (!athleteId) return;

  if (req.method === "GET") {
    try {
      const drafts = await getWorkoutDrafts(athleteId);
      res.status(200).json({ drafts });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else if (req.method === "POST") {
    try {
      const { draft } = req.body;
      if (!draft?.id || !draft?.title) {
        return res.status(400).json({ error: "draft.id and draft.title required" });
      }
      await saveWorkoutDraft(athleteId, draft);
      res.status(200).json({ ok: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.body;
      if (!id) return res.status(400).json({ error: "id required" });
      await deleteWorkoutDraft(athleteId, id);
      res.status(200).json({ ok: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
