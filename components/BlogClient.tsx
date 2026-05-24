"use client";

import { useMemo, useState } from "react";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  image?: string | null;
  imageUrl?: string | null;
  createdAt?: string | Date;
};

export default function BlogPageClient({ posts }: { posts: BlogPost[] }) {
  const [activeCategory, setActiveCategory] = useState("Все");

  const categories = useMemo(() => {
    const list = posts.map((post) => post.category || "Без категории");
    return ["Все", ...Array.from(new Set(list))];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (activeCategory === "Все") return posts;
    return posts.filter((post) => post.category === activeCategory);
  }, [activeCategory, posts]);

  return (
    <main>
      <section className="city-bg text-white py-28">
        <div className="container">
          <p className="eyebrow">Блог</p>
          <h1 className="section-title mt-6">Истории пекарни</h1>
        </div>
      </section>

      <section className="container py-16">
        <div className="flex gap-3 flex-wrap mb-10">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`btn ${
                activeCategory === category ? "btn-primary" : "bg-black/5"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {filteredPosts.map((post) => {
            const image = post.image || post.imageUrl;

            return (
              <article className="card p-7" key={post.id}>
                <div className="h-56 rounded-3xl placeholder mb-7 overflow-hidden">
                  {image ? (
                    <img
                      src={image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  ) : null}
                </div>

                <p className="eyebrow">{post.category}</p>

                <h2 className="text-3xl font-black mt-3">{post.title}</h2>

                <p className="text-muted mt-3">{post.excerpt}</p>

                <p className="mt-6 text-sm font-bold">
                  {post.createdAt
                    ? new Date(post.createdAt).toLocaleDateString("ru-RU")
                    : ""}
                </p>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}