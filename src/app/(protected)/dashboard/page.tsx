"use client";

import PageShell from "@/components/dashboard/PageShell";
import CompletedTodayCard from "@/components/Today/CompletedTodayCard";
import FocusThreeCard from "@/components/Today/FocusThreeCard";
import HabitsSnapshotCard from "@/components/Today/HabitsSnapshotCard";
import QuickDumpCard from "@/components/Today/QuickDumpCard";
import TodayGrid from "@/components/Today/TodayGrid";
import TodayHeader from "@/components/Today/TodayHeader";
import WeeklyStoryCard from "@/components/Today/WeeklyStoryCard";
import { getWeeklyCompletionPercentage } from "@/lib/analytics";
import { useTodayPersonalization } from "@/lib/useTodayPersonalization";
import { useHabits } from "@/lib/useHabits";
import { useTasks } from "@/lib/useTasks";

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning.";
  if (hour < 18) return "Good afternoon.";
  return "Good evening.";
}

export default function DashboardPage() {
  const { tasks } = useTasks();
  const { habits, logs, completedTodayHabitIds } = useHabits();
  const {
    personalization,
    updateWeeklyStory,
    updatePersonalReminder,
    updateCycleRhythm,
  } = useTodayPersonalization();

  const todayDate = new Date().toDateString();
  const activeTasks = tasks.filter((task) => task.status === "active");
  const focusTasks = [
    ...activeTasks.filter(
      (task) => !task.completed && task.priority === "high"
    ),
    ...activeTasks.filter(
      (task) => !task.completed && task.priority === "medium"
    ),
    ...activeTasks.filter(
      (task) => !task.completed && task.priority === "low"
    ),
  ]
    .slice(0, 3)
    .map((task) => task.title);
  const completedTaskCount = tasks.filter((task) => {
    if (task.status !== "completed" || !task.completed_at) return false;

    return new Date(task.completed_at).toDateString() === todayDate;
  }).length;
  const weeklyHabitPercentage = getWeeklyCompletionPercentage(habits, logs);

  return (
    <PageShell tone="default">
      <TodayHeader
        greeting={getGreeting()}
        reminder={personalization.personalReminder}
        cycleRhythm={personalization.cycleRhythm}
        onSaveReminder={updatePersonalReminder}
        onSaveCycleRhythm={updateCycleRhythm}
      />

      <TodayGrid>
        <WeeklyStoryCard
          weeklyStory={personalization.weeklyStory}
          weeklyHabitPercentage={weeklyHabitPercentage}
          onSaveWeeklyStory={updateWeeklyStory}
        />
        <FocusThreeCard
          tasks={focusTasks}
          activeTaskCount={activeTasks.length}
        />
        <HabitsSnapshotCard
          completedToday={completedTodayHabitIds.size}
          totalHabits={habits.length}
        />
        <CompletedTodayCard completedCount={completedTaskCount} />
        <QuickDumpCard />
      </TodayGrid>
    </PageShell>
  );
}
