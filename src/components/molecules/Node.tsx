"use client";

import { Icon } from "@/components/atoms";

interface NodeProps {
  title: string;
  subtitle: string;
  className?: string;
}

export function Node({
  title,
  subtitle,
  className = "",
}: NodeProps) {
  return (
    <div className={`flex flex-col gap-[24px] p-[14px] bg-pink-soft rounded-md ${className}`}>
      <div className="flex flex-col gap-[14px]">
        <div className="flex justify-between items-start gap-[8px]">
          <Icon type="play" size={16} />
          <Icon type="more" size={16} />
        </div>
        <div className="flex flex-col gap-[8px]">
          <span className="text-bold">{title}</span>
          <span className="text-pixel">{subtitle}</span>
        </div>
      </div>
      {/* Connection dots */}
      <div className="flex justify-between gap-[6px]">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="w-[10px] h-[10px] rounded-full bg-gray-400" />
        ))}
      </div>
    </div>
  );
}

