'use client';
import { useState } from 'react';

export default function ImageUploadField({ name = 'imageUrl', defaultValue = '' }: { name?: string; defaultValue?: string }) {
  const [url, setUrl] = useState(defaultValue);
  const [loading, setLoading] = useState(false);

  async function upload(file?: File) {
    if (!file) return;
    setLoading(true);
    const data = new FormData();
    data.set('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: data });
    const json = await res.json();
    setLoading(false);
    if (json.ok) setUrl(json.url);
    else alert(json.error || 'Не удалось загрузить файл');
  }

  return <div className="grid gap-3">
    <input className="input" name={name} value={url} onChange={e=>setUrl(e.target.value)} placeholder="URL изображения или /uploads/..." />
    <label className="border border-dashed border-black/20 rounded-2xl p-4 cursor-pointer bg-white hover:bg-black/5 transition">
      <input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" className="hidden" onChange={e=>upload(e.target.files?.[0])} />
      <span className="font-black">{loading ? 'Загружаем...' : 'Загрузить фото'}</span>
      <span className="block text-sm text-muted mt-1">Пока можно оставить пустым — сайт покажет фирменную заглушку.</span>
    </label>
    {url && <div className="h-28 rounded-2xl bg-black/5 overflow-hidden"><img src={url} alt="preview" className="w-full h-full object-cover" /></div>}
  </div>;
}
