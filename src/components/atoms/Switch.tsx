"use client";

interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  className?: string;
}

export function Switch({ 
  checked = false, 
  onChange,
  label = "Team",
  className = "" 
}: SwitchProps) {
  return (
    <button
      type="button"
      onClick={() => onChange?.(!checked)}
      className={`
        inline-flex items-center justify-center
        px-[14px] h-[32px]
        rounded-sm
        text-pixel text-black
        transition-colors
        ${checked ? "bg-white" : "bg-transparent"}
        ${className}
      `}
    >
      {label}
    </button>
  );
}

