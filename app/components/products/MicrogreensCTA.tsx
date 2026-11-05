
"use client";

import Link from "next/link";
import {
  Phone,
  MessageCircle,
  Mail,
  ArrowUpRight,
} from "lucide-react";

import { motion, useReducedMotion } from "framer-motion";

const contactOptions = [
  {
    icon: Phone,
    label: "CALL OUR TEAM",
    title: "Speak with us",
    detail: "+91 96777 99226",
    href: "tel:+919677799226",
  },
  {
    icon: MessageCircle,
    label: "WHATSAPP ENQUIRY",
    title: "Chat with us",
    detail: "Quick product enquiries",
    href: "https://wa.me/919677799226",
  },
  {
    icon: Mail,
    label: "EMAIL",
    title: "Write to us",
    detail: "thuliragam.in@gmail.com",
    href: "mailto:thuliragam.in@gmail.com",
  },
];

export default function MicrogreensCTA() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#123D2D] py-20 sm:py-24">

      {/* BACKGROUND DETAILS */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-lime-300/10 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">

        {/* INTRODUCTION */}
        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">

          {/* HEADING */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{
              duration: reduceMotion ? 0 : 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#D9F36A]">
              <span className="h-px w-9 bg-[#D9F36A]" />
              Microgreens Enquiries
            </p>

            <h2 className="max-w-3xl text-4xl font-bold leading-[1.1] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
              Let's Bring
              <span className="block text-[#D9F36A]">
                Fresh Greens to You.
              </span>
            </h2>
          </motion.div>

          {/* DESCRIPTION */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{
              duration: reduceMotion ? 0 : 0.9,
              delay: reduceMotion ? 0 : 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:pb-2"
          >
            <p className="max-w-lg text-sm leading-8 text-[#DCE8DC] sm:text-base">
              Looking for fresh microgreens for your home, restaurant,
              retail store or food business? Connect with our team
              for product availability, pricing and bulk enquiries.
            </p>
          </motion.div>

        </div>

        {/* CONTACT OPTIONS */}
        <div className="mt-14 grid gap-4 md:grid-cols-3">

          {contactOptions.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, y: 80, scale: 0.94 }
                }
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                viewport={{
                  once: false,
                  amount: 0.1,
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.9,
                  delay: reduceMotion ? 0 : index * 0.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href={item.href}
                  target={
                    item.href.startsWith("https://")
                      ? "_blank"
                      : undefined
                  }
                  rel={
                    item.href.startsWith("https://")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="group flex min-h-[190px] flex-col justify-between rounded-2xl border border-white/20 bg-white/[0.05] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#D9F36A]/50 hover:bg-white/[0.09] sm:p-7"
                >

                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D9F36A]">
                      <Icon
                        className="h-5 w-5 text-[#173D2D]"
                        strokeWidth={1.8}
                      />
                    </div>

                    <ArrowUpRight className="h-5 w-5 text-white/50 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#D9F36A]" />
                  </div>

                  <div className="mt-8">
                    <p className="text-[10px] font-bold tracking-[0.2em] text-[#D9F36A]">
                      {item.label}
                    </p>

                    <h3 className="mt-2 text-xl font-bold text-white">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-sm text-[#C1D0C1]">
                      {item.detail}
                    </p>
                  </div>

                </Link>
              </motion.div>
            );
          })}

        </div>

        {/* BOTTOM NOTE */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{
            duration: reduceMotion ? 0 : 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-12 flex flex-col gap-3 border-t border-white/20 pt-7 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-sm font-medium text-[#DCE8DC]">
            Retail & bulk enquiries welcome.
          </p>

          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D9F36A]">
            Thuliragam · Microgreens
          </p>
        </motion.div>

      </div>
    </section>
  );
}
