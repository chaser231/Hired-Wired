"use client";

import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-[8px]">
        {label && (
          <label className="text-caps text-black">{label}</label>
        )}
        <input
          ref={ref}
          className={`
            w-full
            px-[14px] py-[8px]
            bg-gray-200 
            rounded-sm
            text-pixel text-black
            placeholder:text-gray-500
            outline-none
            focus:ring-1 focus:ring-black
            transition-shadow
            ${className}
          `}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

