"use client";

import Image from "next/image";
import { useState } from "react";
import { Button, Dropdown, Switch } from "@/components/atoms";

type CardTopVariant = "yellow" | "gray";

interface DropdownOption {
  label: string;
  value: string;
}

interface CardTopProps {
  variant?: CardTopVariant;
  name: string;
  role: string;
  coverImage?: string;
  actions?: { label: string; onClick?: () => void }[];
  // Yellow variant - dropdowns
  teamsLabel?: string;
  accessLabel?: string;
  teamOptions?: DropdownOption[];
  accessOptions?: DropdownOption[];
  // Gray variant - switch tabs
  tabs?: string[];
  activeTab?: number;
  onTabChange?: (index: number) => void;
  className?: string;
}

export function CardTop({
  variant = "yellow",
  name,
  role,
  coverImage = "/assets/Cover Image.jpg",
  actions = [],
  teamsLabel = "TEAMS",
  accessLabel = "ACCESS",
  teamOptions = [
    { label: "frontend-team", value: "frontend" },
    { label: "Innovation Lab", value: "innovation" },
    { label: "Lead Developer", value: "lead" },
    { label: "Member", value: "member" },
  ],
  accessOptions = [
    { label: "Access LEVEL 4 (CODE RED)", value: "level4" },
  ],
  tabs = ["Team", "Team", "Team"],
  activeTab = 0,
  onTabChange,
  className = "",
}: CardTopProps) {
  const [currentTab, setCurrentTab] = useState(activeTab);
  const bgColor = variant === "yellow" ? "bg-yellow" : "bg-gray-200";

  const handleTabChange = (index: number) => {
    setCurrentTab(index);
    onTabChange?.(index);
  };

  return (
    <div className={`relative overflow-hidden rounded-lg ${bgColor} ${className}`}>
      {/* Cover Image */}
      <div className="absolute inset-0">
        <Image
          src={coverImage}
          alt="Cover"
          fill
          className="object-cover mix-blend-multiply opacity-50"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 p-[30px] min-h-[480px] flex flex-col">
        {/* Yellow variant header with labels */}
        {variant === "yellow" && (
          <div className="flex justify-between mb-auto">
            <span className="text-pixel text-gold">{teamsLabel}</span>
            <span className="text-pixel text-gold">{accessLabel}</span>
          </div>
        )}

        {/* Centered content */}
        <div className="flex-1 flex flex-col items-center justify-center gap-[30px]">
          <div className="flex flex-col items-center gap-[30px]">
            <h1 className="text-h1 text-center">{name}</h1>
            <p className="text-description text-center">{role}</p>
          </div>
          
          {/* Actions */}
          {actions.length > 0 && (
            <div className="flex gap-[2px]">
              {actions.map((action, index) => (
                <Button 
                  key={index}
                  variant="on-color"
                  onClick={action.onClick}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Bottom controls */}
        {variant === "yellow" ? (
          // Yellow variant - dropdowns
          <div className="flex justify-between items-end mt-auto">
            <div className="flex flex-wrap gap-[2px] max-w-[310px]">
              {teamOptions.map((option, index) => (
                <Dropdown
                  key={index}
                  variant="on-color"
                  value={option.label}
                  options={[option.label]}
                />
              ))}
              <Button variant="on-color">add</Button>
            </div>
            <div className="flex flex-wrap gap-[2px] justify-end max-w-[200px]">
              {accessOptions.map((option, index) => (
                <Dropdown
                  key={index}
                  variant="on-color"
                  value={option.label}
                  options={[option.label]}
                />
              ))}
              <Button variant="on-color">add</Button>
            </div>
          </div>
        ) : (
          // Gray variant - switch tabs
          <div className="flex justify-center mt-auto">
            <div className="flex gap-[2px] p-[4px] bg-yellow rounded-md">
              {tabs.map((tab, index) => (
                <Switch
                  key={index}
                  checked={currentTab === index}
                  onChange={() => handleTabChange(index)}
                  label={tab}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
