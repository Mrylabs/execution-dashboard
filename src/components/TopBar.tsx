"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth";
import Link from "next/link";

export default function TopBar() {
  const [open, setOpen] = useState(false);
  const [now, setNow] = useState<Date | null>(null);
  const router = useRouter();

  useEffect(() => {
    setNow(new Date());

    const interval = setInterval(() => {
      setNow(new Date());
    }, 60_000);

    return () => clearInterval(interval);
  }, []);

  function handleLogout() {
    (async () => {
      await signOut();
      router.push("/login");
    })();
  }

  const dateLabel = now
    ? new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      }).format(now)
    : "";

  const timeLabel = now
    ? new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }).format(now)
    : "";

  return (
    <div className="h-14 px-6 flex items-center justify-between border-b bg-white">
      <div className="text-sm text-gray-500">
        {now && (
          <span>
            {dateLabel} · {timeLabel}
          </span>
        )}
      </div>

      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="h-8 w-8 rounded-full bg-gray-300 ring-2 ring-transparent transition hover:ring-gray-200"
        />

        {open && (
          <div className="absolute right-0 z-10 mt-2 w-40 rounded-xl border bg-white shadow-lg">
            <Link
              href="/dashboard/settings"
              className="block px-4 py-2 text-sm text-gray-500 hover:bg-gray-50"
            >
              Settings
            </Link>

            <button
              onClick={handleLogout}
              className="block w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-50"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}