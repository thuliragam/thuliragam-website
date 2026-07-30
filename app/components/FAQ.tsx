"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import FadeUp from "./FadeUp";
import SectionContainer from "./SectionContainer";
import SectionTitle from "./SectionTitle";

const faqs = [
  {
    question: "What products does Thuliragam offer?",
    answer:
      "We offer fresh microgreens, herbal powders, natural spices, and dehydrated vegetables made with a focus on quality and freshness.",
  },
  {
    question: "Are your products 100% natural?",
    answer:
      "Yes. Our products are prepared using carefully selected natural ingredients without artificial colors or preservatives.",
  },
  {
    question: "How should microgreens be stored?",
    answer:
      "Store microgreens in the refrigerator and consume them within a few days for the best freshness and nutritional value.",
  },
  {
    question: "Do you accept bulk or wholesale orders?",
    answer:
      "Yes. We welcome bulk orders from restaurants, supermarkets, hotels, cafes, and distributors. Please contact us for pricing.",
  },
  {
    question: "How can I place an order?",
    answer:
      "You can contact us through WhatsApp, phone, email, or the contact form on our website.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <SectionContainer id="faq" className="bg-green-50">
      <SectionTitle
        badge="❓ FAQ"
        title="Frequently Asked"
        highlight="Questions"
        description="Find answers to the most common questions about Thuliragam and our products."
      />

      <div className="mx-auto mt-16 max-w-4xl space-y-5">
        {faqs.map((faq, index) => {
          const open = openIndex === index;

          return (
            <FadeUp key={faq.question} delay={index * 0.08}>
              <div className="overflow-hidden rounded-2xl border border-green-100 bg-white shadow-md">

                <button
                  onClick={() =>
                    setOpenIndex(open ? null : index)
                  }
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <h3 className="text-lg font-semibold text-green-900">
                    {faq.question}
                  </h3>

                  <ChevronDown
                    className={`transition-transform duration-300 ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    open
                      ? "grid-rows-[1fr]"
                      : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 leading-7 text-gray-600">
                      {faq.answer}
                    </p>
                  </div>
                </div>

              </div>
            </FadeUp>
          );
        })}
      </div>
    </SectionContainer>
  );
}