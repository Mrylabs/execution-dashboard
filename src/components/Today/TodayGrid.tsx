type TodayGridProps = {
  children: React.ReactNode;
};

export default function TodayGrid({ children }: TodayGridProps) {
  return (
    <section className="grid gap-5 md:grid-cols-6 lg:grid-cols-12 lg:items-start">
      {children}
    </section>
  );
}
