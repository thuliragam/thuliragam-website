"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="flex flex-col items-center">

        {/* Logo */}
        <motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{
    opacity: 1,
    scale: [1, 1.03, 1],
  }}
  transition={{
    opacity: { duration: 0.8 },
    scale: {
      repeat: Infinity,
      duration: 2.5,
      ease: "easeInOut",
    },
  }}
>
          <Image
            src="/logo2.png"
            alt="Thuliragam Logo"
            width={260}
            height={260}
            priority
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-4 text-lg font-medium tracking-wide text-green-700"
        >
          Freshly Harvested for You
        </motion.p>

        {/* Animated Dots */}
        <motion.div
          className="mt-8 flex gap-2"
          initial="hidden"
          animate="visible"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-3 w-3 rounded-full bg-green-600"
              animate={{
                opacity: [0.3, 1, 0.3],
                y: [0, -6, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 1,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>

      </div>
    </div>
  );
}