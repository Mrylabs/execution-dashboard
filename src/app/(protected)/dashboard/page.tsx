"use client";

import SummaryCard from "@/components/overview/SummaryCard";
import { useTasks }  from "@/lib/useTasks"; 

export default function DashboardPage() {
  const { tasks } = useTasks();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;

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
        <SummaryCard title="Habits" value="—" />
        <SummaryCard title="Notes" value="—" />
      </section>
    </section>
  );
}
