type SummaryCardProps = {
  title: string;
  value: string;
  subtitle?: string;
};

export default function SummaryCard({
  title,
  value,
  subtitle,
}: SummaryCardProps) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
      <h3 className="text-sm font-medium text-gray-500">
        {title}
      </h3>

      <p className="mt-2 text-3xl font-bold text-gray-900 md:mt-3 md:text-4xl">
        {value}
      </p>

      {subtitle && (
        <p className="mt-1 text-xs text-gray-500 md:mt-2 md:text-sm">
          {subtitle}
        </p>
      )}
    </section>
  );
}