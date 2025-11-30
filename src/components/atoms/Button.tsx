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
    hover:opacity-90 transition-opacity
  `,
  "cta-small": `
    bg-black text-white 
    px-[14px] py-[8px]
    rounded-full
    text-pixel
    hover:opacity-90 transition-opacity
  `,
  "secondary": `
    bg-gray-200 text-black 
    px-[14px] py-[8px]
    rounded-full
    text-pixel
    hover:bg-gray-400 transition-colors
  `,
  "on-color": `
    bg-white text-black 
    px-[14px] py-[8px]
    rounded-full
    text-pixel
    hover:opacity-90 transition-opacity
  `,
  "node": `
    bg-error-bg text-black 
    px-[14px] py-[14px]
    rounded-sm
    flex flex-col gap-[8px]
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

