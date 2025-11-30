"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Switch } from "@/components/atoms";
import { CardMetric, Team } from "@/components/molecules";
import { MenuSwitch } from "@/components/organisms";
import { useTeamsStore } from "@/stores";
import Image from "next/image";

type TabType = "teams" | "templates";
type ViewTab = "overview" | "employees" | "report";

export default function AllTeamsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("teams");
  const [viewTab, setViewTab] = useState<ViewTab>("overview");
  const teams = useTeamsStore((state) => state.teams);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center gap-[90px] pb-[84px]">
      {/* Header - TopMenu */}
      <header className="w-full h-[88px] border-b border-white">
        <nav className="flex items-center justify-between h-full px-[20px] py-[14px]">
          {/* Left: Logo + Tabs + Generate Report */}
          <div className="flex items-center gap-[90px]">
            <span className="font-serif text-[23px] leading-[1.3] italic">Hired & Wired</span>
            
            {/* Menu items group */}
            <div className="flex items-center gap-[20px] h-[15px]">
              <Button variant="on-color">
                Generate report
              </Button>
              <MenuSwitch 
                label="All teams" 
                active={activeTab === "teams"}
                onClick={() => setActiveTab("teams")}
              />
              <MenuSwitch 
                label="All templates" 
                active={activeTab === "templates"}
                onClick={() => setActiveTab("templates")}
              />
            </div>
          </div>

          {/* Right: Profile / Logout */}
          <div className="flex items-center gap-[8px] h-[15px]">
            <span className="text-grotesk text-black">Profile</span>
            <span className="text-grotesk text-black">Log out</span>
          </div>
        </nav>
      </header>

      {/* Main Content - Team Card Section */}
      <main className="w-[830px] flex flex-col gap-[4px]">
        {activeTab === "teams" ? (
          <>
            {/* Hero Card - Card Top (Gray variant) */}
            <div 
              className="relative overflow-hidden rounded-lg w-[830px] h-[480px]"
              style={{ backgroundColor: "#EAEAEA" }}
            >
              {/* Cover Image Background */}
              <div className="absolute inset-0">
                <Image
                  src="/assets/Cover Image-3.jpg"
                  alt="Cover"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Gradient overlay */}
                <div 
                  className="absolute inset-0" 
                  style={{ 
                    background: "linear-gradient(180deg, rgba(242, 242, 242, 0) 0%, rgba(242, 242, 242, 1) 100%)" 
                  }} 
                />
              </div>

              {/* Content */}
              <div className="relative z-10 p-[30px] h-full flex flex-col justify-end items-center gap-[160px]">
                {/* Profile Info */}
                <div className="flex flex-col items-center gap-[30px] w-[754px]">
                  <h1 className="text-h1 text-center w-full">All teams</h1>
                  <p className="text-description text-center w-full">
                    Overview of all teams<br />and their performance metrics
                  </p>
                  
                  {/* Add team button */}
                  <div className="flex gap-[2px]">
                    <Button variant="cta-small">
                      add team
                    </Button>
                  </div>
                </div>

                {/* Switch Group */}
                <div className="flex gap-[2px] p-[4px] bg-yellow rounded-md">
                  <Switch
                    checked={viewTab === "overview"}
                    onChange={() => setViewTab("overview")}
                    label="Overview"
                  />
                  <Switch
                    checked={viewTab === "employees"}
                    onChange={() => setViewTab("employees")}
                    label="Employees"
                  />
                  <Switch
                    checked={viewTab === "report"}
                    onChange={() => setViewTab("report")}
                    label="Report"
                  />
                </div>
              </div>
            </div>

            {/* Team Metrics Row */}
            <div className="flex gap-[4px] w-full">
              <CardMetric 
                title="Health" 
                label="Overall: Good"
                values={[75, 85, 60, 90, 70, 80, 65]}
                color="pink-soft"
              />
              <CardMetric 
                title="Productivity" 
                label="+12% This Month"
                values={[60, 70, 85, 75, 90, 80, 95]}
                color="pink"
              />
              <CardMetric 
                title="Distribution" 
                label="8 Teams Active"
                values={[80, 65, 75, 85, 70, 90, 60]}
                color="lavender"
              />
              <CardMetric 
                title="Hiring" 
                label="15 Open Position"
                values={[70, 80, 65, 85, 75, 60, 90]}
                color="yellow-green"
              />
            </div>

            {/* Team Details Grid (2 columns, 413px each) */}
            <div className="flex flex-wrap gap-[4px] w-full">
              {teams.slice(0, 6).map((team) => (
                <Team
                  key={team.id}
                  name={team.name}
                  peopleCount={team.peopleCount}
                  productivity={team.productivity}
                  highlight={team.highlight}
                  avatars={team.avatars}
                  onClick={() => router.push(`/team/${team.id}`)}
                  className="w-[413px]"
                />
              ))}
            </div>
          </>
        ) : (
          /* Templates Tab Content */
          <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-lg">
            <span className="text-h2 text-gray-400 mb-[14px]">Templates</span>
            <span className="text-pixel text-gray-500">
              HR templates and workflows will appear here
            </span>
          </div>
        )}
      </main>
    </div>
  );
}
