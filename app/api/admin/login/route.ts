import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const form = await req.formData();

  const login = String(form.get("login") || "");
  const password = String(form.get("password") || "");

  if (
    login === process.env.ADMIN_LOGIN &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const res = NextResponse.redirect(new URL("/admin", req.url));

    res.cookies.set("admin", "true", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return res;
  }

  return NextResponse.redirect(new URL("/admin/login?error=1", req.url));
}