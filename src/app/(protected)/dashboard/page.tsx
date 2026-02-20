"use client";
import { useHabits } from "@/lib/useHabits";
import SummaryCard from "@/components/overview/SummaryCard";
import { useTasks }  from "@/lib/useTasks"; 

export default function DashboardPage() {
  const { tasks } = useTasks();
  const { habits, completedTodayCount } = useHabits();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const totalHabits = habits.length;
  const completedHabits = completedTodayCount();

  return (
    <section>
      <header>
        <h1>Overview</h1>
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
        <SummaryCard title="Notes" value="coming soon" />
      </section>
    </section>
  );
}
