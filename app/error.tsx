'use client';

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="container py-24 min-h-[70vh] flex flex-col justify-center">
      <p className="eyebrow">Ошибка</p>
      <h1 className="section-title mt-4">Что-то пошло не так</h1>
      <p className="mt-6 max-w-xl text-lg text-[var(--muted)]">Попробуйте обновить страницу. Если ошибка повторится, проверьте переменные окружения и подключение к базе данных.</p>
      <button className="btn btn-primary mt-8 w-fit" onClick={() => reset()}>Повторить</button>
    </main>
  );
}
