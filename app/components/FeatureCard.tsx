"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

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
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        duration: 0.3,
      }}
      className="group rounded-3xl border border-green-100 bg-white p-8 shadow-lg transition-all hover:border-green-300 hover:shadow-2xl"
    >
      {/* Icon */}
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-700 transition duration-300 group-hover:bg-green-700 group-hover:text-white">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-green-900">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-4 leading-7 text-gray-600">
        {description}
      </p>
    </motion.div>
  );
}