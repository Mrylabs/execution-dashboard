"use client";

import { useHabits } from "@/lib/useHabits";
import {
  getCurrentWeekDates,
  getWeeklyHabitStats,
  getDailyCompletionCounts,
  getWeeklyCompletionPercentage,
} from "@/lib/analytics";

export default function AnalyticsPage() {
  const { habits, logs, loading, error } = useHabits();

  const weekDates = getCurrentWeekDates();

  const weeklyStats = getWeeklyHabitStats(habits, logs );

  const dailyCounts = getDailyCompletionCounts(logs);

  const weeklyPercentage = getWeeklyCompletionPercentage(
    habits,
    logs
  );

  if (loading) {
    return <div className="p-6">Loading analytics...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Weekly Analytics</h1>
        <p className="text-gray-400">
          Track consistency and execution patterns.
        </p>
      </div>

      <div className="rounded-xl border p-4">
        <h2 className="text-xl font-semibold mb-2">
          Weekly Completion Rate
        </h2>

        <p className="text-4xl font-bold">
          {weeklyPercentage}%
        </p>
      </div>

      <div className="rounded-xl border p-4">
        <h2 className="text-xl font-semibold mb-4">
          Daily Completion Counts
        </h2>

        <div className="space-y-2">
          {dailyCounts.map((day) => (
            <div
              key={day.date}
              className="flex items-center justify-between"
            >
              <span>{day.date}</span>
              <span>{day.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border p-4">
        <h2 className="text-xl font-semibold mb-4">
          Habit Consistency
        </h2>

        <div className="space-y-4">
          {weeklyStats.map((habit) => (
            <div
              key={habit.habitId}
              className="border rounded-lg p-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">
                  {habit.habitName}
                </span>

                <span>
                  {habit.completionRate}%
                </span>
              </div>

              <p className="text-sm text-gray-400 mt-1">
                {habit.completionCount}/7 days completed
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
