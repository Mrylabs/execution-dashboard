import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        {/* Logo / Brand */}
        <div className="flex items-center gap-3">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="App logo"
            width={28}
            height={28}
            priority
          />
          <span className="text-lg font-semibold text-black dark:text-zinc-50">
            Productivity Dashboard
          </span>
        </div>

        {/* Hero */}
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Focus. Plan. Execute.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            A personal dashboard to organize tasks, track progress, and build
            better daily systems.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <Link
            href="/login"
            className="flex h-12 w-full items-center justify-center rounded-full bg-black px-6 text-white transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200 md:w-[160px]"
          >
            Get Started
          </Link>

          <Link
            href="/login"
            className="flex h-12 w-full items-center justify-center rounded-full border border-black/[.1] px-6 text-black transition hover:bg-black/[.04] dark:border-white/[.15] dark:text-zinc-50 dark:hover:bg-[#1a1a1a] md:w-[160px]"
          >
            Login
          </Link>
        </div>
      </main>
    </div>
  );
}
