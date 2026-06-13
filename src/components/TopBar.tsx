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
    <div className="flex h-14 items-center justify-between border-b bg-white px-6">
      <div className="text-sm text-gray-500">
        {now && (
          <span>
            {dateLabel} · {timeLabel}
          </span>
        )}
      </div>

      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-100 font-semibold text-slate-700 shadow-sm ring-2 ring-transparent transition hover:ring-slate-200"
          aria-label="Open user menu"
        >
          M
        </button>

        {open && (
          <div className="absolute right-0 z-10 mt-2 w-40 rounded-xl border bg-white shadow-lg">
            <Link
              href="/dashboard/settings"
              onClick={() => setOpen(false)}
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
