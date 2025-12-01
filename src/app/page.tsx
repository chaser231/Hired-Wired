"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Switch } from "@/components/atoms";
import { CardMetric, Team } from "@/components/molecules";
import { MenuSwitch, AddTeamModal } from "@/components/organisms";
import { useTeamsStore } from "@/stores";
import Image from "next/image";

type TabType = "teams" | "templates";
type ViewTab = "overview" | "employees" | "report";

export default function AllTeamsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("teams");
  const [viewTab, setViewTab] = useState<ViewTab>("overview");
  const [isAddTeamOpen, setIsAddTeamOpen] = useState(false);
  const teams = useTeamsStore((state) => state.teams);

  const handleGenerateReport = () => {
    // Navigate to a report generation page or show modal
    alert("Generating report for all teams...\n\nTeams: " + teams.length + "\nTotal employees: " + teams.reduce((acc, t) => acc + t.peopleCount, 0));
  };

  const handleViewTabChange = (tab: ViewTab) => {
    setViewTab(tab);
    
    // Navigate based on tab
    if (tab === "employees") {
      // Could navigate to employees list or show different view
    } else if (tab === "report") {
      // Could navigate to report view
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Fullscreen Hero Section with Cover Image */}
      <section className="relative w-full h-screen">
        {/* Cover Image Background - Fullscreen */}
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
              background: "linear-gradient(180deg, rgba(242, 242, 242, 0.3) 0%, rgba(242, 242, 242, 1) 100%)" 
            }} 
          />
        </div>

        {/* Header - TopMenu (над hero image) */}
        <header className="relative z-20 w-full h-[88px] border-b border-white/30">
          <nav className="flex items-center justify-between h-full px-[20px] py-[14px]">
            {/* Left: Logo + Tabs + Generate Report */}
            <div className="flex items-center gap-[90px]">
              <span className="font-serif text-[23px] leading-[1.3] italic">Hired & Wired</span>
              
              {/* Menu items group */}
              <div className="flex items-center gap-[20px] h-[15px]">
                <Button variant="secondary" onClick={handleGenerateReport}>
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
            <div className="flex items-center gap-[20px] h-[15px]">
              <button 
                onClick={() => router.push("/profile")}
                className="text-grotesk text-black hover:underline transition-all"
              >
                Profile
              </button>
              <button 
                onClick={() => router.push("/login")}
                className="text-grotesk text-black hover:underline transition-all"
              >
                Log out
              </button>
            </div>
          </nav>
        </header>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-[calc(100vh-88px)] px-[20px]">
          <div className="flex flex-col items-center gap-[30px] max-w-[754px] text-center">
            <h1 className="text-h1">All teams</h1>
            <p className="text-description">
              Overview of all teams<br />and their performance metrics
            </p>
            
            {/* Add team button */}
            <Button variant="cta-small" onClick={() => setIsAddTeamOpen(true)}>
              add team
            </Button>
          </div>

          {/* Switch Group - at bottom of hero */}
          <div className="absolute bottom-[60px] flex gap-[2px] p-[4px] bg-yellow rounded-md">
            <Switch
              checked={viewTab === "overview"}
              onChange={() => handleViewTabChange("overview")}
              label="Overview"
            />
            <Switch
              checked={viewTab === "employees"}
              onChange={() => handleViewTabChange("employees")}
              label="Employees"
            />
            <Switch
              checked={viewTab === "report"}
              onChange={() => handleViewTabChange("report")}
              label="Report"
            />
          </div>
        </div>
      </section>

      {/* Main Content - Below Hero */}
      <main className="w-full flex flex-col items-center gap-[4px] pb-[84px] -mt-[100px] relative z-10">
        <div className="w-[830px] flex flex-col gap-[4px]">
          {activeTab === "teams" ? (
            <>
              {/* Metrics Row based on viewTab */}
              {viewTab === "overview" && (
                <>
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
                    {teams.map((team) => (
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
              )}

              {viewTab === "employees" && (
                <div className="p-[60px] bg-white rounded-lg text-center">
                  <h2 className="text-h2 mb-[14px]">All Employees</h2>
                  <p className="text-pixel text-gray-500 mb-[30px]">
                    View all employees across all teams
                  </p>
                  <Button 
                    variant="cta-small" 
                    onClick={() => router.push("/team/team-1")}
                  >
                    View First Team
                  </Button>
                </div>
              )}

              {viewTab === "report" && (
                <div className="p-[60px] bg-white rounded-lg text-center">
                  <h2 className="text-h2 mb-[14px]">Team Reports</h2>
                  <p className="text-pixel text-gray-500 mb-[30px]">
                    Generate and view performance reports
                  </p>
                  <Button variant="cta-small" onClick={handleGenerateReport}>
                    Generate Report
                  </Button>
                </div>
              )}
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
        </div>
      </main>

      {/* Add Team Modal */}
      <AddTeamModal 
        isOpen={isAddTeamOpen} 
        onClose={() => setIsAddTeamOpen(false)} 
      />
    </div>
  );
}
