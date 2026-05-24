import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { sendTelegramMessage } from "@/lib/telegram";

const OrderSchema = z.object({
  customerName: z.string().optional().default("Гость"),
  phone: z.string().optional().default(""),
  address: z.string().min(1),
  deliveryTime: z.string().min(1),
  paymentMethod: z.enum(["CARD", "SBP", "CASH"]).default("CARD"),
  total: z.number(),
  comment: z.string().optional().default(""),
  items: z
    .array(
      z.object({
        productId: z.string(),
        name: z.string(),
        price: z.number(),
        quantity: z.number(),
      })
    )
    .min(1),
});

export async function POST(req: Request) {
  try {
    const data = OrderSchema.parse(await req.json());

    const order = await prisma.order.create({
      data: {
        customerName: data.customerName,
        phone: data.phone,
        address: data.address,
        deliveryTime: data.deliveryTime,
        paymentMethod: data.paymentMethod,
        total: data.total,
        comment: data.comment,
      }
        
        

    });

    const lines = data.items
      .map(
        (item) =>
          `• ${item.name} × ${item.quantity} — ${
            item.price * item.quantity
          } ₽`
      )
      .join("\n");

    await sendTelegramMessage(
      `<b>Новый заказ City Baker</b>\n` +
        `№ ${order.id}\n\n` +
        `${lines}\n\n` +
        `Клиент: ${data.customerName}\n` +
        `Телефон: ${data.phone}\n` +
        `Адрес: ${data.address}\n` +
        `Время: ${data.deliveryTime}\n` +
        `Оплата: имитация / ${data.paymentMethod}\n` +
        `Итого: ${data.total} ₽`
    );

    return NextResponse.json({
      ok: true,
      orderId: order.id,
    });
  } catch (error) {
    console.error("ORDER_CREATE_ERROR:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Order was not created",
      },
      { status: 400 }
    );
  }
}