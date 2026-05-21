"use client";

import { useState } from "react";
import { useJobs } from "@/lib/useJobs";
import { JobStatus } from "@/types/job";
import PageShell from "@/components/dashboard/PageShell";
import PageHeader from "@/components/dashboard/PageHeader";
import DashboardCard from "@/components/dashboard/DashboardCard";

const statuses: JobStatus[] = [
  "saved",
  "applied",
  "interviewing",
  "follow-up",
  "rejected",
];

const inputClass =
  "rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-300 focus:ring-2 focus:ring-blue-50";

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

    await addJob({ company, role, link, source, notes, deadline });

    setCompany("");
    setRole("");
    setLink("");
    setSource("");
    setNotes("");
    setDeadline("");
  }

  return (
    <PageShell tone="jobs">
      <PageHeader
        title="Job Radar"
        description="Track job leads, applications, follow-ups, and interview progress."
      />

      <DashboardCard className="p-4 md:p-5">
        <form onSubmit={handleSubmit} className="grid gap-3">
          <div className="grid gap-3 md:gap-4 md:grid-cols-2">
            <input className={inputClass} placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
            <input className={inputClass} placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} />
            <input className={inputClass} placeholder="Job link" value={link} onChange={(e) => setLink(e.target.value)} />
            <input className={inputClass} placeholder="Source: LinkedIn, Wellfound, RemoteOK..." value={source} onChange={(e) => setSource(e.target.value)} />
          </div>

          <input
            type="date"
            className={`${inputClass} md:w-1/2`}
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />

          <textarea
            className={`${inputClass} min-h-20`}
            placeholder="Notes, requirements, salary, contact person..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <button
            type="submit"
            className="w-fit rounded-xl bg-gray-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Save job
          </button>
        </form>
      </DashboardCard>

      {loading && <p className="text-sm text-gray-500">Loading job leads...</p>}

      {error && <p className="text-sm text-red-500">{error}</p>}

      {!loading && jobs.length === 0 && (
        <DashboardCard className="p-4 md:p-5">
          <p className="text-sm text-gray-500">
            No job leads yet. The radar room is quiet. 📡
          </p>
        </DashboardCard>
      )}

      <section className="grid gap-3 md:gap-4">
        {jobs.map((job) => {
          const isExpanded = expandedJobId === job.id;

          return (
            <DashboardCard key={job.id} className="p-4 md:p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {job.role}
                  </h2>
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
                    className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => removeJob(job.id)}
                    className="rounded-xl border border-red-100 bg-white px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {job.notes && (
                <div className="mt-3">
                  <button
                    type="button"
                    onClick={() => setExpandedJobId(isExpanded ? null : job.id)}
                    className="text-sm font-medium text-gray-600 hover:text-gray-900"
                  >
                    {isExpanded ? "Hide details ▲" : "Details ▼"}
                  </button>

                  {isExpanded && (
                    <p className="mt-3 whitespace-pre-line rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm leading-6 text-gray-700">
                      {job.notes}
                    </p>
                  )}
                </div>
              )}
            </DashboardCard>
          );
        })}
      </section>
    </PageShell>
  );
}