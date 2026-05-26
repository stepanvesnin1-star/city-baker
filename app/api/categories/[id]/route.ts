import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await prisma.category.delete({
      where: { id },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("CATEGORY_DELETE_ERROR:", error);

    return NextResponse.json(
      { error: "Не удалось удалить категорию" },
      { status: 400 }
    );
  }
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();

    const category = await prisma.category.update({
      where: { id },
      data: {
        name: String(body.name || ""),
        slug: String(body.slug || ""),
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("CATEGORY_UPDATE_ERROR:", error);

    return NextResponse.json(
      { error: "Не удалось изменить категорию" },
      { status: 400 }
    );
  }
}