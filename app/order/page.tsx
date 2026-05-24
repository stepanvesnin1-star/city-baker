import OrderClient from "@/components/OrderClient";
import { prisma } from "@/lib/prisma";

export default async function OrderPage() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return <OrderClient products={products} />;
}