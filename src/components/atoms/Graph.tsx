"use client";

interface GraphProps {
  values?: number[]; // Array of values 0-100
  className?: string;
}

export function Graph({ 
  values = [80, 50], 
  className = "" 
}: GraphProps) {
  const maxHeight = 82;

  return (
    <div className={`flex gap-[2px] h-[82px] items-end ${className}`}>
      {values.map((value, index) => {
        const clampedValue = Math.min(100, Math.max(0, value));
        const barHeight = (clampedValue / 100) * maxHeight;
        
        return (
          <div
            key={index}
            className="flex-1 bg-gray-100 rounded-sm transition-all duration-300"
            style={{ height: barHeight }}
          />
        );
      })}
    </div>
  );
}

