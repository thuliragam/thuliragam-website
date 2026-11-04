
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import FadeUp from "./FadeUp";
import SectionContainer from "./SectionContainer";
import SectionTitle from "./SectionTitle";

const faqs = [
  {
    question: "What are microgreens?",
    answer:
      "Microgreens are young edible plants harvested at an early growth stage. They are colourful, flavourful, and can add variety and nutrition to your everyday meals.",
  },
  {
    question: "What varieties of microgreens does Thuliragam offer?",
    answer:
      "We offer 16 varieties, including Sunflower, Turnip, Pink Radish, White Radish, Mustard, Pak Choi, Pea Shoots, Wheat, Red Amaranthus, Green Amaranthus, Red Cabbage, Chinese Cabbage, Yellow American Mustard, Arugula, Purple Kohlrabi, and Cauliflower.",
  },
  {
    question: "Are Thuliragam microgreens freshly harvested?",
    answer:
      "Yes. Our microgreens are harvested with care, quality-checked, and packed hygienically to maintain freshness.",
  },
  {
    question: "How should microgreens be stored?",
    answer:
      "Keep microgreens refrigerated in their original packaging or a suitable airtight container. Follow the storage instructions on the pack and consume them while fresh.",
  },
  {
    question: "How can I eat microgreens?",
    answer:
      "You can add microgreens to salads, sandwiches, wraps, smoothies, soups, dosas, and everyday meals. They are easy to include in your regular diet.",
  },
  {
    question: "What are the nutritional benefits of microgreens?",
    answer:
      "Microgreens contain varying amounts of vitamins, minerals, fibre, and plant compounds depending on the variety. They can be a nutritious addition to a balanced diet.",
  },
  {
    question: "How much microgreens should I consume?",
    answer:
      "A serving of approximately 20–30 grams can be a convenient starting point. You can adjust the quantity according to your meals and preferences.",
  },
  {
    question: "Do you accept bulk and wholesale orders?",
    answer:
      "Yes. We welcome bulk orders from restaurants, hotels, cafes, supermarkets, and other businesses. Contact us for availability and pricing.",
  },
  {
    question: "How can I order Thuliragam microgreens?",
    answer:
      "You can place an enquiry through our WhatsApp, phone, email, or website contact form. Our team will help you with available varieties and ordering details.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <SectionContainer id="faq" className="bg-white">
      <SectionTitle
        badge="🌱 MICROGREENS FAQ"
        title="Frequently Asked"
        highlight="Questions"
        description="Everything you need to know about Thuliragam fresh microgreens, their varieties, storage, nutrition, and ordering."
      />

      <div className="mx-auto mt-16 max-w-4xl space-y-5">
        {faqs.map((faq, index) => {
          const open = openIndex === index;

          return (
            <FadeUp key={faq.question} delay={index * 0.06}>
              <div className="overflow-hidden rounded-2xl border border-[#00A844]/20 bg-white shadow-md transition-all duration-300 hover:border-[#00A844] hover:shadow-lg">

                <button
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={open}
                >
                  <h3 className="text-lg font-semibold text-[#006B35]">
                    {faq.question}
                  </h3>

                  <ChevronDown
                    className={`shrink-0 text-[#00A844] transition-transform duration-300 ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 leading-7 text-[#355B45]">
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
