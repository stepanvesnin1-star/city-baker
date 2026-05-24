export default function Loading() {
  return (
    <main className="container py-24 min-h-[60vh]">
      <div className="card p-8 animate-pulse">
        <div className="h-8 w-44 rounded-full bg-black/10" />
        <div className="mt-8 h-20 max-w-2xl rounded-3xl bg-black/10" />
        <div className="mt-6 h-4 max-w-xl rounded bg-black/10" />
        <div className="mt-3 h-4 max-w-lg rounded bg-black/10" />
      </div>
    </main>
  );
}
