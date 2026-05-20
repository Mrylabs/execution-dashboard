"use client";

import { useHabits } from "@/lib/useHabits";
import {
  getCurrentWeekDates,
  getWeeklyCompletionPercentage,
  WEEKDAY_LABELS,
  isHabitCompletedOnDate,
  getDailyScores,
  getStrongestDay,
  getMostConsistentHabit,
} from "@/lib/analytics";

export default function AnalyticsPage() {
  const { habits, logs, loading, error } = useHabits();

  const weekDates = getCurrentWeekDates();
  const strongestDay = getStrongestDay(habits, logs);
  const mostConsistentHabit = getMostConsistentHabit(habits, logs);
  const dailyScores = getDailyScores(habits, logs);

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
    <div className="space-y-5 p-4 md:space-y-6 md:p-6">
      <div>
        <h1 className="text-3xl font-bold">Weekly Analytics</h1>
        <p className="text-gray-400">
          Track consistency and execution patterns.
        </p>
      </div>

      <section className="grid grid-cols-3 gap-2 md:gap-4">
        <div className="rounded-xl border bg-white p-3 shadow-sm md:p-5">
          <p className="text-[11px] font-medium text-gray-500 md:text-sm">
            Weekly
          </p>
          <p className="mt-1 text-xl font-bold text-gray-900 md:mt-2 md:text-3xl">
            {weeklyPercentage}%
          </p>
        </div>

        <div className="rounded-xl border bg-white p-3 shadow-sm md:p-5">
          <p className="text-[11px] font-medium text-gray-500 md:text-sm">
            Best Day
          </p>
          <p className="mt-1 truncate text-xl font-bold text-gray-900 md:mt-2 md:text-3xl">
            {strongestDay
              ? WEEKDAY_LABELS[dailyScores.findIndex((day) => day.date === strongestDay.date)]
              : "—"}
          </p>
          <p className="mt-1 text-[10px] text-gray-400 md:text-xs">
            {strongestDay
              ? `${strongestDay.completedCount}/${strongestDay.totalHabits} habits`
              : "No data"}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-3 shadow-sm md:p-5">
          <p className="text-[11px] font-medium text-gray-500 md:text-sm">
            Best Habit
          </p>
          <p className="mt-1 truncate text-xl font-bold text-gray-900 md:mt-2 md:text-3xl">
            {mostConsistentHabit ? mostConsistentHabit.habitName : "—"}
          </p>
          <p className="mt-1 text-[10px] text-gray-400 md:text-xs">
            {mostConsistentHabit
              ? `${mostConsistentHabit.completionCount}/7 days`
              : "No habits"}
          </p>
        </div>
      </section>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          Daily Scores
        </h2>

        <div className="space-y-4">
          {dailyScores.map((day, index) => (
            <div key={day.date}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  {WEEKDAY_LABELS[index]}
                </span>

                <span className="font-medium text-gray-900">
                  {day.score}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-blue-500 transition-all"
                  style={{ width: `${day.score}%` }}
                />
              </div>

              <p className="mt-1 text-xs text-gray-400">
                {day.completedCount}/{day.totalHabits} habits completed
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">
          Weekly Habit Grid
        </h2>

        <div className="overflow-x-auto">
          <div className="min-w-[700px]">
            {/* Header */}
            <div className="mb-4 grid grid-cols-8 gap-2">
              <div className="text-sm font-medium text-gray-500">
                Habit
              </div>

              {WEEKDAY_LABELS.map((label) => (
                <div
                  key={label}
                  className="text-center text-sm font-medium text-gray-500"
                >
                  {label}
                </div>
              ))}
            </div>

            {/* Habit rows */}
            <div className="space-y-3">
              {habits.map((habit) => (
                <div
                  key={habit.id}
                  className="grid grid-cols-8 gap-2 items-center"
                >
                  <div className="truncate text-sm font-medium text-gray-800">
                    {habit.name}
                  </div>

                  {weekDates.map((date) => {
                    const completed = isHabitCompletedOnDate(
                      habit.id,
                      date,
                      logs
                    );

                    return (
                      <div
                        key={date}
                        className={`flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-semibold transition ${
                          completed
                            ? "border-blue-200 bg-blue-500 text-white"
                            : "border-gray-200 bg-gray-50 text-gray-400"
                        }`}
                      >
                        {completed ? "✓" : "—"}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}