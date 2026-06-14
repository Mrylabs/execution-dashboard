"use client";

import { useHabits } from "@/lib/useHabits";
import {
  getWeekDates,
  getWeeklyCompletionPercentage,
  WEEKDAY_LABELS,
  getDailyScores,
  getStrongestDay,
  getLastFourWeeksSummary,
} from "@/lib/analytics";
import PageShell from "@/components/dashboard/PageShell";
import DashboardCard from "@/components/dashboard/DashboardCard";

function getRecentDateStrings(dayCount: number) {
  const today = new Date();

  return Array.from({ length: dayCount }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (dayCount - 1 - index));

    return date.toISOString().split("T")[0];
  });
}

function getPlaceholderLevel(index: number) {
  if (index % 17 === 0 || index % 23 === 0) return 4;
  if (index % 7 === 0 || index % 13 === 0) return 3;
  if (index % 5 === 0) return 2;
  if (index % 3 === 0) return 1;

  return 0;
}

function getHeatmapCellClass(level: number) {
  if (level >= 4) return "bg-blue-500/85";
  if (level === 3) return "bg-blue-500/65";
  if (level === 2) return "bg-blue-400/45";
  if (level === 1) return "bg-blue-200/70";

  return "border border-gray-200/60 bg-gray-100";
}

function getTrendGlyph(percentage: number) {
  if (percentage >= 75) return "▆";
  if (percentage >= 50) return "▃";
  if (percentage >= 25) return "▂";

  return "▁";
}

function chunkDates(dates: string[], chunkSize: number) {
  return Array.from(
    { length: Math.ceil(dates.length / chunkSize) },
    (_, index) => dates.slice(index * chunkSize, (index + 1) * chunkSize)
  );
}

