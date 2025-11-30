"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { CardTop, SecondRow, MenuSwitch } from "@/components/organisms";
import { Profile } from "@/components/molecules";
import { Tag, Avatar, Bar } from "@/components/atoms";
import { useEmployeeStore, useTeamsStore } from "@/stores";

interface CandidateProfilePageProps {
  params: Promise<{ id: string }>;
}

export default function CandidateProfilePage({ params }: CandidateProfilePageProps) {
  const router = useRouter();
  const { id } = use(params);
  
  const employee = useEmployeeStore((state) => state.getEmployee(id));
  const getEmployee = useEmployeeStore((state) => state.getEmployee);
  const getTeam = useTeamsStore((state) => state.getTeam);

  if (!employee) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <span className="text-h2 text-gray-400">Candidate not found</span>
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

  const team = employee.teamId ? getTeam(employee.teamId) : null;
  const reportsTo = employee.reportsTo ? getEmployee(employee.reportsTo) : null;
  const mentees = employee.mentoring?.map(id => getEmployee(id)).filter(Boolean) || [];

  // Cover images rotation
  const coverImages = [
    "/assets/Cover Image.jpg",
    "/assets/Cover Image-1.jpg",
    "/assets/Cover Image-2.jpg",
    "/assets/Cover Image-3.jpg",
    "/assets/Cover Image-4.jpg",
    "/assets/Cover Image-5.jpg",
    "/assets/Cover Image-6.jpg",
  ];
  const coverImage = coverImages[parseInt(id.replace(/\D/g, "")) % coverImages.length] || coverImages[0];

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
            { label: team?.name || "Team" },
            { label: employee.name },
          ]}
          onBack={() => team ? router.push(`/team/${team.id}`) : router.push("/")}
        />
      </header>

      {/* Main Content */}
      <main className="p-[30px]">
        {/* Hero Card */}
        <section className="mb-[30px]">
          <CardTop
            variant="yellow"
            name={employee.name}
            role={employee.role}
            coverImage={coverImage}
            actions={[
              { label: "promote", onClick: () => console.log("promote") },
              { label: "negotiate", onClick: () => console.log("negotiate") },
              { label: "suspend", onClick: () => console.log("suspend") },
              { label: "fire", onClick: () => console.log("fire") },
            ]}
            teamOptions={team ? [
              { label: team.name, value: team.id },
              { label: employee.role.split(" ")[0], value: "role" },
            ] : []}
            accessOptions={[
              { label: "Access LEVEL 4 (CODE RED)", value: "level4" },
            ]}
          />
        </section>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[30px]">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 flex flex-col gap-[30px]">
            {/* Performance */}
            <section className="p-[30px] bg-white rounded-lg">
              <span className="text-h2 block mb-[24px]">Performance</span>
              <div className="flex flex-col gap-[8px]">
                <div className="flex justify-between">
                  <span className="text-caps text-gray-400">Current Progress</span>
                  <span className="text-caps">{employee.progress}%</span>
                </div>
                <Bar progress={employee.progress} variant="double" />
              </div>
              <div className="mt-[24px] flex items-center gap-[14px]">
                <div className={`w-[8px] h-[8px] rounded-full ${
                  employee.statusType === "green" ? "bg-green" :
                  employee.statusType === "red" ? "bg-red" :
                  employee.statusType === "purple" ? "bg-purple" : "bg-gray-400"
                }`} />
                <span className="text-pixel">{employee.statusLabel || "Status"}</span>
              </div>
            </section>

            {/* Achievements */}
            {employee.achievements && employee.achievements.length > 0 && (
              <section className="p-[30px] bg-white rounded-lg">
                <span className="text-h2 block mb-[24px]">Achievements</span>
                <div className="flex flex-wrap gap-[8px]">
                  {employee.achievements.map((achievement, index) => (
                    <Tag key={index} variant="static">
                      {achievement}
                    </Tag>
                  ))}
                </div>
              </section>
            )}

            {/* Personal Development */}
            <section className="p-[30px] bg-white rounded-lg">
              <span className="text-h2 block mb-[24px]">Personal Development</span>
              <div className="flex flex-col gap-[14px]">
                <div className="flex items-center justify-between py-[14px] border-b border-gray-200">
                  <div className="flex flex-col gap-[4px]">
                    <span className="text-h3">Quarterly Review</span>
                    <span className="text-caps text-gray-400">Jan 15, 2024</span>
                  </div>
                  <span className="text-pixel text-green">Completed</span>
                </div>
                <div className="flex items-center justify-between py-[14px] border-b border-gray-200">
                  <div className="flex flex-col gap-[4px]">
                    <span className="text-h3">Skills Assessment</span>
                    <span className="text-caps text-gray-400">Mar 01, 2024</span>
                  </div>
                  <span className="text-pixel text-purple">Upcoming</span>
                </div>
                <div className="flex items-center justify-between py-[14px]">
                  <div className="flex flex-col gap-[4px]">
                    <span className="text-h3">Career Path Discussion</span>
                    <span className="text-caps text-gray-400">Apr 15, 2024</span>
                  </div>
                  <span className="text-pixel text-gray-400">Scheduled</span>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - Relationships */}
          <div className="flex flex-col gap-[30px]">
            {/* Contact Info */}
            <section className="p-[30px] bg-white rounded-lg">
              <span className="text-h3 block mb-[14px]">Contact</span>
              <div className="flex flex-col gap-[8px]">
                {employee.email && (
                  <span className="text-pixel text-gray-500">{employee.email}</span>
                )}
                {employee.phone && (
                  <span className="text-pixel text-gray-500">{employee.phone}</span>
                )}
              </div>
            </section>

            {/* Reports To */}
            {reportsTo && (
              <section className="p-[30px] bg-white rounded-lg">
                <span className="text-h3 block mb-[14px]">Reports to</span>
                <div 
                  onClick={() => router.push(`/candidate/${reportsTo.id}`)}
                  className="cursor-pointer"
                >
                  <Profile
                    variant="short"
                    name={reportsTo.name}
                    role={reportsTo.role}
                    avatarSrc={reportsTo.avatarSrc}
                  />
                </div>
              </section>
            )}

            {/* Mentoring */}
            {mentees.length > 0 && (
              <section className="p-[30px] bg-white rounded-lg">
                <span className="text-h3 block mb-[14px]">Mentoring</span>
                <div className="flex flex-col gap-[8px]">
                  {mentees.map((mentee) => mentee && (
                    <div 
                      key={mentee.id}
                      onClick={() => router.push(`/candidate/${mentee.id}`)}
                      className="cursor-pointer"
                    >
                      <Profile
                        variant="short-outlined"
                        name={mentee.name}
                        role={mentee.role}
                        avatarSrc={mentee.avatarSrc}
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Team */}
            {team && (
              <section className="p-[30px] bg-mint rounded-lg">
                <span className="text-h3 block mb-[14px]">Team</span>
                <div 
                  onClick={() => router.push(`/team/${team.id}`)}
                  className="flex items-center gap-[14px] cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <span className="text-h3">{team.name}</span>
                  <span className="text-pixel text-gray-500">{team.peopleCount} people</span>
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

