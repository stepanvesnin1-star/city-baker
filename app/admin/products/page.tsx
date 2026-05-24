import AdminShell from "@/components/AdminShell";
import AdminProductsClient from "@/components/AdminProductsClient";
import { prisma } from "@/lib/prisma";

export default async function AdminProducts() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <AdminShell title="Товары">
      <AdminProductsClient
        initialProducts={products}
        categories={categories}
      />
    </AdminShell>
  );
}