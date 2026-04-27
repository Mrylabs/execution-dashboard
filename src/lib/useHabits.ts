"use client";

import { useEffect, useState } from "react";
import { Habit, getHabits, saveHabits } from "./habits";
import { getTodayDateString, getYesterdayDateString } from "./date";

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>(() => {
    if (typeof window === "undefined") return [];
    return getHabits();
  });

  useEffect(() => {
    saveHabits(habits);
  }, [habits]);

  function addHabit(name: string) {
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name,
      createdAt: getTodayDateString(),
      lastCompletedDate: null,
      currentStreak: 0,
    };

    setHabits((prev) => [...prev, newHabit]);
  }

  function completeHabit(id: string) {
    const today = getTodayDateString();
    const yesterday = getYesterdayDateString();

    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id !== id) return habit;

        // Already completed today → do nothing
        if (habit.lastCompletedDate === today) {
          return habit;
        }

        let newStreak = 1;

        // Continue streak if yesterday
        if (habit.lastCompletedDate === yesterday) {
          newStreak = habit.currentStreak + 1;
        }

        return {
          ...habit,
          lastCompletedDate: today,
          currentStreak: newStreak,
        };
      })
    );
  }

  function completedTodayCount() {
    const today = getTodayDateString();
    return habits.filter((h) => h.lastCompletedDate === today).length;
  }

  function deleteHabit(id: string) {
  setHabits((prev) => prev.filter((habit) => habit.id !== id));
  }

  return {
    habits,
    addHabit,
    completeHabit,
    deleteHabit,
    completedTodayCount,
  };
}