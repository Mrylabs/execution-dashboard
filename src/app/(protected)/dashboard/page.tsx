"use client";
import Link from "next/link";
import { useHabits } from "@/lib/useHabits";
import SummaryCard from "@/components/Today/SummaryCard";
import { useTasks } from "@/lib/useTasks";
import { getWeeklyCompletionPercentage } from "@/lib/analytics";
import PageShell from "@/components/dashboard/PageShell";
import PageHeader from "@/components/dashboard/PageHeader";
import { useJobs } from "@/lib/useJobs";

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
  const completedHabits = completedTodayCount;

  const activeTasks = tasks.filter((task) => !task.completed);
  const focusTasks = activeTasks.slice(0, 2);

  const { jobs } = useJobs();

  const activeJobs = jobs.filter((job) => job.status !== "rejected");
  const appliedJobs = jobs.filter((job) => job.status === "applied").length;

  return (
    <PageShell tone="analytics">
      {/* Header */}
      <PageHeader title="Execution Overview" />

      {/* Summary */}
      <section className="flex gap-3 overflow-x-auto pb-1 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible">
        <Link href="/dashboard/tasks">
          <div className="min-w-[140px] flex-1 md:min-w-0 cursor-pointer">
            <SummaryCard
              title="Tasks"
              value={`${completedTasks}/${totalTasks}`}
              subtitle="completed"
            />
          </div>
        </Link>

       <Link href="/dashboard/habits">
          <div className="min-w-[140px] flex-1 md:min-w-0 cursor-pointer">
            <SummaryCard
              title="Habits"
              value={totalHabits === 0 ? "0/0" : `${completedHabits}/${totalHabits}`}
              subtitle={totalHabits === 0 ? "no habits yet" : "completed today"}
            />
          </div>
        </Link>
      
       <Link href="/dashboard/jobs">
          <div className="min-w-[140px] flex-1 md:min-w-0 cursor-pointer">
            <SummaryCard
              title="Job Radar"
              value={`${activeJobs.length}`}
              subtitle={`${appliedJobs} applied `}
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
    </PageShell>
  );
}