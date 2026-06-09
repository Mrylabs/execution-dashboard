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
      className="md:col-span-6 lg:col-span-8 lg:row-span-3 lg:min-h-[520px]"
    >
      <div className="mb-8 max-w-lg text-sm leading-6 text-amber-950/60">
        Three deliberate moves. Enough to create momentum, small enough to stay
        human.
      </div>

      <ol className="space-y-5">
        {displayTasks.slice(0, 3).map((task, index) => (
          <li
            key={`${task}-${index}`}
            className="flex items-start gap-4 rounded-xl border border-amber-100/80 bg-white/80 px-5 py-5 md:px-6 md:py-6"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100/70 text-sm font-semibold text-amber-800">
              {index + 1}
            </span>

            <span className="pt-0.5 text-base font-medium leading-7 text-gray-950 md:text-lg">
              {task}
            </span>
          </li>
        ))}
      </ol>
    </TodayCard>
  );
}
