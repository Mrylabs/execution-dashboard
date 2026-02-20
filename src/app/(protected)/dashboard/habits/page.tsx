"use client";

import { useState } from "react";
import { useHabits } from "@/lib/useHabits";

export default function HabitsPage() {
  const { habits, addHabit, toggleHabitToday } = useHabits();
  const [newHabit, setNewHabit] = useState("");

  function handleAdd() {
    if (!newHabit.trim()) return;
    addHabit(newHabit);
    setNewHabit("");
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Habits</h1>

    <form  onSubmit={(e) => {
        e.preventDefault();
        if (!newHabit.trim()) return;
        handleAdd();
        }}

        className="flex gap-2 mb-6" >
        <input
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="Add a new habit..."
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        />
       <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
            >
            Add
        </button>
    </form>

      <div className="space-y-3">
        {habits.map((habit) => {
          const today = new Date().toISOString().split("T")[0];
          const completed = habit.completedDates.includes(today);

          return (
            <div
              key={habit.id}
              className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200"
            >
              <span className={completed ? "line-through text-gray-400" : ""}>
                {habit.name}
              </span>

              <button
                onClick={() => toggleHabitToday(habit.id)}
                className={`px-3 py-1 rounded-md text-sm ${
                  completed
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {completed ? "Done" : "Mark done"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}