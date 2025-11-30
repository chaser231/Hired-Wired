"use client";

import { Icon } from "./Icon";

type TagVariant = "control" | "static";
type TagSize = "sm" | "default";

interface TagProps {
  variant?: TagVariant;
  size?: TagSize;
  children: React.ReactNode;
  onRemove?: () => void;
  className?: string;
}

export function Tag({ 
  variant = "static", 
  size = "default",
  children,
  onRemove,
  className = "" 
}: TagProps) {
  const baseStyles = "inline-flex items-center gap-[10px] px-[8px] rounded-sm text-pixel text-black";
  
  const variantStyles = variant === "control" 
    ? "bg-gray-200" 
    : "bg-lemon";

  // Желтый (static) tag - 32px по умолчанию, серый (control) - 24px
  const sizeStyles = size === "sm" 
    ? "h-[24px]" 
    : variant === "static" 
      ? "h-[32px]" 
      : "h-[24px]";

  return (
    <span className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}>
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
