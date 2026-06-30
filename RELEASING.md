# Releasing

Short Mat Bowls ships as **two channels on one GitHub Pages site**:

| Channel | URL | Built from | Changes when |
|---------|-----|-----------|--------------|
| **Production** | https://leevilenski.github.io/bowls/ | `main` | you merge to `main` |
| **Beta (test)** | https://leevilenski.github.io/bowls/beta/short-mat-bowls.html | `dev` | you push to `dev` |

`.github/workflows/pages.yml` rebuilds the whole site on every push to either
branch. **Production is always taken from `origin/main`**, so it only changes
when `main` changes — pushing to `dev` can never alter it.

The beta build is patched at deploy time into a *separate* PWA: its service
worker cache is `bowls-beta-v…` and its manifest name is "Short Mat Bowls
(Beta)", so it installs alongside production and never shares a cache.

The splash screen shows the live version (`v1.0.0`, beta adds `· BETA` in
amber), so you can always tell which build you're looking at.

## One-time setup

1. **Settings → Pages → Source = "GitHub Actions"** (not "Deploy from a branch").
2. **Settings → Environments → `github-pages` → "Deployment branches and tags":**
   allow **both `main` and `dev`**.
   Without this, `dev` deploys fail with *"branch dev is not allowed to deploy
   to github-pages"*. This is safe — production content is always built from
   `main` no matter which branch triggered the run.

## Day-to-day (test channel)

```sh
git checkout dev
# ...make changes...
git push                      # → /beta/ redeploys, production untouched
```

Open the beta URL on your phone, **Add to Home Screen** to install "Bowls β"
alongside the production app, and test.

## Cutting a release

```sh
git checkout main && git pull
git merge dev                       # bring tested changes into production
./scripts/bump-version.sh 1.1.0     # updates VERSION + sw.js cache together
git commit -am "Release v1.1.0"
git tag v1.1.0
git push && git push --tags         # → production redeploys at the new version
```

Use [semver](https://semver.org/): patch (`1.0.x`) for fixes, minor (`1.x.0`)
for features, major (`x.0.0`) for breaking changes. The git tag is your
rollback point.

## Rolling back

Safest — revert the bad commit so history stays linear:

```sh
git checkout main
git revert <bad-commit>             # then bump-version + push as a new release
git push
```

Or hard-reset to a known-good tag (rewrites history, use with care):

```sh
git reset --hard v1.0.0
git push --force-with-lease
```
