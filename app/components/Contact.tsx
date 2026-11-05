
"use client";

import { useState } from "react";
import { trackEvent } from "@/app/lib/gtag";
import {
  Mail,
  MapPin,
  Phone,
  MessageCircle,
  ArrowUpRight,
  Leaf,
} from "lucide-react";

import Button from "./Button";
import FadeUp from "./FadeUp";
import SectionContainer from "./SectionContainer";
import SectionTitle from "./SectionTitle";
import { COMPANY } from "../lib/constants";
import GoogleMap from "./GoogleMap";
import { toast } from "sonner";

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.success) {
        trackEvent(
          "contact_form_submit",
          "Contact",
          "Website Contact Form"
        );

        toast.success("Message sent successfully!", {
          description:
            "Thank you for contacting Thuliragam. We'll get back to you soon.",
        });

        setForm({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    }

    setLoading(false);
  };

  const contactDetails = [
    {
      icon: <Phone size={21} />,
      title: "Phone",
      value: COMPANY.phone,
      href: `tel:${COMPANY.phone.replace(/\s/g, "")}`,
      event: "phone_click",
      label: "Phone Number",
    },
    {
      icon: <Mail size={21} />,
      title: "Email",
      value: COMPANY.email,
      href: `mailto:${COMPANY.email}`,
      event: "email_click",
      label: "Email Address",
    },
  ];

  return (
    <SectionContainer
      id="contact"
      className="bg-[#FBFBF3]"
    >
      <SectionTitle
        badge="📞 CONTACT US"
        title="Let's Grow"
        highlight="Together"
        description="We'd love to hear from you. Reach out for product inquiries, wholesale orders, partnerships, or any questions."
      />

      <div className="mx-auto mt-10 grid max-w-6xl gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">

        {/* LEFT: CONTACT INFORMATION */}
        <FadeUp>
          <div className="relative flex h-full flex-col overflow-hidden rounded-[28px] bg-[#063D20] p-7 text-white shadow-[0_15px_40px_rgba(6,61,32,0.14)] sm:p-8">

            {/* Decorative circles */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-[#B9E65A]/15" />
            <div className="pointer-events-none absolute -right-6 -top-6 h-36 w-36 rounded-full border border-[#B9E65A]/15" />

            <div className="relative z-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#B9E65A]">
                <Leaf size={25} className="text-[#063D20]" />
              </div>

              <p className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-[#B9E65A]">
                Get In Touch
              </p>

              <h3 className="mt-3 text-3xl font-bold leading-tight">
                We'd love to hear from you.
              </h3>

              <p className="mt-3 max-w-sm text-sm leading-7 text-white/65">
                Whether you're looking for fresh microgreens or a business partnership, let's start a conversation.
              </p>
            </div>

            {/* Phone and Email */}
            <div className="relative z-10 mt-8 space-y-3">
              {contactDetails.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  onClick={() =>
                    trackEvent(
                      item.event,
                      "Contact",
                      item.label
                    )
                  }
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4 transition-all duration-300 hover:border-[#B9E65A]/40 hover:bg-white/10"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#B9E65A] text-[#063D20]">
                    {item.icon}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-white/50">
                      {item.title}
                    </p>
                    <p className="mt-1 break-all text-sm font-semibold text-white">
                      {item.value}
                    </p>
                  </div>

                  <ArrowUpRight
                    size={18}
                    className="shrink-0 text-[#B9E65A] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </a>
              ))}

              {/* Address */}
              <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#B9E65A] text-[#063D20]">
                  <MapPin size={21} />
                </div>

                <div>
                  <p className="text-xs text-white/50">
                    Address
                  </p>
                  <p className="mt-1 text-sm leading-6 text-white/90">
                    {COMPANY.address}
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="relative z-10 mt-auto pt-7">
              <a
                href={`https://wa.me/${COMPANY.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent(
                    "whatsapp_click",
                    "Contact",
                    "Contact Section WhatsApp"
                  )
                }
                className="block"
              >
                <Button className="w-full">
                  <MessageCircle
                    size={18}
                    className="mr-2"
                  />
                  Chat on WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </FadeUp>

        {/* RIGHT: ENQUIRY FORM */}
        <FadeUp delay={0.15}>
          <div className="h-full rounded-[28px] border border-[#075B25]/10 bg-white p-6 shadow-[0_12px_35px_rgba(6,61,32,0.07)] sm:p-8">

            <div className="mb-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#00A844]">
                Send An Enquiry
              </p>

              <h3 className="mt-2 text-2xl font-bold text-[#063D20]">
                Let's Talk Business
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#063D20]/55">
                Fill in the details below and our team will get back to you.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">

                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-sm font-semibold text-[#063D20]"
                  >
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-[#075B25]/15 bg-[#FBFBF3] px-4 py-3 text-sm text-[#063D20] outline-none transition-all placeholder:text-[#063D20]/35 focus:border-[#00A844] focus:bg-white focus:ring-2 focus:ring-[#00A844]/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-sm font-semibold text-[#063D20]"
                  >
                    Email Address *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-[#075B25]/15 bg-[#FBFBF3] px-4 py-3 text-sm text-[#063D20] outline-none transition-all placeholder:text-[#063D20]/35 focus:border-[#00A844] focus:bg-white focus:ring-2 focus:ring-[#00A844]/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-phone"
                    className="mb-2 block text-sm font-semibold text-[#063D20]"
                  >
                    Phone Number
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#075B25]/15 bg-[#FBFBF3] px-4 py-3 text-sm text-[#063D20] outline-none transition-all placeholder:text-[#063D20]/35 focus:border-[#00A844] focus:bg-white focus:ring-2 focus:ring-[#00A844]/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-sm font-semibold text-[#063D20]"
                  >
                    Your Message *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="Tell us how we can help..."
                    value={form.message}
                    onChange={handleChange}
                    required
                    className="w-full resize-y rounded-xl border border-[#075B25]/15 bg-[#FBFBF3] px-4 py-3 text-sm text-[#063D20] outline-none transition-all placeholder:text-[#063D20]/35 focus:border-[#00A844] focus:bg-white focus:ring-2 focus:ring-[#00A844]/10"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                  {!loading && (
                    <ArrowUpRight
                      size={18}
                      className="ml-2"
                    />
                  )}
                </Button>
              </div>
            </form>
          </div>
        </FadeUp>
      </div>

      {/* GOOGLE MAP */}
      <FadeUp delay={0.3}>
        <div className="mt-10 overflow-hidden rounded-[28px] border border-[#075B25]/10 bg-white p-2 shadow-[0_12px_35px_rgba(6,61,32,0.07)]">
          <GoogleMap />
        </div>
      </FadeUp>
    </SectionContainer>
  );
}
