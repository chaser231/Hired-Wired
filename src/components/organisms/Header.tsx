"use client";

import { Bar } from "@/components/atoms";
import { TopMenu } from "./TopMenu";
import { SecondRow } from "./SecondRow";

interface Stage {
  label: string;
  completed?: boolean;
  active?: boolean;
}

interface HeaderProps {
  variant?: "default" | "builder";
  activeTab?: "team" | "projects";
  breadcrumbs?: { label: string; href?: string }[];
  stages?: Stage[];
  onTabChange?: (tab: "team" | "projects") => void;
  onBack?: () => void;
  onSave?: () => void;
  onDeploy?: () => void;
  className?: string;
}

export function Header({
  variant = "default",
  activeTab = "team",
  breadcrumbs = [],
  stages = [],
  onTabChange,
  onBack,
  onSave,
  onDeploy,
  className = "",
}: HeaderProps) {
  // Calculate progress percentage from stages
  const completedStages = stages.filter(s => s.completed).length;
  const activeStageIndex = stages.findIndex(s => s.active);
  const progressPercent = stages.length > 0 
    ? ((completedStages + (activeStageIndex >= 0 ? 0.5 : 0)) / stages.length) * 100 
    : 0;

  return (
    <header className={`bg-white ${className}`}>
      <div className="px-[30px]">
        <TopMenu activeTab={activeTab} onTabChange={onTabChange} />
        <SecondRow 
          variant={variant === "builder" ? "builder" : "breadcrumb"}
          breadcrumbs={breadcrumbs}
          onBack={onBack}
          onSave={onSave}
          onDeploy={onDeploy}
        />
        
        {/* Progress Stages with dot-based bar */}
        {stages.length > 0 && (
          <div className="py-[14px] border-t border-gray-200">
            <Bar variant="double" progress={progressPercent} />
          </div>
        )}
      </div>
    </header>
  );
}
