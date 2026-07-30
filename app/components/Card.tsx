import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({
  children,
  className = "",
  hover = true,
}: CardProps) {
  return (
    <div
      className={`
        rounded-3xl
        border
        border-green-100
        bg-white
        p-8
        shadow-md
        transition-all
        duration-300
        ${
          hover
            ? "hover:-translate-y-2 hover:shadow-2xl hover:border-green-300"
            : ""
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
}