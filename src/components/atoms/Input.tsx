"use client";

import { InputHTMLAttributes, forwardRef, useId } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className = "", id: providedId, ...props }, ref) => {
    const generatedId = useId();
    const inputId = providedId || generatedId;
    
    return (
      <div className="flex flex-col gap-[8px]">
        {label && (
          <label 
            htmlFor={inputId} 
            className="text-caps text-black cursor-pointer"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-label={!label ? props.placeholder : undefined}
          className={`
            w-full
            px-[14px] py-[8px]
            bg-gray-200 
            rounded-sm
            text-pixel text-black
            placeholder:text-gray-500
            outline-none
            focus:ring-2 focus:ring-yellow focus:ring-offset-1
            transition-all duration-200
            ${className}
          `}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

