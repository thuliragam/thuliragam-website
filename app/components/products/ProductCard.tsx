"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

import Button from "../Button";

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

export default function ProductCard({
  title,
  description,
  image,
  link,
}: ProductCardProps) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {/* Image */}
      <div className="overflow-hidden rounded-t-3xl">
        <Image
          src={image}
          alt={title}
          width={600}
          height={400}
          className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-7">
        <h3 className="min-h-[72px] text-2xl font-bold text-green-900">
          {title}
        </h3>

        <p className="mt-4 flex-1 leading-7 text-gray-600">
          {description}
        </p>

        <div className="mt-6">
          <Button
            href={link}
            variant="outline"
          >
            Learn More
            <ArrowRight
              className="ml-2"
              size={18}
            />
          </Button>
        </div>
      </div>
    </div>
  );
}