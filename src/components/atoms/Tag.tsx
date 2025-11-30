"use client";

import { Icon } from "./Icon";

type TagVariant = "control" | "static";

interface TagProps {
  variant?: TagVariant;
  children: React.ReactNode;
  onRemove?: () => void;
  className?: string;
}

export function Tag({ 
  variant = "static", 
  children,
  onRemove,
  className = "" 
}: TagProps) {
  const baseStyles = "inline-flex items-center gap-[10px] px-[8px] h-[24px] rounded-sm text-pixel text-black";
  
  const variantStyles = variant === "control" 
    ? "bg-gray-200" 
    : "bg-lemon";

  return (
    <span className={`${baseStyles} ${variantStyles} ${className}`}>
      {children}
      {variant === "control" && onRemove && (
        <button 
          type="button" 
          onClick={onRemove}
          className="hover:opacity-70 transition-opacity"
        >
          <Icon type="close" size={16} />
        </button>
      )}
    </span>
  );
}

