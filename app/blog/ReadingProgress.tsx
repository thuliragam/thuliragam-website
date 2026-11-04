
"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const percentage =
        documentHeight > 0
          ? (scrollTop / documentHeight) * 100
          : 0;

      setProgress(Math.min(100, Math.max(0, percentage)));
    };

    window.addEventListener("scroll", updateProgress);
    updateProgress();

    return () => {
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[100] h-1 w-full bg-emerald-100">
      <div
        className="h-full bg-emerald-600 transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
