import DashboardCard from "@/components/dashboard/DashboardCard";

type CompletedTodayCardProps = {
  completedCount: number;
};

export default function CompletedTodayCard({
  completedCount,
}: CompletedTodayCardProps) {
  return (
    <DashboardCard
      className="h-full overflow-hidden border-gray-100/70 bg-white p-2.5 shadow-sm md:col-span-3 md:p-2.5 lg:col-span-4"
    >
      <div className="flex items-center justify-between gap-3">
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

        <p className="shrink-0 text-3xl font-semibold leading-none text-gray-950">
          {completedCount}
        </p>
      </div>
    </DashboardCard>
  );
}
