import TodayCard from "./TodayCard";

export default function CycleDayCard() {
  return (
    <TodayCard
      title="Cycle"
      eyebrow="Rhythm"
      accent="slate"
      prominence="quiet"
      className="md:col-span-2 lg:col-span-2"
    >
      <div className="space-y-3">
        <p className="text-2xl font-semibold text-gray-800">
          Day 1
        </p>

        <p className="text-sm leading-6 text-gray-500">
          Keep the pace gentle and observable.
        </p>
      </div>
    </TodayCard>
  );
}
