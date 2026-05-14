import { supabase } from "@/lib/supabase";
import type { Habit, HabitLog } from "@/types/habit";

export async function getHabits(): Promise<Habit[]> {
  const { data, error } = await supabase
    .from("habits")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw error;
  return (data ?? []) as Habit[];
}

export async function createHabit(name: string, userId: string): Promise<Habit> {
  const { data, error } = await supabase
    .from("habits")
    .insert({ name, user_id: userId })
    .select()
    .single();

  if (error) throw error;
  return data as Habit;
}

export async function deleteHabit(id: string): Promise<void> {
  const { error } = await supabase.from("habits").delete().eq("id", id);
  if (error) throw error;
}

export async function getHabitLogs(): Promise<HabitLog[]> {
  const { data, error } = await supabase
    .from("habit_logs")
    .select("*")
    .order("completed_date", { ascending: false });

  if (error) throw error;
  return (data ?? []) as HabitLog[];
}

export async function completeHabitToday(
  habitId: string,
  userId: string,
  today: string
): Promise<HabitLog> {
  const { data, error } = await supabase
    .from("habit_logs")
    .insert({ habit_id: habitId, user_id: userId, completed_date: today })
    .select()
    .single();

  if (error) throw error;
  return data as HabitLog;
}

export async function uncompleteHabitToday(
  habitId: string,
  today: string
): Promise<void> {
  const { error } = await supabase
    .from("habit_logs")
    .delete()
    .eq("habit_id", habitId)
    .eq("completed_date", today);

  if (error) throw error;
}
