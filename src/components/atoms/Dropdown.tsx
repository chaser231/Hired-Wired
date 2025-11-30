"use client";

import { useState } from "react";
import { Icon } from "./Icon";

type DropdownVariant = "default" | "on-color";

interface DropdownProps {
  variant?: DropdownVariant;
  label?: string;
  value?: string;
  placeholder?: string;
  options?: string[];
  onChange?: (value: string) => void;
  className?: string;
}

export function Dropdown({ 
  variant = "default",
  label,
  value,
  placeholder = "Select...",
  options = [],
  onChange,
  className = "" 
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const isFilled = !!value;
  const isOnColor = variant === "on-color";
  
  const bgColor = isOnColor ? "bg-gold" : "bg-gray-200";
  const textColor = isOnColor ? "text-white" : (isFilled ? "text-black" : "text-gray-500");
  const labelColor = isOnColor ? "text-gold" : "text-black";

  return (
    <div className={`flex flex-col gap-[8px] ${className}`}>
      {label && (
        <label className={`text-caps ${labelColor}`}>{label}</label>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full
            flex items-center justify-between
            px-[14px] py-[8px]
            ${bgColor}
            rounded-sm
            text-pixel ${textColor}
            transition-colors
          `}
        >
          <span className={!isFilled ? "opacity-50" : ""}>
            {value || placeholder}
          </span>
          <div className="pl-[8px]">
            <Icon type="arrow-down" size={16} />
          </div>
        </button>
        
        {isOpen && options.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-[2px] bg-white rounded-sm shadow-lg z-10 border border-gray-200">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange?.(option);
                  setIsOpen(false);
                }}
                className="w-full px-[14px] py-[8px] text-left text-pixel text-black hover:bg-gray-100 transition-colors first:rounded-t-sm last:rounded-b-sm"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

