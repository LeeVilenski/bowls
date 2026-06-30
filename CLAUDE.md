# Short Mat Bowls — Claude Code Notes

## Project

Single-file HTML5 canvas game simulating short mat bowls, built to ESMBA Laws of the Game (2020, amended 2023). Deployed as a PWA to GitHub Pages.

**Live URL:** https://leevilenski.github.io/bowls/short-mat-bowls.html  
**GitHub remote:** `bowls` → https://github.com/LeeVilenski/bowls

## Files

| File | Purpose |
|------|---------|
| `short-mat-bowls.html` | Entire game — canvas, physics, AI, drawing |
| `manifest.json` | PWA manifest (standalone display, portrait lock) |
| `sw.js` | Service worker — caches files for offline play |
| `icon.svg` | App icon (mat + bowls + jack) |

## Game rules (ESMBA Laws)

- **Mat:** 13000mm × 1830mm playing surface (canvas: 440×840px internal)
- **Centre block:** sits at physical centre, hitting it kills the bowl
- **Ditch:** 300mm from each fender — bowl stopping here is dead
- **Dead line:** 3045mm from each fender — bowl must *pass* this to be live
- **Jack zone:** 1215–2130mm from the **far** fender (the vertical jack line mark)
- **Bowls per player:** 4, **Ends:** 6
- The area between the two dead lines is the live playing area — the jack lives here

## Key constants (short-mat-bowls.html)

```js
const L = {
  DITCH:     0.023,  // 300mm  — ditch line from each fender
  DEAD:      0.234,  // 3045mm — minimum bowl travel (dead line)
  JACK_N:    0.093,  // 1215mm — jack line near tip (from far fender)
  JACK_F:    0.164,  // 2130mm — jack line far tip (from far fender)
  DELIV_LEN: 0.105,  // 1370mm — delivery bracket line length
  MAT_LEN:   0.047,  // 610mm  — delivery mat length
};

const RB = 13;        // bowl radius (mat px)
const RJ = 7;         // jack radius (mat px)
const JACK_MASS = 3.0; // jack resists movement (bowl mass = 1)
const FRICTION  = 0.9865;
const BIAS_K    = 0.018;
const MAX_SPD   = 22;
```

## Perspective projection

The mat renders as a trapezoid — wide at the near/delivery end, narrow at the far end. All physics run in flat mat coordinates (MAT = {x:70, y:40, w:300, h:760}); only drawing is projected.

```js
const P = { cx:220, nHW:175, fHW:50, nY:812, fY:80, gamma:1.5 };

m2s(mx, my)  // mat coords → screen coords
s2m(sx, sy)  // screen coords → mat coords (inverse, used for mouse/touch input)
perspR(my, r) // scale a radius by depth
```

`delivDir` is always `1` (delivery from bottom) — the mat is symmetric so direction never flips.

## Physics notes

- Bias curve: lateral force proportional to speed (`BIAS_K * bm * spd`), where `bm = biasMultLeft/Right * biasMult` (surface bend × bowl bias)
- Bowl–bowl collision: equal mass (restitution 0.75)
- Bowl–jack collision: mass-weighted (`JACK_MASS = 3.0`) so jack moves little when struck
- Dead bowl conditions: too short (didn't reach near dead line), in near ditch zone, or rolled into far ditch zone
- AI: brute-force shot search over ±55° × 5 power levels using `simPath()`

## PWA install

**Android:** Chrome menu → Add to Home screen  
**iPhone:** Safari Share → Add to Home Screen  

After install, runs full-screen (standalone) with no browser chrome, cached for offline use.

## Branching & release channels

Two channels are served from one GitHub Pages site (see `RELEASING.md`):

| Branch | Channel | URL | Role |
|--------|---------|-----|------|
| `dev`  | **beta / test** | `…/bowls/beta/short-mat-bowls.html` | default working branch |
| `main` | **production**  | `…/bowls/` | release-only (protected) |

**Default working branch is `dev`.** Do all work on `dev` (or short branches
that merge into `dev`). Merging into `dev` is what puts a change on the beta
URL — `dev` is the sandbox, so getting changes in is unguarded. Production is
never touched.

**Test on the beta URL, iterating on `dev` until it works.** Confirmation
happens on beta — which is *why* a change must reach `dev` before it can be
called "working". A broken `dev` only affects beta; fix it forward.

**Never put changes on `main` except a deliberate release the user asks for.**
`main` is protected, so a release goes through a PR:
1. On `dev`, run `./scripts/bump-version.sh X.Y.Z` (bumps the splash `VERSION`
   and the `sw.js` cache name together) and commit.
2. Open a PR from `dev` into `main` and merge it → production redeploys.
3. Tag the release: `git tag vX.Y.Z && git push --tags`.

## Workflow
- For a substantial bug/feature, open a GitHub issue to track it (optional for
  small tweaks).
- Make the change on `dev`, or on a short branch opened as a PR **into `dev`**.
- Once it's on `dev`, test it on the beta URL and iterate until confirmed.
- Release to production only when the user explicitly asks (steps above).

