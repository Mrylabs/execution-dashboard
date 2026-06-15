import DashboardCard from "@/components/dashboard/DashboardCard";

type CompletedTodayCardProps = {
  completedCount: number;
};

export default function CompletedTodayCard({
  completedCount,
}: CompletedTodayCardProps) {
  return (
    <DashboardCard
      className="h-full overflow-hidden border-gray-100/80 bg-white p-3 shadow-sm ring-1 ring-gray-100/50 md:p-3"
    >
      <div className="grid h-full grid-cols-[1fr_auto] gap-3">
        <div className="flex flex-col">
          <p className="mb-1.5 inline-flex w-fit rounded-full border border-blue-100/80 bg-blue-50 px-2 py-0.5 text-[11px] font-medium uppercase tracking-normal text-blue-600">
            Wins
          </p>

          <h2 className="text-[15px] font-semibold leading-5 text-gray-800">
            Completed Today
          </h2>

          <p className="mt-0.5 text-xs text-gray-500">
            wins logged
          </p>
        </div>

        <div className="self-end pb-1">
          <p className="shrink-0 text-3xl font-semibold leading-none text-gray-950">
            {completedCount}
          </p>
        </div>
      </div>
    </DashboardCard>
  );
}
