import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { locations } from "@/lib/data";

export async function GET() {
  try {
    const data = await prisma.location.findMany({
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
      data: locations,
      demo: true,
    });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const data = await prisma.location.create({
      data: {
        title: body.title || "Новая точка",
        address: body.address || "",
        hours: body.hours || "",
        phone: body.phone || "",
        status: body.status || "Свободно",
        latitude: body.latitude ? Number(body.latitude) : null,
        longitude: body.longitude ? Number(body.longitude) : null,
      },
    });

    return NextResponse.json({
      ok: true,
      data,
    });
  } catch (error) {
    console.error("LOCATION_CREATE_ERROR:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Ошибка создания точки",
      },
      { status: 400 }
    );
  }
}