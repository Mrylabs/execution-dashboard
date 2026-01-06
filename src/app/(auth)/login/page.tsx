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
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="w-full max-w-sm rounded-lg border border-black/[.1] bg-white p-8 shadow-sm dark:border-white/[.15] dark:bg-black">
        <h1 className="mb-6 text-xl font-semibold text-black dark:text-zinc-50">
          Login
        </h1>

        <button
          onClick={handleLogin}
          className="flex h-12 w-full items-center justify-center rounded-md bg-black text-white transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
