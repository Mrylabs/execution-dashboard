import DashboardCard from "@/components/dashboard/DashboardCard";

type HabitsSnapshotCardProps = {
  completedToday: number;
  totalHabits: number;
};

export default function HabitsSnapshotCard({
  completedToday,
  totalHabits,
}: HabitsSnapshotCardProps) {
  const percentage =
    totalHabits === 0 ? 0 : Math.round((completedToday / totalHabits) * 100);

  return (
    <DashboardCard
      className="h-full overflow-hidden border-gray-100/70 bg-white p-2.5 shadow-sm md:col-span-3 md:p-2.5 lg:col-span-4 border-emerald-100/80 bg-emerald-50/40"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <p className="mb-1.5 inline-flex w-fit rounded-full border border-emerald-100/80 bg-emerald-50 px-2 py-0.5 text-[11px] font-medium uppercase tracking-normal text-emerald-600">
            Today
          </p>

          <h2 className="text-[15px] font-semibold leading-5 text-gray-800">
            Habits Snapshot
          </h2>

          <p className="mt-0.5 text-xs text-gray-500">
            rituals protected
          </p>
        </div>

        <div
          className="relative h-16 w-16 shrink-0 rounded-full"
          style={{
            background: `conic-gradient(rgb(16 185 129 / 0.8) ${percentage}%, rgb(220 252 231) 0)`,
          }}
          aria-label={`${percentage}% habits complete`}
        >
          <div className="absolute inset-2 rounded-full bg-white" />
          <div className="absolute inset-0 flex items-center justify-center leading-none tracking-tight">
            <span className="text-[17px] font-semibold text-emerald-700">
              {completedToday}
            </span>
            <span className="text-[15px] font-normal text-emerald-700/45">
              /
            </span>
            <span className="text-[17px] font-semibold text-emerald-700/80">
              {totalHabits}
            </span>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
