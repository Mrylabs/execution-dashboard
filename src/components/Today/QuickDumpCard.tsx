"use client";

import { useEffect, useState } from "react";
import TodayCard from "./TodayCard";
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
    <TodayCard
      title="Quick Dump"
      eyebrow="Capture"
      accent="slate"
      prominence="compact"
      className="h-full md:col-span-3 lg:col-span-4"
    >
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
            className="relative z-10 block h-8 min-w-0 flex-1 rounded-lg border border-dashed border-gray-200 bg-gray-50/70 px-3 text-xs text-gray-600 outline-none transition placeholder:text-gray-400 focus:border-gray-300 focus:bg-white"
            aria-label="Quick dump input"
          />

          <button
            type="button"
            onClick={handleAdd}
            className="h-8 self-start rounded-lg bg-gray-900 px-3 text-xs font-medium text-white transition hover:bg-gray-700"
          >
            Add
          </button>
        </div>

        <button
          type="button"
          onClick={() => setExpanded((current) => !current)}
          className="flex w-full items-center justify-between rounded-lg px-1 py-0.5 text-xs text-gray-500 transition hover:text-gray-700"
          aria-expanded={expanded}
        >
          <span>Captured items ({items.length})</span>
          <span aria-hidden="true">{expanded ? "v" : ">"}</span>
        </button>

        {expanded && (
          items.length === 0 ? (
            <p className="rounded-lg border border-dashed border-gray-200 bg-gray-50/70 px-3 py-2.5 text-xs leading-5 text-gray-400">
              Nothing floating around yet.
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
          )
        )}
      </div>
    </TodayCard>
  );
}
