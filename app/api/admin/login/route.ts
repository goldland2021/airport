import { NextResponse } from "next/server";
import {
  adminSessionCookieName,
  adminSessionMaxAge,
  createAdminSessionToken,
  isValidAdminLogin
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const url = new URL(request.url);

  if (!isValidAdminLogin(username, password)) {
    return NextResponse.redirect(new URL("/admin/login?error=1", url), 303);
  }

  const response = NextResponse.redirect(new URL("/admin", url), 303);
  response.cookies.set(adminSessionCookieName, createAdminSessionToken(username), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: adminSessionMaxAge
  });

  return response;
}
