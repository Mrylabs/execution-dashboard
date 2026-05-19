<<<<<<< HEAD
"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { signIn, signUp } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (mode === "signin") {
      const { error } = await signIn(email, password);

      if (error) {
        setError(error.message);
        return;
      }

      router.push("/dashboard");
      return;
    }

    const { error } = await signUp(email, password);

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess("Account created. Please check your email, then sign in.");
    setMode("signin");
    setPassword("");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-black">
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-zinc-900">
        
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {mode === "signin" ? "Welcome back" : "Create an account"}
        </h1>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {mode === "signin"
            ? "Continue to your execution dashboard."
            : "Create an account to access the execution dashboard."}
        </p>

        <form onSubmit={handleSubmit}>
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

          {success && (
            <p className="mt-3 text-sm text-green-600">{success}</p>
          )}

          <button
            type="submit"
            className="mt-6 w-full rounded-xl bg-gray-900 py-3 text-sm font-medium text-white transition hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            {mode === "signin" ? "Continue" : "Create account"}
          </button>
        </form>

        <div className="mt-4 text-center">
          {mode === "signin" ? (
            <button
              type="button"
              onClick={() => {
                setError(null);
                setSuccess(null);
                setMode("signup");
              }}
              className="text-sm text-gray-500 hover:underline"
            >
              Need an account? Create one
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setError(null);
                setSuccess(null);
                setMode("signin");
              }}
              className="text-sm text-gray-500 hover:underline"
            >
              Already have an account? Sign in
            </button>
          )}
        </div>

      </div>
    </div>
  );
=======
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
>>>>>>> a0e1fad (feat: improve login page UI and consistency)
}