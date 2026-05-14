"use client";
import Link from "next/link";
import { useHabits } from "@/lib/useHabits";
import SummaryCard from "@/components/Today/SummaryCard";
import { useTasks } from "@/lib/useTasks";

export default function DashboardPage() {
  const { tasks } = useTasks();
  const { habits, completedTodayHabitIds } = useHabits();

  const completedTodayCount = completedTodayHabitIds.size;

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  const totalHabits = habits.length;
  const completedHabits = completedTodayCount;

  const activeTasks = tasks.filter((task) => !task.completed);
  const focusTasks = activeTasks.slice(0, 2);

  return (
    <section className="mx-auto max-w-4xl space-y-6 md:space-y-8">
      {/* Header */}
      <header>
       <h1 className="text-2xl font-semibold text-gray-900 md:text-3xl">
          Execution Overview
        </h1>
      </header>

      {/* Summary */}
       <section className="grid gap-4 md:grid-cols-2 md:gap-6">
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
}