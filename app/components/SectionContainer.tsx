
import { ReactNode } from "react";

interface SectionContainerProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

export default function SectionContainer({
  children,
  id,
  className = "",
}: SectionContainerProps) {
  return (
    <section
      id={id}
      className={`relative isolate overflow-hidden py-16 sm:py-20 lg:py-24 ${className}`}
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
