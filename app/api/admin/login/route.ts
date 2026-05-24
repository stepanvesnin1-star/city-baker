import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const form = await req.formData();

  const email = String(form.get("email") || "");
  const password = String(form.get("password") || "");

  const adminEmail =
    process.env.ADMIN_EMAIL || "admin@citybaker.ru";

  const adminPassword =
    process.env.ADMIN_PASSWORD || "123456";

  if (email !== adminEmail || password !== adminPassword) {
    return NextResponse.redirect(
      new URL("/admin/login?error=1", req.url)
    );
  }

  const response = NextResponse.redirect(
    new URL("/admin", req.url)
  );

response.cookies.set("city_baker_admin", "authorized", {
  httpOnly: true,
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
});

  return response;
}