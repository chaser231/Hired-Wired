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
        px-[10px] py-[10px]
        h-[32px]
        flex items-center justify-center
        text-grotesk text-black
        rounded-sm
        transition-colors
        ${active ? "border border-white" : "border border-transparent hover:bg-white/10"}
        ${className}
      `}
    >
      {label}
    </button>
  );
}
