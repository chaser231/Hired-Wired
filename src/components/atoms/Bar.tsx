"use client";

interface BarProps {
  progress?: number; // 0-100
  variant?: "default" | "big";
  className?: string;
}

export function Bar({ 
  progress = 75, 
  variant = "default",
  className = "" 
}: BarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  
  // Размеры кружков и количество в зависимости от варианта
  const dotSize = variant === "big" ? 8 : 5;
  const gap = variant === "big" ? 3 : 2;
  const totalDots = variant === "big" ? 60 : 80;
  
  // Количество заполненных кружков
  const filledDots = Math.round((clampedProgress / 100) * totalDots);

  return (
    <div 
      className={`flex items-center ${className}`}
      style={{ gap: `${gap}px` }}
    >
      {Array.from({ length: totalDots }).map((_, index) => (
        <div
          key={index}
          className={`rounded-full flex-shrink-0 transition-colors duration-200 ${
            index < filledDots 
              ? "bg-white" 
              : "bg-white/30"
          }`}
          style={{ 
            width: `${dotSize}px`, 
            height: `${dotSize}px`
          }}
        />
      ))}
    </div>
  );
}
