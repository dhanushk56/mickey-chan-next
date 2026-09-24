import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

const submissionsPath = path.join(process.cwd(), "data/submissions.json");

export async function POST(request) {
  const body = await request.json();
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const role = typeof body.role === "string" ? body.role.trim() : "Community";
  if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please provide a valid name, email, and message." }, { status: 400 });
  }
  let submissions = [];
  try { submissions = JSON.parse(await fs.readFile(submissionsPath, "utf8")); } catch {}
  submissions.unshift({ id: crypto.randomUUID(), name, email, role, message, createdAt: new Date().toISOString() });
  await fs.writeFile(submissionsPath, `${JSON.stringify(submissions, null, 2)}\n`);
  return NextResponse.json({ ok: true });
}
