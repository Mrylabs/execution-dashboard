<<<<<<< HEAD
"use client";

import { useState } from "react";
import { useTasks } from "@/lib/useTasks";
import type { Task } from "@/lib/tasks";
import TaskList from "@/components/tasks/TaskList";

export default function TasksPage() {
  const { tasks, loading, error, addTask, toggleTask, deleteTask } = useTasks();
  const [title, setTitle] = useState("");

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

  return (
    <section className="mr-auto max-w-5xl space-y-6 rounded-3xl bg-blue-50/30 p-4 md:p-6">
      <header>
        <h1 className="text-3xl font-bold">Tasks</h1>
        <p className="text-gray-400">
          Capture and complete today’s maintenance items.
        </p>
      </header>

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
        <TaskList
          tasks={tasks}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      )}
    </section>
  );
}
=======
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
>>>>>>> 55ef278 (feat: add task deletion and improve task interaction UX)
