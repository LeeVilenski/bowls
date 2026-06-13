import { upsertUser } from "../../../lib/db";
import { sessionCookie } from "../../../lib/session";

export default async function handler(req, res) {
  const { code, error } = req.query;

  if (error || !code) {
    return res.redirect("/?error=strava_denied");
  }

  try {
    const tokenRes = await fetch("https://www.strava.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: process.env.STRAVA_CLIENT_ID,
        client_secret: process.env.STRAVA_CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenRes.ok) {
      const err = await tokenRes.text();
      return res.redirect(`/?error=token_exchange_failed`);
    }

    const data = await tokenRes.json();

    await upsertUser({
      athlete_id: data.athlete.id,
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_at: data.expires_at,
      first_name: data.athlete.firstname,
      last_name: data.athlete.lastname,
      profile_url: data.athlete.profile,
    });

    res.setHeader("Set-Cookie", sessionCookie(data.athlete.id));
    res.redirect("/?connected=true");
  } catch (e) {
    res.redirect(`/?error=server_error`);
  }
}
