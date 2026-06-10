"use client";

import { useCallback, useEffect, useState } from "react";
import type { Task } from "./tasks";
import {
  fetchTasks as fetchTasksFromDb,
  createTask as createTaskInDb,
  updateTaskCompletion as updateTaskInDb,
  updateTaskPriority as updateTaskPriorityInDb,
  updateTaskStatus as updateTaskStatusInDb,
  deleteTask as deleteTaskInDb,
} from "./tasks";

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
    const timeoutId = window.setTimeout(() => {
      void fetchTasks();
    }, 0);

    return () => window.clearTimeout(timeoutId);
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

  const updateTaskStatus = useCallback(
    async (id: string, status: Task["status"]) => {
      setLoading(true);
      setError(null);
      try {
        await updateTaskStatusInDb(id, status);
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

  const updateTaskPriority = useCallback(
    async (id: string, priority: Task["priority"]) => {
      setLoading(true);
      setError(null);
      try {
        await updateTaskPriorityInDb(id, priority);
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
    updateTaskStatus,
    updateTaskPriority,
    refetchTasks: fetchTasks,
  };
}
