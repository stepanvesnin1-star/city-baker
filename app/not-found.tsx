import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="container py-24 min-h-[70vh] flex flex-col justify-center">
      <p className="eyebrow">404</p>
      <h1 className="section-title mt-4">Страница не найдена</h1>
      <p className="mt-6 max-w-xl text-lg text-[var(--muted)]">Похоже, этот адрес уже остыл. Вернитесь в меню или соберите свежий бокс.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link className="btn btn-primary" href="/menu">В меню</Link>
        <Link className="btn btn-ghost" href="/">На главную</Link>
      </div>
    </main>
  );
}
