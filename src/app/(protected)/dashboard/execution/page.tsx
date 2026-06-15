"use client";

import { useState } from "react";
import { useTasks } from "@/lib/useTasks";
import { useHabits } from "@/lib/useHabits";
import type { Task } from "@/lib/tasks";
import TaskList from "@/components/tasks/TaskList";
import HabitItem from "@/components/habits/HabitItem";
import PageShell from "@/components/dashboard/PageShell";
import PageHeader from "@/components/dashboard/PageHeader";

export default function ExecutionPage() {
  const {
    tasks,
    loading,
    error,
    addTask,
    toggleTask,
    deleteTask,
    updateTaskStatus,
    updateTaskPriority,
  } = useTasks();
  const {
    habits,
    loading: habitsLoading,
    error: habitsError,
    addHabit,
    deleteHabit,
    toggleHabitToday,
    completedTodayHabitIds,
  } = useHabits();
  const [title, setTitle] = useState("");
  const [newHabit, setNewHabit] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    await addTask(trimmedTitle);
    setTitle("");
  };

  const handleToggle = async (task: Task) => {
    await toggleTask(task);
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
  };

  const handleStatusChange = async (id: string, status: Task["status"]) => {
    await updateTaskStatus(id, status);
  };

  const handlePriorityChange = async (
    id: string,
    priority: Task["priority"]
  ) => {
    await updateTaskPriority(id, priority);
  };

  async function handleAddHabit() {
    if (!newHabit.trim()) return;
    await addHabit(newHabit);
    if (!habitsError) setNewHabit("");
  }

  const todayDate = new Date().toDateString();
  const activeTasks = tasks.filter((task) => task.status === "active");
  const focusTasks = [
    ...activeTasks.filter((task) => task.priority === "high"),
    ...activeTasks.filter((task) => task.priority === "medium"),
    ...activeTasks.filter((task) => task.priority === "low"),
  ].slice(0, 3);
  const focusTaskIds = new Set(focusTasks.map((task) => task.id));
  const remainingActiveTasks = activeTasks.filter(
    (task) => !focusTaskIds.has(task.id)
  );
  const tomorrowTasks = tasks.filter((task) => task.status === "tomorrow");
  const completedTodayTasks = tasks.filter((task) => {
    if (task.status !== "completed" || !task.completed_at) return false;

    return new Date(task.completed_at).toDateString() === todayDate;
  });

  return (
    <PageShell tone="tasks">
      <PageHeader
        title="Execution"
        description="Choose the work, protect the next move, and keep the system alive."
      />

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
        />

        <button
          type="submit"
          className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Add
        </button>
      </form>

      {loading && tasks.length === 0 && (
        <div className="rounded-2xl border border-gray-300 bg-white p-8 text-center">
          Loading tasks...
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-600">
          Error: {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid gap-6">
          <TaskSection
            title="Focus 3"
            description="The three tasks most likely to move the day forward."
          >
            <TaskList
              tasks={focusTasks}
              emptyTitle="No focus tasks yet"
              emptyDescription="Set an active task to high or medium priority to pull it into focus."
              onToggle={handleToggle}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
              onPriorityChange={handlePriorityChange}
            />
          </TaskSection>

          <TaskSection
            title="Active Tasks"
            description="Available work outside the current focus set."
          >
            <TaskList
              tasks={remainingActiveTasks}
              emptyTitle="No active tasks waiting"
              emptyDescription="Add a task or move one back from tomorrow."
              onToggle={handleToggle}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
              onPriorityChange={handlePriorityChange}
            />
          </TaskSection>

          <TaskSection
            title="Tomorrow"
            description="Deferred without disappearing."
          >
            <TaskList
              tasks={tomorrowTasks}
              emptyTitle="Nothing parked for tomorrow"
              emptyDescription="Move active tasks here when they are real, but not for today."
              onToggle={handleToggle}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
              onPriorityChange={handlePriorityChange}
            />
          </TaskSection>

          <TaskSection
            title="Completed Today"
            description="Closed today based on completion time."
          >
            <TaskList
              tasks={completedTodayTasks}
              emptyTitle="No completions logged today"
              emptyDescription="Completed tasks will land here when checked off."
              onToggle={handleToggle}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
              onPriorityChange={handlePriorityChange}
            />
          </TaskSection>

          <TaskSection
            title="Habits"
            description="Routines that keep execution alive."
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddHabit();
              }}
              className="flex gap-3"
            >
              <input
                value={newHabit}
                onChange={(e) => setNewHabit(e.target.value)}
                placeholder="Add a new habit..."
                className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
              />

              <button
                type="submit"
                className="rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-700"
              >
                Add
              </button>
            </form>

            {habitsLoading ? (
              <div className="rounded-2xl border border-gray-300 bg-white p-8 text-center">
                Loading habits...
              </div>
            ) : habitsError ? (
              <div className="rounded-2xl border border-red-300 bg-white p-8 text-center">
                <p className="text-sm font-medium text-red-600">
                  {habitsError}
                </p>
              </div>
            ) : habits.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center">
                <p className="text-sm font-medium text-gray-900">
                  No habits yet
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Add one routine to start building visible momentum.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {habits.map((habit) => {
                  const completedToday = completedTodayHabitIds.has(habit.id);
                  return (
                    <HabitItem
                      key={habit.id}
                      habit={habit}
                      completedToday={completedToday}
                      onToggle={toggleHabitToday}
                      onDelete={deleteHabit}
                    />
                  );
                })}
              </div>
            )}
          </TaskSection>
        </div>
      )}
    </PageShell>
  );
}

type TaskSectionProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

function TaskSection({ title, description, children }: TaskSectionProps) {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-base font-semibold text-gray-950">{title}</h2>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>

      {children}
    </section>
  );
}
