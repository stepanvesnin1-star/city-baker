import { prisma } from "@/lib/prisma";
import LocationsMapClient from "@/components/LocationsMapClient";

export const dynamic = "force-dynamic";

export default async function Locations() {
  const locations = await prisma.location.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main>
      <section className="city-bg text-white py-28">
        <div className="container">
          <p className="eyebrow">Где купить</p>
          <h1 className="section-title mt-6">Точки продаж</h1>
        </div>
      </section>

      <section className="container py-16 grid lg:grid-cols-[1fr_420px] gap-10">
        <LocationsMapClient points={locations} />

        <aside className="grid gap-5">
          {locations.map((location) => (
            <article className="card p-7" key={location.id}>
              <div className="flex justify-between gap-4">
                <h3 className="text-2xl font-black">{location.title}</h3>

                <span className="bg-orange/10 text-orange rounded-full px-3 py-1 text-xs font-black h-fit">
                  {location.status}
                </span>
              </div>

              <p className="mt-4 text-muted">{location.address}</p>
              <p className="mt-4 font-bold">{location.hours}</p>
              <p className="mt-1">{location.phone}</p>
            </article>
          ))}
        </aside>
      </section>
    </main>
  );
}