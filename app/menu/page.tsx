import { MenuClient } from "@/components/MenuClient";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Menu() {
  const products = await prisma.product.findMany();

  return (
    <main>
      <section className="bg-coffee text-white py-24">
        <div className="container">
          <p className="eyebrow">Ассортимент пекарни</p>

          <h1 className="section-title mt-6">Меню</h1>

          <p className="max-w-2xl text-white/70 mt-6">
            Фильтруйте каталог, открывайте карточки товаров и собирайте заказ.
            Все фотографии пока заменены фирменными заглушками.
          </p>
        </div>
      </section>

      <MenuClient products={products} />
    </main>
  );
}