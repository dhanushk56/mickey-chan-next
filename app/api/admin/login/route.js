import { NextResponse } from "next/server";
import { createAdminToken, adminCookie } from "@/lib/admin-auth";

export async function POST(request) {
  const { password } = await request.json();
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "ADMIN_PASSWORD is not configured." }, { status: 500 });
  }
  if (typeof password !== "string" || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }
  const response = NextResponse.json({ ok: true });
  response.headers.set("Set-Cookie", adminCookie(createAdminToken()));
  return response;
}
