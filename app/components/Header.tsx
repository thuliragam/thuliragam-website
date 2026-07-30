"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";

const navItems = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { name: "Benefits", href: "/#benefits" },
  { name: "Gallery", href: "/#gallery" },
  { name: "Contact", href: "/#contact" },
];

const productItems = [
  {
    name: "Microgreens",
    href: "/products/microgreens",
  },
  {
    name: "Herbal Powders",
    href: "/products/herbal-powders",
  },
  {
    name: "Natural Spices",
    href: "/products/natural-spices",
  },
  {
    name: "Dehydrated Vegetables",
    href: "/products/dehydrated-vegetables",
  },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      for (const item of navItems) {
        const selector = item.href.replace("/", "");
const section = document.querySelector(selector);

if (!section) continue;

const rect = section.getBoundingClientRect();

if (rect.top <= 120 && rect.bottom >= 120) {
  setActiveSection(selector.replace("#", ""));
  break;
}
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0B6B3A] shadow-xl border-b border-green-700"
          : "bg-[#0B6B3A]"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-8 py-4">

        {/* Logo */}
        <Link href="/" className="group">
          <Image
            src="/logo.png"
            alt="Thuliragam Logo"
            width={190}
            height={70}
            priority
            className="w-40 md:w-48 h-auto transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">

          {navItems.slice(0, 2).map((item) => {
            const active = activeSection === item.href.replace("#", "");

            return (
              <a
                key={item.name}
                href={item.href}
                className={`relative group font-medium transition ${
                  active
                    ? "text-white"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {item.name}

                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-white transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            );
          })}

         {/* Products Dropdown */}
<div
  className="relative"
  onMouseEnter={() => setProductOpen(true)}
  onMouseLeave={() => setProductOpen(false)}
>
  <button className="flex items-center gap-1 font-medium text-white hover:text-green-100 transition">
    Products
    <ChevronDown
      size={18}
      className={`transition ${productOpen ? "rotate-180" : ""}`}
    />
  </button>

  {productOpen && (
    <div className="absolute left-0 top-full pt-2 w-64 z-50">
      <div className="rounded-2xl bg-white shadow-2xl border border-green-100 py-3">
        {productItems.map((product) => (
          <Link
            key={product.name}
            href={product.href}
            className="block px-5 py-3 text-green-900 hover:bg-green-50 hover:text-green-700 transition"
          >
            {product.name}
          </Link>
        ))}
      </div>
    </div>
  )}
</div>

          {navItems.slice(2).map((item) => {
            const active = activeSection === item.href.replace("#", "");

            return (
              <Link
  key={item.name}
  href={item.href}
                className={`relative group font-medium transition ${
                  active
                    ? "text-white"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {item.name}

                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-white transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Contact Button */}
        <Link
  href="/#contact"
          className="hidden md:inline-flex items-center rounded-full bg-white px-7 py-3 font-semibold text-green-700 shadow-lg hover:bg-green-50 hover:scale-105 transition-all duration-300"
        >
          Contact Us
        </Link>

        {/* Mobile Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>

      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          menuOpen ? "max-h-[700px]" : "max-h-0"
        }`}
      >
        <div className="bg-[#0B6B3A] border-t border-green-600">

          <nav className="flex flex-col p-6 gap-2">

            <a
              href="/#home"
              onClick={() => setMenuOpen(false)}
              className="py-3 text-white"
            >
              Home
            </a>

            <a
              href="/#about"
              onClick={() => setMenuOpen(false)}
              className="py-3 text-white"
            >
              About
            </a>

            <p className="pt-3 pb-2 font-semibold text-green-200">
              Products
            </p>

            {productItems.map((product) => (
              <Link
                key={product.name}
                href={product.href}
                onClick={() => setMenuOpen(false)}
                className="ml-4 py-2 text-white hover:text-green-200"
              >
                • {product.name}
              </Link>
            ))}

            <a
              href="/#benefits"
              onClick={() => setMenuOpen(false)}
              className="py-3 text-white"
            >
              Benefits
            </a>

            <a
              href="/#gallery"
              onClick={() => setMenuOpen(false)}
              className="py-3 text-white"
            >
              Gallery
            </a>

            <a
              href="/#contact"
              onClick={() => setMenuOpen(false)}
              className="py-3 text-white"
            >
              Contact
            </a>

            <a
              href="/#contact"
              className="mt-5 rounded-full bg-white text-green-700 text-center py-3 font-semibold"
            >
              Contact Us
            </a>

          </nav>

        </div>
      </div>
    </header>
  );
}