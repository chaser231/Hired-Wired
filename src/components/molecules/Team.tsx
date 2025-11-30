"use client";

import { Bar, Avatars } from "@/components/atoms";

interface TeamProps {
  name: string;
  peopleCount: number;
  productivity: number;
  highlight?: string;
  avatars?: { src: string }[];
  onClick?: () => void;
  className?: string;
}

export function Team({
  name,
  peopleCount,
  productivity,
  highlight,
  avatars,
  onClick,
  className = "",
}: TeamProps) {
  return (
    <div 
      onClick={onClick}
      className={`flex flex-col gap-[24px] p-[30px] bg-white rounded-lg ${onClick ? "cursor-pointer hover:shadow-md transition-shadow" : ""} ${className}`}
    >
      {/* Header */}
      <div className="flex justify-between items-end">
        <span className="text-h3">{name}</span>
        <span className="text-pixel">{peopleCount} people</span>
      </div>

      {/* Productivity with double progress bar */}
      <div className="flex flex-col gap-[8px]">
        <div className="flex justify-between">
          <span className="text-caps text-gray-400">Productivity</span>
          <span className="text-caps">{productivity}%</span>
        </div>
        <Bar progress={productivity} variant="double" />
      </div>

      {/* Highlight */}
      {highlight && (
        <div className="flex flex-col gap-[8px] w-[246px]">
          <span className="text-caps text-gray-400">Week highlight:</span>
          <span className="text-pixel">{highlight}</span>
        </div>
      )}

      {/* Avatars */}
      <div className="flex items-center gap-[14px]">
        <Avatars avatars={avatars} />
        {peopleCount > 3 && (
          <span className="text-pixel">+{peopleCount - 3} more</span>
        )}
      </div>
    </div>
  );
}
