"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { SecondRow, MenuSwitch, Kanban, Task } from "@/components/organisms";
import { CampaignPreview, CardsMetrica } from "@/components/molecules";
import { Status } from "@/components/atoms";
import { useCampaignStore } from "@/stores";

interface CampaignPageProps {
  params: Promise<{ id: string }>;
}

export default function CampaignPage({ params }: CampaignPageProps) {
  const router = useRouter();
  const { id } = use(params);
  
  const campaign = useCampaignStore((state) => state.getCampaign(id));
  const toggleTaskComplete = useCampaignStore((state) => state.toggleTaskComplete);
  const moveCard = useCampaignStore((state) => state.moveCard);

  if (!campaign) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <span className="text-h2 text-gray-400">Campaign not found</span>
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

  // Calculate conversion rate
  const conversionRate = campaign.stats.applied > 0
    ? Math.round((campaign.stats.offersSent / campaign.stats.applied) * 100)
    : 0;

  const handleCardMove = (cardId: string, fromColumn: string, toColumn: string) => {
    moveCard(campaign.id, cardId, fromColumn, toColumn);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="px-[30px] border-b border-gray-200 bg-white">
        {/* Top Row */}
        <div className="flex items-center justify-between py-[14px]">
          <div className="flex items-center gap-[30px]">
            <span className="text-h2 italic">Hired & Wired</span>
            <div className="flex">
              <MenuSwitch label="All teams" />
              <MenuSwitch label="All templates" />
              <MenuSwitch label="Campaigns" active />
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
            { label: "Campaigns" },
            { label: campaign.title },
          ]}
          onBack={() => router.push("/")}
        />
      </header>

      {/* Main Content */}
      <main className="p-[30px]">
        {/* Hero Section - Campaign Preview */}
        <section className="mb-[30px]">
          <CampaignPreview
            title={campaign.title}
            statusType={campaign.statusType}
            statusLabel={campaign.statusLabel}
            stats={campaign.stats}
          />
        </section>

        {/* Stats Row */}
        <section className="mb-[30px]">
          <div className="flex gap-[14px]">
            <CardsMetrica 
              title="Applications" 
              value={campaign.stats.applied}
              label="Total received"
              className="flex-1"
            />
            <CardsMetrica 
              title="In Progress" 
              value={campaign.stats.inProgress}
              label="Currently active"
              className="flex-1"
            />
            <CardsMetrica 
              title="Final Round" 
              value={campaign.stats.finalRound}
              label="Ready for offer"
              className="flex-1"
            />
            <CardsMetrica 
              title="Conversion Rate" 
              value={`${conversionRate}%`}
              label="Applied to offer"
              className="flex-1"
            />
          </div>
        </section>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[30px]">
          {/* Task List */}
          <div className="lg:col-span-1">
            <section className="p-[30px] bg-white rounded-lg">
              <div className="flex justify-between items-center mb-[24px]">
                <span className="text-h2">Tasks</span>
                <span className="text-caps text-gray-400">
                  {campaign.tasks.filter(t => t.completed).length}/{campaign.tasks.length}
                </span>
              </div>
              
              <div className="flex flex-col">
                {campaign.tasks.length > 0 ? (
                  campaign.tasks.map((task) => (
                    <Task
                      key={task.id}
                      title={task.title}
                      completed={task.completed}
                      error={task.hasError ? task.errorMessage : undefined}
                      onToggle={() => toggleTaskComplete(campaign.id, task.id)}
                      onAction={() => console.log("Task action:", task.id)}
                    />
                  ))
                ) : (
                  <div className="py-[30px] text-center">
                    <span className="text-pixel text-gray-500">No tasks</span>
                  </div>
                )}
              </div>
              
              {/* Add Task Button */}
              <button className="mt-[14px] w-full py-[14px] border border-dashed border-gray-300 rounded-sm text-pixel text-gray-400 hover:border-gray-400 hover:text-gray-500 transition-colors">
                + Add task
              </button>
            </section>
          </div>

          {/* Pipeline Kanban */}
          <div className="lg:col-span-2">
            <section className="p-[30px] bg-white rounded-lg">
              <div className="flex justify-between items-center mb-[24px]">
                <span className="text-h2">Pipeline</span>
                <div className="flex items-center gap-[8px]">
                  <Status type={campaign.statusType} label={campaign.statusLabel} />
                </div>
              </div>
              
              <Kanban 
                columns={campaign.pipeline}
                onCardMove={handleCardMove}
                onCardClick={(cardId) => console.log("Card clicked:", cardId)}
              />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

