"use client";

interface ExperiencePreviewProps {
  dateRange: string;
  title: string;
  company: string;
  description: string;
  className?: string;
}

export function ExperiencePreview({
  dateRange,
  title,
  company,
  description,
  className = "",
}: ExperiencePreviewProps) {
  return (
    <div className={`flex flex-col gap-[30px] py-[14px] border-t border-gray-200 ${className}`}>
      <span className="text-pixel">{dateRange}</span>
      <div className="flex flex-col gap-[14px]">
        <span className="text-h3">{title}</span>
        <div className="flex flex-col gap-[8px]">
          <span className="text-grotesk">{company}</span>
          <span className="text-grotesk">{description}</span>
        </div>
      </div>
    </div>
  );
}

