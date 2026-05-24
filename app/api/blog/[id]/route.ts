import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const data = await prisma.blogPost.update({
      where: {
        id,
      },
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
    console.error("BLOG_UPDATE_ERROR:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Ошибка обновления записи блога",
      },
      { status: 400 }
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.blogPost.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      ok: true,
    });
  } catch (error) {
    console.error("BLOG_DELETE_ERROR:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Ошибка удаления записи блога",
      },
      { status: 400 }
    );
  }
}