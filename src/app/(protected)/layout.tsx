"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import TopBar from "@/components/TopBar";

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
    { href: "/dashboard/jobs", label: "Jobs" },
    { href: "/dashboard/analytics", label: "Insight" },
  ];

  const navSections = [
    {
      label: "Today",
      links: [{ href: "/dashboard", label: "Today" }],
    },
    {
      label: "Workflow",
      links: [
        { href: "/dashboard/tasks", label: "Tasks" },
        { href: "/dashboard/habits", label: "Habits" },
        { href: "/dashboard/jobs", label: "Jobs" },
      ],
    },
    {
      label: "Insight",
      links: [{ href: "/dashboard/analytics", label: "Insight" }],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 md:flex">
      {/* Desktop sidebar */}
      <aside className="hidden w-48 border-r border-white/5 bg-zinc-800 px-4 pb-5 pt-4 text-neutral-100 md:block">
        <div className="pb-4">
          <h2 className="text-[15px] font-semibold leading-5 text-neutral-100">
            Execution Dashboard
          </h2>
          <p className="mt-1 text-xs leading-4 text-neutral-400">
            Plan. Track. Reflect.
          </p>
        </div>

        <div className="h-px bg-white/5" />

        <nav className="mt-5 flex flex-col gap-4">
          {navSections.map((section) => (
            <div key={section.label}>
              <p className="mb-2 px-2 text-[10px] font-medium uppercase tracking-wide text-neutral-500">
                {section.label}
              </p>
              <div className="flex flex-col gap-1">
                {section.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-md px-2.5 py-1.5 text-sm transition-colors ${
                      pathname === link.href
                        ? "bg-white/10 font-medium text-white"
                        : "text-neutral-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col">
        <TopBar />

        <main className="flex-1 overflow-y-auto px-4 pb-24 pt-3 text-gray-600 sm:px-6 md:px-8 md:pb-6 md:pt-3">
          {children}
        </main>

        {/* Mobile bottom nav */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white px-4 py-3 shadow-sm md:hidden">
          <div className="mx-auto flex max-w-md flex-row-reverse justify-around">
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
