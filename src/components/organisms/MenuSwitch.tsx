"use client";

interface MenuSwitchProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function MenuSwitch({
  label,
  active = false,
  onClick,
  className = "",
}: MenuSwitchProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        px-[14px] py-[8px]
        text-pixel text-black
        border-b-2
        transition-colors
        ${active ? "border-black" : "border-transparent hover:border-gray-200"}
        ${className}
      `}
    >
      {label}
    </button>
  );
}

