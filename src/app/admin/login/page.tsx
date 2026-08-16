import LoginForm from "./LoginForm";

export const metadata = { title: "Admin Login" };

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-forest)] px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <span className="inline-flex w-12 h-12 rounded-full bg-[var(--color-gold)] text-[var(--color-forest-dark)] items-center justify-center font-display font-bold text-xl mb-3">
            ক
          </span>
          <h1 className="font-display text-xl font-semibold">Kohela Muslim Shomitti</h1>
          <p className="text-sm text-[var(--color-ink)]/60 mt-1">Committee admin dashboard</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
