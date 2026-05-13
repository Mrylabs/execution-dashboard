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
