"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "cta-big" | "cta-small" | "secondary" | "on-color" | "node";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  "cta-big": `
    bg-black text-white 
    px-[14px] py-[14px] pb-[20px]
    rounded-full
    text-h2
    hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]
    transition-all duration-200
    focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2
  `,
  "cta-small": `
    bg-black text-white 
    px-[14px] py-[8px]
    rounded-full
    text-pixel
    hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]
    transition-all duration-200
    focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2
  `,
  "secondary": `
    bg-gray-200 text-black 
    px-[14px] py-[8px]
    rounded-full
    text-pixel
    hover:bg-gray-400 hover:scale-[1.02] active:scale-[0.98]
    transition-all duration-200
    focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2
  `,
  "on-color": `
    bg-white text-black 
    px-[14px] py-[8px]
    rounded-full
    text-pixel
    hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]
    transition-all duration-200
    focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2
  `,
  "node": `
    bg-error-bg text-black 
    px-[14px] py-[14px]
    rounded-sm
    flex flex-col gap-[8px]
    hover:shadow-md active:scale-[0.98]
    transition-all duration-200
    focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2
  `,
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "cta-small", children, className = "", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`
          inline-flex items-center justify-center
          cursor-pointer
          ${variantStyles[variant]}
          ${className}
        `}
        {...props}
      >
        {variant === "node" ? (
          <div className="flex flex-col gap-[8px]">
            <span className="text-bold">{children}</span>
            <span className="text-pixel">more info</span>
          </div>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

