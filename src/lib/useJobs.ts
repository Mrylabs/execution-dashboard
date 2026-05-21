"use client";

import { useEffect, useState } from "react";
import { JobApplication, JobStatus } from "@/types/job";
import {
  getJobs,
  createJob,
  updateJobStatus,
  deleteJob,
} from "@/lib/jobService";

export function useJobs() {
  const [jobs, setJobs] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadJobs() {
    try {
      setLoading(true);
      setError(null);
      const data = await getJobs();
      setJobs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  }

  async function addJob(input: {
    company: string;
    role: string;
    link?: string;
    source?: string;
    notes?: string;
    deadline?: string;
  }) {
    const newJob = await createJob(input);
    setJobs((prev) => [newJob, ...prev]);
  }

  async function changeStatus(id: string, status: JobStatus) {
    const updatedJob = await updateJobStatus(id, status);

    setJobs((prev) =>
      prev.map((job) => (job.id === id ? updatedJob : job))
    );
  }

  async function removeJob(id: string) {
    await deleteJob(id);
    setJobs((prev) => prev.filter((job) => job.id !== id));
  }

  useEffect(() => {
    loadJobs();
  }, []);

  return {
    jobs,
    loading,
    error,
    addJob,
    changeStatus,
    removeJob,
  };
}