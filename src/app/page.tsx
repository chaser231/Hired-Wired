"use client";

import { useState } from "react";
import { TopMenu, MenuSwitch } from "@/components/organisms";
import { CardMetric, Team } from "@/components/molecules";
import { useTeamsStore } from "@/stores";

type TabType = "teams" | "templates";

export default function AllTeamsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("teams");
  const teams = useTeamsStore((state) => state.teams);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <header className="px-[30px] border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between py-[14px]">
          {/* Left: Logo + Tabs */}
          <div className="flex items-center gap-[30px]">
            <span className="text-h2 italic">Hired & Wired</span>
            
            {/* Menu Tabs */}
            <div className="flex">
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

          {/* Right: Actions */}
          <div className="flex items-center gap-[14px]">
            <button className="px-[20px] py-[8px] bg-gray-200 rounded-full text-pixel hover:bg-gray-300 transition-colors">
              Generate report
            </button>
            <div className="flex items-center gap-[8px]">
              <div className="w-[30px] h-[30px] rounded-full overflow-hidden bg-gray-200">
                <img 
                  src="/assets/avatar-katya.png" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="text-pixel text-gray-500 hover:text-black transition-colors">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-[30px]">
        {activeTab === "teams" ? (
          <>
            {/* Metrics Row */}
            <section className="mb-[30px]">
              <div className="flex gap-[14px]">
                <CardMetric 
                  title="Health" 
                  label="All people feeling fine"
                  values={[85, 92]}
                  className="flex-1 w-auto"
                />
                <CardMetric 
                  title="Productivity" 
                  label="Tasks completed on time"
                  values={[78, 85]}
                  className="flex-1 w-auto bg-lavender"
                />
                <CardMetric 
                  title="Dedication" 
                  label="Avg. hours per week"
                  values={[70, 65]}
                  className="flex-1 w-auto bg-pink"
                />
                <CardMetric 
                  title="Hiring" 
                  label="Active campaigns"
                  values={[60, 80]}
                  className="flex-1 w-auto bg-lemon"
                />
              </div>
            </section>

            {/* Teams Grid */}
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[14px]">
                {teams.map((team) => (
                  <Team
                    key={team.id}
                    name={team.name}
                    peopleCount={team.peopleCount}
                    productivity={team.productivity}
                    highlight={team.highlight}
                    avatars={team.avatars}
                  />
                ))}
              </div>
            </section>
          </>
        ) : (
          /* Templates Tab Content */
          <section className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-lg">
            <span className="text-h2 text-gray-400 mb-[14px]">Templates</span>
            <span className="text-pixel text-gray-500">
              HR templates and workflows will appear here
            </span>
          </section>
        )}
      </main>
    </div>
  );
}
