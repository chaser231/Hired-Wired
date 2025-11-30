"use client";

import { useRouter } from "next/navigation";
import { MenuSwitch } from "@/components/organisms";
import { CampaignPreview, CardMetric } from "@/components/molecules";
import { useCampaignStore } from "@/stores";

export default function CampaignsPage() {
  const router = useRouter();
  const campaigns = useCampaignStore((state) => state.campaigns);

  // Aggregate stats
  const totalApplied = campaigns.reduce((acc, c) => acc + c.stats.applied, 0);
  const totalInProgress = campaigns.reduce((acc, c) => acc + c.stats.inProgress, 0);
  const totalOffers = campaigns.reduce((acc, c) => acc + c.stats.offersSent, 0);
  const activeCampaigns = campaigns.filter(c => c.statusType !== "stopped").length;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="px-[30px] border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between py-[14px]">
          <div className="flex items-center gap-[30px]">
            <span 
              className="text-h2 italic cursor-pointer"
              onClick={() => router.push("/")}
            >
              Hired & Wired
            </span>
            <div className="flex">
              <MenuSwitch 
                label="All teams" 
                onClick={() => router.push("/")}
              />
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
      </header>

      {/* Main Content */}
      <main className="p-[30px]">
        {/* Metrics Row */}
        <section className="mb-[30px]">
          <div className="flex gap-[14px]">
            <CardMetric 
              title="Active" 
              label="Running campaigns"
              values={[activeCampaigns * 20, 100]}
              className="flex-1 w-auto"
            />
            <CardMetric 
              title="Applications" 
              label="Total received"
              values={[80, 60]}
              className="flex-1 w-auto bg-lavender"
            />
            <CardMetric 
              title="In Progress" 
              label="Active candidates"
              values={[70, 85]}
              className="flex-1 w-auto bg-pink"
            />
            <CardMetric 
              title="Offers Sent" 
              label="This quarter"
              values={[totalOffers * 10, 50]}
              className="flex-1 w-auto bg-lemon"
            />
          </div>
        </section>

        {/* Campaigns Grid */}
        <section>
          <div className="flex justify-between items-center mb-[24px]">
            <span className="text-h2">All Campaigns</span>
            <button className="px-[20px] py-[8px] bg-black text-white rounded-full text-pixel hover:bg-gray-800 transition-colors">
              Create campaign
            </button>
          </div>
          
          <div className="flex flex-col gap-[14px]">
            {campaigns.map((campaign) => (
              <div 
                key={campaign.id}
                onClick={() => router.push(`/campaign/${campaign.id}`)}
                className="cursor-pointer hover:shadow-md transition-shadow"
              >
                <CampaignPreview
                  title={campaign.title}
                  statusType={campaign.statusType}
                  statusLabel={campaign.statusLabel}
                  stats={campaign.stats}
                />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

