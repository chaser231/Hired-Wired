"use client";

import { Graph } from "@/components/atoms";

type CardMetricColor = "pink-soft" | "pink" | "lavender" | "yellow-green" | "mint" | "lemon";

interface CardMetricProps {
  title: string;
  label: string;
  values?: number[];
  color?: CardMetricColor;
  className?: string;
}

const colorMap: Record<CardMetricColor, string> = {
  "pink-soft": "bg-pink-soft",
  "pink": "bg-pink",
  "lavender": "bg-lavender",
  "yellow-green": "bg-yellow-green",
  "mint": "bg-mint",
  "lemon": "bg-lemon",
};

export function CardMetric({
  title,
  label,
  values = [80, 60, 90, 45, 70, 85, 55],
  color = "pink-soft",
  className = "",
}: CardMetricProps) {
  return (
    <div className={`flex flex-col gap-[24px] p-[30px] rounded-lg flex-1 ${colorMap[color]} ${className}`}>
      <span className="text-h3">{title}</span>
      <div className="flex flex-col gap-[8px] flex-1">
        <Graph values={values} barColor={color} className="flex-1" />
        <span className="text-pixel">{label}</span>
      </div>
    </div>
  );
}
