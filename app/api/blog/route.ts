import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { posts } from "@/lib/data";

export async function GET() {
  try {
    const data = await prisma.blogPost.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      ok: true,
      data,
    });
  } catch {
    return NextResponse.json({
      ok: true,
      data: posts,
      demo: true,
    });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const data = await prisma.blogPost.create({
      data: {
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt || "",
        content: body.content || "",
        category: body.category || "Новости",
        image: body.image || body.imageUrl || null,
        published: body.published === false ? false : true,
      },
    });

    return NextResponse.json({
      ok: true,
      data,
    });
  } catch (error) {
    console.error("BLOG_CREATE_ERROR:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Ошибка создания записи блога",
      },
      { status: 400 }
    );
  }
}