"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ShoppingBag } from "lucide-react";

export function ProductCard({ p }: { p: any }) {
  const [open, setOpen] = useState(false);

  const image = p.image || p.imageUrl;
  const category = p.category || p.cat || "Без категории";

  return (
    <>
      <motion.article layout className="group">
        <button onClick={() => setOpen(true)} className="w-full text-left">
          <div className="relative h-72 rounded-[34px] placeholder flex items-center justify-center text-7xl text-white shadow-soft group-hover:scale-[1.018] transition duration-300 overflow-hidden">
            {image ? (
              <img src={image} alt={p.name} className="w-full h-full object-cover" />
            ) : (
              <span className="relative z-10 drop-shadow">{p.icon || "🥐"}</span>
            )}
          </div>

          <div className="flex justify-between gap-5 mt-5">
            <div>
              <h3 className="text-xl font-black group-hover:text-orange transition-colors">
                {p.name}
              </h3>
              <p className="text-sm text-muted mt-1">{p.description}</p>
            </div>
            <b className="text-orange whitespace-nowrap">{p.price} ₽</b>
          </div>
        </button>
      </motion.article>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="card bg-cream max-w-2xl w-full p-5 md:p-8 relative"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
            >
              <button
                aria-label="Закрыть"
                onClick={() => setOpen(false)}
                className="absolute top-5 right-5 z-10 rounded-full bg-white/80 p-3"
              >
                <X size={18} />
              </button>

              <div className="h-64 md:h-72 rounded-[28px] placeholder flex items-center justify-center text-8xl text-white overflow-hidden">
                {image ? (
                  <img src={image} alt={p.name} className="w-full h-full object-cover" />
                ) : (
                  p.icon || "🥐"
                )}
              </div>

              <div className="flex justify-between items-start mt-7 gap-5 flex-wrap">
                <div>
                  <p className="eyebrow">{category}</p>
                  <h2 className="text-4xl font-black mt-2">{p.name}</h2>
                  <p className="mt-4 text-muted max-w-lg">{p.description}</p>
                </div>
                <b className="text-3xl text-orange">{p.price} ₽</b>
              </div>

              <div className="mt-8 flex gap-3 flex-wrap">
                <a href={`/order?product=${p.id}`} className="btn btn-primary">
                  <ShoppingBag size={18} /> Добавить в заказ
                </a>
                <button onClick={() => setOpen(false)} className="btn bg-black/5">
                  Закрыть
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}