export default function AdminLoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <form action="/api/admin/login" method="post" className="card p-8 w-full max-w-md">
        <h1 className="text-4xl font-black mb-6">Вход в админку</h1>

        <input name="login" className="input mb-4" placeholder="Логин" required />
        <input name="password" type="password" className="input mb-6" placeholder="Пароль" required />

        <button className="btn btn-primary w-full" type="submit">
          Войти
        </button>
      </form>
    </main>
  );
}