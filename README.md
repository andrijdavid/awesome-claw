# Awesome Claw [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

A curated awesome list for OpenClaw forks and a skills marketplace for toolchains around AI coding assistants.

## Contents

- [Catalog](#catalog)
- [How To Add A Repository](#how-to-add-a-repository)
- [Automation](#automation)
- [Cloudflare Pages Deployment](#cloudflare-pages-deployment)
- [Development](#development)

## Catalog

<!-- BEGIN: GENERATED_REPO_LIST -->

_Star counts updated: 2026-02-12 18:26:10 UTC._

### OpenClaw Forks
- [NanoClaw](https://github.com/qwibitai/nanoclaw) ![GitHub Repo stars](https://img.shields.io/github/stars/qwibitai/nanoclaw?style=flat-square) - ⭐ N/A - OpenClaw fork with modernized updates.
- [IronClaw](https://github.com/nearai/ironclaw) ![GitHub Repo stars](https://img.shields.io/github/stars/nearai/ironclaw?style=flat-square) - ⭐ N/A - OpenClaw fork focused on gameplay and engine improvements.
- TODO: Add another OpenClaw fork - TODO: fill repo URL (Placeholder entry. Add owner/repo fields for automatic stars.)

### Skills Marketplace
- [awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) ![GitHub Repo stars](https://img.shields.io/github/stars/ComposioHQ/awesome-claude-skills?style=flat-square) - ⭐ N/A - Community-curated list of Claude-compatible skills.
- TODO: Add a skills marketplace repository - TODO: fill repo URL (Placeholder entry. Add owner/repo fields for automatic stars.)

<!-- END: GENERATED_REPO_LIST -->

## How To Add A Repository

1. Edit `data/repos.json` and add a new entry with `name`, `url`, `owner`, `repo`, and `description`.
2. Run `npm run update:stars` to refresh stars and generated markdown sections.
3. Run `npm run check` to validate formatting and awesome-list quality gates.
4. Open a pull request.

## Automation

- Daily star updates: `.github/workflows/update-stars.yml`
- CI checks (markdownlint, prettier, lychee, awesome-bot): `.github/workflows/ci.yml`
- Docs build and Cloudflare Pages deploy: `.github/workflows/deploy-cloudflare-pages.yml`

## Cloudflare Pages Deployment

Set these repository secrets before enabling deploys:

- `CLOUDFLARE_API_TOKEN`: Cloudflare API token with Pages edit permissions.
- `CLOUDFLARE_ACCOUNT_ID`: Cloudflare account identifier.
- `CLOUDFLARE_PROJECT_NAME`: Target Cloudflare Pages project name.

Deployment runs on pushes to `main` and via manual workflow dispatch.

## Development

```bash
npm run update:stars
npm run check
npm run docs:build
```
