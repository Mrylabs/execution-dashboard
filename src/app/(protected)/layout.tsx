import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isLoggedIn()) {
    redirect("/login");
  }

  return <>{children}</>;
}
