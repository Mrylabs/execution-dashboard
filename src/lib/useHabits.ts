"use client";

import { useEffect, useRef, useState } from "react";
import { Habit, getHabits, saveHabits } from "./habits";

function todayString() {
  return new Date().toISOString().split("T")[0];
}

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
      completedDates: [],
    };

    setHabits((prev) => [...prev, newHabit]);
  }

  function toggleHabitToday(id: string) {
    const today = todayString();

    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id !== id) return habit;

        const alreadyDone = habit.completedDates.includes(today);

        return {
          ...habit,
          completedDates: alreadyDone
            ? habit.completedDates.filter((d) => d !== today)
            : [...habit.completedDates, today],
        };
      })
    );
  }

  function completedTodayCount() {
    const today = todayString();
    return habits.filter((h) => h.completedDates.includes(today)).length;
  }

  return {
    habits,
    addHabit,
    toggleHabitToday,
    completedTodayCount,
  };
}