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
  const height = variant === "big" ? "h-[12px]" : "h-[5px]";
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={`w-full ${height} bg-white rounded-sm overflow-hidden ${className}`}>
      <div 
        className="h-full bg-black rounded-sm transition-all duration-300"
        style={{ width: `${clampedProgress}%` }}
      />
    </div>
  );
}

