"use client";

import { useEffect, useState } from "react";
import { Task, getTasks, saveTasks } from "@/lib/tasks";
import TaskList from "@/components/tasks/TaskList";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);

  // Load tasks on mount
  useEffect(() => {
    setTasks(getTasks());
    setHydrated(true);
  }, []);

  // Persist tasks
  useEffect(() => {
  if (!hydrated) return;
  saveTasks(tasks);
  }, [tasks, hydrated]);

  function addTask(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      completed: false,
    };

    setTasks((prev) => [newTask, ...prev]);
    setTitle("");
  }

  function toggleTask(id: string) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function deleteTask(id: string) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  const activeTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  return (
  <section className="max-w-3xl space-y-6">
    <header>
      <h1 className="mt-2 text-3xl font-semibold text-gray-900">
        Today&apos;s Tasks
      </h1>
      <p className="mt-2 text-gray-500">
        Capture, complete, and clear what matters today.
      </p>
    </header>

    <form onSubmit={addTask} className="flex gap-3">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a task..."
        className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
      />
      <button
        type="submit"
        className="rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-700"
      >
        Add
      </button>
    </form>

    <section className="space-y-6">
      {/* Active */}
      <div>
        <h2 className="mb-3 text-sm font-medium text-gray-500">
          Active
        </h2>
        <TaskList tasks={activeTasks} onToggle={toggleTask} onDelete={deleteTask} />
      </div>

      {/* Completed */}
      {completedTasks.length > 0 && (
        <div>
          <button
            type="button"
            onClick={() => setShowCompleted((prev) => !prev)}
            className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900"
          >
            <span>{showCompleted ? "▾" : "▸"}</span>
            <span>Completed</span>
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs">
              {completedTasks.length}
            </span>
          </button>

          {showCompleted && (
            <TaskList tasks={completedTasks} onToggle={toggleTask} onDelete={deleteTask} />
          )}
        </div>
      )}
    </section>
  </section>
  );
}
