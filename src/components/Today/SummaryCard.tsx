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
    <div>
      <h3>{title}</h3>
      <p>{value}</p>
      {subtitle && <span>{subtitle}</span>}
    </div>
  );
}