"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export default function TestSupabasePage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function fetchTasks() {
      const { data, error } = await supabase
        .from("tasks")
        .select("*");

      if (error) {
        console.error(error);
        return;
      }

      setTasks(data || []);
    }

    fetchTasks();
  }, []);

  return (
    <main className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">
        Supabase Tasks
      </h1>

      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="border rounded p-3"
            >
              {task.title}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
>>>>>>> c6efb72 (setup: connect Next.js app to Supabase)
