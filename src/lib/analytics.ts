import type { Habit, HabitLog } from "@/types/habit";

export function getCurrentWeekDates() {
  const today = new Date();
  const day = today.getDay();

  const diffToMonday = day === 0 ? -6 : 1 - day;

  const monday = new Date(today);
  monday.setDate(today.getDate() + diffToMonday);

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);

    return date.toISOString().split("T")[0];
  });
}

export function getWeeklyHabitStats(habits: Habit[], habitLogs: HabitLog[]) {
  const weekDates = getCurrentWeekDates();

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
  const weekDates = getCurrentWeekDates();

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
  const weekDates = getCurrentWeekDates();
  const totalPossibleCompletions = habits.length * weekDates.length;

  if (totalPossibleCompletions === 0) return 0;

  const completedThisWeek = habitLogs.filter((log) =>
    weekDates.includes(log.completed_date)
  ).length;

  return Math.round((completedThisWeek / totalPossibleCompletions) * 100);
}
