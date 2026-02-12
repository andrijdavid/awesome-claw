#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const DATA_FILE = path.join(rootDir, "data", "repos.json");
const README_FILE = path.join(rootDir, "README.md");
const DOCS_INDEX_FILE = path.join(rootDir, "docs", "index.md");

const START_MARKER = "<!-- BEGIN: GENERATED_REPO_LIST -->";
const END_MARKER = "<!-- END: GENERATED_REPO_LIST -->";

function hasRepoCoordinates(entry) {
  return Boolean(entry.owner && entry.repo);
}

function formatStars(stars) {
  if (typeof stars !== "number") {
    return "N/A";
  }

  return stars.toLocaleString("en-US");
}

async function fetchStars(entry, headers) {
  const endpoint = `https://api.github.com/repos/${entry.owner}/${entry.repo}`;

  try {
    const response = await fetch(endpoint, { headers });

    if (!response.ok) {
      const body = await response.text();
      console.warn(
        `Warning: failed to fetch ${entry.owner}/${entry.repo} (${response.status}) ${body.slice(0, 120)}`,
      );
      return { stars: null, ok: false };
    }

    const payload = await response.json();
    return { stars: payload.stargazers_count ?? null, ok: true };
  } catch (error) {
    console.warn(`Warning: request failed for ${entry.owner}/${entry.repo}: ${error.message}`);
    return { stars: null, ok: false };
  }
}

function renderEntry(entry) {
  if (!entry.url || entry.url.startsWith("TODO:")) {
    return `- ${entry.name} - ${entry.url} (${entry.description})`;
  }

  const badge = hasRepoCoordinates(entry)
    ? ` ![GitHub Repo stars](https://img.shields.io/github/stars/${entry.owner}/${entry.repo}?style=flat-square)`
    : "";
  const stars = hasRepoCoordinates(entry) ? ` - ⭐ ${formatStars(entry.stars)}` : "";
  const description = entry.description ? ` - ${entry.description}` : "";
  return `- [${entry.name}](${entry.url})${badge}${stars}${description}`;
}

function renderGeneratedBlock(data, updatedAtIso) {
  const updatedLine = `_Star counts updated: ${updatedAtIso} UTC._`;

  const forks = data.openclawForks.map(renderEntry).join("\n");
  const marketplace = data.skillsMarketplace.map(renderEntry).join("\n");

  return [
    updatedLine,
    "",
    "### OpenClaw Forks",
    "",
    forks,
    "",
    "### Skills Marketplace",
    "",
    marketplace,
  ].join("\n");
}

function replaceGeneratedSection(markdown, generatedBlock) {
  const start = markdown.indexOf(START_MARKER);
  const end = markdown.indexOf(END_MARKER);

  if (start === -1 || end === -1 || end <= start) {
    throw new Error(`Could not find markers ${START_MARKER}/${END_MARKER}`);
  }

  const before = markdown.slice(0, start + START_MARKER.length);
  const after = markdown.slice(end);
  return `${before}\n\n${generatedBlock}\n\n${after}`;
}

async function main() {
  const token = process.env.GITHUB_TOKEN || "";

  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "awesome-claw-stars-updater",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const rawData = await readFile(DATA_FILE, "utf8");
  const repoData = JSON.parse(rawData);
  let failedFetches = 0;

  const sections = ["openclawForks", "skillsMarketplace"];

  for (const section of sections) {
    const entries = repoData[section];

    if (!Array.isArray(entries)) {
      throw new Error(`Expected ${section} to be an array in ${DATA_FILE}`);
    }

    for (const entry of entries) {
      if (!hasRepoCoordinates(entry)) {
        entry.stars = null;
        continue;
      }

      const result = await fetchStars(entry, headers);
      entry.stars = result.stars;

      if (!result.ok) {
        failedFetches += 1;
      }
    }
  }

  if (token && failedFetches > 0) {
    throw new Error(
      `Failed to fetch stars for ${failedFetches} repositories while GITHUB_TOKEN is set.`,
    );
  }

  const updatedAtIso = new Date().toISOString().replace("T", " ").replace(/\.\d{3}Z$/, "");
  const generatedBlock = renderGeneratedBlock(repoData, updatedAtIso);

  const readme = await readFile(README_FILE, "utf8");
  const docsIndex = await readFile(DOCS_INDEX_FILE, "utf8");

  const updatedReadme = replaceGeneratedSection(readme, generatedBlock);
  const updatedDocsIndex = replaceGeneratedSection(docsIndex, generatedBlock);

  await writeFile(README_FILE, updatedReadme, "utf8");
  await writeFile(DOCS_INDEX_FILE, updatedDocsIndex, "utf8");

  console.log(`Updated ${README_FILE}`);
  console.log(`Updated ${DOCS_INDEX_FILE}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
