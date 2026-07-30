import Image from "next/image";
import Link from "next/link";
import { Home, Package } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#F7FCF8] to-white px-6">
      <div className="max-w-xl text-center">

        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Image
            src="/logo.png"
            alt="Thuliragam"
            width={90}
            height={90}
            priority
          />
        </div>

        {/* Error Code */}
        <h1 className="text-8xl font-extrabold text-green-700 tracking-tight">
          404
        </h1>

        {/* Heading */}
        <h2 className="mt-6 text-3xl font-bold text-green-900">
          Oops! This page hasn't sprouted yet 🌱
        </h2>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-md text-lg leading-7 text-gray-600">
          The page you're looking for doesn't exist, has been moved, or the
          link may be incorrect.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-green-700 px-7 py-3 font-semibold text-white transition hover:bg-green-800"
          >
            <Home size={18} />
            Back to Home
          </Link>

          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-green-700 px-7 py-3 font-semibold text-green-700 transition hover:bg-green-50"
          >
            <Package size={18} />
            Browse Products
          </Link>

        </div>

        {/* Footer Text */}
        <p className="mt-10 text-sm text-gray-500">
          Fresh. Healthy. Naturally Grown.
        </p>

      </div>
    </main>
  );
}