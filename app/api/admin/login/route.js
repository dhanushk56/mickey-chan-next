import { NextResponse } from "next/server";
import { createAdminToken, adminCookie } from "@/lib/admin-auth";

const DEFAULT_ADMIN_PASSWORD = "admin123";

export async function POST(request) {
  const { password } = await request.json();
  const expectedPassword = process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;

  if (typeof password !== "string" || password !== expectedPassword) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.headers.set("Set-Cookie", adminCookie(createAdminToken()));
  return response;
}
