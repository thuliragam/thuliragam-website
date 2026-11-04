
interface SectionTitleProps {
  badge?: string;
  title: string;
  highlight?: string;
  description?: string;
  vibrant?: boolean;
}

export default function SectionTitle({
  badge,
  title,
  highlight,
  description,
  vibrant = false,
}: SectionTitleProps) {
  return (
    <div className="mx-auto max-w-3xl text-center">

      {badge && (
        <div className="mb-6 flex items-center justify-center gap-3">
          <span className="h-0.5 w-8 rounded-full bg-[#00A844]" />

          <span className="inline-flex items-center gap-2 rounded-full border border-[#00A844]/20 bg-[#D9FBE6] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#008F3D] sm:text-xs">
            <span className="text-base text-[#00A844]">✦</span>
            {badge.replace(/^🌿\s*/, "")}
          </span>

          <span className="h-0.5 w-8 rounded-full bg-[#00A844]" />
        </div>
      )}

      <h2 className="text-4xl font-extrabold leading-[1.12] tracking-[-0.04em] text-[#006B35] sm:text-5xl md:text-6xl">
        {title}{" "}
        {highlight && (
          <span className="mt-1 block font-semibold text-[#00A844]">
            {highlight}
          </span>
        )}
      </h2>

      {description && (
        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#355B45] sm:text-lg">
          {description}
        </p>
      )}

      <div className="mx-auto mt-7 h-1 w-16 rounded-full bg-gradient-to-r from-[#39E75F] via-[#00C853] to-[#008F3D]" />
    </div>
  );
}
