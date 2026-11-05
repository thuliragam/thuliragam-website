
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
      whileHover={{ y: -7 }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      className="group relative flex h-full min-h-[260px] flex-col overflow-hidden rounded-[24px] border border-[#075B25]/10 bg-white p-7 shadow-[0_10px_30px_rgba(6,61,32,0.06)] transition-all duration-300 hover:border-[#00A844]/50 hover:shadow-[0_20px_45px_rgba(6,61,32,0.13)] sm:p-8"
    >
      {/* Top accent */}
      <div className="absolute left-0 top-0 h-1 w-0 bg-[#00A844] transition-all duration-500 group-hover:w-full" />

      {/* Decorative background circle */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#E8FFF1] opacity-0 transition-all duration-500 group-hover:opacity-100" />

      {/* Icon */}
      <div className="relative mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#00A844]/15 bg-[#E8FFF1] text-[#075B25] transition-all duration-300 group-hover:border-[#B9E65A] group-hover:bg-[#B9E65A] group-hover:text-[#063D20]">
        {icon}
      </div>

      {/* Title */}
      <div className="relative flex items-start justify-between gap-3">
        <h3 className="text-xl font-bold leading-snug tracking-tight text-[#063D20] sm:text-2xl">
          {title}
        </h3>

        <ArrowUpRight
          size={21}
          className="mt-1 shrink-0 text-[#00A844] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
        />
      </div>

      {/* Description */}
      <p className="relative mt-4 flex-1 text-sm leading-7 text-[#355B45] sm:text-base">
        {description}
      </p>

      {/* Bottom accent */}
      <div className="relative mt-7 h-1 w-12 rounded-full bg-[#B9E65A] transition-all duration-300 group-hover:w-20 group-hover:bg-[#00A844]" />
    </motion.div>
  );
}
