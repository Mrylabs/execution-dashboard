export type JobStatus =
  | "saved"
  | "applied"
  | "interviewing"
  | "rejected"
  | "follow-up";

export type JobApplication = {
  id: string;
  user_id: string;
  company: string;
  role: string;
  link: string | null;
  source: string | null;
  status: JobStatus;
  notes: string | null;
  deadline: string | null;
  created_at: string;
};