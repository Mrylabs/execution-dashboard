<<<<<<< HEAD
"use client";
import { useHabits } from "@/lib/useHabits";
import SummaryCard from "@/components/Today/SummaryCard";
import { useTasks }  from "@/lib/useTasks"; 

export default function DashboardPage() {
  const { tasks } = useTasks();
  const { habits, logs, completedTodayHabitIds } = useHabits();

  const weeklyHabitCompletionPercentage = getWeeklyCompletionPercentage(
    habits,
    logs
  );
  const completedTodayCount = completedTodayHabitIds.size;

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  const totalHabits = habits.length;
  const completedHabits = completedTodayCount();

  return (
    <section>
      <header>
        <h1>Today</h1>
        <p>Monday, Feb 9</p>
      </header>

      <section>
        <SummaryCard
          title="Tasks"
          value={`${completedTasks} of ${totalTasks} completed`}
        />
        <SummaryCard
          title="Habits"
          value={
            totalHabits === 0
              ? "No habits yet"
              : `${completedHabits} of ${totalHabits} today`
          }
        />
      </section>

      {/* analytics */}
      <Link href="/dashboard/analytics">
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-medium text-gray-500">
                Weekly Progress
              </h2>
              <p className="text-xs text-gray-400">
                Habit completion across this week
              </p>
            </div>

            <span className="text-lg font-semibold text-gray-900">
              {weeklyHabitCompletionPercentage}%
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-blue-500 transition-all"
              style={{ width: `${weeklyHabitCompletionPercentage}%` }}
            />
          </div>
        </section>
      </Link>
    </section>
  );
=======
"use client";

import { useHabits } from "@/lib/useHabits";
import SummaryCard from "@/components/Today/SummaryCard";
import { useTasks } from "@/lib/useTasks";

export default function DashboardPage() {
  const { tasks } = useTasks();
  const { habits, completedTodayCount } = useHabits();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  const totalHabits = habits.length;
  const completedHabits = completedTodayCount();

  const todayLabel = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  }).format(new Date());

  return (
    <section className="max-w-4xl space-y-8">
      <header>
        <h1 className="mt-2 text-3xl font-semibold text-gray-900">
          Execution Overview
        </h1>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <SummaryCard
          title="Tasks"
          value={`${completedTasks}/${totalTasks}`}
          subtitle="completed"
        />

        <SummaryCard
          title="Habits"
          value={totalHabits === 0 ? "0/0" : `${completedHabits}/${totalHabits}`}
          subtitle={totalHabits === 0 ? "no habits yet" : "completed today"}
        />
      </section>
    </section>
  );
>>>>>>> d58c440 (feat: improve dashboard UX, add topbar date/time, refine tasks interactions)
}