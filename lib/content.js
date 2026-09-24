import fs from "node:fs/promises";
import path from "node:path";

const dataDir = path.join(process.cwd(), "data");

async function readJson(filename, fallback) {
  try {
    return JSON.parse(await fs.readFile(path.join(dataDir, filename), "utf8"));
  } catch {
    return fallback;
  }
}

export function getVideos() {
  return readJson("videos.json", []);
}

export function getSubmissions() {
  return readJson("submissions.json", []);
}
