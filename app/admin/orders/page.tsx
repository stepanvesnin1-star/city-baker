import AdminShell from "@/components/AdminShell";
import AdminOrdersClient from "@/components/AdminOrdersClient";
import { prisma } from "@/lib/prisma";

export default async function AdminOrders() {
  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <AdminShell title="Заказы">
      <AdminOrdersClient initialOrders={orders} />
    </AdminShell>
  );
}