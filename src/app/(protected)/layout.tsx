"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const auth = isLoggedIn();
    setLoggedIn(auth);
    setChecked(true);

    if (!auth) {
      router.replace("/login");
    }
  }, [router]);

  // While checking auth, render nothing
  if (!checked) return null;

  // If not logged in, we already redirected
  if (!loggedIn) return null;

  return <>{children}</>;
}
