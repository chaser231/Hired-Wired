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
  tabs = ["Overview", "Employees", "Report"],
  activeTab = 0,
  onTabChange,
  className = "",
}: CardTopProps) {
  const [currentTab, setCurrentTab] = useState(activeTab);

  const handleTabChange = (index: number) => {
    setCurrentTab(index);
    onTabChange?.(index);
  };

  return (
    <div 
      className={`relative overflow-hidden rounded-lg w-[830px] h-[480px] ${className}`}
      style={{ backgroundColor: variant === "yellow" ? "#FFE900" : "#EAEAEA" }}
    >
      {/* Cover Image Background */}
      <div className="absolute inset-0">
        <Image
          src={coverImage}
          alt="Cover"
          fill
          className="object-cover"
          style={{ 
            mixBlendMode: variant === "gray" ? "normal" : "multiply",
            opacity: variant === "gray" ? 1 : 0.5 
          }}
          priority
        />
        {/* Gradient overlay for gray variant */}
        {variant === "gray" && (
          <div 
            className="absolute inset-0" 
            style={{ 
              background: "linear-gradient(180deg, rgba(242, 242, 242, 0) 0%, rgba(242, 242, 242, 1) 100%)" 
            }} 
          />
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 p-[30px] h-full flex flex-col justify-end items-center gap-[160px]">
        {/* Yellow variant header with labels */}
        {variant === "yellow" && (
          <div className="absolute top-[30px] left-[30px] right-[30px] flex justify-between">
            <span className="text-pixel text-gold">{teamsLabel}</span>
            <span className="text-pixel text-gold">{accessLabel}</span>
          </div>
        )}

        {/* Centered content */}
        <div className="flex flex-col items-center gap-[30px] w-full max-w-[754px]">
          <div className="flex flex-col items-center gap-[30px] w-full">
            <h1 className="text-h1 text-center">{name}</h1>
            <p className="text-description text-center">{role}</p>
          </div>
          
          {/* Actions */}
          {actions.length > 0 && (
            <div className="flex gap-[2px]">
              {actions.map((action, index) => (
                <Button 
                  key={index}
                  variant={variant === "gray" ? "cta-small" : "on-color"}
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
          <div className="flex justify-between items-end w-full">
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
        )}
      </div>
    </div>
  );
}
