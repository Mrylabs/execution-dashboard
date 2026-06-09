import TodayCard from "./TodayCard";

export default function MotivationalReminderCard() {
  return (
    <TodayCard
      title="Reminder"
      eyebrow="Steady"
      accent="amber"
      className="md:col-span-3 lg:col-span-4 lg:min-h-[420px]"
    >
      <blockquote className="text-xl font-medium leading-9 text-gray-950">
        Do the next useful thing. Keep it small enough to start and clean enough
        to finish.
      </blockquote>

      <p className="mt-6 text-sm leading-7 text-gray-500">
        Momentum can arrive quietly.
      </p>
    </TodayCard>
  );
}
