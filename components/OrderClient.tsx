'use client';
import { useEffect, useMemo, useState } from 'react';

type PaymentMethod = 'CARD' | 'SBP' | 'CASH';
const slots = ['06:30','07:00','07:30','08:00','08:30','09:00','09:30','10:00','11:00','12:00'];

export default function OrderClient({
  products,
}: {
  products: any[];
}) {
  const [items,setItems]=useState<Record<string,number>>({});
  const [step,setStep]=useState(1);
  const [customerName,setCustomerName]=useState('');
  const [phone,setPhone]=useState('');
  const [address,setAddress]=useState('');
  const [time,setTime]=useState('');
  const [comment,setComment]=useState('');
  const [paymentMethod,setPaymentMethod]=useState<PaymentMethod>('CARD');
  const [loading,setLoading]=useState(false);
  const subtotal=useMemo(()=>products.reduce((s,p)=>s+(items[p.id]||0)*p.price,0),[items]);
  const deliveryFee = subtotal >= 2500 ? 0 : 199;
  const total = subtotal + deliveryFee;
  const count = Object.values(items).reduce((s,n)=>s+n,0);
  const canStep2 = subtotal > 0;
  const canStep3 = address.trim().length > 4 && time && phone.trim().length > 6;
  useEffect(()=>{const product=new URLSearchParams(window.location.search).get('product'); if(product){setItems(prev=>prev[product]?prev:{...prev,[product]:1});}},[]);

  function setQty(id:string, qty:number){ setItems(prev=>({...prev,[id]:Math.max(0,qty)})); }
  async function submit(){
    if (!canStep3 || loading) return;
    setLoading(true);
    const orderItems=products.filter(p=>items[p.id]).map(p=>({productId:p.id,name:p.name,price:p.price,quantity:items[p.id]}));
    const res = await fetch('/api/orders',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({items:orderItems,customerName,phone,address,deliveryTime:time,paymentMethod,subtotal,total,comment})});
    setLoading(false);
    if (res.ok) location.href='/success'; else alert('Не удалось оформить заказ. Проверьте данные.');
  }
  return <main>
    <section className="bg-ink text-white py-20"><div className="container"><p className="eyebrow">Быстро и удобно</p><h1 className="section-title mt-6">ЗАКАЗАТЬ</h1><div className="mt-8 grid md:grid-cols-3 gap-3 max-w-3xl">{['1 Бокс','2 Доставка','3 Оплата'].map((label,i)=><button type="button" onClick={()=> i+1 < step && setStep(i+1)} key={label} className={`rounded-full px-5 py-3 font-black text-left transition ${step>=i+1?'bg-orange text-white':'bg-white/10 text-white/60'}`}>{label}</button>)}</div><div className="mt-5 h-2 max-w-3xl rounded-full bg-white/10 overflow-hidden"><div className="h-full bg-orange transition-all" style={{width:`${step/3*100}%`}} /></div></div></section>
    <section className="container py-16 grid lg:grid-cols-[1fr_380px] gap-12">
      <div>
        {step===1&&<><h2 className="text-4xl mb-3">Собери свой бокс</h2><p className="text-muted mb-8">Добавляйте позиции кнопками +/−. Фото сейчас заменены фирменными заглушками.</p><div className="grid md:grid-cols-3 gap-6">{products.map(p=><div className="card p-6 hover:-translate-y-1 transition" key={p.id}><div className="h-40 rounded-3xl overflow-hidden bg-cream">
  {p.image ? (
    <img
      src={p.image}
      alt={p.name}
      className="w-full h-full object-cover"
    />
  ) : (
    <div className="h-full grid place-items-center text-6xl">
      🥐
    </div>
  )}
</div><h3 className="mt-6 text-xl font-black">{p.name}</h3><p className="text-sm text-muted mt-2 min-h-10">{p.description}</p><b className="text-orange block mt-4">{p.price} ₽</b><div className="mt-5 flex gap-4 items-center"><button className="btn bg-black/5" onClick={()=>setQty(p.id,(items[p.id]||0)-1)}>−</button><b className="min-w-6 text-center">{items[p.id]||0}</b><button className="btn btn-primary" onClick={()=>setQty(p.id,(items[p.id]||0)+1)}>+</button></div></div>)}</div></>}
        {step===2&&<><h2 className="text-4xl mb-3">Контакты и доставка</h2><p className="text-muted mb-8">Минимум данных для тестового оформления. Заказ уйдёт в Telegram.</p><div className="grid md:grid-cols-2 gap-4"><input className="input" placeholder="Имя" value={customerName} onChange={e=>setCustomerName(e.target.value)}/><input className="input" placeholder="Телефон" value={phone} onChange={e=>setPhone(e.target.value)}/></div><input className="input w-full mt-4" placeholder="Улица, дом, квартира" value={address} onChange={e=>setAddress(e.target.value)}/><textarea className="input w-full mt-4 min-h-28" placeholder="Комментарий к заказу" value={comment} onChange={e=>setComment(e.target.value)}/><h3 className="text-2xl font-black mt-8 mb-4">Время доставки</h3><div className="grid grid-cols-3 md:grid-cols-5 gap-4">{slots.map(t=><button key={t} onClick={()=>setTime(t)} className={`btn ${time===t?'btn-primary':'bg-black/5'}`}>{t}</button>)}</div></>}
        {step===3&&<><h2 className="text-4xl mb-3">Имитация оплаты</h2><p className="text-muted mb-8">В первой версии платёж не списывается. После нажатия «Оплатить» заказ будет создан и отправлен в Telegram.</p><div className="grid md:grid-cols-3 gap-6">{[['CARD','💳','Карта'],['SBP','⚡','СБП'],['CASH','💵','Наличные']].map(([id,icon,label])=><button key={id} onClick={()=>setPaymentMethod(id as PaymentMethod)} className={`card p-8 text-left ${paymentMethod===id?'ring-4 ring-orange':''}`}><span className="text-4xl">{icon}</span><b className="block mt-4">{label}</b><span className="text-sm text-muted">Тестовый режим</span></button>)}</div></>}
      </div>
      <aside className="card p-8 h-fit lg:sticky top-24"><div className="flex items-center justify-between"><h3 className="text-2xl font-black">Мой бокс</h3><span className="rounded-full bg-cream px-3 py-1 text-sm font-black">{count} шт.</span></div>{products.filter(p=>items[p.id]).length===0&&<p className="text-muted mt-6">Пока пусто. Добавьте выпечку из каталога.</p>}{products.filter(p=>items[p.id]).map(p=><div key={p.id} className="flex justify-between gap-4 my-4"><span>🥐 {p.name} × {items[p.id]}</span><b>{p.price*(items[p.id]||0)} ₽</b></div>)}<hr className="my-5"/><div className="grid gap-2 text-sm"><div className="flex justify-between"><span>Товары</span><b>{subtotal} ₽</b></div><div className="flex justify-between"><span>Доставка</span><b>{deliveryFee ? `${deliveryFee} ₽` : 'бесплатно'}</b></div><div className="flex justify-between text-xl"><b>Итого</b><b className="text-orange">{total} ₽</b></div></div><div className="grid grid-cols-2 gap-3 mt-8">{step>1&&<button onClick={()=>setStep(step-1)} className="btn bg-black/5">← Назад</button>}{step<3?<button disabled={step===1 ? !canStep2 : !canStep3} onClick={()=>setStep(step+1)} className="btn btn-primary disabled:opacity-40 col-span-1">Далее →</button>:<button onClick={submit} disabled={loading || !canStep3} className="btn btn-primary col-span-2 disabled:opacity-40">{loading?'Оформляем...':'Оплатить тестово'}</button>}</div>{step===2&&!canStep3&&<><p className="text-xs text-muted mt-4">Заполните телефон, адрес и выберите время.</p><p className="text-xs text-muted mt-3">Оплата работает в тестовом режиме, без списаний.</p></>}</aside>
    </section>
  </main>;
}