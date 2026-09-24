import fs from "node:fs/promises";
import path from "node:path";

const dataDir = path.join(process.cwd(), "data");
const CACHE_SECONDS = 300;
const YOUTUBE_CHANNEL_ID = "UCvuP1L8V2_9VVOY9eKF1u1gQ";

async function readJson(filename, fallback) {
  try {
    return JSON.parse(await fs.readFile(path.join(dataDir, filename), "utf8"));
  } catch {
    return fallback;
  }
}

function normalizeDate(dateString) {
  if (!dateString) return "Recent";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  const diffMs = Date.now() - date.getTime();
  const days = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
  if (days < 30) return `${Math.max(1, Math.round(days / 7))} week${Math.round(days / 7) === 1 ? "" : "s"} ago`;
  return `${Math.max(1, Math.round(days / 30))} month${Math.round(days / 30) === 1 ? "" : "s"} ago`;
}

function toReadableViews(numericViews) {
  if (!numericViews && numericViews !== 0) return "Views";
  if (numericViews >= 1000000) return `${(numericViews / 1000000).toFixed(numericViews >= 10000000 ? 0 : 1).replace(/\.0$/, "")}M views`;
  if (numericViews >= 1000) return `${(numericViews / 1000).toFixed(numericViews >= 100000 ? 0 : 1).replace(/\.0$/, "")}K views`;
  return `${numericViews} views`;
}

async function fetchChannelVideos() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) return [];

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${YOUTUBE_CHANNEL_ID}&maxResults=20&order=date&type=video&key=${apiKey}`;
  const response = await fetch(url, { next: { revalidate: CACHE_SECONDS } });
  if (!response.ok) return [];
  const data = await response.json();
  if (!Array.isArray(data.items)) return [];

  const videoIds = data.items.map((item) => item.id?.videoId).filter(Boolean);
  if (videoIds.length === 0) return [];

  const statsUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoIds.join(",")}&key=${apiKey}`;
  const statsResponse = await fetch(statsUrl, { next: { revalidate: CACHE_SECONDS } });
  if (!statsResponse.ok) return [];
  const statsData = await statsResponse.json();

  const statsById = new Map((statsData.items || []).map((item) => [item.id, item]));

  return data.items
    .map((item) => {
      const video = statsById.get(item.id?.videoId);
      const rawViews = Number(video?.statistics?.viewCount || 0);
      return {
        id: item.id?.videoId,
        slug: item.id?.videoId,
        title: item.snippet?.title || "Untitled video",
        views: toReadableViews(rawViews),
        date: normalizeDate(item.snippet?.publishedAt),
        publishedAt: item.snippet?.publishedAt,
        thumbnail: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.medium?.url || item.snippet?.thumbnails?.default?.url || "",
        channelTitle: item.snippet?.channelTitle || "MickeyChan",
      };
    })
    .filter((video) => video.id);
}

export async function getVideos() {
  const cached = await readJson("videos.json", []);
  if (Array.isArray(cached) && cached.length > 0) return cached;
  const fresh = await fetchChannelVideos();
  if (fresh.length > 0) {
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(path.join(dataDir, "videos.json"), JSON.stringify(fresh, null, 2));
  }
  return fresh;
}

export async function getSubmissions() {
  return readJson("submissions.json", []);
}
