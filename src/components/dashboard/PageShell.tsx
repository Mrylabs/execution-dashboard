type PageShellProps = {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "tasks" | "habits" | "analytics" | "jobs";
};

const toneClasses = {
  default: "bg-white",
  tasks: "bg-rose-50/20",
  habits: "bg-amber-50/40",
  analytics: "bg-blue-50/20",
  jobs: "bg-green-50/20",
};

export default function PageShell({
  children,
  className = "",
  tone = "default",
}: PageShellProps) {
  return (
    <section
      className={`mr-auto max-w-5xl space-y-6 rounded-3xl p-4 md:p-6 ${toneClasses[tone]} ${className}`}
    >
      {children}
    </section>
  );
}
