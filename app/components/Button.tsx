import Link from "next/link";
import { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
}

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition-all duration-300";

  const styles = {
    primary:
      "bg-green-700 text-white hover:bg-green-800 hover:scale-105 shadow-lg",

    secondary:
      "bg-green-100 text-green-800 hover:bg-green-200",

    outline:
      "border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white",
  };

  if (href) {
    return (
      <Link
        href={href}
        className={`${base} ${styles[variant]} ${className}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={`${base} ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}