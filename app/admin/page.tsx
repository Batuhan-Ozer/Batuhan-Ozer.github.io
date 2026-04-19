import { loginAdmin } from "./actions";

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border p-6 shadow-sm">
        <h1 className="text-2xl font-bold mb-2">Admin Giriş</h1>
        <p className="text-sm text-gray-500 mb-6">
          Admin panele erişmek için şifreni gir.
        </p>

        <form action={loginAdmin} className="space-y-4">
          <input
            type="password"
            name="password"
            placeholder="Şifre"
            className="w-full rounded-xl border px-4 py-3 outline-none"
            required
          />
          <button
            type="submit"
            className="w-full rounded-xl border px-4 py-3 font-medium"
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </main>
  );
}