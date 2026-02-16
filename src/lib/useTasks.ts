"use client";

import { useEffect, useState } from "react";
import { getTasks, saveTasks, Task } from "./tasks";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  function updateTasks(updatedTasks: Task[]) {
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  }

  return {
    tasks,
    setTasks: updateTasks,
  };
}
