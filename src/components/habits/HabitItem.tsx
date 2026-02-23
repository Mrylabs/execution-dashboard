"use client";

import { Habit } from "@/lib/habits";
import { getTodayDateString } from "@/lib/date";

type HabitItemProps = {
  habit: Habit;
  onComplete: (id: string) => void;
};

export default function HabitItem({ habit, onComplete }: HabitItemProps) {
  const today = getTodayDateString();
  const isCompletedToday = habit.lastCompletedDate === today;

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200">
      <div className="flex items-center gap-3">
        <span
          className={
            isCompletedToday
              ? "line-through text-gray-400"
              : "text-gray-900"
          }
        >
          {habit.name}
        </span>

        {/* 🔥 Show streak only if > 0 */}
        {habit.currentStreak > 0 && (
          <span className="text-sm text-orange-500">
            🔥 {habit.currentStreak}
          </span>
        )}
      </div>

      <button
        disabled={isCompletedToday}
        onClick={() => onComplete(habit.id)}
        className={`px-3 py-1 rounded-md text-sm transition ${
          isCompletedToday
            ? "bg-green-100 text-green-700 cursor-default"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        {isCompletedToday ? "Done" : "Mark done"}
      </button>
    </div>
  );
}