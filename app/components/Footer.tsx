
"use client";

import Link from "next/link";
import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

import { COMPANY } from "../lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#063D20] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Company */}
          <div>
            <h2 className="text-3xl font-bold">
              Thuliragam
            </h2>

            <p className="mt-5 leading-8 text-[#D9FBE6]">
              Fresh, naturally grown microgreens
              harvested with care to bring
              better nutrition and a healthier
              tomorrow to every home.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-[#39E75F]">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3 text-[#E5F7EB]">
              <li>
                <Link href="/" className="transition hover:text-[#39E75F]">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#about" className="transition hover:text-[#39E75F]">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#products" className="transition hover:text-[#39E75F]">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/#gallery" className="transition hover:text-[#39E75F]">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="transition hover:text-[#39E75F]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-xl font-semibold text-[#39E75F]">
              Our Products
            </h3>

            <ul className="mt-5 space-y-3 text-[#E5F7EB]">
              <li>
                <Link
                  href="/products/microgreens"
                  className="transition hover:text-[#39E75F]"
                >
                  Fresh Microgreens
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold text-[#39E75F]">
              Contact Us
            </h3>

            <div className="mt-5 space-y-4 text-[#E5F7EB]">

              <div className="flex items-start gap-3">
                <Phone size={18} className="mt-1 shrink-0 text-[#39E75F]" />
                <span>{COMPANY.phone}</span>
              </div>

              <div className="flex items-start gap-3">
                <Mail size={18} className="mt-1 shrink-0 text-[#39E75F]" />
                <span>{COMPANY.email}</span>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 shrink-0 text-[#39E75F]" />
                <span>{COMPANY.address}</span>
              </div>

            </div>

            {/* FSSAI Registration */}
            <div className="mt-6 rounded-xl border border-[#00A844] bg-[#07552B] p-4">
              <div className="flex items-center gap-2 text-[#B6FFCC]">
                <ShieldCheck size={20} />
                <span className="font-semibold">
                  FSSAI Registered
                </span>
              </div>

              <p className="mt-2 text-sm text-[#D9FBE6]">
                FSSAI Registration No.
              </p>

              <p className="mt-1 text-lg font-semibold tracking-wider text-white">
                22426017000960
              </p>
            </div>

            {/* Social Icons */}
            <div className="mt-8 flex gap-4">
              <a
                href="https://www.linkedin.com/company/thuliragam"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="rounded-full bg-[#00A844] p-3 transition hover:bg-[#39E75F] hover:text-[#063D20]"
              >
                <FaLinkedinIn size={18} />
              </a>

              <a
                href="https://www.instagram.com/thuliragam"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="rounded-full bg-[#00A844] p-3 transition hover:bg-[#39E75F] hover:text-[#063D20]"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="https://www.facebook.com/துளிரகம்"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="rounded-full bg-[#00A844] p-3 transition hover:bg-[#39E75F] hover:text-[#063D20]"
              >
                <FaFacebookF size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-[#00A844]/40">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-center text-sm text-[#D9FBE6] md:flex-row lg:px-8">
          <p>
            © {year} Thuliragam. All rights reserved.
          </p>

          <p className="font-semibold text-[#39E75F]">
            Grow Healthier Tomorrow 🌱
          </p>
        </div>
      </div>
    </footer>
  );
}
