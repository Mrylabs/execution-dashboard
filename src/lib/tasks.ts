import { supabase } from "@/lib/supabase";

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  created_at: string;
  user_id: string;
};

const TABLE = "tasks";

export async function fetchTasks(): Promise<Task[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as Task[];
}

export async function createTask(title: string): Promise<Task> {
  const { data, error } = await supabase
    .from(TABLE)
    .insert([{ title: title.trim(), completed: false }])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Task;
}

export async function updateTaskCompletion(id: string, completed: boolean): Promise<Task> {
  const { data, error } = await supabase
    .from(TABLE)
    .update({ completed })
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
