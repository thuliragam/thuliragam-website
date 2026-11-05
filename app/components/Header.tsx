
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronDown, Sprout } from "lucide-react";

const nutritionMessages = [
  { nutrient: "VITAMIN A", benefit: "Supports normal vision and immune function" },
  { nutrient: "VITAMIN C", benefit: "Supports collagen formation and antioxidant protection" },
  { nutrient: "VITAMIN E", benefit: "Helps protect cells from oxidative damage" },
  { nutrient: "VITAMIN K", benefit: "Supports bone health and normal blood clotting" },
  { nutrient: "FOLATE B9", benefit: "Supports cell growth and DNA formation" },
  { nutrient: "IRON", benefit: "Helps transport oxygen throughout the body" },
  { nutrient: "CALCIUM", benefit: "Supports healthy bones and teeth" },
  { nutrient: "MAGNESIUM", benefit: "Supports normal muscle and nerve function" },
  { nutrient: "POTASSIUM", benefit: "Supports normal muscle function" },
  { nutrient: "ZINC", benefit: "Supports immunity and cell growth" },
  { nutrient: "PLANT PROTEIN", benefit: "Supports body growth and repair" },
  { nutrient: "DIETARY FIBRE", benefit: "Supports healthy digestion" },
  { nutrient: "ANTIOXIDANTS", benefit: "Help protect cells against oxidative stress" },
];

const navItems = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { name: "Benefits", href: "/#benefits" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/#contact" },
];

const productItems = [
  { name: "Fresh Microgreens", href: "/products/microgreens" },
];

function NutritionTicker() {
  const messages = [...nutritionMessages, ...nutritionMessages];

  return (
    <div className="w-full overflow-hidden bg-[#063D20] py-2.5">
      <div
        className="nutrition-track flex w-max items-center hover:[animation-play-state:paused]"
        aria-label="Microgreen nutrition information"
      >
        {messages.map((item, index) => (
          <div
            key={`${item.nutrient}-${index}`}
            aria-hidden={index >= nutritionMessages.length}
            className="flex shrink-0 items-center gap-4 px-6 sm:gap-5 sm:px-8"
          >
            <span className="whitespace-nowrap text-[10px] font-extrabold tracking-[0.18em] text-[#B9E65A] sm:text-xs">
              {item.nutrient}
            </span>

            <span className="whitespace-nowrap text-[11px] text-white/90 sm:text-sm">
              {item.benefit}
            </span>

            <span className="text-xs text-[#B9E65A]">◆</span>
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

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "benefits", "contact"];

      for (const id of sections) {
        const section = document.getElementById(id);
        if (!section) continue;

        const rect = section.getBoundingClientRect();

        if (rect.top <= 140 && rect.bottom >= 140) {
          setActiveSection(id);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkStyle = (id: string) =>
    `relative whitespace-nowrap font-medium transition-colors duration-300 ${
      activeSection === id
        ? "text-[#075B25]"
        : "text-[#252D23] hover:text-[#087C37]"
    }`;

  return (
    <header className="sticky top-0 z-[100] w-full">

      {/* NUTRITION SCROLLING BAR */}
      <NutritionTicker />

      {/* MAIN NAVIGATION */}
      <div className="border-b border-[#E9E9DC] bg-[#FBFBF3]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[82px] max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-10">

          {/* LOGO */}
          <Link href="/" className="shrink-0">
            <Image
              src="/images/thuliragam-logo.png"
              alt="Thuliragam Logo"
              width={180}
              height={120}
              priority
              className="h-auto max-h-[72px] w-[115px] object-contain transition-transform duration-300 hover:scale-105 sm:w-[135px] lg:w-[155px]"
            />
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden items-center gap-6 lg:gap-9 md:flex">

            {navItems.slice(0, 2).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group relative text-[15px] ${linkStyle(item.name.toLowerCase())}`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-2 left-0 h-[2px] bg-[#087C37] transition-all duration-300 ${
                    activeSection === item.name.toLowerCase()
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}

            {/* MICROGREENS DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => setProductOpen(true)}
              onMouseLeave={() => setProductOpen(false)}
            >
              <button
                type="button"
                onClick={() => setProductOpen(!productOpen)}
                aria-expanded={productOpen}
                className="flex items-center gap-1 whitespace-nowrap text-[15px] font-medium text-[#252D23] transition hover:text-[#087C37]"
              >
                Microgreens
                <ChevronDown
                  size={17}
                  className={`transition-transform duration-300 ${
                    productOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {productOpen && (
                <div className="absolute left-0 top-full z-50 w-64 pt-4">
                  <div className="rounded-xl border border-[#E5EBD9] bg-[#FFFDF5] py-3 shadow-xl">
                    {productItems.map((product) => (
                      <Link
                        key={product.name}
                        href={product.href}
                        onClick={() => setProductOpen(false)}
                        className="block px-5 py-3 text-sm text-[#174D2C] transition hover:bg-[#EDF6E9]"
                      >
                        {product.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {navItems.slice(2).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group relative text-[15px] ${linkStyle(item.name.toLowerCase())}`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-2 left-0 h-[2px] bg-[#087C37] transition-all duration-300 ${
                    activeSection === item.name.toLowerCase()
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* CONTACT BUTTON */}
          <Link
            href="/#contact"
            className="hidden items-center gap-2 rounded-full bg-[#075B25] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-1 hover:bg-[#087C37] md:inline-flex"
          >
            <Sprout size={18} className="text-[#B9E65A]" />
            Contact Us
          </Link>

          {/* MOBILE MENU ICON */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="text-[#075B25] md:hidden"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`overflow-hidden transition-all duration-300 md:hidden ${
            menuOpen ? "max-h-[650px]" : "max-h-0"
          }`}
        >
          <nav className="border-t border-[#E9EBDD] bg-[#FBFBF3] px-7 py-4">

            {navItems.slice(0, 2).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block border-b border-[#E9EBDD] py-3.5 font-medium text-[#263326]"
              >
                {item.name}
              </Link>
            ))}

            <button
              type="button"
              onClick={() => setProductOpen(!productOpen)}
              className="flex w-full items-center justify-between border-b border-[#E9EBDD] py-3.5 font-medium text-[#263326]"
            >
              Microgreens
              <ChevronDown
                size={18}
                className={productOpen ? "rotate-180" : ""}
              />
            </button>

            {productOpen && productItems.map((product) => (
              <Link
                key={product.name}
                href={product.href}
                onClick={() => {
                  setMenuOpen(false);
                  setProductOpen(false);
                }}
                className="block bg-[#F0F5E9] px-5 py-3 text-sm text-[#075B25]"
              >
                {product.name}
              </Link>
            ))}

            {navItems.slice(2).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block border-b border-[#E9EBDD] py-3.5 font-medium text-[#263326]"
              >
                {item.name}
              </Link>
            ))}

            <Link
              href="/#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-5 flex items-center justify-center gap-2 rounded-full bg-[#075B25] py-3 font-semibold text-white"
            >
              <Sprout size={18} className="text-[#B9E65A]" />
              Contact Us
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
