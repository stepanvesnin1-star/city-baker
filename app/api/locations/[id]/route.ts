import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const data = await prisma.location.update({
      where: {
        id,
      },
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
    console.error("LOCATION_UPDATE_ERROR:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Ошибка обновления точки",
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

    await prisma.location.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      ok: true,
    });
  } catch (error) {
    console.error("LOCATION_DELETE_ERROR:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Ошибка удаления точки",
      },
      { status: 400 }
    );
  }
}