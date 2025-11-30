"use client";

interface CardsMetricaProps {
  title: string;
  value: number | string;
  label: string;
  className?: string;
}

export function CardsMetrica({
  title,
  value,
  label,
  className = "",
}: CardsMetricaProps) {
  return (
    <div className={`flex flex-col gap-[90px] p-[30px] bg-white rounded-lg ${className}`}>
      <span className="text-h2">{title}</span>
      <div className="flex flex-col gap-[8px]">
        <span className="text-h1">{value}</span>
        <span className="text-pixel">{label}</span>
      </div>
    </div>
  );
}

