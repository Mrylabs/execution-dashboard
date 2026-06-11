import { supabase } from "./supabase";

type DemoSessionResponse = {
  session?: {
    access_token: string;
    refresh_token: string;
  };
  error?: string;
};

export async function signUp(email: string, password: string) {
  return supabase.auth.signUp({
    email,
    password,
  });
}

export async function signIn(email: string, password: string) {
  return supabase.auth.signInWithPassword({
    email,
    password,
  });
}

export async function signInAsDemo() {
  const response = await fetch("/api/demo-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const payload = (await response.json().catch(() => ({}))) as DemoSessionResponse;

  if (!response.ok || !payload.session) {
    throw new Error(payload.error ?? "Unable to start demo session");
  }

  const result = await supabase.auth.setSession({
    access_token: payload.session.access_token,
    refresh_token: payload.session.refresh_token,
  });

  if (result.error) {
    throw result.error;
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  if (!user || user.id !== result.data.session?.user.id) {
    throw new Error("Demo session could not be verified");
  }

  return result;
}

export async function signOut() {
  return supabase.auth.signOut();
}

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}
