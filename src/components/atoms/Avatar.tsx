"use client";

import Image from "next/image";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
  className?: string;
}

export function Avatar({ 
  src = "/assets/type=katya.png", 
  alt = "Avatar", 
  size = 30,
  className = "" 
}: AvatarProps) {
  return (
    <div 
      className={`relative rounded-full overflow-hidden bg-gray-200 ${className}`}
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gray-400" />
      )}
    </div>
  );
}

