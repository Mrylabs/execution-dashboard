"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { isLoggedIn, logout } from "@/lib/auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace("/login");
    } else {
      setChecked(true);
    }
  }, [router]);

  // Prevent flash before auth check
  if (!checked) return null;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r px-6 py-8">
        <h2 className="mb-8 text-lg font-semibold">Dashboard</h2>

        <nav className="flex flex-col gap-4">
          <Link href="/dashboard" className="text-gray-700 hover:underline">
            Overview
          </Link>
          <Link href="/dashboard/tasks" className="text-gray-700 hover:underline">
            Tasks
          </Link>
          <Link href="/dashboard/settings" className="text-gray-700 hover:underline">
            Settings
          </Link>
        </nav>

        <button
          onClick={() => {
            logout();
            router.replace("/login");
          }}
          className="mt-10 text-sm text-red-600 hover:underline"
        >
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
