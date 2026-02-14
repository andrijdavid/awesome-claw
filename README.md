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

_Star counts updated: 2026-02-14 03:58:40 UTC._

### OpenClaw Forks

- [NanoClaw](https://github.com/qwibitai/nanoclaw) ![GitHub Repo stars](https://img.shields.io/github/stars/qwibitai/nanoclaw?style=flat-square) - ⭐ 8,032 - OpenClaw fork with modernized updates.
- [IronClaw](https://github.com/nearai/ironclaw) ![GitHub Repo stars](https://img.shields.io/github/stars/nearai/ironclaw?style=flat-square) - ⭐ 948 - OpenClaw fork focused on gameplay and engine improvements.
- [OpenClaw-Composio](https://github.com/ComposioHQ/openclaw-composio) - OpenClaw fork with integrated Composio plugin for easy tool authentication
- [nanobot](https://github.com/HKUDS/nanobot) - 🐈 nanobot: The Ultra-Lightweight OpenClaw
- [secure-openclaw](https://github.com/ComposioHQ/secure-openclaw) - A personal 24x7 AI assistant like OpenClaw that runs on your messaging platforms. Send a message on WhatsApp, Telegram, Signal, or iMessage and get responses from Claude with full tool access, persistent memory, scheduled reminders, and integrations with 500+ apps.
- [PicoClaw](https://github.com/sipeed/picoclaw) - PicoClaw is an ultra-lightweight personal AI Assistant inspired by nanobot, refactored from the ground up in Go through a self-bootstrapping process, where the AI agent itself drove the entire architectural migration and code optimization.

### Skills Marketplace

- [awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) ![GitHub Repo stars](https://img.shields.io/github/stars/ComposioHQ/awesome-claude-skills?style=flat-square) - ⭐ 34,636 - Community-curated list of Claude-compatible skills.
- [Awesome OpenClaw Skills](https://github.com/VoltAgent/awesome-openclaw-skills) ![GitHub Repo stars](https://img.shields.io/github/stars/VoltAgent/awesome-openclaw-skills?style=flat-square) - ⭐ 14,693 - The awesome collection of OpenClaw Skills. Formerly known as Moltbot, originally Clawdbot.
- [OpenClaw Skills Library](https://github.com/BankrBot/openclaw-skills) ![GitHub Repo stars](https://img.shields.io/github/stars/BankrBot/openclaw-skills?style=flat-square) - ⭐ 642 - Moltbot skill library for AI agents. Including polymarket, crypto trading, DeFi operations, automation, and more. Open a PR to add skills.

<!-- END: GENERATED_REPO_LIST -->

## How To Add A Repository

1. Edit `data/repos.json` and add a new entry with `name`, `url`, `owner`, `repo`, and `description`.
2. Run `npm run update:stars` to refresh stars and generated markdown sections.
3. Run `npm run check` to validate formatting and awesome-list quality gates.
4. Open a pull request.

## Automation

- Daily star updates: `.github/workflows/update-stars.yml`
- CI checks (markdownlint, prettier, lychee, awesome-bot): `.github/workflows/ci.yml`

## Development

```bash
npm run update:stars
npm run check
npm run docs:build
```
