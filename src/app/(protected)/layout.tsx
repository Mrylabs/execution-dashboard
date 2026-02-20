"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { isLoggedIn, logout } from "@/lib/auth";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
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
  <div className="flex min-h-screen bg-gray-50">
    {/* Sidebar */}
    <aside className="w-64 bg-white border-r border-gray-200 px-6 py-8 shadow-sm">
      <h2 className="mb-8 text-xl font-semibold text-gray-900">
        Dashboard
      </h2>

      <nav className="flex flex-col gap-3">
       <Link
          href="/dashboard"
          className={`px-3 py-2 rounded-md transition-colors ${
            pathname === "/dashboard"
              ? "bg-blue-50 text-blue-600 font-medium"
              : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          Overview
        </Link>

        <Link
          href="/dashboard/tasks"
          className={`px-3 py-2 rounded-md transition-colors ${
            pathname === "/dashboard/tasks"
              ? "bg-blue-50 text-blue-600 font-medium"
              : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          Tasks
        </Link>

        <Link
          href="/dashboard/habits"
          className={`px-3 py-2 rounded-md transition-colors ${
            pathname === "/dashboard/habits"
              ? "bg-blue-50 text-blue-600 font-medium"
              : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          Habits
        </Link>

        <Link
          href="/dashboard/settings"
            className={`px-3 py-2 rounded-md transition-colors ${
              pathname === "/dashboard/settings"
                ? "bg-blue-50 text-blue-600 font-medium"
                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            }`}
        >
          Settings
        </Link>
      </nav>

      <button
        onClick={() => {
          logout();
          router.replace("/login");
        }}
        className="mt-12 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
      >
        Logout
      </button>
    </aside>

    {/* Main content */}
    <main className="flex-1 bg-gray-50 p-10 text-gray-600">
      {children}
    </main>
  </div>
);
}
