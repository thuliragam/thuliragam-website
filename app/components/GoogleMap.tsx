
import { MapPin, Navigation, Leaf, ArrowUpRight } from "lucide-react";
import { COMPANY } from "../lib/constants";

export default function GoogleMap() {
  return (
    <section className="overflow-hidden rounded-[30px] border border-[#075B25]/10 bg-white shadow-[0_20px_55px_rgba(6,61,32,0.10)]">

      {/* LOCATION HEADER */}
      <div className="relative overflow-hidden bg-[#063D20] px-7 py-8 text-white sm:px-10 sm:py-9">

        <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full border border-[#B9E65A]/15" />
        <div className="pointer-events-none absolute -right-2 -top-10 h-44 w-44 rounded-full border border-[#B9E65A]/15" />

        <div className="relative z-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">

          <div>
            <div className="flex items-center gap-2 text-[#B9E65A]">
              <MapPin size={17} />
              <span className="text-xs font-bold uppercase tracking-[0.25em]">
                Visit Thuliragam
              </span>
            </div>

            <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
              Find Us. Visit Us.
            </h2>

            <p className="mt-2 max-w-lg text-sm leading-6 text-white/65">
              We'd love to welcome you. Find our location and plan your visit.
            </p>
          </div>

          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#B9E65A] text-[#063D20]">
            <Leaf size={29} />
          </div>
        </div>
      </div>

      {/* ADDRESS BAR */}
      <div className="flex flex-col justify-between gap-5 bg-[#FBFBF3] px-6 py-5 sm:flex-row sm:items-center sm:px-9">

        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8FFF1] text-[#075B25]">
            <MapPin size={20} />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#00A844]">
              Our Location
            </p>
            <p className="mt-1 text-sm font-semibold leading-6 text-[#063D20]">
              {COMPANY.address}
            </p>
          </div>
        </div>

        <a
          href="https://www.google.com/maps/dir/?api=1&destination=11.074833388572818,77.06010014810252"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#063D20] px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#075B25] hover:shadow-lg"
        >
          <Navigation size={17} className="text-[#B9E65A]" />
          Get Directions
          <ArrowUpRight size={16} />
        </a>
      </div>

      {/* GOOGLE MAP */}
      <div className="relative overflow-hidden border-t border-[#075B25]/10 bg-[#E8FFF1] p-2 sm:p-3">
        <div className="overflow-hidden rounded-[22px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d443.55850359619814!2d77.06010014810252!3d11.074833388572818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8f92c1e4794cf%3A0x7c1f2149a7726750!2sThuliragam!5e1!3m2!1sen!2sin!4v1785317449895!5m2!1sen!2sin"
            width="100%"
            height="420"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            title="Thuliragam Location"
            className="block w-full"
          />
        </div>
      </div>

      {/* BOTTOM BRAND STRIP */}
      <div className="flex items-center justify-center gap-2 border-t border-[#075B25]/10 bg-white px-5 py-4 text-center">
        <Leaf size={15} className="text-[#00A844]" />
        <p className="text-xs font-semibold tracking-wide text-[#355B45]">
          Thuliragam — Grow Healthier Tomorrow
        </p>
      </div>

    </section>
  );
}
