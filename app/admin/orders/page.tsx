import AdminShell from "@/components/AdminShell";
import AdminOrdersClient from "@/components/AdminOrdersClient";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminOrders() {
  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const normalizedOrders = orders.map((order) => ({
    ...order,
    deliveryTime: order.deliveryTime || "",
    comment: order.comment || "",
    createdAt: order.createdAt.toISOString(),
    updatedAt: order.updatedAt.toISOString(),
  }));

  return (
    <AdminShell title="Заказы">
      <AdminOrdersClient initialOrders={normalizedOrders} />
    </AdminShell>
  );
}