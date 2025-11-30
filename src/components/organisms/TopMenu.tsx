"use client";

import { Button, Avatar, Switch } from "@/components/atoms";
import { useState } from "react";

interface TopMenuProps {
  activeTab?: "team" | "projects";
  onTabChange?: (tab: "team" | "projects") => void;
  onGenerateReport?: () => void;
  onLogout?: () => void;
  className?: string;
}

export function TopMenu({
  activeTab = "team",
  onTabChange,
  onGenerateReport,
  onLogout,
  className = "",
}: TopMenuProps) {
  const [currentTab, setCurrentTab] = useState(activeTab);

  const handleTabChange = (tab: "team" | "projects") => {
    setCurrentTab(tab);
    onTabChange?.(tab);
  };

  return (
    <nav className={`flex items-center justify-between py-[14px] ${className}`}>
      {/* Left: Logo */}
      <div className="flex items-center gap-[30px]">
        <span className="text-h2 italic">Hired & Wired</span>
        
        {/* Menu Switches */}
        <div className="flex gap-1 p-1 bg-yellow rounded-md">
          <Switch 
            checked={currentTab === "team"} 
            onChange={() => handleTabChange("team")} 
            label="Team" 
          />
          <Switch 
            checked={currentTab === "projects"} 
            onChange={() => handleTabChange("projects")} 
            label="Projects" 
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-[14px]">
        <Button variant="secondary" onClick={onGenerateReport}>
          Generate report
        </Button>
        <div className="flex items-center gap-[8px]">
          <Avatar src="/assets/type=katya.png" size={30} />
          <button 
            onClick={onLogout}
            className="text-pixel text-gray-500 hover:text-black transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

