
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
      className={`
        relative isolate flex w-full items-center overflow-hidden
        bg-[#FBFBF3]
        py-10 sm:py-12 lg:py-8
        lg:min-h-[calc(100svh-122px)]
        ${className}
      `}
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
