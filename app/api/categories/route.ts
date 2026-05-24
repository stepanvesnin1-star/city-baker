import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { categories } from "@/lib/data";

export async function GET() {
  try {
    const data = await prisma.category.findMany({
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
      data: categories.map((name, index) => ({
        id: String(index),
        name,
        slug: name.toLowerCase(),
      })),
      demo: true,
    });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const data = await prisma.category.create({
      data: {
        name: body.name,
        slug: body.slug,
      },
    });

    return NextResponse.json({
      ok: true,
      data,
    });
  } catch (error) {
    console.error("CATEGORY_CREATE_ERROR:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Ошибка создания категории",
      },
      { status: 400 }
    );
  }
}