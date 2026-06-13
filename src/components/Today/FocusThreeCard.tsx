import DashboardCard from "@/components/dashboard/DashboardCard";

type FocusThreeCardProps = {
  tasks: string[];
  activeTaskCount: number;
};

export default function FocusThreeCard({
  tasks,
  activeTaskCount,
}: FocusThreeCardProps) {
  const displayTasks =
    tasks.length > 0
      ? tasks
      : ["Choose the first meaningful move", "Clear one small blocker", "Close one open loop"];

  return (
    <DashboardCard
      className="h-full overflow-hidden border-amber-100/65 bg-amber-50/60 px-4 py-3.5 shadow-sm ring-1 ring-amber-100/55 md:col-span-6 md:px-5 md:py-4"
    >
      <div className="mb-2 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-gray-950 md:text-xl">
          Focus 3
        </h2>

        <p className="inline-flex shrink-0 rounded-full border border-amber-100 bg-amber-50 px-2.5 py-1 text-[11px] font-medium uppercase tracking-normal text-amber-700">
          {activeTaskCount} active
        </p>
      </div>

      <div className="mb-2.5 max-w-lg text-xs leading-5 text-amber-950/55">
        Three deliberate moves. Enough to create momentum, small enough to stay
        human.
      </div>

      <ol className="space-y-1.5">
        {displayTasks.slice(0, 3).map((task, index) => (
          <li
            key={`${task}-${index}`}
            className="flex items-start gap-2 rounded-xl border border-amber-100/60 bg-white/80 px-3 py-2"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100/70 text-xs font-semibold text-amber-800">
              {index + 1}
            </span>

            <span className="pt-0.5 text-sm font-medium leading-6 text-gray-950 md:text-base">
              {task}
            </span>
          </li>
        ))}
      </ol>
    </DashboardCard>
  );
}
