"use client";

import { Avatar, Status, Bar } from "@/components/atoms";

type ProfileVariant = "long" | "short" | "short-outlined";

interface ProfileProps {
  variant?: ProfileVariant;
  name: string;
  role: string;
  avatarSrc?: string;
  statusType?: "green" | "red" | "purple" | "stopped";
  statusLabel?: string;
  progress?: number;
  className?: string;
}

export function Profile({
  variant = "long",
  name,
  role,
  avatarSrc = "/assets/avatar-katya.png",
  statusType = "green",
  statusLabel,
  progress = 75,
  className = "",
}: ProfileProps) {
  if (variant === "long") {
    return (
      <div className={`flex items-center gap-[14px] py-[14px] border-b border-gray-200 ${className}`}>
        <Avatar src={avatarSrc} size={30} />
        <div className="flex justify-between gap-[20px] flex-1">
          <div className="flex flex-col gap-[8px] w-[243px]">
            <span className="text-h3">{name}</span>
            <span className="text-pixel text-black">{role}</span>
          </div>
          <Status type={statusType} label={statusLabel} />
        </div>
        <Bar progress={progress} className="flex-1" />
      </div>
    );
  }

  // Short & Short-outlined variants
  const bgClass = variant === "short" ? "bg-peach" : "bg-gray-200";
  
  return (
    <div className={`flex items-center gap-[14px] p-[14px] rounded-sm ${bgClass} ${className}`}>
      <Avatar src={avatarSrc} size={30} />
      <div className="flex flex-col gap-[8px]">
        <span className="text-h3">{name}</span>
        <span className="text-pixel text-black">{role}</span>
      </div>
    </div>
  );
}

