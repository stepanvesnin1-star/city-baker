import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();

    const order = await prisma.order.update({
      where: { id },
      data: {
        status: body.status,
      },
    });

    return NextResponse.json({
      ok: true,
      order,
    });
  } catch (error) {
    console.error("ORDER_STATUS_UPDATE_ERROR:", error);

    return NextResponse.json(
      { ok: false, error: "Order status was not updated" },
      { status: 400 }
    );
  }
}