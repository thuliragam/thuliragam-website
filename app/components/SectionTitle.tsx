interface SectionTitleProps {
  badge?: string;
  title: string;
  highlight?: string;
  description?: string;
}

export default function SectionTitle({
  badge,
  title,
  highlight,
  description,
}: SectionTitleProps) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {badge && (
        <span className="inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
          {badge}
        </span>
      )}

      <h2 className="mt-6 text-4xl font-bold text-green-900 md:text-5xl">
        {title}{" "}
        {highlight && (
          <span className="text-green-600">{highlight}</span>
        )}
      </h2>

      {description && (
        <p className="mt-6 text-lg leading-8 text-gray-600">
          {description}
        </p>
      )}
    </div>
  );
}