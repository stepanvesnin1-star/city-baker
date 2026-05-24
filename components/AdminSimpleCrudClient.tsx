'use client';
import { useState } from 'react';
import ImageUploadField from './ImageUploadField';

type Field = { name: string; label: string; type?: string; textarea?: boolean; image?: boolean };
type Row = Record<string, any> & { id: string };

export default function AdminSimpleCrudClient({ endpoint, initialItems, fields, title }: { endpoint: string; initialItems: Row[]; fields: Field[]; title: string }) {
  const [items, setItems] = useState(initialItems);
  const [editing, setEditing] = useState<Row | null>(null);
  function payload(formData: FormData) { return Object.fromEntries(Array.from(formData.entries()).map(([k,v])=>[k, typeof v === 'string' ? v : ''])); }
  async function save(formData: FormData) {
    const isEdit = Boolean(editing);
    const res = await fetch(isEdit ? `${endpoint}/${editing!.id}` : endpoint, { method: isEdit ? 'PATCH' : 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload(formData)) });
    const json = await res.json();
    if (!json.ok) return alert('Ошибка сохранения');
    if (isEdit) { setItems(items.map(i=>i.id===editing!.id ? { ...i, ...json.data } : i)); setEditing(null); }
    else setItems([json.data, ...items]);
  }
  async function remove(id: string) { if (!confirm('Удалить запись?')) return; const res = await fetch(`${endpoint}/${id}`, { method:'DELETE' }); if (res.ok) setItems(items.filter(i=>i.id!==id)); }
  return <div className="grid lg:grid-cols-[1fr_420px] gap-8">
    <div className="card overflow-auto"><table className="w-full text-left min-w-[760px]"><thead className="bg-black/5"><tr>{fields.slice(0,4).map(f=><th className="p-4" key={f.name}>{f.label}</th>)}<th></th></tr></thead><tbody>{items.map(row=><tr className="border-t border-black/5" key={row.id}>{fields.slice(0,4).map(f=><td className="p-4 max-w-[280px] truncate" key={f.name}>{f.image && row[f.name] ? <img src={row[f.name]} className="h-12 w-20 object-cover rounded-xl"/> : String(row[f.name] ?? '')}</td>)}<td className="flex gap-3 py-4"><button onClick={()=>setEditing(row)} className="font-bold">Изменить</button><button onClick={()=>remove(row.id)} className="text-red-600 font-bold">Удалить</button></td></tr>)}</tbody></table></div>
    <form action={save} key={editing?.id || 'new'} className="card p-7 grid gap-4 h-fit"><div className="flex items-center justify-between gap-4"><h2 className="text-2xl font-black">{editing ? 'Редактирование' : title}</h2>{editing && <button type="button" onClick={()=>setEditing(null)} className="text-sm font-bold text-muted">Отмена</button>}</div>{fields.map(f=> f.image ? <ImageUploadField key={f.name} name={f.name} defaultValue={editing?.[f.name] || ''}/> : f.textarea ? <textarea key={f.name} className="input min-h-28" name={f.name} placeholder={f.label} defaultValue={editing?.[f.name] || ''}/> : <input key={f.name} className="input" name={f.name} type={f.type||'text'} placeholder={f.label} defaultValue={editing?.[f.name] || ''}/>) }<button className="btn btn-primary">{editing ? 'Обновить' : 'Сохранить'}</button></form>
  </div>;
}
