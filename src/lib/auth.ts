const AUTH_KEY = "pd:isLoggedIn";

export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(AUTH_KEY) === "true";
}

export function login(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUTH_KEY, "true");
}

export function logout(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_KEY);
}
