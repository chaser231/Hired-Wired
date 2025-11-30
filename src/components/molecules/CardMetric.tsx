"use client";

import { Graph } from "@/components/atoms";

interface CardMetricProps {
  title: string;
  label: string;
  values?: number[];
  className?: string;
}

export function CardMetric({
  title,
  label,
  values = [80, 50],
  className = "",
}: CardMetricProps) {
  return (
    <div className={`flex flex-col gap-[24px] p-[30px] bg-mint rounded-lg w-[190px] h-[195px] ${className}`}>
      <span className="text-h3">{title}</span>
      <div className="flex flex-col gap-[8px] flex-1">
        <Graph values={values} className="flex-1" />
        <span className="text-pixel">{label}</span>
      </div>
    </div>
  );
}

