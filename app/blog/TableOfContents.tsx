
"use client";

import { useEffect, useState } from "react";

type Heading = {
  id: string;
  text: string;
};

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    const article = document.querySelector(".blog-content");

    if (!article) return;

    const elements = article.querySelectorAll("h2");
    const headingList: Heading[] = [];

    elements.forEach((heading, index) => {
      const id = `section-${index + 1}`;

      heading.id = id;
      heading.classList.add("scroll-mt-24");

      headingList.push({
        id,
        text: heading.textContent?.trim() || `Section ${index + 1}`,
      });
    });

    setHeadings(headingList);
  }, []);

  if (headings.length === 0) return null;

  return (
    <div className="my-8 rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold text-emerald-950">
        In This Article
      </h2>

      <ul className="space-y-3">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className="text-sm font-medium text-emerald-800 transition hover:translate-x-1 hover:text-emerald-600"
            >
              → {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
