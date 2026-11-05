
"use client";

import { useState } from "react";
import { ChevronDown, Leaf, MessageCircle } from "lucide-react";

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
    <SectionContainer
      id="faq"
      className="bg-[#FBFBF3]"
    >
      <SectionTitle
        badge="🌱 MICROGREENS FAQ"
        title="Curious About"
        highlight="Microgreens?"
        description="A little knowledge goes a long way. Find answers to common questions about our fresh microgreens."
      />

      <div className="mx-auto mt-9 grid max-w-6xl gap-7 lg:grid-cols-[0.75fr_1.5fr] lg:items-start">

        {/* Left editorial panel */}
        <FadeUp>
          <div className="relative flex h-full min-h-[230px] flex-col justify-between overflow-hidden rounded-[28px] bg-[#063D20] p-7 text-white sm:p-8">

            <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full border border-[#B9E65A]/20" />
            <div className="absolute -right-2 -top-2 h-28 w-28 rounded-full border border-[#B9E65A]/20" />

            <div className="relative z-10">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#B9E65A]">
                <Leaf size={25} className="text-[#063D20]" />
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B9E65A]">
                Let's Make It Simple
              </p>

              <h3 className="mt-3 max-w-xs text-2xl font-semibold leading-tight sm:text-3xl">
                Freshness begins with knowing more.
              </h3>

              <p className="mt-3 max-w-sm text-sm leading-6 text-white/70">
                Explore the little details that make microgreens a wonderful addition to everyday meals.
              </p>
            </div>

            <div className="relative z-10 mt-7 flex items-center gap-2 border-t border-white/15 pt-5">
              <MessageCircle size={17} className="text-[#B9E65A]" />
              <span className="text-sm text-white/80">
                Have another question? Get in touch.
              </span>
            </div>
          </div>
        </FadeUp>

        {/* FAQ accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const open = openIndex === index;

            return (
              <FadeUp key={faq.question} delay={index * 0.04}>
                <div
                  className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                    open
                      ? "border-[#075B25] bg-white shadow-[0_8px_24px_rgba(6,61,32,0.08)]"
                      : "border-[#075B25]/10 bg-white/75 hover:border-[#00A844]/50"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(open ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
                    aria-expanded={open}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors ${
                          open
                            ? "bg-[#B9E65A] text-[#063D20]"
                            : "bg-[#E8FFF1] text-[#075B25]"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <h3
                        className={`text-sm font-semibold leading-6 sm:text-[15px] ${
                          open ? "text-[#063D20]" : "text-[#075B25]"
                        }`}
                      >
                        {faq.question}
                      </h3>
                    </div>

                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        open
                          ? "rotate-180 bg-[#063D20] text-[#B9E65A]"
                          : "bg-[#E8FFF1] text-[#075B25]"
                      }`}
                    >
                      <ChevronDown size={17} />
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="border-t border-[#075B25]/10 px-5 pb-5 pt-4 pl-[60px] text-sm leading-6 text-[#355B45] sm:px-6 sm:pl-[68px]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </SectionContainer>
  );
}
