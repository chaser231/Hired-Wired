"use client";

type BarVariant = "default" | "big" | "double";

interface BarProps {
  progress?: number; // 0-100
  variant?: BarVariant;
  className?: string;
}

export function Bar({ 
  progress = 75, 
  variant = "default",
  className = "" 
}: BarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  
  // Двухполосный вариант
  if (variant === "double") {
    const dotsPerRow = 60;
    const dotSize = 6;
    const gap = 3;
    const filledDots = Math.round((clampedProgress / 100) * dotsPerRow);
    
    const renderRow = () => (
      <div className="flex items-center" style={{ gap: `${gap}px` }}>
        {Array.from({ length: dotsPerRow }).map((_, index) => (
          <div
            key={index}
            className={`rounded-full flex-shrink-0 transition-colors duration-200 ${
              index < filledDots 
                ? "bg-green" 
                : "bg-mint"
            }`}
            style={{ 
              width: `${dotSize}px`, 
              height: `${dotSize}px`
            }}
          />
        ))}
      </div>
    );

    return (
      <div className={`flex flex-col ${className}`} style={{ gap: `${gap}px` }}>
        {renderRow()}
        {renderRow()}
      </div>
    );
  }
  
  // Стандартные варианты (default / big)
  const dotSize = variant === "big" ? 8 : 5;
  const gap = variant === "big" ? 3 : 2;
  const totalDots = variant === "big" ? 60 : 80;
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
