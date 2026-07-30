interface CategoryHeroProps {
  title: string;
  description: string;
}

export default function CategoryHero({
  title,
  description,
}: CategoryHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-700 via-green-600 to-emerald-500 px-8 py-20 text-white">
      <div className="max-w-3xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-green-100">
          Thuliragam Products
        </p>

        <h1 className="text-4xl font-bold md:text-6xl">
          {title}
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-green-50">
          {description}
        </p>
      </div>
    </section>
  );
}