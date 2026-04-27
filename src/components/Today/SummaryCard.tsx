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
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:scale-[1.01]">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>

      <p className="mt-3 text-4xl font-bold text-gray-900">{value}</p>

      {subtitle && <p className="mt-2 text-sm text-gray-500">{subtitle}</p>}
    </section>
  );
}