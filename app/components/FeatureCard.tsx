
"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#00A844]/20 bg-white p-6 shadow-[0_8px_30px_rgba(0,168,68,0.06)] transition-all duration-300 hover:border-[#00A844] hover:shadow-[0_20px_45px_rgba(0,168,68,0.15)] sm:p-7"
    >
      {/* Bright green top accent */}
      <div className="absolute left-0 top-0 h-1 w-0 bg-[#00A844] transition-all duration-500 group-hover:w-full" />

      {/* Icon */}
      <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-xl border border-[#00A844]/15 bg-[#D9FBE6] text-[#008F3D] transition-all duration-300 group-hover:border-[#00A844] group-hover:bg-[#00A844] group-hover:text-white">
        {icon}
      </div>

      {/* Title and decorative arrow */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-xl font-semibold leading-snug tracking-tight text-[#006B35] sm:text-2xl">
          {title}
        </h3>

        <ArrowUpRight
          size={19}
          className="mt-1 shrink-0 text-[#00A844] opacity-70 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100"
        />
      </div>

      {/* Description */}
      <p className="mt-4 flex-1 text-sm leading-7 text-[#355B45] sm:text-base">
        {description}
      </p>

      {/* Bottom accent */}
      <div className="mt-6 h-1 w-10 rounded-full bg-[#00A844]/50 transition-all duration-300 group-hover:w-16 group-hover:bg-[#00A844]" />
    </motion.div>
  );
}
