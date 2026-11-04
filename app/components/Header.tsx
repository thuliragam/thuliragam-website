
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

const navItems = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { name: "Benefits", href: "/#benefits" },
  { name: "Gallery", href: "/#gallery" },
  { name: "Blog", href: "/blog" },
];

const productItems = [
  { name: "Fresh Microgreens", href: "/products/microgreens" },
];

const nutritionMessages = [
  { nutrient: "VITAMIN A", benefit: "Supports normal vision and immune function" },
  { nutrient: "VITAMIN C", benefit: "Supports collagen formation and antioxidant protection" },
  { nutrient: "VITAMIN E", benefit: "Helps protect cells from oxidative damage" },
  { nutrient: "VITAMIN K", benefit: "Supports normal blood clotting and bone health" },
  { nutrient: "FOLATE (B9)", benefit: "Supports cell growth and DNA formation" },
  { nutrient: "IRON", benefit: "Helps transport oxygen throughout the body" },
  { nutrient: "CALCIUM", benefit: "Supports healthy bones and teeth" },
  { nutrient: "MAGNESIUM", benefit: "Supports normal muscle and nerve function" },
  { nutrient: "POTASSIUM", benefit: "Supports normal muscle and nerve function" },
  { nutrient: "ZINC", benefit: "Supports immunity and normal cell growth" },
  { nutrient: "PLANT PROTEIN", benefit: "Provides building blocks for body growth and repair" },
  { nutrient: "DIETARY FIBRE", benefit: "Supports healthy digestion" },
  { nutrient: "ANTIOXIDANTS", benefit: "Help protect cells against oxidative stress" },
];

function NutritionTicker() {
  const messages = [...nutritionMessages, ...nutritionMessages];

  return (
    <div
      className="relative overflow-hidden border-b border-[#00A844]/40 bg-[#063D20] py-3"
      aria-label="Microgreen nutrient information"
    >
      <div className="flex w-max animate-nutrition-scroll hover:[animation-play-state:paused]">
        {messages.map((item, index) => (
          <div
            key={`${item.nutrient}-${index}`}
            className="flex shrink-0 items-center gap-5 px-7"
            aria-hidden={index >= nutritionMessages.length}
          >
            <span className="whitespace-nowrap text-[10px] font-extrabold tracking-[0.2em] text-[#39E75F] sm:text-xs">
              {item.nutrient}
            </span>

            <span className="whitespace-nowrap text-xs font-medium tracking-wide text-white/90 sm:text-sm">
              {item.benefit}
            </span>

            <span className="text-sm text-[#39E75F]">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}

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
    <header className="sticky top-0 z-[100] w-full">
      <NutritionTicker />

      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-[#006B35] shadow-xl border-b border-[#00A844]"
            : "bg-[#006B35]"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-8 py-2">

          {/* LOGO */}
          <Link href="/" className="group">
            <Image
              src="/logo.png"
              alt="Thuliragam Logo"
              width={190}
              height={70}
              priority
className="w-32 md:w-40 h-auto transition-transform duration-300 group-hover:scale-105"            />
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden md:flex items-center gap-8">

            {navItems.slice(0, 2).map((item) => {
              const active =
                activeSection === item.href.replace("/#", "");

              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`relative group font-medium transition ${
                    active
                      ? "text-white"
                      : "text-white/90 hover:text-[#39E75F]"
                  }`}
                >
                  {item.name}

                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-[#39E75F] transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              );
            })}

            {/* PRODUCTS DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => setProductOpen(true)}
              onMouseLeave={() => setProductOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 font-medium text-white hover:text-[#39E75F] transition"
                aria-expanded={productOpen}
              >
                Products

                <ChevronDown
                  size={18}
                  className={`transition ${
                    productOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {productOpen && (
                <div className="absolute left-0 top-full pt-2 w-64 z-50">
                  <div className="rounded-2xl bg-white shadow-2xl border border-[#D9FBE6] py-3">
                    {productItems.map((product) => (
                      <Link
                        key={product.name}
                        href={product.href}
                        className="block px-5 py-3 text-[#006B35] hover:bg-[#D9FBE6] hover:text-[#00A844] transition"
                      >
                        {product.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {navItems.slice(2).map((item) => {
              const active =
                activeSection === item.href.replace("/#", "");

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative group font-medium transition ${
                    active
                      ? "text-white"
                      : "text-white/90 hover:text-[#39E75F]"
                  }`}
                >
                  {item.name}

                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-[#39E75F] transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* DESKTOP CONTACT BUTTON */}
          <div className="hidden md:flex items-center">
            <Link
              href="/#contact"
              className="inline-flex items-center rounded-full bg-white px-7 py-3 font-semibold text-[#008F3D] shadow-lg hover:bg-[#D9FBE6] hover:scale-105 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="text-white"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`overflow-hidden transition-all duration-300 md:hidden ${
            menuOpen ? "max-h-[700px]" : "max-h-0"
          }`}
        >
          <div className="bg-[#006B35] border-t border-[#00A844]">
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

              <p className="pt-3 pb-2 font-semibold text-[#39E75F]">
                Products
              </p>

              {productItems.map((product) => (
                <Link
                  key={product.name}
                  href={product.href}
                  onClick={() => setMenuOpen(false)}
                  className="ml-4 py-2 text-white hover:text-[#39E75F]"
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
<Link
  href="/blog"
  onClick={() => setMenuOpen(false)}
  className="py-3 text-white hover:text-[#39E75F]"
>
  Blog
</Link>
              {/* MOBILE CONTACT BUTTON */}
              <a
                href="/#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-5 rounded-full bg-white text-[#008F3D] text-center py-3 font-semibold"
              >
                Contact Us
              </a>

            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
