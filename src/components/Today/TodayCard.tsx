import DashboardCard from "@/components/dashboard/DashboardCard";

type TodayCardProps = {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
  className?: string;
  accent?: "blue" | "green" | "amber" | "rose" | "slate";
  prominence?: "primary" | "secondary" | "standard" | "quiet" | "compact";
};

const accentClasses = {
  blue: "border-blue-100 bg-blue-50 text-blue-700",
  green: "border-emerald-100 bg-emerald-50 text-emerald-700",
  amber: "border-amber-100 bg-amber-50 text-amber-700",
  rose: "border-rose-100 bg-rose-50 text-rose-700",
  slate: "border-gray-200 bg-gray-50 text-gray-600",
};

const prominenceClasses = {
  primary:
    "border-blue-100/70 bg-blue-50/55 px-4 py-3.5 shadow-sm ring-1 ring-blue-100/60 md:px-5 md:py-4",
  secondary:
    "border-amber-100/80 bg-amber-50/60 px-4 py-3.5 shadow-sm ring-1 ring-amber-100/70 md:px-5 md:py-4",
  standard:
    "border-gray-200 bg-white p-4 shadow-sm md:p-5",
  quiet:
    "border-gray-100 bg-gray-50/70 p-3 shadow-none md:p-4",
  compact:
    "border-gray-100 bg-white p-3 shadow-sm md:p-3",
};

const titleClasses = {
  primary: "text-base font-semibold text-blue-950/80",
  secondary: "text-lg font-semibold text-gray-950 md:text-xl",
  standard: "text-lg font-semibold text-gray-950",
  quiet: "text-base font-semibold text-gray-800",
  compact: "text-sm font-semibold text-gray-800",
};

export default function TodayCard({
  title,
  eyebrow,
  children,
  className = "",
  accent = "slate",
  prominence = "standard",
}: TodayCardProps) {
  return (
    <DashboardCard
      className={`overflow-hidden ${prominenceClasses[prominence]} ${className}`}
    >
      <div
        className={
          prominence === "compact"
            ? "mb-2"
            : prominence === "quiet"
              ? "mb-3"
              : "mb-3"
        }
      >
        <div>
          {eyebrow && (
            <p
              className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-normal ${
                prominence === "compact" ? "mb-1.5" : "mb-2"
              } ${accentClasses[accent]}`}
            >
              {eyebrow}
            </p>
          )}

          <h2 className={titleClasses[prominence]}>
            {title}
          </h2>
        </div>
      </div>

      {children}
    </DashboardCard>
  );
}
