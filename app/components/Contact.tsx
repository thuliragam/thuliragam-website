"use client";

import { useState } from "react";
import { trackEvent } from "@/app/lib/gtag";
import {
  Mail,
  MapPin,
  Phone,
  MessageCircle,
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
  // Google Analytics Event
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
toast.error(data.message);      }
    } catch (error) {
toast.error("Something went wrong. Please try again.");      console.error(error);
    }

    setLoading(false);
  };

  return (
    <SectionContainer
      id="contact"
      className="bg-green-50"
    >
      <SectionTitle
        badge="📞 CONTACT US"
        title="Let's Grow"
        highlight="Together"
        description="We'd love to hear from you. Reach out for product inquiries, wholesale orders, partnerships, or any questions."
      />

      <div className="mt-20 grid gap-12 lg:grid-cols-2">

        {/* Contact Info */}

        <FadeUp>

          <div className="space-y-6">

            <div className="rounded-3xl bg-white p-6 shadow-lg">

              <div className="flex items-start gap-4">

                <Phone
                  className="text-green-700"
                  size={24}
                />

                <div>

                  <h3 className="font-bold text-green-900">
                    Phone
                  </h3>

                 <a
  href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
  onClick={() =>
    trackEvent(
      "phone_click",
      "Contact",
      "Phone Number"
    )
  }
  className="mt-2 block text-gray-600 hover:text-green-700 transition-colors"
>
  {COMPANY.phone}
</a>

                </div>

              </div>

            </div>

            <div className="rounded-3xl bg-white p-6 shadow-lg">
  <div className="flex items-start gap-4">
    <Mail
      className="text-green-700"
      size={24}
    />

    <div>
      <h3 className="font-bold text-green-900">
        Email
      </h3>

      <a
        href={`mailto:${COMPANY.email}`}
        onClick={() =>
          trackEvent(
            "email_click",
            "Contact",
            "Email Address"
          )
        }
        className="mt-2 block text-green-700 hover:text-green-900 hover:underline"
      >
        {COMPANY.email}
      </a>
    </div>
  </div>
</div>

            <div className="rounded-3xl bg-white p-6 shadow-lg">

              <div className="flex items-start gap-4">

                <MapPin
                  className="text-green-700"
                  size={24}
                />

                <div>

                  <h3 className="font-bold text-green-900">
                    Address
                  </h3>

                  <p className="mt-2 text-gray-600">
                    {COMPANY.address}
                  </p>

                </div>

              </div>

            </div>

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

        </FadeUp>

        {/* Form */}

        <FadeUp delay={0.2}>

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl bg-white p-8 shadow-lg"
          >

            <div className="space-y-6">

              <input
                name="name"
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
              />

              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
              />

              <input
                name="phone"
                type="tel"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
              />

              <textarea
                name="message"
                rows={6}
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
              />

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading
                  ? "Sending..."
                  : "Send Message"}
              </Button>

            </div>

          </form>

        </FadeUp>

      </div>
<FadeUp delay={0.4}>
  <div className="mt-16">
    <GoogleMap />
  </div>
</FadeUp>
    </SectionContainer>
  );
}