"use client";

import { Status, Button } from "@/components/atoms";

interface CampaignStats {
  applied: number;
  rejected: number;
  inProgress: number;
  finalRound: number;
  offersSent: number;
}

interface CampaignPreviewProps {
  title: string;
  statusType?: "green" | "red" | "purple" | "stopped";
  statusLabel?: string;
  stats: CampaignStats;
  onMoreInfo?: () => void;
  className?: string;
}

export function CampaignPreview({
  title,
  statusType = "green",
  statusLabel,
  stats,
  onMoreInfo,
  className = "",
}: CampaignPreviewProps) {
  const statLabels = [
    { key: "applied", label: "applied", value: stats.applied },
    { key: "rejected", label: "rejected", value: stats.rejected },
    { key: "inProgress", label: "in progress", value: stats.inProgress },
    { key: "finalRound", label: "Final round", value: stats.finalRound },
    { key: "offersSent", label: "offers sent", value: stats.offersSent },
  ];

  return (
    <div className={`flex flex-col gap-[90px] p-[30px] bg-white rounded-lg ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <span className="text-h2">{title}</span>
        <div className="flex items-center gap-[14px]">
          <Status type={statusType} label={statusLabel} />
          <Button variant="secondary" onClick={onMoreInfo}>
            more info
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-col gap-[8px]">
        {/* Numbers */}
        <div className="flex gap-[20px]">
          {statLabels.map((stat) => (
            <span key={stat.key} className="flex-1 text-h1">
              {stat.value}
            </span>
          ))}
        </div>
        {/* Labels */}
        <div className="flex gap-[20px]">
          {statLabels.map((stat) => (
            <span key={stat.key} className="flex-1 text-caps">
              {stat.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

