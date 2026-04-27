"use client";

import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  function handleLogin() {
    login();
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

        <button
          onClick={handleLogin}
          className="mt-6 w-full rounded-xl bg-gray-900 py-3 text-sm font-medium text-white transition hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-200"
        >
          Continue
        </button>

      </div>
    </div>
  );
}