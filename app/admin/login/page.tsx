export default function AdminLoginPage() {
  return (
    <main className="min-h-[70vh] grid place-items-center bg-cream px-4">
      <form action="/api/admin/login" method="post" className="card w-full max-w-md p-8 grid gap-4">
        <p className="eyebrow">City Baker Admin</p>
        <h1 className="text-3xl font-black">Вход в админку</h1>
        <input className="input" name="email" type="email" placeholder="Email" defaultValue="admin@citybaker.ru" required />
        <input className="input" name="password" type="password" placeholder="Пароль" required />
        <button className="btn btn-primary" type="submit">Войти</button>
        <p className="text-sm text-muted">Данные задаются в .env: ADMIN_EMAIL и ADMIN_PASSWORD.</p>
      </form>
    </main>
  );
}
