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
    <section className="mr-auto max-w-5xl space-y-6 rounded-3xl bg-amber-50/40 p-4 md:p-6">
      <header>
        <h1 className="text-3xl font-bold">Habits</h1>
        <p className="text-gray-400">
          Track the routines that keep your execution system alive.
        </p>
      </header>

      <form
        onSubmit={(e) => {
          e.preventDefault();
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

      {loading ? (
        <div className="rounded-2xl border border-gray-300 bg-white p-8 text-center">Loading habits...</div>
      ) : error ? (
        <div className="rounded-2xl border border-red-300 bg-white p-8 text-center">
          <p className="text-sm font-medium text-red-600">{error}</p>
        </div>
      ) : habits.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center">
          <p className="text-sm font-medium text-gray-900">No habits yet</p>
          <p className="mt-2 text-sm text-gray-500">
            Add one routine to start building visible momentum.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {habits.map((habit) => {
            const completedToday = completedTodayHabitIds.has(habit.id);
            return (
              <HabitItem
                key={habit.id}
                habit={habit}
                completedToday={completedToday}
                onToggle={toggleHabitToday}
                onDelete={deleteHabit}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}