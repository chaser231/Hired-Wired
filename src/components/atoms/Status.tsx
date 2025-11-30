"use client";

type StatusType = "green" | "red" | "purple" | "stopped";

interface StatusProps {
  type?: StatusType;
  label?: string;
  className?: string;
}

const statusConfig: Record<StatusType, { color: string; defaultLabel: string }> = {
  green: { color: "bg-green", defaultLabel: "On Track" },
  red: { color: "bg-red", defaultLabel: "Failing" },
  purple: { color: "bg-purple", defaultLabel: "Rocket Growth" },
  stopped: { color: "bg-gray-400", defaultLabel: "Stopped" },
};

export function Status({ 
  type = "green", 
  label,
  className = "" 
}: StatusProps) {
  const config = statusConfig[type];
  const displayLabel = label || config.defaultLabel;
  
  // Определяем цвет текста на основе типа статуса
  const textColorClass = type === "green" ? "text-green" 
    : type === "red" ? "text-red" 
    : type === "purple" ? "text-purple" 
    : "text-gray-400";

  return (
    <div className={`inline-flex items-center gap-[10px] ${className}`}>
      <div className={`w-[5px] h-[5px] rounded-full ${config.color}`} />
      <span className={`text-pixel ${textColorClass}`}>
        {displayLabel}
      </span>
    </div>
  );
}

