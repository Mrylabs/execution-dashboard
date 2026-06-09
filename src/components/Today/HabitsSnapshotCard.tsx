import TodayCard from "./TodayCard";

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
    <TodayCard
      title="Habits Snapshot"
      eyebrow="Today"
      accent="green"
      prominence="compact"
      className="md:col-span-3 lg:col-span-4 border-emerald-100 bg-emerald-50/40"
    >
      <div className="space-y-2.5">
        <div>
          <p className="text-2xl font-semibold text-gray-950">
            {completedToday}/{totalHabits}
          </p>

          <p className="mt-0.5 text-xs text-gray-500">
            rituals protected
          </p>
        </div>

        <div className="h-1.5 overflow-hidden rounded-full bg-white">
          <div
            className="h-full rounded-full bg-emerald-500/80 transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </TodayCard>
  );
}
