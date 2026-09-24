import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import fs from "node:fs/promises";
import path from "node:path";

const videosPath = path.join(process.cwd(), "data/videos.json");
const submissionsPath = path.join(process.cwd(), "data/submissions.json");

async function read(file) {
  try { return JSON.parse(await fs.readFile(file, "utf8")); } catch { return []; }
}

export async function GET(request) {
  if (!isAdminRequest(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const [videos, submissions] = await Promise.all([read(videosPath), read(submissionsPath)]);
  return NextResponse.json({ videos, submissions });
}

export async function PUT(request) {
  if (!isAdminRequest(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  if (!Array.isArray(body.videos)) return NextResponse.json({ error: "videos must be an array" }, { status: 400 });
  await fs.writeFile(videosPath, `${JSON.stringify(body.videos, null, 2)}\n`);
  return NextResponse.json({ ok: true, videos: body.videos });
}
