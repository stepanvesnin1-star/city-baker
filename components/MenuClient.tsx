"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProductCard } from "@/components/ProductCard";

type Product = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  price: number;
  image?: string | null;
  imageUrl?: string | null;
  category?: string | null;
};

export function MenuClient({ products }: { products: Product[] }) {
  const categories = useMemo(() => {
    const uniqueCategories = products
      .map((product) => product.category || "Без категории")
      .filter(Boolean);

    return ["Все", ...Array.from(new Set(uniqueCategories))];
  }, [products]);

  const [cat, setCat] = useState("Все");

  const filtered = useMemo(() => {
    if (cat === "Все") return products;

    return products.filter(
      (product) => (product.category || "Без категории") === cat
    );
  }, [cat, products]);

  return (
    <section className="container py-16">
      <div className="flex gap-3 mb-14 flex-wrap sticky top-[76px] z-20 bg-cream/90 backdrop-blur-xl py-4 -mx-4 px-4 rounded-b-[28px]">
        {categories.map((category) => (
          <button
            onClick={() => setCat(category)}
            className={`btn ${cat === category ? "btn-primary" : "bg-black/5"}`}
            key={category}
          >
            {category}
          </button>
        ))}
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filtered.map((product) => (
            <ProductCard p={product} key={product.id} />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}