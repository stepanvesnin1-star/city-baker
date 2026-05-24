import AdminShell from "@/components/AdminShell";
import AdminSimpleCrudClient from "@/components/AdminSimpleCrudClient";
import { prisma } from "@/lib/prisma";

export default async function AdminLocations() {
  const items = await prisma.location.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <AdminShell title="Точки продаж">
      <AdminSimpleCrudClient
        endpoint="/api/locations"
        title="Новая точка"
        initialItems={items}
        fields={[
          { name: "title", label: "Название" },
          { name: "address", label: "Адрес" },
          { name: "hours", label: "Часы" },
          { name: "phone", label: "Телефон" },
          { name: "status", label: "Статус" },
          { name: "latitude", label: "Широта" },
          { name: "longitude", label: "Долгота" },
        ]}
      />
    </AdminShell>
  );
}