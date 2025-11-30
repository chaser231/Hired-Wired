"use client";

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
        
        {/* Progress Stages */}
        {stages.length > 0 && (
          <div className="flex gap-[2px] py-[14px] border-t border-gray-200">
            {stages.map((stage, index) => (
              <div 
                key={index}
                className={`
                  flex-1 h-[4px] rounded-full
                  ${stage.completed ? "bg-black" : stage.active ? "bg-yellow" : "bg-gray-200"}
                `}
              />
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

