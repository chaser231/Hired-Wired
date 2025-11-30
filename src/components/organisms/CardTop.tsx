"use client";

import Image from "next/image";
import { Button } from "@/components/atoms";

type CardTopVariant = "yellow" | "gray";

interface CardTopProps {
  variant?: CardTopVariant;
  name: string;
  role: string;
  coverImage?: string;
  actions?: { label: string; onClick?: () => void }[];
  className?: string;
}

export function CardTop({
  variant = "yellow",
  name,
  role,
  coverImage = "/assets/Cover Image.jpg",
  actions = [],
  className = "",
}: CardTopProps) {
  const bgColor = variant === "yellow" ? "bg-yellow" : "bg-gray-200";

  return (
    <div className={`relative overflow-hidden rounded-lg ${bgColor} ${className}`}>
      {/* Cover Image */}
      <div className="absolute inset-0">
        <Image
          src={coverImage}
          alt="Cover"
          fill
          className="object-cover mix-blend-multiply opacity-50"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 p-[30px] min-h-[400px] flex flex-col justify-end">
        <div className="flex flex-col gap-[14px]">
          <h1 className="text-h1">{name}</h1>
          <p className="text-description">{role}</p>
          
          {/* Actions */}
          {actions.length > 0 && (
            <div className="flex gap-[8px] mt-[14px]">
              {actions.map((action, index) => (
                <Button 
                  key={index}
                  variant={index === 0 ? "cta-small" : "secondary"}
                  onClick={action.onClick}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

