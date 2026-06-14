"use client";

import PageShell from "@/components/dashboard/PageShell";
import CompletedTodayCard from "@/components/Today/CompletedTodayCard";
import FocusThreeCard from "@/components/Today/FocusThreeCard";
import HabitsSnapshotCard from "@/components/Today/HabitsSnapshotCard";
import QuickDumpCard from "@/components/Today/QuickDumpCard";
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
    <PageShell tone="default" className="space-y-1 !p-3 md:!p-4">
      <TodayHeader
        greeting={getGreeting()}
        reminder={personalization.personalReminder}
        cycleRhythm={personalization.cycleRhythm}
        onSaveReminder={updatePersonalReminder}
        onSaveCycleRhythm={updateCycleRhythm}
      />

      <section className="-mt-4 grid gap-3 lg:grid-cols-[1.1fr_1fr] lg:grid-rows-[auto_auto] lg:items-stretch">
        <div className="order-1 h-full lg:col-start-1 lg:row-start-1">
          <WeeklyStoryCard
            weeklyStory={personalization.weeklyStory}
            weeklyHabitPercentage={weeklyHabitPercentage}
            onSaveWeeklyStory={updateWeeklyStory}
          />
        </div>

        <div className="order-2 h-full lg:col-start-2 lg:row-start-1">
          <FocusThreeCard
            tasks={focusTasks}
            activeTaskCount={activeTasks.length}
          />
        </div>

        <div className="order-3 grid gap-3 sm:grid-cols-2 lg:col-start-1 lg:row-start-2">
          <div className="h-full">
            <HabitsSnapshotCard
              completedToday={completedTodayHabitIds.size}
              totalHabits={habits.length}
            />
          </div>

          <div className="h-full">
            <CompletedTodayCard completedCount={completedTaskCount} />
          </div>
        </div>

        <div className="order-4 h-full lg:col-start-2 lg:row-start-2">
          <QuickDumpCard />
        </div>
      </section>
    </PageShell>
  );
}
