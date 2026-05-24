import AdminShell from "@/components/AdminShell";
import AdminSimpleCrudClient from "@/components/AdminSimpleCrudClient";
import { prisma } from "@/lib/prisma";

export default async function AdminCategories() {
  const items = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <AdminShell title="Категории">
      <AdminSimpleCrudClient
        endpoint="/api/categories"
        title="Новая категория"
        initialItems={items}
        fields={[
          { name: "name", label: "Название" },
          { name: "slug", label: "Slug" },
        ]}
      />
    </AdminShell>
  );
}