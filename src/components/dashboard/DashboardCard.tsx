type DashboardCardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function DashboardCard({
  children,
  className = "",
}: DashboardCardProps) {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}