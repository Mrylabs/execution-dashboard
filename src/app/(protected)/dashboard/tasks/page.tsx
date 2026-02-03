"use client";

import { useEffect, useState } from "react";
import { Task, getTasks, saveTasks } from "@/lib/tasks";
import TaskList from "@/components/tasks/TaskList";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [hydrated, setHydrated] = useState(false);

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

  return (
    <section className="max-w-xl">
      <h1 className="mb-6 text-2xl font-semibold">Tasks</h1>

      {/* Add task */}
      <form onSubmit={addTask} className="mb-6 flex gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task…"
          className="flex-1 rounded-md border px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="rounded-md bg-black px-4 py-2 text-sm text-white"
        >
          Add
        </button>
      </form>

      {/* Task list */}
      <TaskList tasks={tasks} onToggle={toggleTask} />
    </section>
  );
}
