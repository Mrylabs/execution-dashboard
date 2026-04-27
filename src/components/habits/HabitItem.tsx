"use client";

import { Habit } from "@/lib/habits";
import { getTodayDateString } from "@/lib/date";

type HabitItemProps = {
  habit: Habit;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function HabitItem({
  habit,
  onComplete,
  onDelete,
}: HabitItemProps) {
  const today = getTodayDateString();
  const isCompletedToday = habit.lastCompletedDate === today;

  return (
    <div
      className={`group flex items-center justify-between rounded-2xl border bg-white px-4 py-4 shadow-sm transition ${
        isCompletedToday
          ? "border-green-100 bg-green-50"
          : "border-gray-200 hover:shadow-md"
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`text-sm font-medium ${
            isCompletedToday ? "text-gray-400 line-through" : "text-gray-900"
          }`}
        >
          {habit.name}
        </span>

        {habit.currentStreak > 0 && (
          <span className="rounded-full bg-orange-50 px-2 py-0.5 text-xs font-medium text-orange-600">
            🔥 {habit.currentStreak}
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          disabled={isCompletedToday}
          onClick={() => onComplete(habit.id)}
          className={`rounded-xl px-4 py-2 text-xs font-medium transition ${
            isCompletedToday
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {isCompletedToday ? "Completed" : "Mark done"}
        </button>

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