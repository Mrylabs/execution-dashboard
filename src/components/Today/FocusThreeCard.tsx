import TodayCard from "./TodayCard";

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
    <TodayCard
      title="Focus 3"
      eyebrow={`${activeTaskCount} active`}
      accent="amber"
      prominence="secondary"
      className="h-full md:col-span-6 lg:col-span-8 lg:row-span-3"
    >
      <div className="mb-3 max-w-lg text-xs leading-5 text-amber-950/60">
        Three deliberate moves. Enough to create momentum, small enough to stay
        human.
      </div>

      <ol className="space-y-2">
        {displayTasks.slice(0, 3).map((task, index) => (
          <li
            key={`${task}-${index}`}
            className="flex items-start gap-3 rounded-xl border border-amber-100/80 bg-white/80 px-3 py-2"
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
    </TodayCard>
  );
}
