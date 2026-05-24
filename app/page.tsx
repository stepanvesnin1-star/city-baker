import Link from "next/link";
import { ArrowRight, Clock, MapPin, Sparkles } from "lucide-react";

import { products, stats, posts } from "@/lib/data";
import { Reveal } from "@/components/Reveal";

export default function Home() {
  return (
    <main>
      <section className="city-bg min-h-[820px] text-white flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bottom-10 marquee opacity-80">
          <span>bread coffee croissant morning&nbsp;</span>
          <span>bread coffee croissant morning&nbsp;</span>
        </div>

        <div className="container text-center relative z-10">
          <Reveal>
            <p className="eyebrow">Москва — свежая выпечка с 6:00</p>

            <h1 className="text-[56px] md:text-[112px] leading-[.86] font-black mt-6 tracking-[-0.08em]">
              СВЕЖАЯ
              <br />
              <span className="text-orange">ВЫПЕЧКА</span>
              <br />
              В РИТМЕ ГОРОДА
            </h1>

            <p className="font-serif italic text-2xl mt-8 text-white/80">
              Каждое утро — как только что из печи
            </p>

            <div className="mt-10 flex justify-center gap-4 flex-wrap">
              <Link className="btn btn-primary" href="/menu">
                Меню <ArrowRight size={18} />
              </Link>

              <Link
                className="btn border border-white/30 text-white hover:bg-white/10"
                href="/locations"
              >
                Где купить
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 soft-grid">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-5 mb-20">
            {stats.map((s, i) => (
              <Reveal delay={i * 0.08} key={s.label}>
                <div className="card p-8 text-center hover:-translate-y-1 transition">
                  <p className="text-5xl font-black text-orange">{s.value}</p>
                  <p className="mt-3 text-muted uppercase tracking-wider text-xs font-black">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <Reveal>
              <div>
                <p className="eyebrow">О НАС</p>

                <h2 className="section-title mt-4">
                  Городская пекарня нового поколения
                </h2>

                <p className="mt-6 text-lg text-muted leading-8">
                  «Сити Бэйкер» — это ремесленная пекарня, объединяющая
                  современные технологии, натуральные ингредиенты и атмосферу
                  европейских bakery.
                </p>

                <div className="mt-10 grid gap-4">
                  <div className="flex gap-4 items-center">
                    <Clock className="text-orange" />
                    <span>Выпечка ежедневно с 6:00</span>
                  </div>

                  <div className="flex gap-4 items-center">
                    <MapPin className="text-orange" />
                    <span>Доставка по Москве</span>
                  </div>

                  <div className="flex gap-4 items-center">
                    <Sparkles className="text-orange" />
                    <span>Только свежие ингредиенты</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="card overflow-hidden">
                <div className="aspect-[4/3] bg-neutral-200 flex items-center justify-center text-neutral-500 text-xl">
                  Фото пекарни
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container">
          <div className="flex items-end justify-between mb-14 flex-wrap gap-6">
            <div>
              <p className="eyebrow">МЕНЮ</p>
              <h2 className="section-title mt-4">Популярные позиции</h2>
            </div>

            <Link className="btn btn-primary" href="/menu">
              Всё меню
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 6).map((p, i) => (
              <Reveal key={p.id} delay={i * 0.06}>
                <div className="card overflow-hidden group">
                  <div className="aspect-square bg-neutral-200 flex items-center justify-center text-neutral-500">
                    Фото товара
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <p className="text-sm uppercase tracking-wider text-muted">
                          {p.category}
                        </p>

                        <h3 className="text-2xl font-black mt-2">{p.name}</h3>
                      </div>

                      <span className="text-orange font-black text-xl">
                        {p.price} ₽
                      </span>
                    </div>

                    <p className="mt-4 text-muted leading-7">{p.description}</p>

                    <button className="btn btn-primary mt-6 w-full">
                      Добавить
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 soft-grid">
        <div className="container">
          <div className="flex items-end justify-between mb-14 flex-wrap gap-6">
            <div>
              <p className="eyebrow">БЛОГ</p>
              <h2 className="section-title mt-4">Истории из пекарни</h2>
            </div>

            <Link className="btn btn-primary" href="/blog">
              Читать блог
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <Reveal key={`${post.slug}-${i}`} delay={i * 0.08}>
                <article className="card overflow-hidden group">
                  <div className="aspect-[4/3] bg-neutral-200 flex items-center justify-center text-neutral-500">
                    Фото статьи
                  </div>

                  <div className="p-6">
                    <p className="text-sm uppercase tracking-wider text-orange font-bold">
                      {post.category}
                    </p>

                    <h3 className="text-2xl font-black mt-3 leading-tight">
                      {post.title}
                    </h3>

                    <p className="mt-4 text-muted leading-7">
                      {post.excerpt}
                    </p>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 mt-6 text-orange font-bold"
                    >
                      Читать <ArrowRight size={16} />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}