"use client";

import { useCallback, useEffect, useState } from "react";
import type { Task } from "./tasks";
import { fetchTasks as fetchTasksFromDb, createTask as createTaskInDb, updateTaskCompletion as updateTaskInDb, deleteTask as deleteTaskInDb } from "./tasks";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const rows = await fetchTasksFromDb();
      setTasks(rows);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : String(err)
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchTasks();
  }, [fetchTasks]);

  const addTask = useCallback(async (title: string) => {
    setLoading(true);
    setError(null);
    try {
      await createTaskInDb(title);
      await fetchTasks();
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : String(err)
      );
    } finally {
      setLoading(false);
    }
  }, [fetchTasks]);

  const toggleTask = useCallback(
    async (idOrTask: string | Task) => {
      setLoading(true);
      setError(null);
      try {
        const id = typeof idOrTask === "string" ? idOrTask : idOrTask.id;
        const current = typeof idOrTask === "string" ? tasks.find((t) => t.id === id) : idOrTask;
        const nextCompleted = current ? !current.completed : true;
        await updateTaskInDb(id, nextCompleted);
        await fetchTasks();
      } catch (err: unknown) {
        setError(
          err instanceof Error
            ? err.message
            : String(err)
        );
      } finally {
        setLoading(false);
      }
    },
    [fetchTasks, tasks]
  );

  const removeTask = useCallback(
    async (id: string) => {
      setLoading(true);
      setError(null);
      try {
        await deleteTaskInDb(id);
        await fetchTasks();
      } catch (err: unknown) {
        setError(
          err instanceof Error
            ? err.message
            : String(err)
        );
      } finally {
        setLoading(false);
      }
    },
    [fetchTasks]
  );

  return {
    tasks,
    loading,
    error,
    addTask,
    toggleTask,
    deleteTask: removeTask,
    refetchTasks: fetchTasks,
  };
}
