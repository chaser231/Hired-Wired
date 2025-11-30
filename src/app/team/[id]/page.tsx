"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { SecondRow, MenuSwitch } from "@/components/organisms";
import { Profile, CardMetric, CardsMetrica } from "@/components/molecules";
import { Status, Bar } from "@/components/atoms";
import { useTeamsStore, useEmployeeStore } from "@/stores";

interface TeamDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function TeamDetailPage({ params }: TeamDetailPageProps) {
  const router = useRouter();
  const { id } = use(params);
  
  const team = useTeamsStore((state) => state.getTeam(id));
  const getEmployeesByTeam = useEmployeeStore((state) => state.getEmployeesByTeam);
  
  const members = team ? getEmployeesByTeam(team.id) : [];

  if (!team) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <span className="text-h2 text-gray-400">Team not found</span>
          <button 
            onClick={() => router.push("/")}
            className="block mt-[14px] text-pixel text-black underline"
          >
            Back to All Teams
          </button>
        </div>
      </div>
    );
  }

  // Calculate team stats
  const avgProgress = members.length > 0 
    ? Math.round(members.reduce((acc, m) => acc + m.progress, 0) / members.length)
    : 0;
  
  const onTrackCount = members.filter(m => m.statusType === "green").length;
  const needsAttentionCount = members.filter(m => m.statusType === "red").length;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="px-[30px] border-b border-gray-200 bg-white">
        {/* Top Row */}
        <div className="flex items-center justify-between py-[14px]">
          <div className="flex items-center gap-[30px]">
            <span className="text-h2 italic">Hired & Wired</span>
            <div className="flex">
              <MenuSwitch label="All teams" active />
              <MenuSwitch label="All templates" />
            </div>
          </div>
          <div className="flex items-center gap-[14px]">
            <button className="px-[20px] py-[8px] bg-gray-200 rounded-full text-pixel hover:bg-gray-300 transition-colors">
              Generate report
            </button>
            <div className="flex items-center gap-[8px]">
              <div className="w-[30px] h-[30px] rounded-full overflow-hidden bg-gray-200">
                <img src="/assets/avatar-katya.png" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <button className="text-pixel text-gray-500 hover:text-black transition-colors">
                Logout
              </button>
            </div>
          </div>
        </div>
        
        {/* Breadcrumbs */}
        <SecondRow 
          variant="breadcrumb"
          breadcrumbs={[
            { label: "All teams" },
            { label: team.name },
          ]}
          onBack={() => router.push("/")}
        />
      </header>

      {/* Main Content */}
      <main className="p-[30px]">
        {/* Hero Section */}
        <section className="mb-[30px] p-[30px] bg-white rounded-lg">
          <div className="flex justify-between items-start mb-[24px]">
            <div className="flex flex-col gap-[14px]">
              <span className="text-h1">{team.name}</span>
              {team.description && (
                <span className="text-description">{team.description}</span>
              )}
            </div>
            <div className="flex items-center gap-[14px]">
              <Status type="green" label="Active" />
              <span className="text-pixel text-gray-500">{team.peopleCount} people</span>
            </div>
          </div>
          
          {/* Team Progress */}
          <div className="flex flex-col gap-[8px]">
            <div className="flex justify-between">
              <span className="text-caps text-gray-400">Team Productivity</span>
              <span className="text-caps">{team.productivity}%</span>
            </div>
            <Bar progress={team.productivity} variant="double" />
          </div>

          {/* Highlight */}
          {team.highlight && (
            <div className="mt-[24px] p-[14px] bg-lemon rounded-sm">
              <span className="text-caps text-gray-500 block mb-[4px]">Week highlight</span>
              <span className="text-pixel">{team.highlight}</span>
            </div>
          )}
        </section>

        {/* Metrics Row */}
        <section className="mb-[30px]">
          <div className="flex gap-[14px]">
            <CardsMetrica 
              title="Members" 
              value={team.peopleCount}
              label="Total team size"
              className="flex-1"
            />
            <CardsMetrica 
              title="On Track" 
              value={onTrackCount}
              label="Performing well"
              className="flex-1"
            />
            <CardsMetrica 
              title="Needs Attention" 
              value={needsAttentionCount}
              label="Requires support"
              className="flex-1"
            />
            <CardsMetrica 
              title="Avg. Progress" 
              value={`${avgProgress}%`}
              label="Team average"
              className="flex-1"
            />
          </div>
        </section>

        {/* Members List */}
        <section className="p-[30px] bg-white rounded-lg">
          <div className="flex justify-between items-center mb-[24px]">
            <span className="text-h2">Team Members</span>
            <button className="px-[20px] py-[8px] bg-black text-white rounded-full text-pixel hover:bg-gray-800 transition-colors">
              Add member
            </button>
          </div>
          
          <div className="flex flex-col">
            {members.length > 0 ? (
              members.map((member) => (
                <Profile
                  key={member.id}
                  variant="long"
                  name={member.name}
                  role={member.role}
                  avatarSrc={member.avatarSrc}
                  statusType={member.statusType}
                  statusLabel={member.statusLabel}
                  progress={member.progress}
                />
              ))
            ) : (
              <div className="py-[30px] text-center">
                <span className="text-pixel text-gray-500">No team members found</span>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

