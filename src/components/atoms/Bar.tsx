"use client";

import { useRef, useEffect, useState } from "react";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [dotsCount, setDotsCount] = useState(0);
  const clampedProgress = Math.min(100, Math.max(0, progress));
  
  const dotSize = variant === "big" ? 8 : variant === "double" ? 6 : 5;
  const gap = variant === "big" ? 3 : variant === "double" ? 3 : 2;
  
  // Рассчитываем количество точек на основе ширины контейнера
  useEffect(() => {
    const calculateDots = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const dotsPerWidth = Math.floor((containerWidth + gap) / (dotSize + gap));
        setDotsCount(Math.max(1, dotsPerWidth));
      }
    };
    
    calculateDots();
    
    // ResizeObserver для адаптивности
    const resizeObserver = new ResizeObserver(calculateDots);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    return () => resizeObserver.disconnect();
  }, [dotSize, gap]);

  const filledDots = Math.round((clampedProgress / 100) * dotsCount);
  
  // Двухполосный вариант
  if (variant === "double") {
    const renderRow = () => (
      <div 
        className="flex items-center w-full"
        style={{ gap: `${gap}px` }}
      >
        {Array.from({ length: dotsCount }).map((_, index) => (
          <div
            key={index}
            className={`rounded-full flex-shrink-0 flex-grow-0 transition-colors duration-200 ${
              index < filledDots 
                ? "bg-green" 
                : "bg-mint"
            }`}
            style={{ 
              width: `${dotSize}px`, 
              height: `${dotSize}px`,
              minWidth: `${dotSize}px`,
            }}
          />
        ))}
      </div>
    );

    return (
      <div 
        ref={containerRef}
        className={`flex flex-col w-full overflow-hidden ${className}`} 
        style={{ gap: `${gap}px` }}
      >
        {dotsCount > 0 && (
          <>
            {renderRow()}
            {renderRow()}
          </>
        )}
      </div>
    );
  }
  
  // Стандартные варианты (default / big) - используют green/mint цвета
  return (
    <div 
      ref={containerRef}
      className={`flex items-center w-full overflow-hidden ${className}`}
      style={{ gap: `${gap}px` }}
    >
      {Array.from({ length: dotsCount }).map((_, index) => (
        <div
          key={index}
          className={`rounded-full flex-shrink-0 flex-grow-0 transition-colors duration-200 ${
            index < filledDots 
              ? "bg-green" 
              : "bg-mint"
          }`}
          style={{ 
            width: `${dotSize}px`, 
            height: `${dotSize}px`,
            minWidth: `${dotSize}px`,
          }}
        />
      ))}
    </div>
  );
}
