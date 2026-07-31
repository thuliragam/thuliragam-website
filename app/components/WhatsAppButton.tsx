"use client";

import { FaWhatsapp } from "react-icons/fa";
import { trackEvent } from "@/app/lib/gtag";

export default function WhatsAppButton() {
  const phoneNumber = "919677799226";

  const message =
    "Hello Thuliragam! I would like to know more about your products.";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  const handleWhatsAppClick = () => {
    trackEvent(
      "whatsapp_click",
      "Contact",
      "Floating WhatsApp Button"
    );
  };

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-green-500 rounded-full shadow-2xl flex items-center justify-center hover:bg-green-600 hover:scale-110 transition-all duration-300"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className="text-white text-4xl" />
    </a>
  );
}