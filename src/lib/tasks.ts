import { supabase } from "@/lib/supabase";

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  status: "active" | "tomorrow" | "completed";
  priority: "high" | "medium" | "low";
  created_at: string;
  completed_at: string | null;
  user_id: string;
};

const TABLE = "tasks";

export async function fetchTasks(): Promise<Task[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("id,title,completed,status,priority,created_at,completed_at,user_id")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as Task[];
}

export async function createTask(title: string): Promise<Task> {
  const { data, error } = await supabase
    .from(TABLE)
    .insert([
      {
        title: title.trim(),
        completed: false,
        status: "active",
        priority: "medium",
        completed_at: null,
      },
    ])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Task;
}

export async function updateTaskCompletion(id: string, completed: boolean): Promise<Task> {
  const completedAt = completed ? new Date().toISOString() : null;

  const { data, error } = await supabase
    .from(TABLE)
    .update({
      completed,
      status: completed ? "completed" : "active",
      completed_at: completedAt,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Task;
}

export async function updateTaskStatus(
  id: string,
  status: Task["status"]
): Promise<Task> {
  const completed = status === "completed";
  const completedAt = completed ? new Date().toISOString() : null;

  const { data, error } = await supabase
    .from(TABLE)
    .update({
      status,
      completed,
      completed_at: completedAt,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Task;
}

export async function updateTaskPriority(
  id: string,
  priority: Task["priority"]
): Promise<Task> {
  const { data, error } = await supabase
    .from(TABLE)
    .update({ priority })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Task;
}

export async function deleteTask(id: string): Promise<void> {
  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
}
