"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const menu = [
  { label: "Dashboard", href: "/admin", icon: "▦" },
  { label: "Microgreens", href: "/admin/microgreens", icon: "🌱" },
  { label: "Pricing", href: "/admin/pricing", icon: "💰" },
  { label: "Inventory", href: "/admin/inventory", icon: "📦" },
  { label: "Seed Usage", href: "/admin/seed-usage", icon: "🌾" },
  { label: "Orders", href: "/admin/orders", icon: "🛒" },
  { label: "Customers", href: "/admin/customers", icon: "👥" },
  { label: "Monthly Sales", href: "/admin/sales-report", icon: "📊" },
  { label: "Enquiries", href: "/admin/enquiries", icon: "💬" },
  { label: "Gallery", href: "/admin/gallery", icon: "🖼️" },
  { label: "Testimonials", href: "/admin/testimonials", icon: "⭐" },
  { label: "Blogs", href: "/admin/blogs", icon: "📝" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (
    pathname === "/admin/login" ||
    pathname.startsWith("/admin/login/") ||
    pathname.startsWith("/admin/auth/")
  ) return <>{children}</>;

  const active = (href: string) =>
    href === "/admin"
      ? pathname === href
      : pathname === href || pathname.startsWith(href + "/");

  return (
    <div className="min-h-screen bg-emerald-50 md:flex">
      <aside className="z-20 border-b border-emerald-900/10 bg-emerald-950 text-white md:sticky md:top-0 md:h-screen md:w-64 md:shrink-0 md:border-b-0 md:border-r md:border-emerald-900/10">
        <div className="px-5 py-5 md:px-6 md:py-7">
          <Link href="/admin" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-800 text-xl">
              🌱
            </span>
            <span>
              <span className="block text-lg font-extrabold tracking-wide">
                THULIRAGAM
              </span>
              <span className="block text-xs text-emerald-200">
                Admin Panel
              </span>
            </span>
          </Link>
        </div>

        <nav
          aria-label="Admin navigation"
          className="flex gap-1 overflow-x-auto px-3 pb-3 md:block md:space-y-1 md:overflow-visible md:px-3 md:pb-5"
        >
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active(item.href) ? "page" : undefined}
              className={`flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition md:w-full ${
                active(item.href)
                  ? "bg-emerald-700 text-white shadow"
                  : "text-emerald-100 hover:bg-emerald-900 hover:text-white"
              }`}
            >
              <span className="w-6 text-center text-base">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="hidden px-6 pb-6 text-xs text-emerald-300 md:block">
          Grow Healthier Tomorrow 🌱
        </div>
      </aside>

      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
