import TodayCard from "./TodayCard";

export default function QuickDumpCard() {
  return (
    <TodayCard
      title="Quick Dump"
      eyebrow="Capture"
      accent="slate"
      prominence="compact"
      className="md:col-span-3 lg:col-span-4"
    >
      <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50/70 px-3 py-2.5">
        <p className="text-xs leading-5 text-gray-400">
          Loose thoughts and reminders.
        </p>
      </div>
    </TodayCard>
  );
}
