"use client";

import { useEffect, useMemo, useState } from "react";
import type { Habit, HabitLog } from "@/types/habit";
import { supabase } from "@/lib/supabase";
import {
  getHabits,
  createHabit,
  deleteHabit as deleteHabitRecord,
  getHabitLogs,
  completeHabitToday,
  uncompleteHabitToday,
} from "@/lib/habitService";
import { getTodayDateString } from "@/lib/date";

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [logs, setLogs] = useState<HabitLog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [fetchedHabits, fetchedLogs] = await Promise.all([
          getHabits(),
          getHabitLogs(),
        ]);

        if (!mounted) return;
        setHabits(fetchedHabits);
        setLogs(fetchedLogs);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  async function addHabit(name: string) {
    const trimmed = name.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;
      if (!user) throw new Error("Not authenticated");

      const newHabit = await createHabit(trimmed, user.id);
      setHabits((prev) => [...prev, newHabit]);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  async function deleteHabit(id: string) {
    setLoading(true);
    setError(null);
    try {
      await deleteHabitRecord(id);
      setHabits((prev) => prev.filter((h) => h.id !== id));
      setLogs((prev) => prev.filter((l) => l.habit_id !== id));
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  async function toggleHabitToday(habitId: string) {
    const today = getTodayDateString();
    const existing = logs.find(
      (l) => l.habit_id === habitId && l.completed_date === today
    );

    setLoading(true);
    setError(null);
    try {
      if (existing) {
        await uncompleteHabitToday(habitId, today);
        setLogs((prev) =>
          prev.filter((l) => !(l.habit_id === habitId && l.completed_date === today))
        );
      } else {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) throw userError;
        if (!user) throw new Error("Not authenticated");

        const newLog = await completeHabitToday(habitId, user.id, today);
        setLogs((prev) => [newLog, ...prev]);
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  const today = getTodayDateString();
  const completedTodayHabitIds = useMemo(() => {
    return new Set(logs.filter((l) => l.completed_date === today).map((l) => l.habit_id));
  }, [logs, today]);

  return {
    habits,
    logs,
    loading,
    error,
    addHabit,
    deleteHabit,
    toggleHabitToday,
    completedTodayHabitIds,
  };
}