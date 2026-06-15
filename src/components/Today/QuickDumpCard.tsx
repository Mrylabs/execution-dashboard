"use client";

import { useEffect, useRef, useState } from "react";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { supabase } from "@/lib/supabase";

type QuickDumpItem = {
  id: string;
  text: string;
  createdAt: string;
};

const QUICK_DUMP_STORAGE_KEY_SUFFIX = "quick-dump-items";

function getQuickDumpStorageKey(userId?: string | null) {
  return `execution-dashboard:${userId ?? "anonymous"}:${QUICK_DUMP_STORAGE_KEY_SUFFIX}`;
}

function createQuickDumpId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export default function QuickDumpCard() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState<QuickDumpItem[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [storageUserId, setStorageUserId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadItems() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!mounted) return;

      const userId = user?.id ?? null;
      setStorageUserId(userId);

      try {
        const stored = window.localStorage.getItem(getQuickDumpStorageKey(userId));
        if (!stored) return;

        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItems(
            parsed.filter(
              (item): item is QuickDumpItem =>
                typeof item?.id === "string" &&
                typeof item.text === "string" &&
                typeof item.createdAt === "string"
            )
          );
        }
      } catch {
        setItems([]);
      }
    }

    void loadItems();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!expanded) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setExpanded(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [expanded]);

  function saveItems(nextItems: QuickDumpItem[]) {
    try {
      window.localStorage.setItem(
        getQuickDumpStorageKey(storageUserId),
        JSON.stringify(nextItems)
      );
    } catch {
      // Local-only convenience; ignore unavailable storage.
    }
  }

  function handleAdd() {
    const text = input.trim();
    if (!text) return;

    const nextItems = [
      {
        id: createQuickDumpId(),
        text,
        createdAt: new Date().toISOString(),
      },
      ...items,
    ];

    setItems(nextItems);
    saveItems(nextItems);
    setInput("");
  }

  function handleDelete(id: string) {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
    saveItems(nextItems);
  }

  return (
    <DashboardCard
      className="h-full overflow-visible border-gray-100/80 bg-white px-3 py-2.5 shadow-sm ring-1 ring-gray-100/50 md:px-3 md:py-2.5"
    >
      <div
        ref={dropdownRef}
        className="relative mb-2 flex items-center justify-between gap-3"
      >
        <h2 className="sr-only">Quick Dump</h2>

        <p className="inline-flex rounded-full border border-gray-200/80 bg-gray-50 px-2 py-0.5 text-[11px] font-medium uppercase tracking-normal text-gray-500">
          QUICK DUMP
        </p>

        <button
          type="button"
          onClick={() => setExpanded((current) => !current)}
          className="shrink-0 rounded-full border border-gray-100 bg-gray-50/80 px-2 py-0.5 text-xs font-medium text-gray-500 transition hover:border-gray-200 hover:bg-white hover:text-gray-700"
          aria-expanded={expanded}
        >
          Inbox: {items.length}
        </button>

        {expanded && (
          <div className="absolute right-0 top-full z-20 mt-2 w-64 max-w-[calc(100vw-3rem)] rounded-xl border border-gray-100 bg-white p-2 shadow-lg">
            {items.length === 0 ? (
              <p className="rounded-lg border border-dashed border-gray-200 bg-gray-50/70 px-3 py-2.5 text-xs leading-5 text-gray-400">
                No captured items yet.
              </p>
            ) : (
              <ul className="max-h-32 space-y-1.5 overflow-y-auto pr-1">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-start justify-between gap-2 rounded-lg border border-gray-100 bg-gray-50/70 px-3 py-1.5"
                  >
                    <span className="min-w-0 break-words text-xs leading-5 text-gray-600">
                      {item.text}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="shrink-0 text-xs text-gray-400 transition hover:text-red-500"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleAdd();
              }
            }}
            placeholder="Capture a loose thought..."
            className="relative z-10 block h-9 min-w-0 flex-1 rounded-lg border border-dashed border-gray-200 bg-gray-50/70 px-3 text-xs text-gray-600 outline-none transition placeholder:text-gray-400 focus:border-gray-300 focus:bg-white"
            aria-label="Quick dump input"
          />

          <button
            type="button"
            onClick={handleAdd}
            className="h-9 self-start rounded-lg bg-blue-500/85 px-3 text-xs font-medium text-white transition hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>
    </DashboardCard>
  );
}
