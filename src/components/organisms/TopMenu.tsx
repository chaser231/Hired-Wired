"use client";

import { Button, Avatar } from "@/components/atoms";
import { MenuSwitch } from "./MenuSwitch";
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
        <div className="flex">
          <MenuSwitch 
            label="Team" 
            active={currentTab === "team"}
            onClick={() => handleTabChange("team")}
          />
          <MenuSwitch 
            label="Projects" 
            active={currentTab === "projects"}
            onClick={() => handleTabChange("projects")}
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-[14px]">
        <Button variant="secondary" onClick={onGenerateReport}>
          Generate report
        </Button>
        <div className="flex items-center gap-[8px]">
          <Avatar src="/assets/avatar-katya.png" size={30} />
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
