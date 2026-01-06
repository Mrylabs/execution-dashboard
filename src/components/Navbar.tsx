"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isLoggedIn, logout } from "@/lib/auth";

export default function Navbar() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLoggedIn(isLoggedIn());
    setMounted(true);
  }, []);

  function handleLogout() {
    logout();
    setLoggedIn(false);
    router.push("/");
  }

  if (!mounted) return null;

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b">
      <Link href="/" className="font-semibold">
        Productivity Dashboard
      </Link>

      <div className="flex items-center gap-4">
        {!loggedIn && (
          <Link href="/login" className="text-sm">
            Login
          </Link>
        )}

        {loggedIn && (
          <>
            <Link href="/dashboard" className="text-sm">
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
