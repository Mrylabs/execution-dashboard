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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Tasks</h1>

      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task"
          className="flex-1 border rounded px-3 py-2"
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Add
        </button>
      </form>

      {loading && tasks.length === 0 && <p>Loading tasks...</p>}

      {error && (
        <div className="mb-4 text-red-600">
          Error: {error}
        </div>
      )}

      {!loading && tasks.length === 0 && !error && (
        <div className="text-muted">No tasks yet. Add your first task.</div>
      )}

      <TaskList
        tasks={tasks}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </div>
  );
}
>>>>>>> 55ef278 (feat: add task deletion and improve task interaction UX)
