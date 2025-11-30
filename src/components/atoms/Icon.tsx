"use client";

type IconType = "play" | "more" | "arrow-down" | "close";

interface IconProps {
  type: IconType;
  size?: number;
  className?: string;
}

const iconPaths: Record<IconType, string> = {
  play: "/assets/icons/icon-play.svg",
  more: "/assets/icons/icon-more.svg",
  "arrow-down": "/assets/icons/icon-arrow-down.svg",
  close: "/assets/icons/icon-close.svg",
};

export function Icon({ 
  type, 
  size = 16, 
  className = "" 
}: IconProps) {
  return (
    <div 
      className={`inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={iconPaths[type]}
        alt={type}
        width={size}
        height={size}
        className="w-full h-full"
      />
    </div>
  );
}

