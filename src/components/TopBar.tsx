"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth";
import Link from "next/link";

export default function TopBar() {
  const [open, setOpen] = useState(false);
  const [now, setNow] = useState<Date | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    setNow(new Date());

    const interval = setInterval(() => {
      setNow(new Date());
    }, 60_000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
    <div className="flex h-11 items-center justify-between border-b border-white/5 bg-zinc-800 px-4 text-neutral-200 md:px-5">
      <div className="text-xs text-neutral-300">
        {now && (
          <span>
            {dateLabel} · {timeLabel}
          </span>
        )}
      </div>

      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-semibold text-neutral-100 ring-2 ring-transparent transition hover:bg-white/10 hover:ring-white/10"
          aria-label="Open user menu"
        >
          M
        </button>

        {open && (
          <div className="absolute right-0 z-10 mt-2 w-40 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-lg">
            <Link
              href="/dashboard/settings"
              onClick={() => setOpen(false)}
              className="block px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
            >
              Settings
            </Link>

            <button
              onClick={handleLogout}
              className="block w-full px-3 py-2 text-left text-sm text-red-500 hover:bg-neutral-50"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
