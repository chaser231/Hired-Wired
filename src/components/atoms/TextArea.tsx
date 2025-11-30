"use client";

import { TextareaHTMLAttributes, forwardRef, useId } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, className = "", id: providedId, ...props }, ref) => {
    const generatedId = useId();
    const textareaId = providedId || generatedId;
    
    return (
      <div className="flex flex-col gap-[8px]">
        {label && (
          <label 
            htmlFor={textareaId}
            className="text-caps text-black cursor-pointer"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
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

