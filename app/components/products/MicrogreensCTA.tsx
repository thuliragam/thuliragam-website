import Link from "next/link";
import { Phone, MessageCircle, Mail } from "lucide-react";

export default function MicrogreensCTA() {
  return (
    <section className="bg-gradient-to-r from-green-700 to-green-600 py-20">
      <div className="mx-auto max-w-6xl px-6 text-center text-white">
        <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium uppercase tracking-wider">
          Get in Touch
        </span>

        <h2 className="mt-6 text-4xl font-bold md:text-5xl">
          Ready to Experience Fresh Premium Microgreens?
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-green-100">
          Whether you're a home consumer, restaurant, café, supermarket, or
          wellness business, Thuliragam is here to provide fresh, naturally
          grown microgreens with exceptional quality.
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">

          <Link
            href="tel:+919677799226"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-green-700 transition hover:bg-green-100"
          >
            <Phone className="h-5 w-5" />
            Call Now
          </Link>

          <Link
            href="https://wa.me/919677799226"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-8 py-4 font-semibold text-white transition hover:bg-green-400"
          >
            <MessageCircle className="h-5 w-5" />
            WhatsApp Us
          </Link>

          <Link
            href="mailto:thuliragam.in@gmail.com"
            className="inline-flex items-center gap-2 rounded-xl border border-white px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-green-700"
          >
            <Mail className="h-5 w-5" />
            Email Us
          </Link>

        </div>
      </div>
    </section>
  );
}