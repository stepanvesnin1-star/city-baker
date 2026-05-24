import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const data = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description || "",
        price: Number(body.price),
        image: body.image || body.imageUrl || null,
        category: body.category || body.categoryId || "Без категории",
      },
    });

    return NextResponse.json({
      ok: true,
      data,
    });
  } catch (error) {
    console.error("PRODUCT_UPDATE_ERROR:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Ошибка обновления товара",
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

    await prisma.product.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      ok: true,
    });
  } catch (error) {
    console.error("PRODUCT_DELETE_ERROR:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Ошибка удаления товара",
      },
      { status: 400 }
    );
  }
}