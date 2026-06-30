# Releasing

Short Mat Bowls ships as **two channels from one GitHub Pages site**:

| Channel | URL | Built from | Changes when |
|---------|-----|-----------|--------------|
| **Production** | https://leevilenski.github.io/bowls/ | `main` | a release PR merges into `main` |
| **Beta (test)** | https://leevilenski.github.io/bowls/beta/short-mat-bowls.html | `dev` | anything lands on `dev` |

`.github/workflows/pages.yml` rebuilds the whole site on every push to either
branch. **Production is always taken from `origin/main`**, so it only changes
when `main` changes — work on `dev` can never alter it.

The beta build is patched at deploy time into a *separate* PWA: its service
worker cache is `bowls-beta-v…` and its manifest name is "Short Mat Bowls
(Beta)", so it installs alongside production and never shares a cache.

The splash screen shows the live version (`v1.0.0`; beta appends a build stamp
and `· BETA` in amber, e.g. `v1.0.0+42 · BETA`), so you can always tell which
build you're looking at. The build stamp is an incrementing number — the
commit count on `dev` at deploy time — the deploy workflow rewrites it into
the beta build on every push, so each push to `dev` bumps a number you can
read at a glance, even between version bumps.

## Design principles

- **`dev` is a sandbox.** Break it freely; only beta is affected. Fix forward.
- **`main` is production and protected.** It changes only through a reviewed,
  revertible release PR — never a direct push.
- **Everything is reversible.** Every release is a tagged commit reached via a
  PR, so any prior state can be restored with another PR. No step here rewrites
  history or is destructive.

## One-time setup

1. **Settings → Pages → Source = "GitHub Actions"** (not "Deploy from a branch").
2. **Settings → Environments → `github-pages` → "Deployment branches and tags":**
   allow **both `main` and `dev`** (the `dev` rule must be lowercase to match
   the branch). Without this, `dev` deploys fail with *"branch dev is not
   allowed to deploy to github-pages"*. Safe, because production content is
   always built from `main` regardless of which branch triggered the run.
3. **Settings → General → Default branch:** set to **`dev`**, so new work
   starts on the test channel by default.
4. **Settings → Branches → protect `main`:** "Require a pull request before
   merging" (0 required approvals is fine for solo). Optionally tick "Do not
   allow bypassing the above settings" for a hard stop against accidental
   direct pushes to production.

## Day-to-day (test channel)

```sh
git switch dev
git pull
# ...make changes...
git commit -am "Try a new bias curve"
git push                      # → /beta/ redeploys in ~1 min; production untouched
```

Open the beta URL on your phone (**Add to Home Screen** to install "Bowls β"
alongside production) and test. Iterate on `dev` until it works — a broken
`dev` only ever affects beta, never the live app.

## Cutting a release

Release **only when the tested `dev` build is confirmed good.** Because `main`
is protected, a release goes through a PR — reviewable and revertible.

```sh
# 1. Bump the version on dev (keeps dev and main in lockstep)
git switch dev && git pull
./scripts/bump-version.sh 1.1.0     # updates splash VERSION + sw.js cache name
git commit -am "Release v1.1.0"
git push
```

```
# 2. Open and merge the release PR
#    GitHub → Pull requests → New → base: main  ←  compare: dev → merge
#    Production redeploys at v1.1.0 once it merges.
```

```sh
# 3. Tag the release commit so the version is a recoverable point
git switch main && git pull
git tag v1.1.0
git push --tags
```

Use [semver](https://semver.org/): patch (`1.0.x`) for fixes, minor (`1.x.0`)
for features, major (`x.0.0`) for breaking changes.

## Rolling back

Every release is tagged, so the last good state is always recoverable. Roll
back the same way you release — through a PR, so it stays reviewed and leaves a
clear history:

```sh
# Restore the known-good app files from the last good tag onto a branch
git switch -c rollback-to-v1.0.0 main
git checkout v1.0.0 -- short-mat-bowls.html sw.js
git commit -am "Roll back to v1.0.0"
git push -u origin rollback-to-v1.0.0
# Open a PR from rollback-to-v1.0.0 into main and merge → production reverts.
```

This needs no force-push and works even with `main` fully protected. It only
touches the two versioned files, so your docs and workflow stay current.
