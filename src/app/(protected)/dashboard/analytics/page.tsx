"use client";
import { useState } from "react";
import { useHabits } from "@/lib/useHabits";
import {
  getWeekDates,
  getWeeklyCompletionPercentage,
  WEEKDAY_LABELS,
  isHabitCompletedOnDate,
  getDailyScores,
  getStrongestDay,
  getMostConsistentHabit,
  getLastFourWeeksSummary,
} from "@/lib/analytics";
import PageShell from "@/components/dashboard/PageShell";
import PageHeader from "@/components/dashboard/PageHeader";
import DashboardCard from "@/components/dashboard/DashboardCard";

export default function AnalyticsPage() {
  const { habits, logs, loading, error } = useHabits();

  const weekDates = getWeekDates();
  const strongestDay = getStrongestDay(habits, logs);
  const mostConsistentHabit = getMostConsistentHabit(habits, logs);
  const dailyScores = getDailyScores(habits, logs);
  const [showDailyScores, setShowDailyScores] = useState(false);

  const allDailyScoresZero =
    dailyScores.length === 0 || dailyScores.every((d) => d.score === 0);

  const strongestDayLabel = !strongestDay || allDailyScoresZero
    ? "—"
    : WEEKDAY_LABELS[
        dailyScores.findIndex((day) => day.date === strongestDay.date)
      ];

  const weeklyPercentage = getWeeklyCompletionPercentage(
    habits,
    logs
  );

  const lastFourWeeksSummary = getLastFourWeeksSummary(habits, logs);

  if (loading) {
    return <div className="p-6">Loading analytics...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <PageShell tone="analytics">
      <PageHeader
        title="Weekly Analytics"
        description="Track consistency and execution patterns."
      />
      <section className="grid grid-cols-3 gap-2 md:gap-4">
        <DashboardCard className="p-3 md:p-5">
          <p className="text-[11px] font-medium text-gray-500 md:text-sm">
            Weekly
          </p>

          <p className="mt-1 text-xl font-bold text-gray-900 md:mt-2 md:text-3xl">
            {weeklyPercentage}%
          </p>
        </DashboardCard>

        <DashboardCard className="p-3 md:p-5">
          <p className="text-[11px] font-medium text-gray-500 md:text-sm">
            Best Day
          </p>

          <p className="mt-1 truncate text-xl font-bold text-gray-900 md:mt-2 md:text-3xl">
            {strongestDayLabel}
          </p>

          <p className="mt-1 text-[10px] text-gray-400 md:text-xs">
            {strongestDay
              ? `${strongestDay.completedCount}/${strongestDay.totalHabits} habits`
              : "No data"}
          </p>
        </DashboardCard>

        <DashboardCard className="p-3 md:p-5">
          <p className="text-[11px] font-medium text-gray-500 md:text-sm">
            Best Habit
          </p>

          <p className="mt-1 truncate text-xl font-bold text-gray-900 md:mt-2 md:text-3xl">
            {mostConsistentHabit
              ? mostConsistentHabit.habitName
              : "—"}
          </p>

          <p className="mt-1 text-[10px] text-gray-400 md:text-xs">
            {mostConsistentHabit
              ? `${mostConsistentHabit.completionCount}/7 days`
              : "No habits"}
          </p>
        </DashboardCard>
      </section>

      <DashboardCard className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Daily Scores</h2>
          <button
            type="button"
            onClick={() => setShowDailyScores((s) => !s)}
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            {showDailyScores ? "Hide" : "Show"}
          </button>
        </div>

        {showDailyScores && (
          <div className="space-y-4">
            {dailyScores.map((day, index) => (
              <div key={day.date}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-gray-600">{WEEKDAY_LABELS[index]}</span>

                  <span className="font-medium text-gray-900">{day.score}%</span>
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
        )}
      </DashboardCard>

      <DashboardCard className="p-6">
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
      </DashboardCard>
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Weekly Archive
          </h2>

          <p className="text-sm text-gray-400">
            Consistency trends across recent weeks.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-4">
          {lastFourWeeksSummary.map((week) => (
            <DashboardCard
              key={week.label}
              className="p-4"
            >
              <p className="text-sm font-medium text-gray-500">
                {week.label}
              </p>

              <p className="mt-2 text-2xl font-bold text-gray-900">
                {week.percentage}%
              </p>

              <p className="mt-1 text-xs text-gray-400">
                {week.completedCount}/
                {week.totalPossibleCompletions} completions
              </p>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-blue-500 transition-all"
                  style={{ width: `${week.percentage}%` }}
                />
              </div>
            </DashboardCard>
          ))}
        </div>
      </div>
    </PageShell>
  );
}