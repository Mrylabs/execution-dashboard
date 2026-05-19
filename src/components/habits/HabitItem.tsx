"use client";

import { Habit } from "@/types/habit";

type HabitItemProps = {
  habit: Habit;
  completedToday: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function HabitItem({ habit, completedToday, onToggle, onDelete }: HabitItemProps) {
  const isCompleted = completedToday;

  return (
    <div
      className={`group flex items-center justify-between rounded-2xl border bg-white px-4 py-4 shadow-sm transition ${
        isCompleted ? "border-green-100 bg-green-50" : "border-gray-200 hover:shadow-md"
      }`}
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => onToggle(habit.id)}
          className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
        />

        <span
          className={`text-sm font-medium ${
            isCompleted ? "text-gray-400 line-through" : "text-gray-900"
          }`}
        >
          {habit.name}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onDelete(habit.id)}
          className="text-xs text-gray-400 opacity-0 transition hover:text-red-500 group-hover:opacity-100"
        >
          Delete
        </button>
      </div>
    </div>
  );
}