'use client';
import { useState } from 'react';
const statuses = ['NEW','CONFIRMED','COOKING','DELIVERY','DONE','CANCELLED'];
type Order = { id:string; customerName?:string; phone?:string; address:string; deliveryTime:string; total:number; status:string; createdAt?:string; items?: any[] };
export default function AdminOrdersClient({ initialOrders }: { initialOrders: Order[] }) {
  const [orders,setOrders]=useState(initialOrders);
  async function setStatus(id:string,status:string){const res=await fetch(`/api/orders/${id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({status})}); if(res.ok)setOrders(orders.map(o=>o.id===id?{...o,status}:o));}
  return <div className="grid gap-4">{orders.map(o=><div key={o.id} className="card p-6 grid lg:grid-cols-[1fr_220px] gap-4"><div><div className="flex flex-wrap gap-3 items-center"><h3 className="text-2xl font-black">Заказ #{o.id.slice(0,8)}</h3><span className="pill">{o.status}</span></div><p className="mt-2 text-muted">{o.customerName || 'Гость'} · {o.phone || 'без телефона'}</p><p className="font-bold mt-2">{o.address}</p><p>Время: {o.deliveryTime}</p><p className="text-xl font-black mt-2">{o.total} ₽</p></div><div><label className="text-sm font-bold">Статус</label><select className="input mt-2" value={o.status} onChange={e=>setStatus(o.id,e.target.value)}>{statuses.map(s=><option key={s}>{s}</option>)}</select></div></div>)}</div>;
}
