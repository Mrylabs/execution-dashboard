import { supabase } from "@/lib/supabase";
import { JobApplication, JobStatus } from "@/types/job";

export async function getJobs(): Promise<JobApplication[]> {
  const { data, error } = await supabase
    .from("job_applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function createJob(input: {
  company: string;
  role: string;
  link?: string;
  source?: string;
  notes?: string;
  deadline?: string;
}) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("job_applications")
    .insert({
      user_id: user.id,
      company: input.company,
      role: input.role,
      link: input.link || null,
      source: input.source || null,
      notes: input.notes || null,
      deadline: input.deadline || null,
      status: "saved",
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateJobStatus(id: string, status: JobStatus) {
  const { data, error } = await supabase
    .from("job_applications")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteJob(id: string) {
  const { error } = await supabase
    .from("job_applications")
    .delete()
    .eq("id", id);

  if (error) throw error;
}