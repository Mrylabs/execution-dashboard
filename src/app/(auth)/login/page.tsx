"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { signIn, signInAsDemo, signUp } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loadingAction, setLoadingAction] = useState<"demo" | "form" | null>(null);
  const isBusy = loadingAction !== null;

  async function handleDemoSignIn() {
    setError(null);
    setSuccess(null);
    setLoadingAction("demo");

    try {
      await signInAsDemo();
      router.replace("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to start demo session");
      setLoadingAction(null);
      return;
    }

    // Keep the login page locked until Next swaps to the dashboard.
    return;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoadingAction("form");

    try {
      if (mode === "signin") {
        const { error } = await signIn(email, password);

        if (error) {
          setError(error.message);
          setLoadingAction(null);
          return;
        }

        router.push("/dashboard");
        return;
      }

      const { error } = await signUp(email, password);

      if (error) {
        setError(error.message);
        setLoadingAction(null);
        return;
      }

      setSuccess("Account created. Please check your email, then sign in.");
      setMode("signin");
      setPassword("");
    } finally {
      setLoadingAction(null);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-black">
      <div
        aria-busy={isBusy}
        className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-zinc-900"
      >
        
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {mode === "signin" ? "Welcome back" : "Create an account"}
        </h1>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {mode === "signin"
            ? "Continue to your execution dashboard."
            : "Create an account to access the execution dashboard."}
        </p>

        <button
          type="button"
          onClick={handleDemoSignIn}
          disabled={isBusy}
          className="mt-6 w-full rounded-xl bg-gray-900 py-3 text-sm font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-gray-200"
        >
          {loadingAction === "demo" ? "Opening demo..." : "Continue as Demo"}
        </button>

        {loadingAction === "demo" && (
          <p className="mt-3 text-center text-sm text-gray-500">
            Verifying demo session...
          </p>
        )}

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200 dark:bg-white/10" />
          <span className="text-xs text-gray-400">or</span>
          <div className="h-px flex-1 bg-gray-200 dark:bg-white/10" />
        </div>

        <form onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-sm text-gray-500">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isBusy}
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
              disabled={isBusy}
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
            disabled={isBusy}
            className="mt-6 w-full rounded-xl border border-gray-200 bg-white py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
          >
            {loadingAction === "form"
              ? "Please wait..."
              : mode === "signin"
                ? "Continue"
                : "Create account"}
          </button>
        </form>

        <div className="mt-4 text-center">
          {mode === "signin" ? (
            <button
              type="button"
              disabled={isBusy}
              onClick={() => {
                setError(null);
                setSuccess(null);
                setMode("signup");
              }}
              className="text-sm text-gray-500 hover:underline disabled:cursor-not-allowed disabled:opacity-60"
            >
              Need an account? Create one
            </button>
          ) : (
            <button
              type="button"
              disabled={isBusy}
              onClick={() => {
                setError(null);
                setSuccess(null);
                setMode("signin");
              }}
              className="text-sm text-gray-500 hover:underline disabled:cursor-not-allowed disabled:opacity-60"
            >
              Already have an account? Sign in
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
