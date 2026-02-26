"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/auth";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  return (
    <div className="h-14 px-6 flex items-center justify-between border-b bg-white">
      <h1 className="font-semibold text-gray-900">
        Productivity Dashboard
      </h1>

      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="w-8 h-8 rounded-full bg-gray-300"
        />

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border">
            <Link
              href="/dashboard/settings"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}