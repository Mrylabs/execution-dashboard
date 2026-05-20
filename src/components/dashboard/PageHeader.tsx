type PageHeaderProps = {
  title: string;
  description?: string;
};

export default function PageHeader({
  title,
  description,
}: PageHeaderProps) {
  return (
    <header>
      <h1 className="text-3xl font-bold text-gray-900">
        {title}
      </h1>

      {description && (
        <p className="mt-1 text-gray-400">
          {description}
        </p>
      )}
    </header>
  );
}