"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

import { COMPANY } from "../lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-green-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Company */}
          <div>
            <h2 className="text-3xl font-bold">
              Thuliragam
            </h2>

            <p className="mt-5 leading-8 text-green-100">
              Fresh microgreens, herbal powders,
              natural spices, and dehydrated
              vegetables grown with care for a
              healthier tomorrow.
            </p>
          </div>

          {/* Quick Links */}

          <div>
            <h3 className="text-xl font-semibold">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link href="/">Home</Link>
              </li>

              <li>
                <Link href="#about">About</Link>
              </li>

              <li>
                <Link href="#products">Products</Link>
              </li>

              <li>
                <Link href="#gallery">Gallery</Link>
              </li>

              <li>
                <Link href="#contact">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Products */}

          <div>
            <h3 className="text-xl font-semibold">
              Products
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link href="/products/microgreens">
                  Microgreens
                </Link>
              </li>

              <li>
                <Link href="/products/herbal-powders">
                  Herbal Powders
                </Link>
              </li>

              <li>
                <Link href="/products/natural-spices">
                  Natural Spices
                </Link>
              </li>

              <li>
                <Link href="/products/dehydrated-vegetables">
                  Dehydrated Vegetables
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}

          <div>
            <h3 className="text-xl font-semibold">
              Contact
            </h3>

            <div className="mt-5 space-y-4">
              <div className="flex items-start gap-3">
                <Phone
                  size={18}
                  className="mt-1"
                />

                <span>{COMPANY.phone}</span>
              </div>

              <div className="flex items-start gap-3">
                <Mail
                  size={18}
                  className="mt-1"
                />

                <span>{COMPANY.email}</span>
              </div>

              <div className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-1"
                />

                <span>{COMPANY.address}</span>
              </div>
            </div>

            {/* Social Icons */}

            <div className="mt-8 flex gap-4">
              <a
                href="https://www.linkedin.com/company/thuliragam"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-green-800 p-3 transition hover:bg-green-700"
              >
                <FaLinkedinIn size={18} />
              </a>

              <a
                href="https://www.instagram.com/thuliragam"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-green-800 p-3 transition hover:bg-green-700"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="https://www.facebook.com/துளிரகம்"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-green-800 p-3 transition hover:bg-green-700"
              >
                <FaFacebookF size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}

      <div className="border-t border-green-900">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-center text-sm text-green-200 md:flex-row lg:px-8">
          <p>
            © {year} Thuliragam. All rights reserved.
          </p>

          <p>
            Grow Healthier Tomorrow 🌱
          </p>
        </div>
      </div>
    </footer>
  );
}