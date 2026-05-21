"use client";

import { useState } from "react";
import { useJobs } from "@/lib/useJobs";
import { JobStatus } from "@/types/job";

const statuses: JobStatus[] = [
  "saved",
  "applied",
  "interviewing",
  "follow-up",
  "rejected",
];

export default function JobsPage() {
  const { jobs, loading, error, addJob, changeStatus, removeJob } = useJobs();

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [link, setLink] = useState("");
  const [source, setSource] = useState("");
  const [notes, setNotes] = useState("");
  const [deadline, setDeadline] = useState("");
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!company.trim() || !role.trim()) return;

    await addJob({
      company,
      role,
      link,
      source,
      notes,
      deadline,
    });

    setCompany("");
    setRole("");
    setLink("");
    setSource("");
    setNotes("");
    setDeadline("");
  }

  return (
    <main className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold tracking-tight">Job Radar</h1>
        <p className="mt-2 text-sm text-gray-500">
          Track job leads, applications, follow-ups, and interview progress.
        </p>
      </section>

      <form
        onSubmit={handleSubmit}
        className="grid gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <input
            className="rounded-xl border border-gray-200 px-4 py-2"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />

          <input
            className="rounded-xl border border-gray-200 px-4 py-2"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />

          <input
            className="rounded-xl border border-gray-200 px-4 py-2"
            placeholder="Job link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />

          <input
            className="rounded-xl border border-gray-200 px-4 py-2"
            placeholder="Source: LinkedIn, Wellfound, RemoteOK..."
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />

          <input
            type="date"
            className="rounded-xl border border-gray-200 px-4 py-2"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>

        <textarea
          className="min-h-24 rounded-xl border border-gray-200 px-4 py-2"
          placeholder="Notes, requirements, salary, contact person..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <button
          type="submit"
          className="w-fit rounded-xl bg-black px-5 py-2 text-sm font-medium text-white"
        >
          Save job
        </button>
      </form>

      {loading && <p className="text-sm text-gray-500">Loading job leads...</p>}

      {error && <p className="text-sm text-red-500">{error}</p>}

      {!loading && jobs.length === 0 && (
        <p className="rounded-2xl border bg-white p-5 text-sm text-gray-500">
          No job leads yet. The radar room is quiet. 📡
        </p>
      )}

      <section className="grid gap-4">
        {jobs.map((job) => {
          const isExpanded = expandedJobId === job.id;

          return (
            <article
              key={job.id}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{job.role}</h2>
                  <p className="text-sm text-gray-600">{job.company}</p>

                  <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-500">
                    {job.source && <span>Source: {job.source}</span>}
                    {job.deadline && <span>Deadline: {job.deadline}</span>}
                  </div>

                  {job.link && (
                    <a
                      href={job.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-block text-sm font-medium text-blue-600 hover:underline"
                    >
                      Open job post
                    </a>
                  )}
                </div>

                <div className="flex gap-2">
                  <select
                    value={job.status}
                    onChange={(e) =>
                      changeStatus(job.id, e.target.value as JobStatus)
                    }
                    className="rounded-xl border border-gray-200 px-3 py-2 text-sm"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => removeJob(job.id)}
                    className="rounded-xl border border-red-200 px-3 py-2 text-sm text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {job.notes && (
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedJobId(isExpanded ? null : job.id)
                    }
                    className="text-sm font-medium text-gray-600 hover:text-gray-900"
                  >
                    {isExpanded ? "Hide details ▲" : "details ▼"}
                  </button>

                  {isExpanded && (
                    <p className="mt-3 whitespace-pre-line rounded-xl bg-gray-50 p-4 text-sm leading-6 text-gray-700">
                      {job.notes}
                    </p>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </section>
    </main>
  );
}