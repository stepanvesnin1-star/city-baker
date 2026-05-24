import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const status = body.status;

    if (!status) {
      return NextResponse.json(
        { ok: false, error: "Status is required" },
        { status: 400 }
      );
    }

    const order = await prisma.order.update({
      where: {
        id: params.id,
      },
      data: {
        status,
      },
    });

    return NextResponse.json({
      ok: true,
      order,
    });
  } catch (error) {
    console.error("ORDER_STATUS_UPDATE_ERROR:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Order status was not updated",
      },
      { status: 400 }
    );
  }
}