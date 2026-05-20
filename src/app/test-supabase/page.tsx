"use client";

import { FormEvent, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export default function TestSupabasePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");

  async function fetchTasks() {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setTasks(data || []);
  }

  async function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim()) return;

    const { error } = await supabase.from("tasks").insert({
      title: title.trim(),
    });

    if (error) {
      console.error(error);
      return;
    }

    setTitle("");
    fetchTasks();
  }

  async function deleteTask(id: string) {
    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      return;
    }

    fetchTasks();
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  async function toggleTask(task: Task) {
  const { error } = await supabase
    .from("tasks")
    .update({
      completed: !task.completed,
    })
    .eq("id", task.id);

  if (error) {
    console.error(error);
    return;
  }

  fetchTasks();
  }

  return (
    <main className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">
        Supabase Tasks
      </h1>

      <form onSubmit={addTask} className="flex gap-2">
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Add a task..."
          className="border rounded px-3 py-2 flex-1 bg-transparent"
        />

        <button type="submit" className="border rounded px-4 py-2">
          Add
        </button>
      </form>

      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="border rounded p-3 flex items-center justify-between gap-4"
            >
              <button
                type="button"
                onClick={() => toggleTask(task)}
                className={`text-left flex-1 ${
                  task.completed
                    ? "line-through opacity-50"
                    : ""
                }`}
              >
                {task.title}
              </button>

              <button
                type="button"
                onClick={() => deleteTask(task.id)}
                className="border rounded px-3 py-1 text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}