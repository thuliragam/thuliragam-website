
"use client";

import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  ArrowUpRight,
  Leaf,
  Divide,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

import { COMPANY } from "../lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/#about" },
    { label: "Products", href: "/#products" },
    { label: "Gallery", href: "/#gallery" },
    { label: "Contact", href: "/#contact" },
  ];

  const socialLinks = [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/thuliragam",
      icon: <FaLinkedinIn size={18} />,
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/thuliragam",
      icon: <FaInstagram size={18} />,
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/துளிரகம்",
      icon: <FaFacebookF size={18} />,
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#063D20] text-white">

      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full border border-[#B9E65A]/10" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border border-[#B9E65A]/10" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-8 pt-14 lg:px-10 lg:pt-16">
        {/* Top brand statement */}
        <div className="mb-12 flex flex-col justify-between gap-6 border-b border-white/15 pb-10 md:flex-row md:items-end">

          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#B9E65A] text-[#063D20]">
                <Leaf size={25} />
              </div>

              <h2 className="text-3xl font-extrabold tracking-tight">
                Thuliragam
              </h2>
            </div>

            <p className="mt-4 max-w-md text-sm leading-7 text-white/65">
              Fresh, naturally grown microgreens harvested with care
              to bring better nutrition and a healthier tomorrow
              to every home.
            </p>
          </div>

          <div className="max-w-xs">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B9E65A]">
              Our Philosophy
            </p>
            <p className="mt-2 text-xl font-semibold leading-snug text-white">
              Small greens. Big goodness.
            </p>
          </div>
        </div>

        {/* Footer columns */}
        <div className="mx-auto grid w-full max-w-5xl gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-[#B9E65A]">
              Explore
            </h3>

            <ul className="mt-6 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-[#B9E65A]"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-[#B9E65A]">
              Our Products
            </h3>

            <ul className="mt-6 space-y-3">
              <li>
                <Link
                  href="/products/microgreens"
                  className="group inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-[#B9E65A]"
                >
                  Fresh Microgreens
                  <ArrowUpRight
                    size={13}
                    className="opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                </Link>
              </li>
            </ul>

            {/* FSSAI */}
            <div className="mt-8 rounded-2xl border border-[#B9E65A]/20 bg-white/[0.06] p-4">
              <div className="flex items-center gap-2 text-[#B9E65A]">
                <ShieldCheck size={19} />
                <span className="text-sm font-semibold">
                  FSSAI Registered
                </span>
              </div>

              <p className="mt-3 text-xs text-white/50">
                FSSAI Registration No.
              </p>

              <p className="mt-1 text-base font-bold tracking-wider text-white">
                22426017000960
              </p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-[#B9E65A]">
              Get In Touch
            </h3>

            <div className="mt-6 space-y-5">

              <a
                href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                className="group flex items-start gap-3 text-sm text-white/70 transition-colors hover:text-[#B9E65A]"
              >
                <Phone
                  size={18}
                  className="mt-0.5 shrink-0 text-[#B9E65A]"
                />
                <span>{COMPANY.phone}</span>
              </a>

              <a
                href={`mailto:${COMPANY.email}`}
                className="group flex items-start gap-3 text-sm text-white/70 transition-colors hover:text-[#B9E65A]"
              >
                <Mail
                  size={18}
                  className="mt-0.5 shrink-0 text-[#B9E65A]"
                />
                <span className="break-all">{COMPANY.email}</span>
              </a>

              <div className="flex items-start gap-3 text-sm leading-6 text-white/70">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-[#B9E65A]"
                />
                <span>{COMPANY.address}</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-8">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
                Follow Our Journey
              </p>

              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-white transition-all duration-300 hover:-translate-y-1 hover:border-[#B9E65A] hover:bg-[#B9E65A] hover:text-[#063D20]"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-7 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-white/50">
            © {year} Thuliragam. All rights reserved.
          </p>

          <p className="text-sm font-semibold tracking-wide text-[#B9E65A]">
            Grow Healthier Tomorrow 🌱
          </p>
        </div>
      </div>
    </footer>
  );
}
