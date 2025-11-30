"use client";

import { Avatar } from "./Avatar";

interface AvatarsProps {
  avatars?: { src: string; alt?: string }[];
  max?: number;
  size?: number;
  className?: string;
}

export function Avatars({ 
  avatars = [
    { src: "/assets/avatar-katya.png" },
    { src: "/assets/avatar-petya.png" },
    { src: "/assets/avatar-dog.png" },
  ],
  max = 3,
  size = 30,
  className = "" 
}: AvatarsProps) {
  const visibleAvatars = avatars.slice(0, max);

  return (
    <div className={`flex items-center ${className}`}>
      {visibleAvatars.map((avatar, index) => (
        <div
          key={index}
          className="relative"
          style={{ 
            marginLeft: index === 0 ? 0 : -8,
            zIndex: visibleAvatars.length - index
          }}
        >
          <Avatar 
            src={avatar.src} 
            alt={avatar.alt || `Avatar ${index + 1}`} 
            size={size}
            className="ring-2 ring-white"
          />
        </div>
      ))}
    </div>
  );
}

