"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { MenuSwitch } from "@/components/organisms";
import { Profile, Notify } from "@/components/molecules";
import { Button, Switch } from "@/components/atoms";
import { useTeamsStore, useEmployeeStore } from "@/stores";
import Image from "next/image";

interface TeamDetailPageProps {
  params: Promise<{ id: string }>;
}

type ViewTab = "team" | "campaigns" | "access";

export default function TeamDetailPage({ params }: TeamDetailPageProps) {
  const router = useRouter();
  const { id } = use(params);
  const [viewTab, setViewTab] = useState<ViewTab>("team");
  
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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Fullscreen Hero Section with Cover Image */}
      <section className="relative w-full h-screen">
        {/* Cover Image Background - Fullscreen */}
        <div className="absolute inset-0">
          <Image
            src="/assets/Cover Image-2.jpg"
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

        {/* Header - TopMenu */}
        <header className="relative z-20 w-full border-b border-white/30">
          {/* Top Menu */}
          <nav className="flex items-center justify-between h-[60px] px-[20px] py-[14px]">
            {/* Left: Logo + Tabs + Generate Report */}
            <div className="flex items-center gap-[90px]">
              <span 
                className="font-serif text-[23px] leading-[1.3] italic cursor-pointer"
                onClick={() => router.push("/")}
              >
                Hired & Wired
              </span>
              
              {/* Menu items group */}
              <div className="flex items-center gap-[20px] h-[15px]">
                <Button variant="secondary">
                  Generate report
                </Button>
                <MenuSwitch 
                  label="All teams" 
                  active
                  onClick={() => router.push("/")}
                />
                <MenuSwitch 
                  label="All templates" 
                />
              </div>
            </div>

            {/* Right: Profile / Logout */}
            <div className="flex items-center gap-[20px] h-[15px]">
              <button 
                onClick={() => router.push("/profile")}
                className="text-grotesk text-black hover:underline"
              >
                Profile
              </button>
              <button 
                onClick={() => router.push("/login")}
                className="text-grotesk text-black hover:underline"
              >
                Log out
              </button>
            </div>
          </nav>

          {/* Second Row - Breadcrumbs */}
          <div className="flex items-center gap-[60px] px-[20px] py-[14px]">
            <Button variant="secondary" onClick={() => router.push("/")}>
              Back
            </Button>
            <div className="flex items-center gap-[8px] h-[15px]">
              <span className="text-grotesk text-black">All teams</span>
              <span className="text-grotesk text-black">•</span>
              <span className="text-grotesk text-black">{team.name}</span>
            </div>
          </div>
        </header>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-[calc(100vh-120px)] px-[20px]">
          <div className="flex flex-col items-center gap-[30px] max-w-[754px] text-center">
            <h1 className="text-h1">{team.name}</h1>
            <p className="text-description">
              Detailed team overview<br />and performance metrics
            </p>
          </div>
        </div>
      </section>

      {/* Switch Group - Between hero and content */}
      <div className="w-full flex justify-center py-[30px] bg-gray-100">
        <div className="flex gap-[2px] p-[4px] bg-yellow rounded-md">
          <Switch
            checked={viewTab === "team"}
            onChange={() => setViewTab("team")}
            label="Team"
          />
          <Switch
            checked={viewTab === "campaigns"}
            onChange={() => setViewTab("campaigns")}
            label="Campaigns"
          />
          <Switch
            checked={viewTab === "access"}
            onChange={() => setViewTab("access")}
            label="Access"
          />
        </div>
      </div>

      {/* Main Content - Below Switch */}
      <main className="w-full flex flex-col items-center gap-[4px] pb-[84px]">
        <div className="w-[830px] flex flex-col gap-[4px]">
          {/* Notify - Week Highlight (без аватаров) */}
          {team.highlight && (
            <Notify message={team.highlight} />
          )}

          {/* Tab Content */}
          {viewTab === "team" && (
            /* Team Members List */
            <div className="p-[30px] bg-white rounded-lg">
              <h2 className="text-h2 mb-[24px]">Team</h2>
              
              <div className="flex flex-col gap-[2px]">
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
                      onClick={() => router.push(`/candidate/${member.id}`)}
                    />
                  ))
                ) : (
                  <div className="py-[30px] text-center">
                    <span className="text-pixel text-gray-500">No team members found</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {viewTab === "campaigns" && (
            <div className="p-[60px] bg-white rounded-lg text-center">
              <h2 className="text-h2 mb-[14px]">Campaigns</h2>
              <p className="text-pixel text-gray-500 mb-[30px]">
                Hiring campaigns for this team
              </p>
              <Button 
                variant="cta-small" 
                onClick={() => router.push("/campaigns")}
              >
                View All Campaigns
              </Button>
            </div>
          )}

          {viewTab === "access" && (
            <div className="p-[60px] bg-white rounded-lg text-center">
              <h2 className="text-h2 mb-[14px]">Access Management</h2>
              <p className="text-pixel text-gray-500 mb-[30px]">
                Manage team permissions and access levels
              </p>
              <Button variant="cta-small">
                Configure Access
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
