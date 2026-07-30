"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface StatCardProps {
  icon: ReactNode;
  value: string;
  label: string;
}

export default function StatCard({
  icon,
  value,
  label,
}: StatCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.03,
      }}
      transition={{
        duration: 0.3,
      }}
      className="rounded-3xl border border-green-100 bg-white p-6 text-center shadow-lg hover:border-green-300 hover:shadow-2xl"
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-700">
        {icon}
      </div>

      <h3 className="mt-5 text-3xl font-extrabold text-green-900">
        {value}
      </h3>

      <p className="mt-2 text-gray-600">
        {label}
      </p>
    </motion.div>
  );
}