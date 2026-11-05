
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden bg-[#FBFBF3]">

      {/* Soft Botanical Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#E8FFF1] opacity-70 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#B9E65A] opacity-20 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center">

        {/* Animated Thuliragam Logo */}
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
          className="relative"
        >
          <Image
            src="/logo2.png"
            alt="Thuliragam Logo"
            width={260}
            height={260}
            priority
            className="h-auto w-[190px] sm:w-[230px] lg:w-[260px] object-contain"
          />
        </motion.div>

        {/* Brand Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-5 text-center text-base font-semibold tracking-wide text-[#075B25] sm:text-lg"
        >
          Freshly Harvested for You
        </motion.p>

        {/* Animated Loading Dots */}
        <motion.div
          className="mt-9 flex items-center gap-2.5"
          initial="hidden"
          animate="visible"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-2.5 w-2.5 rounded-full bg-[#00A844]"
              animate={{
                opacity: [0.3, 1, 0.3],
                y: [0, -6, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 1,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* Loading Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-4 text-xs font-medium tracking-[0.25em] text-[#66836D]"
        >
          GROWING SOMETHING GOOD...
        </motion.p>

      </div>
    </div>
  );
}
