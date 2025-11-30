"use client";

import Image from "next/image";

interface FlagProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export function Flag({ 
  checked = false, 
  onChange,
  className = "" 
}: FlagProps) {
  return (
    <button
      type="button"
      onClick={() => onChange?.(!checked)}
      className={`
        inline-flex items-center justify-center
        w-[26px] h-[18px]
        p-[2px]
        ${className}
      `}
    >
      <Image
        src={checked ? "/assets/flag-yes.png" : "/assets/flag-no.png"}
        alt={checked ? "Checked" : "Unchecked"}
        width={22}
        height={14}
        className="object-contain"
      />
    </button>
  );
}

