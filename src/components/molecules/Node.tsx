"use client";

import { Icon, NodeConnector } from "@/components/atoms";

interface NodeProps {
  title: string;
  subtitle: string;
  hasInput?: boolean;
  hasOutput?: boolean;
  className?: string;
}

export function Node({
  title,
  subtitle,
  hasInput = true,
  hasOutput = true,
  className = "",
}: NodeProps) {
  return (
    <div className={`relative flex flex-col gap-[24px] p-[14px] bg-pink-soft rounded-lg ${className}`}>
      {/* Header row with icons */}
      <div className="flex justify-between items-start">
        <Icon type="play" size={24} />
        <Icon type="more" size={24} />
      </div>
      
      {/* Content */}
      <div className="flex flex-col gap-[8px]">
        <span className="text-h3">{title}</span>
        <span className="text-pixel">{subtitle}</span>
      </div>
      
      {/* Connection points - In (left) and Out (right) */}
      <div className="flex justify-between items-center">
        {hasInput ? (
          <NodeConnector type="in" size={12} />
        ) : (
          <div className="w-[12px]" />
        )}
        {hasOutput ? (
          <NodeConnector type="out" size={12} />
        ) : (
          <div className="w-[12px]" />
        )}
      </div>
    </div>
  );
}
