import Link from 'next/link';
import AdminShell from '@/components/AdminShell';
import { prisma } from '@/lib/prisma';

export default async function AdminHome(){
  let stats = { products:0, orders:0, locations:0, posts:0 };
  try { stats = { products: await prisma.product.count(), orders: await prisma.order.count(), locations: await prisma.location.count(), posts: await prisma.blogPost.count() }; } catch {}
  const cards = [ ['Товары', stats.products, '/admin/products'], ['Заказы', stats.orders, '/admin/orders'], ['Точки', stats.locations, '/admin/locations'], ['Статьи', stats.posts, '/admin/blog'] ];
  return <AdminShell title="Обзор"><div className="grid md:grid-cols-4 gap-4">{cards.map(([title,count,href])=><Link href={String(href)} key={String(title)} className="card p-6 hover:-translate-y-1 transition"><p className="text-muted">{title}</p><p className="text-4xl font-black mt-2">{count}</p></Link>)}</div><div className="card p-6 mt-8"><h2 className="text-2xl font-black">Что уже работает</h2><p className="mt-3 text-muted">Авторизация, защита /admin через cookie-сессию, CRUD с редактированием товаров/категорий/точек/блога, загрузка изображений в /public/uploads, статусы заказов, Telegram уведомления и имитация оплаты.</p></div></AdminShell>;
}
