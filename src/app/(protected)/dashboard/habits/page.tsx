"use client";

import { useState } from "react";
import { useHabits } from "@/lib/useHabits";
import HabitItem from "@/components/habits/HabitItem";


export default function HabitsPage() {
  const { habits, addHabit, completeHabit, deleteHabit } = useHabits();
  const [newHabit, setNewHabit] = useState("");

  function handleAdd() {
    if (!newHabit.trim()) return;
    addHabit(newHabit);
    setNewHabit("");
  }

  return (
    <section className="max-w-3xl space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-gray-900">Habits</h1>
        <p className="mt-2 text-gray-500">
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

      {habits.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center">
          <p className="text-sm font-medium text-gray-900">No habits yet</p>
          <p className="mt-2 text-sm text-gray-500">
            Add one routine to start building visible momentum.
          </p>
        </div>
      ) : (
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
      )}
    </section>
  );
}