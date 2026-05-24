"use client";

import { useState } from "react";
import ImageUploadField from "./ImageUploadField";

type Category = {
  id: string;
  name: string;
  slug: string;
};

type Product = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  price: number;
  image?: string | null;
  imageUrl?: string | null;
  badge?: string | null;
  isActive?: boolean;
  category?: string | null;
  categoryId?: string | null;
};

function toPayload(formData: FormData) {
  return Object.fromEntries(
    Array.from(formData.entries()).map(([key, value]) => [
      key,
      typeof value === "string" ? value : "",
    ])
  );
}

export default function AdminProductsClient({
  initialProducts,
  categories,
}: {
  initialProducts: Product[];
  categories: Category[];
}) {
  const [items, setItems] = useState(initialProducts);
  const [editing, setEditing] = useState<Product | null>(null);

  async function create(formData: FormData) {
    const payload = toPayload(formData);

    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const json = await res.json();

    if (json.ok) {
      setItems([json.data, ...items]);
    } else {
      alert(json.error || "Ошибка сохранения");
    }
  }

  async function update(formData: FormData) {
    if (!editing) return;

    const payload = toPayload(formData);

    const res = await fetch(`/api/products/${editing.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const json = await res.json();

    if (json.ok) {
      setItems(items.map((item) => (item.id === editing.id ? json.data : item)));
      setEditing(null);
    } else {
      alert(json.error || "Ошибка обновления");
    }
  }

  async function remove(id: string) {
    if (!confirm("Удалить товар?")) return;

    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setItems(items.filter((item) => item.id !== id));
    }
  }

  async function toggle(product: Product) {
    setItems(
      items.map((item) =>
        item.id === product.id
          ? {
              ...item,
              isActive: product.isActive === false,
            }
          : item
      )
    );
  }

  const formTitle = editing ? `Редактировать: ${editing.name}` : "Новый товар";
  const action = editing ? update : create;

  return (
    <div className="grid lg:grid-cols-[1fr_420px] gap-8">
      <div className="card overflow-auto">
        <table className="w-full text-left min-w-[880px]">
          <thead className="bg-black/5">
            <tr>
              <th className="p-4">Фото</th>
              <th>Название</th>
              <th>Категория</th>
              <th>Цена</th>
              <th>Статус</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {items.map((product) => {
              const image = product.image || product.imageUrl;

              return (
                <tr className="border-t border-black/5" key={product.id}>
                  <td className="p-4">
                    <div className="h-14 w-20 rounded-xl bg-cream overflow-hidden">
                      {image ? (
                        <img
                          src={image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full grid place-items-center">
                          🥐
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="font-black">
                    {product.name}
                    <div className="text-xs text-muted font-normal">
                      /{product.slug}
                    </div>
                  </td>

                  <td>{String(product.category || product.categoryId || "Без категории")}</td>

                  <td>{product.price} ₽</td>

                  <td>
                    <button
                      type="button"
                      onClick={() => toggle(product)}
                      className="font-black text-orange"
                    >
                      {product.isActive === false ? "Скрыт" : "Активен"}
                    </button>
                  </td>

                  <td className="flex gap-3 py-4">
                    <button
                      type="button"
                      onClick={() => setEditing(product)}
                      className="font-bold"
                    >
                      Изменить
                    </button>

                    <button
                      type="button"
                      onClick={() => remove(product.id)}
                      className="text-red-600 font-bold"
                    >
                      Удалить
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <form action={action} key={editing?.id || "new"} className="card p-7 grid gap-4 h-fit">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-black">{formTitle}</h2>

          {editing && (
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="text-sm font-bold text-muted"
            >
              Отмена
            </button>
          )}
        </div>

        <input
          className="input"
          name="name"
          placeholder="Название"
          defaultValue={editing?.name || ""}
          required
        />

        <input
          className="input"
          name="slug"
          placeholder="slug"
          defaultValue={editing?.slug || ""}
          required
        />

<select
  className="input"
  name="category"
  defaultValue={editing?.category || categories[0]?.name || "Без категории"}
        >
          {categories.map((category) => (
            <option value={category.name} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <input
          className="input"
          name="price"
          type="number"
          placeholder="Цена"
          defaultValue={editing?.price || ""}
          required
        />

        <input
          className="input"
          name="badge"
          placeholder="Бейдж"
          defaultValue={editing?.badge || ""}
        />

        <textarea
          className="input min-h-28"
          name="description"
          placeholder="Описание"
          defaultValue={editing?.description || ""}
        />

        <ImageUploadField defaultValue={editing?.image || editing?.imageUrl || ""} />

        <button className="btn btn-primary">
          {editing ? "Обновить" : "Сохранить"}
        </button>
      </form>
    </div>
  );
}