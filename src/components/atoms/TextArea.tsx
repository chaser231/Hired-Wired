"use client";

import { TextareaHTMLAttributes, forwardRef } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-[8px]">
        {label && (
          <label className="text-caps text-black">{label}</label>
        )}
        <textarea
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
            resize-none
            min-h-[66px]
            ${className}
          `}
          {...props}
        />
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

