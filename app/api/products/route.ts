import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const data = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      ok: true,
      data,
    });
  } catch (error) {
    console.error("PRODUCT_GET_ERROR:", error);

    return NextResponse.json(
      {
        ok: false,
        data: [],
      },
      { status: 400 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const data = await prisma.product.create({
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
    console.error("PRODUCT_CREATE_ERROR:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Не удалось создать товар",
      },
      { status: 400 }
    );
  }
}