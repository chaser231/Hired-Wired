"use client";

type IconType = "play" | "more" | "arrow-down" | "close";

interface IconProps {
  type: IconType;
  size?: number;
  className?: string;
}

const iconPaths: Record<IconType, string> = {
  play: "/assets/icon-play.png",
  more: "/assets/icon-more.png",
  "arrow-down": "/assets/icon-arrow-down.png",
  close: "/assets/icon-close.png",
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

