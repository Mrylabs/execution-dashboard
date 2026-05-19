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
import Link from "next/link";
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

  const activeTasks = tasks.filter((task) => !task.completed);
  const focusTasks = activeTasks.slice(0, 2);

  return (
    <section className="max-w-4xl space-y-8">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-semibold text-gray-900">
          Execution Overview
        </h1>
      </header>

      {/* Summary */}
      <section className="grid gap-6 md:grid-cols-2">
        <Link href="/dashboard/tasks">
          <div className="cursor-pointer">
            <SummaryCard
              title="Tasks"
              value={`${completedTasks}/${totalTasks}`}
              subtitle="completed"
            />
          </div>
        </Link>

       <Link href="/dashboard/habits">
          <div className="cursor-pointer">
            <SummaryCard
              title="Habits"
              value={totalHabits === 0 ? "0/0" : `${completedHabits}/${totalHabits}`}
              subtitle={totalHabits === 0 ? "no habits yet" : "completed today"}
            />
          </div>
        </Link>
      </section>

      {/* Today's Focus */}
      <section className="space-y-4">
        <h2 className="text-sm font-medium text-gray-500">
          Today’s Focus
        </h2>

        {focusTasks.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-sm text-gray-500">
            No active tasks. Add one from Tasks to get started.
          </div>
        ) : (
          <div className="space-y-3">
            {focusTasks.map((task) => (
              <div
                key={task.id}
                className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm"
              >
                {task.title}
              </div>
            ))}
          </div>
        )}
      </section>
    </section>
  );
>>>>>>> d58c440 (feat: improve dashboard UX, add topbar date/time, refine tasks interactions)
}