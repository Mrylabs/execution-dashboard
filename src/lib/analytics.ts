import type { Habit, HabitLog } from "@/types/habit";

export const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Returns an array of ISO date strings for a Monday-based week.
// `offset` shifts weeks by multiples of 1 week (e.g. -1 = previous week, 1 = next week).
export function getWeekDates(offset = 0) {
  const today = new Date();

  // Shift by full weeks first
  const target = new Date(today);
  target.setDate(today.getDate() + offset * 7);

  const day = target.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;

  const monday = new Date(target);
  monday.setDate(target.getDate() + diffToMonday);

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);

    return date.toISOString().split("T")[0];
  });
}

export function getWeeklyHabitStats(habits: Habit[], habitLogs: HabitLog[]) {
  const weekDates = getWeekDates();

  return habits.map((habit) => {
    const completedDates = weekDates.filter((date) =>
      habitLogs.some(
        (log) => log.habit_id === habit.id && log.completed_date === date
      )
    );

    return {
      habitId: habit.id,
      habitName: habit.name,
      completedDates,
      completionCount: completedDates.length,
      completionRate: Math.round((completedDates.length / 7) * 100),
    };
  });
}

export function getDailyCompletionCounts(habitLogs: HabitLog[]) {
  const weekDates = getWeekDates();

  return weekDates.map((date) => {
    const count = habitLogs.filter((log) => log.completed_date === date).length;

    return {
      date,
      count,
    };
  });
}

export function getWeeklyCompletionPercentage(
  habits: Habit[],
  habitLogs: HabitLog[]
) {
  const weekDates = getWeekDates();
  const totalPossibleCompletions = habits.length * weekDates.length;

  if (totalPossibleCompletions === 0) return 0;

  const completedThisWeek = habitLogs.filter((log) =>
    weekDates.includes(log.completed_date)
  ).length;

  return Math.round((completedThisWeek / totalPossibleCompletions) * 100);
}

export function isHabitCompletedOnDate(
  habitId: string,
  date: string,
  habitLogs: HabitLog[]
) {
  return habitLogs.some(
    (log) => log.habit_id === habitId && log.completed_date === date
  );
}

export function getDailyScores(habits: Habit[], habitLogs: HabitLog[]) {
  const weekDates = getWeekDates();

  return weekDates.map((date) => {
    const completedCount = habitLogs.filter(
      (log) => log.completed_date === date
    ).length;

    const totalHabits = habits.length;

    const score =
      totalHabits === 0
        ? 0
        : Math.round((completedCount / totalHabits) * 100);

    return {
      date,
      completedCount,
      totalHabits,
      score,
    };
  });
}
export function getStrongestDay(habits: Habit[], habitLogs: HabitLog[]) {
  const dailyScores = getDailyScores(habits, habitLogs);

  if (dailyScores.length === 0) return null;

  return dailyScores.reduce((best, current) =>
    current.score > best.score ? current : best
  );
}

export function getMostConsistentHabit(
  habits: Habit[],
  habitLogs: HabitLog[]
) {
  const weeklyStats = getWeeklyHabitStats(habits, habitLogs);

  if (weeklyStats.length === 0) return null;

  return weeklyStats.reduce((best, current) =>
    current.completionRate > best.completionRate ? current : best
  );
}

export function getLastFourWeeksSummary(
  habits: Habit[],
  habitLogs: HabitLog[]
) {
  return Array.from({ length: 4 }, (_, index) => {
    const offset = -index;

    const weekDates = getWeekDates(offset);

    const totalPossibleCompletions =
      habits.length * weekDates.length;

    const completedCount = habitLogs.filter((log) =>
      weekDates.includes(log.completed_date)
    ).length;

    const percentage =
      totalPossibleCompletions === 0
        ? 0
        : Math.round(
            (completedCount / totalPossibleCompletions) * 100
          );

    return {
      label:
        offset === 0
          ? "This Week"
          : `${Math.abs(offset)} Week${Math.abs(offset) > 1 ? "s" : ""} Ago`,
      percentage,
      completedCount,
      totalPossibleCompletions,
    };
  });
}