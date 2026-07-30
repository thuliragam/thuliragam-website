"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface ImageCardProps {
  image: string;
  title: string;
  description?: string;
  href?: string;
}

export default function ImageCard({
  image,
  title,
  description,
  href,
}: ImageCardProps) {
  const CardContent = (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group overflow-hidden rounded-3xl border border-green-100 bg-white shadow-lg transition-all hover:shadow-2xl"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition duration-700 group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-green-950/70 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className="p-6">

        <h3 className="text-2xl font-bold text-green-900">
          {title}
        </h3>

        {description && (
          <p className="mt-4 text-gray-600 leading-7">
            {description}
          </p>
        )}

        {href && (
          <div className="mt-6 inline-flex items-center gap-2 font-semibold text-green-700">
            Learn More
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </div>
        )}

      </div>
    </motion.div>
  );

  if (href) {
    return <Link href={href}>{CardContent}</Link>;
  }

  return CardContent;
}