"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e?: React.FormEvent) {
    e?.preventDefault();
    setError(null);

    const result = await signIn(email, password);

    if ((result as any).error) {
      setError((result as any).error.message || "Login failed");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-black">
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-zinc-900">
        
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Welcome back
        </h1>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Continue to your execution dashboard.
        </p>

        <form onSubmit={handleLogin}>
          <label className="block mt-4">
            <span className="text-sm text-gray-500">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border px-3 py-2"
              required
            />
          </label>

          <label className="block mt-4">
            <span className="text-sm text-gray-500">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border px-3 py-2"
              required
            />
          </label>

          {error && (
            <p className="mt-3 text-sm text-red-500">{error}</p>
          )}

          <button
            type="submit"
            className="mt-6 w-full rounded-xl bg-gray-900 py-3 text-sm font-medium text-white transition hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            Continue
          </button>
        </form>

      </div>
    </div>
  );
}