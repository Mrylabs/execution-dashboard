import TodayCard from "./TodayCard";

type CompletedTodayCardProps = {
  completedCount: number;
};

export default function CompletedTodayCard({
  completedCount,
}: CompletedTodayCardProps) {
  return (
    <TodayCard
      title="Completed Today"
      eyebrow="Wins"
      accent="blue"
      prominence="compact"
      className="h-full md:col-span-3 lg:col-span-4"
    >
      <div>
        <p className="text-xl font-semibold text-gray-950">
          {completedCount}
        </p>

        <p className="mt-0.5 text-xs text-gray-500">
          wins logged
        </p>
      </div>
    </TodayCard>
  );
}
