"use client";

import { useRouter } from "next/navigation";
import { MenuSwitch } from "@/components/organisms";
import { CardMetric } from "@/components/molecules";
import { Status } from "@/components/atoms";
import { useAutomationStore } from "@/stores";

export default function AutomationListPage() {
  const router = useRouter();
  const flows = useAutomationStore((state) => state.flows);
  const toggleFlowActive = useAutomationStore((state) => state.toggleFlowActive);

  const activeFlows = flows.filter(f => f.isActive).length;
  const totalNodes = flows.reduce((acc, f) => acc + f.nodes.length, 0);

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
              <MenuSwitch 
                label="Campaigns" 
                onClick={() => router.push("/campaigns")}
              />
              <MenuSwitch label="Automations" active />
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
              title="Flows" 
              label="Total automations"
              values={[flows.length * 30, 100]}
              className="flex-1 w-auto"
            />
            <CardMetric 
              title="Active" 
              label="Running now"
              values={[activeFlows * 40, 80]}
              className="flex-1 w-auto bg-mint"
            />
            <CardMetric 
              title="Nodes" 
              label="Total workflow nodes"
              values={[70, totalNodes * 5]}
              className="flex-1 w-auto bg-lavender"
            />
            <CardMetric 
              title="Triggered" 
              label="This week"
              values={[85, 60]}
              className="flex-1 w-auto bg-pink"
            />
          </div>
        </section>

        {/* Flows List */}
        <section>
          <div className="flex justify-between items-center mb-[24px]">
            <span className="text-h2">Automation Flows</span>
            <button className="px-[20px] py-[8px] bg-black text-white rounded-full text-pixel hover:bg-gray-800 transition-colors">
              Create flow
            </button>
          </div>
          
          <div className="flex flex-col gap-[14px]">
            {flows.map((flow) => (
              <div 
                key={flow.id}
                className="p-[30px] bg-white rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-[24px]">
                  <div 
                    className="flex-1 cursor-pointer"
                    onClick={() => router.push(`/automation/${flow.id}`)}
                  >
                    <span className="text-h2 block mb-[8px]">{flow.name}</span>
                    {flow.description && (
                      <span className="text-pixel text-gray-500">{flow.description}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-[14px]">
                    <Status 
                      type={flow.isActive ? "green" : "stopped"} 
                      label={flow.isActive ? "Active" : "Draft"} 
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFlowActive(flow.id);
                      }}
                      className={`px-[14px] py-[8px] rounded-full text-pixel transition-colors ${
                        flow.isActive 
                          ? "bg-gray-200 hover:bg-gray-300" 
                          : "bg-green text-white hover:opacity-80"
                      }`}
                    >
                      {flow.isActive ? "Pause" : "Activate"}
                    </button>
                    <button
                      onClick={() => router.push(`/automation/${flow.id}`)}
                      className="px-[14px] py-[8px] bg-gray-200 rounded-full text-pixel hover:bg-gray-300 transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                </div>
                
                {/* Flow Stats */}
                <div className="flex gap-[30px]">
                  <div className="flex flex-col gap-[4px]">
                    <span className="text-h1">{flow.nodes.length}</span>
                    <span className="text-caps text-gray-400">nodes</span>
                  </div>
                  <div className="flex flex-col gap-[4px]">
                    <span className="text-h1">{flow.connections.length}</span>
                    <span className="text-caps text-gray-400">connections</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

