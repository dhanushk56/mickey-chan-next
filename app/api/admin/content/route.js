import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import fs from "node:fs/promises";
import path from "node:path";

const videosPath = path.join(process.cwd(), "data/videos.json");
const submissionsPath = path.join(process.cwd(), "data/submissions.json");
const formPath = path.join(process.cwd(), "data/form.json");

async function read(file, fallback) {
  try { return JSON.parse(await fs.readFile(file, "utf8")); } catch { return fallback; }
}

export async function GET(request) {
  if (!isAdminRequest(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const [videos, submissions, form] = await Promise.all([
    read(videosPath, []), read(submissionsPath, []), read(formPath, {}),
  ]);
  return NextResponse.json({ videos, submissions, form });
}

export async function PUT(request) {
  if (!isAdminRequest(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  if (!Array.isArray(body.videos) || !body.form || typeof body.form !== "object") {
    return NextResponse.json({ error: "Invalid content payload." }, { status: 400 });
  }
  await Promise.all([
    fs.writeFile(videosPath, `${JSON.stringify(body.videos, null, 2)}\n`),
    fs.writeFile(formPath, `${JSON.stringify(body.form, null, 2)}\n`),
  ]);
  return NextResponse.json({ ok: true, videos: body.videos, form: body.form });
}
