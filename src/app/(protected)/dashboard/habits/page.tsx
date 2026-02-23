"use client";

import { useState } from "react";
import { useHabits } from "@/lib/useHabits";
import HabitItem from "@/components/habits/HabitItem";


export default function HabitsPage() {
  const { habits, addHabit, completeHabit } = useHabits();
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
      {habits.map((habit) => (
        <HabitItem
          key={habit.id}
          habit={habit}
          onComplete={completeHabit}
        />
        ))}
      </div>
    </div>
  );
}