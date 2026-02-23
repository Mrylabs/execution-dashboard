"use client";

import { Habit } from "@/lib/habits";
import { getTodayDateString } from "@/lib/date";

type HabitItemProps = {
  habit: Habit;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function HabitItem({ habit, onComplete, onDelete }: HabitItemProps) {
  const today = getTodayDateString();
  const isCompletedToday = habit.lastCompletedDate === today;

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
        isCompletedToday
          ? "bg-green-50 border-green-100 animate-pulse"
          : "bg-white border-gray-200 hover:border-gray-300"
      }`}
    >
      {/* Left side: Name + streak */}
      <div className="flex items-center gap-3">
        <span
          className={`font-medium ${
            isCompletedToday
              ? "line-through text-gray-400"
              : "text-gray-900"
          }`}
        >
          {habit.name}
        </span>

        {habit.currentStreak > 0 && (
          <span className="text-sm font-medium text-orange-500">
            🔥 {habit.currentStreak}
          </span>
        )}
      </div>

      {/* Right side: Button */}
      <div className="flex items-center gap-2">
        <button
            disabled={isCompletedToday}
            onClick={() => onComplete(habit.id)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
            isCompletedToday
                ? "bg-green-100 text-green-700 cursor-default"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
        >
            {isCompletedToday ? "Completed" : "Mark done"}
        </button>

        <button
            onClick={() => onDelete(habit.id)}
            className="text-sm text-gray-400 hover:text-red-500 transition"
        >
            ✕
        </button>
        </div>
    </div>
  );
}