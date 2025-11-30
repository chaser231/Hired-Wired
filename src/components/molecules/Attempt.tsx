"use client";

import { Status } from "@/components/atoms";

type AttemptType = "past" | "next";

interface AttemptOffer {
  salary: string;
  perks: string[];
}

interface AttemptProps {
  type?: AttemptType;
  label: string;
  yourOffer: AttemptOffer;
  theirOffer: AttemptOffer;
  statusType?: "green" | "red" | "purple" | "stopped";
  statusLabel?: string;
  className?: string;
}

export function Attempt({
  type = "past",
  label,
  yourOffer,
  theirOffer,
  statusType = "red",
  statusLabel = "failed",
  className = "",
}: AttemptProps) {
  return (
    <div className={`flex flex-col gap-[24px] p-[30px] bg-white rounded-lg ${className}`}>
      <span className="text-pixel">{label}</span>
      
      <div className="flex justify-between gap-[60px]">
        {/* Your Offer */}
        <div className="flex flex-col gap-[14px] w-[290px]">
          <span className="text-h2">{yourOffer.salary}</span>
          <div className="flex flex-col gap-[8px]">
            {yourOffer.perks.map((perk) => (
              <span key={perk} className="text-pixel text-gray-500">{perk}</span>
            ))}
          </div>
        </div>

        {/* Status (only for past) */}
        {type === "past" && (
          <Status type={statusType} label={statusLabel} />
        )}

        {/* Their Offer */}
        <div className="flex flex-col items-center gap-[14px] w-[290px]">
          <span className="text-h2">{theirOffer.salary}</span>
          <div className="flex flex-col gap-[8px]">
            {theirOffer.perks.map((perk) => (
              <span key={perk} className="text-pixel text-gray-500">{perk}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

