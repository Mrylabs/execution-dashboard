"use client";

import { useState } from "react";
import { useHabits } from "@/lib/useHabits";
import HabitItem from "@/components/habits/HabitItem";


export default function HabitsPage() {
  const { habits, loading, error, addHabit, deleteHabit, toggleHabitToday, completedTodayHabitIds } = useHabits();
  const [newHabit, setNewHabit] = useState("");

  async function handleAdd() {
    if (!newHabit.trim()) return;
    await addHabit(newHabit);
    // Clear input only if no error
    if (!error) setNewHabit("");
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Habits</h1>

    <form  onSubmit={(e) => {
        e.preventDefault();
        if (!newHabit.trim()) return;
        handleAdd();
        }}
        className="flex gap-3"
      >
        <input
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="Add a new habit..."
          className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
        />

        <button
          type="submit"
          className="rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-700"
        >
          Add
        </button>
      </form>

     <div className="space-y-3">
      {habits.map((habit) => (
        <HabitItem
          key={habit.id}
          habit={habit}
          onComplete={completeHabit}
          onDelete={deleteHabit}
        />
        ))}
      </div>

      {habits.length === 0 && (
        <p className="text-gray-500 text-sm mt-4">
          No habits yet. Start building momentum.
        </p>
      )}
    </section>
  );
}