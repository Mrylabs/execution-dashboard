type PageShellProps = {
  children: React.ReactNode;
  tone?: "default" | "tasks" | "habits" | "analytics";
};

const toneClasses = {
  default: "bg-white",
  tasks: "bg-rose-50/20",
  habits: "bg-amber-50/40",
  analytics: "bg-blue-50/20",
};

export default function PageShell({
  children,
  tone = "default",
}: PageShellProps) {
  return (
    <section
      className={`mr-auto max-w-5xl space-y-6 rounded-3xl p-4 md:p-6 ${toneClasses[tone]}`}
    >
      {children}
    </section>
  );
}