export default function AnalyticsPage() {
  const { habits, logs, loading, error } = useHabits();

  const weekDates = getWeekDates();
  const strongestDay = getStrongestDay(habits, logs);
  const dailyScores = getDailyScores(habits, logs);
  const ninetyDayDates = getRecentDateStrings(90);
  const heatmapDateGroups = chunkDates(ninetyDayDates, 28);
  const hasNinetyDayHistory = logs.some((log) =>
    ninetyDayDates.includes(log.completed_date)
  );

  const allDailyScoresZero =
    dailyScores.length === 0 || dailyScores.every((day) => day.score === 0);

  const strongestDayLabel =
    strongestDay && !allDailyScoresZero
      ? WEEKDAY_LABELS[
          dailyScores.findIndex((day) => day.date === strongestDay.date)
        ]
      : "–";
  const strongestDayPercentage =
    strongestDay && strongestDay.totalHabits > 0 && !allDailyScoresZero
      ? Math.round((strongestDay.completedCount / strongestDay.totalHabits) * 100)
      : 0;

  const weeklyPercentage = getWeeklyCompletionPercentage(habits, logs);

  const needsAttentionHabit = habits
    .map((habit) => {
      const completionCount = weekDates.filter((date) =>
        logs.some(
          (log) => log.habit_id === habit.id && log.completed_date === date
        )
      ).length;

      return {
        habitId: habit.id,
        habitName: habit.name,
        completionCount,
      };
    })
    .sort((a, b) => a.completionCount - b.completionCount)[0];

  const lastFourWeeksSummary = getLastFourWeeksSummary(habits, logs);
  const trendWeeks = [...lastFourWeeksSummary].reverse();
  const latestTrend = lastFourWeeksSummary[0];
  const trendGlyphs = trendWeeks
    .map((week) => getTrendGlyph(week.percentage))
    .join("");

  if (loading) {
    return <div className="p-6">Loading analytics...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <PageShell tone="analytics" className="space-y-0 !p-3 md:!p-4">
      <DashboardCard className="mr-auto w-fit max-w-full overflow-hidden border-gray-100/50 bg-white shadow-sm">
        <header className="space-y-1 border-b border-gray-100/60 px-4 py-3.5 md:px-5 md:py-4">
          <h1 className="text-2xl font-semibold tracking-normal text-gray-950 md:text-3xl">
            Insights
          </h1>

          <p className="text-sm leading-5 text-gray-500">
            Patterns from your recent execution.
          </p>
        </header>

        <section className="grid border-b border-gray-100/60 divide-y divide-gray-100/60 md:grid-cols-3 md:divide-x md:divide-y-0">
          <div className="p-4 md:px-5 md:py-4">
            <p className="inline-flex rounded-full border border-blue-100/80 bg-blue-50 px-2 py-0.5 text-[11px] font-medium uppercase tracking-normal text-blue-600">
              📈 Consistency
            </p>

            <div className="mt-2 flex items-end justify-between gap-4">
              <div className="min-w-0">
                <p className="text-2xl font-semibold leading-none text-gray-950 md:text-[28px]">
                  {weeklyPercentage}%
                </p>

                <p className="mt-2 text-xs text-gray-500">
                  This week{" "}
                  <span className="font-medium text-gray-700">
                    {latestTrend?.completedCount ?? 0}/
                    {latestTrend?.totalPossibleCompletions ?? 0}
                  </span>
                </p>
              </div>

              <div className="shrink-0 text-right">
                <p className="text-2xl font-semibold leading-none tracking-normal text-blue-500/80">
                  {trendGlyphs}
                </p>

                <p className="mt-2 text-xs text-gray-500">Last four weeks</p>
              </div>
            </div>
          </div>

          <div className="px-4 py-5 text-left md:px-5 md:py-4 md:text-center">
            <p className="inline-flex rounded-full border border-yellow-100/80 bg-yellow-50 px-2 py-0.5 text-[11px] font-medium uppercase tracking-normal text-yellow-700 md:mx-auto">
              💪 Strongest Day
            </p>

            <div className="mt-3 flex items-center justify-between gap-6 md:justify-center">
              <div className="min-w-0 text-left md:text-center">
                <p className="truncate text-xl font-semibold leading-none text-gray-950 md:text-2xl">
                  {strongestDayLabel}
                </p>

                <p className="mt-1 text-[10px] text-gray-400 md:text-xs">
                  {strongestDay
                    ? `${strongestDay.completedCount}/${strongestDay.totalHabits} habits`
                    : "No data"}
                </p>
              </div>

              <div className="relative h-12 w-12 shrink-0 text-amber-600/70">
                <svg
                  className="h-12 w-12 -rotate-90"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <circle
                    cx="24"
                    cy="24"
                    r="19"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-amber-100"
                  />
                  <circle
                    cx="24"
                    cy="24"
                    r="19"
                    fill="none"
                    pathLength="100"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray={`${strongestDayPercentage} 100`}
                  />
                </svg>

                <span className="absolute inset-0 flex items-center justify-center text-[9px] font-medium leading-none text-amber-700/70">
                  {strongestDayPercentage}%
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 md:px-5 md:py-4">
            <p className="inline-flex rounded-full border border-gray-200/80 bg-gray-50 px-2 py-0.5 text-[11px] font-medium uppercase tracking-normal text-gray-500">
              🥀 Needs Attention
            </p>

            <p className="mt-2 truncate text-xl font-semibold leading-none text-gray-950 md:text-2xl">
              {needsAttentionHabit ? needsAttentionHabit.habitName : "–"}
            </p>

            <p className="mt-1 text-[10px] text-gray-400 md:text-xs">
              {needsAttentionHabit
                ? `${needsAttentionHabit.completionCount}/7 days`
                : "No habits"}
            </p>
          </div>
        </section>

        <section>
          <div className="grid divide-y divide-gray-100/60 lg:grid-cols-2 lg:divide-x lg:divide-y-0">
            <div className="flex min-h-44 flex-col p-4">
              <div className="flex items-center justify-center">
                <p className="inline-flex rounded-full border border-blue-100/80 bg-blue-50 px-2 py-0.5 text-[11px] font-medium tracking-normal text-blue-600">
                  📊 Daily Rhythm
                </p>
              </div>

              <div className="relative mx-auto mt-auto w-full max-w-sm pt-4">
                <div className="absolute left-0 right-0 bottom-0 h-px bg-gray-200/70" />

                <div className="relative grid grid-cols-7 items-end gap-2">
                  {dailyScores.map((day, index) => {
                    const barHeight = Math.max(day.score, 6);

                    return (
                      <div
                        key={day.date}
                        className="flex min-w-0 flex-col items-center gap-0.5"
                      >
                        <p className="text-[10px] leading-none text-gray-400">
                          {day.score}%
                        </p>

                        <div className="flex h-32 w-8 items-end justify-center rounded-full bg-gray-100/80">
                          <div
                            className="w-5 rounded-full bg-blue-500/80 transition-all"
                            style={{ height: `${barHeight}%` }}
                          />
                        </div>

                        <p className="text-[11px] font-medium text-gray-600">
                          {WEEKDAY_LABELS[index]}
                        </p>

                        <p className="truncate text-[10px] leading-none text-gray-400">
                          {day.completedCount}/{day.totalHabits}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="min-w-0 p-4">
              <div className="flex items-center justify-center">
                <p className="inline-flex rounded-full border border-blue-100/80 bg-blue-50 px-2 py-0.5 text-[11px] font-medium tracking-normal text-blue-600">
                  🗓️ 90-Day Memory
                </p>
              </div>

              <div className="overflow-x-auto pb-1 pt-4 text-center">
                <div className="mx-auto flex w-fit gap-2 pr-2">
                  {heatmapDateGroups.map((dateGroup, groupIndex) => (
                    <div
                      key={`heatmap-group-${groupIndex}`}
                      className="grid grid-flow-col grid-rows-7 gap-1.5"
                    >
                      {dateGroup.map((date) => {
                        const dateIndex = ninetyDayDates.indexOf(date);
                        const completedCount = logs.filter(
                          (log) => log.completed_date === date
                        ).length;
                        const percentage =
                          habits.length === 0
                            ? 0
                            : Math.round((completedCount / habits.length) * 100);
                        const level = hasNinetyDayHistory
                          ? Math.ceil(percentage / 25)
                          : getPlaceholderLevel(dateIndex);

                        return (
                          <div
                            key={date}
                            title={`${date} · ${
                              hasNinetyDayHistory
                                ? `${completedCount}/${habits.length} habits`
                                : "Generated preview"
                            }`}
                            className={`h-3.5 w-3.5 rounded-[4px] ${getHeatmapCellClass(
                              level
                            )}`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </DashboardCard>
    </PageShell>
  );
}
