import Link from "next/link";
import { ArrowRight, MessageCircle, Mail } from "lucide-react";

export default function HerbalCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-green-700 via-green-600 to-emerald-600 py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_40%)]" />

      <div className="relative mx-auto max-w-5xl px-6 text-center text-white">
        <span className="inline-flex rounded-full bg-white/20 px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] backdrop-blur">
          Ready to Order?
        </span>

        <h2 className="mt-6 text-4xl font-bold md:text-5xl">
          Premium Herbal Powders for Every Kitchen & Business
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-green-50">
          Whether you need retail packs or bulk quantities, Thuliragam delivers
          carefully prepared herbal powders with a focus on quality, hygiene,
          and freshness.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-green-700 transition hover:scale-105"
          >
            Contact Us
            <ArrowRight className="h-5 w-5" />
          </Link>

          <Link
            href="https://wa.me/91967799226"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-8 py-4 font-semibold text-white transition hover:bg-white/10"
          >
            <MessageCircle className="h-5 w-5" />
            WhatsApp
          </Link>

          <Link
            href="mailto:thuliragam.in@gmail.com"
            className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-8 py-4 font-semibold text-white transition hover:bg-white/10"
          >
            <Mail className="h-5 w-5" />
            Email Us
          </Link>
        </div>
      </div>
    </section>
  );
}