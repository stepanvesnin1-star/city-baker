import Link from 'next/link';

export default function AdminShell({ title, children }: { title: string; children: React.ReactNode }) {
  const nav = [
    ['/admin', 'Обзор'], ['/admin/products', 'Товары'], ['/admin/categories', 'Категории'],
    ['/admin/orders', 'Заказы'], ['/admin/locations', 'Точки'], ['/admin/blog', 'Блог']
  ];
  return <main className="bg-cream min-h-screen"><section className="container py-8"><div className="flex flex-wrap items-center justify-between gap-4"><div><p className="eyebrow">Админ-панель</p><h1 className="section-title mt-2">{title}</h1></div><form action="/api/admin/logout" method="post"><button className="btn btn-outline">Выйти</button></form></div><nav className="flex flex-wrap gap-2 mt-8">{nav.map(([href,label])=><Link key={href} href={href} className="px-4 py-2 rounded-full bg-white border border-black/10 font-bold hover:bg-orange hover:text-white">{label}</Link>)}</nav><div className="mt-8">{children}</div></section></main>;
}
