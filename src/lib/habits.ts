export type Habit = {
  id: string;
  name: string;
  createdAt: string;
  lastCompletedDate: string | null;
  currentStreak: number;
};

const STORAGE_KEY = "habits";

export function getHabits(): Habit[] {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveHabits(habits: Habit[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
}