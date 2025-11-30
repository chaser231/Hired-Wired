"use client";

import { Button } from "@/components/atoms";

type SecondRowVariant = "breadcrumb" | "builder";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface SecondRowProps {
  variant?: SecondRowVariant;
  breadcrumbs?: Breadcrumb[];
  onBack?: () => void;
  onSave?: () => void;
  onDeploy?: () => void;
  className?: string;
}

export function SecondRow({
  variant = "breadcrumb",
  breadcrumbs = [],
  onBack,
  onSave,
  onDeploy,
  className = "",
}: SecondRowProps) {
  if (variant === "builder") {
    return (
      <div className={`flex items-center justify-between py-[14px] border-t border-gray-200 ${className}`}>
        <Button variant="secondary" onClick={onBack}>
          ← Back
        </Button>
        <div className="flex items-center gap-[8px]">
          <Button variant="secondary" onClick={onSave}>
            Save
          </Button>
          <Button variant="cta-small" onClick={onDeploy}>
            Deploy
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-[14px] py-[14px] border-t border-gray-200 ${className}`}>
      <Button variant="secondary" onClick={onBack}>
        ← Back
      </Button>
      <div className="flex items-center gap-[8px]">
        {breadcrumbs.map((crumb, index) => (
          <span key={index} className="flex items-center gap-[8px]">
            {index > 0 && <span className="text-gray-400">/</span>}
            <span className={`text-pixel ${index === breadcrumbs.length - 1 ? "text-black" : "text-gray-400"}`}>
              {crumb.label}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

