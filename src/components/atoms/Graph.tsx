"use client";

type GraphBarColor = "pink-soft" | "pink" | "lavender" | "yellow-green" | "mint" | "lemon" | "white";

interface GraphProps {
  values?: number[]; // Array of values 0-100
  barColor?: GraphBarColor;
  className?: string;
}

// Цвета полосок — более светлый/приглушённый оттенок от цвета карточки
const barColorMap: Record<GraphBarColor, string> = {
  "pink-soft": "bg-[#FAE5E2]", // lighter pink-soft
  "pink": "bg-[#FDE9F2]", // lighter pink
  "lavender": "bg-[#EEEAF7]", // lighter lavender
  "yellow-green": "bg-[#F0F1D2]", // lighter yellow-green
  "mint": "bg-[#E8F5F2]", // lighter mint
  "lemon": "bg-[#FFFECF]", // lighter lemon
  "white": "bg-white/80",
};

export function Graph({ 
  values = [80, 50], 
  barColor = "white",
  className = "" 
}: GraphProps) {
  const maxHeight = 82;

  return (
    <div className={`flex gap-[4px] h-[82px] items-end ${className}`}>
      {values.map((value, index) => {
        const clampedValue = Math.min(100, Math.max(0, value));
        const barHeight = (clampedValue / 100) * maxHeight;
        
        return (
          <div
            key={index}
            className={`flex-1 rounded-[4px] transition-all duration-300 ${barColorMap[barColor]}`}
            style={{ height: barHeight }}
          />
        );
      })}
    </div>
  );
}

