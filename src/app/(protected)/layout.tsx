"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await getCurrentUser();

      if (!user) {
        router.replace("/login");
      } else {
        setChecked(true);
      }
    })();
  }, [router]);

  if (!checked) return null;

  const navLinks = [
    { href: "/dashboard", label: "Today" },
    { href: "/dashboard/tasks", label: "Tasks" },
    { href: "/dashboard/habits", label: "Habits" },
    { href: "/dashboard/analytics", label: "Analytics" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 md:flex">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 border-r border-gray-200 bg-white px-6 py-8 shadow-sm md:block">
        <h2 className="mb-8 text-xl font-semibold text-gray-900">
          Execution Dashboard
        </h2>

        <nav className="flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-md px-3 py-2 transition-colors ${
                pathname === link.href
                  ? "bg-blue-50 font-medium text-blue-600"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col">
        <Navbar />

        <main className="flex-1 overflow-y-auto px-4 py-6 pb-24 text-gray-600 sm:px-6 md:p-10">
          {children}
        </main>

        {/* Mobile bottom nav */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white px-4 py-3 shadow-sm md:hidden">
          <div className="mx-auto flex max-w-md justify-around">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-xl px-4 py-2 text-sm transition-colors ${
                  pathname === link.href
                    ? "bg-blue-50 font-medium text-blue-600"
                    : "text-gray-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}