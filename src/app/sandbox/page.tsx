"use client";

import { useState } from "react";
import {
  Button,
  Avatar,
  Status,
  Icon,
  Switch,
  Flag,
  Tag,
  Input,
  TextArea,
  Dropdown,
  Bar,
  Graph,
  Error,
  Avatars,
  NodeConnector,
} from "@/components/atoms";
import {
  Profile,
  Node,
  Team,
  CampaignPreview,
  ProjectPreview,
  ExperiencePreview,
  CardMetric,
  CardsMetrica,
  Notify,
  Attempt,
} from "@/components/molecules";
import {
  TopMenu,
  SecondRow,
  Header,
  Task,
  CardTop,
  MenuSwitch,
  Kanban,
} from "@/components/organisms";

export default function SandboxPage() {
  const [switchOn, setSwitchOn] = useState(true);
  const [flagChecked, setFlagChecked] = useState(false);
  const [dropdownValue, setDropdownValue] = useState("");
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState<"all-teams" | "all-templates">("all-teams");

  const mockKanbanColumns = [
    {
      id: "applied",
      title: "Applied",
      cards: [
        { id: "1", name: "Michael Lee", role: "senior frontend developer" },
        { id: "2", name: "Anna Smith", role: "product manager" },
      ],
    },
    {
      id: "screening",
      title: "Screening",
      cards: [
        { id: "3", name: "John Doe", role: "backend developer" },
      ],
    },
    {
      id: "interview",
      title: "Interview",
      cards: [
        { id: "4", name: "Jane Wilson", role: "designer" },
      ],
    },
    {
      id: "offer",
      title: "Offer",
      cards: [],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sandbox Header */}
      <div className="p-8 bg-white mb-8">
        <h1 className="text-h1 mb-4">Design System Sandbox</h1>
        <p className="text-description text-gold">
          Component Testing Playground
        </p>
      </div>

      <div className="p-8">
        {/* Atoms Section */}
        <section className="mb-16">
          <h2 className="text-h2 mb-8 pb-4 border-b border-gray-200">Atoms</h2>

          {/* Buttons */}
          <div className="mb-12">
            <h3 className="text-h3 mb-6">Button</h3>
            <div className="flex flex-wrap gap-4 items-center p-6 bg-white rounded-lg">
              <Button variant="cta-big">CTA Big</Button>
              <Button variant="cta-small">CTA Small</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="on-color">On Color</Button>
              <Button variant="node">Node Button</Button>
            </div>
          </div>

          {/* Avatar & Avatars */}
          <div className="mb-12">
            <h3 className="text-h3 mb-6">Avatar / Avatars</h3>
            <div className="flex flex-wrap gap-8 items-center p-6 bg-white rounded-lg">
              <div className="flex flex-col gap-2 items-center">
                <Avatar src="/assets/avatar-katya.png" />
                <span className="text-caps text-gray-500">Katya</span>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <Avatar src="/assets/avatar-petya.png" />
                <span className="text-caps text-gray-500">Petya</span>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <Avatar src="/assets/avatar-dog.png" />
                <span className="text-caps text-gray-500">Dog</span>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <Avatars />
                <span className="text-caps text-gray-500">Stacked</span>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="mb-12">
            <h3 className="text-h3 mb-6">Status</h3>
            <div className="flex flex-wrap gap-8 items-center p-6 bg-white rounded-lg">
              <Status type="green" />
              <Status type="red" />
              <Status type="purple" />
              <Status type="stopped" />
            </div>
          </div>

          {/* Icons */}
          <div className="mb-12">
            <h3 className="text-h3 mb-6">Icons</h3>
            <div className="flex flex-wrap gap-8 items-center p-6 bg-white rounded-lg">
              <div className="flex flex-col gap-2 items-center">
                <Icon type="play" />
                <span className="text-caps text-gray-500">Play</span>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <Icon type="more" />
                <span className="text-caps text-gray-500">More</span>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <Icon type="arrow-down" />
                <span className="text-caps text-gray-500">Arrow</span>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <Icon type="close" />
                <span className="text-caps text-gray-500">Close</span>
              </div>
            </div>
          </div>

          {/* Switch & Flag */}
          <div className="mb-12">
            <h3 className="text-h3 mb-6">Switch / Flag</h3>
            <div className="flex flex-wrap gap-8 items-center p-6 bg-white rounded-lg">
              <div className="flex gap-1 p-1 bg-yellow rounded-md">
                <Switch checked={switchOn} onChange={setSwitchOn} label="Team" />
                <Switch checked={!switchOn} onChange={() => setSwitchOn(false)} label="Projects" />
              </div>
              <div className="flex flex-col gap-2 items-center">
                <Flag checked={flagChecked} onChange={setFlagChecked} />
                <span className="text-caps text-gray-500">{flagChecked ? "Yes" : "No"}</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="mb-12">
            <h3 className="text-h3 mb-6">Tag</h3>
            <div className="flex flex-wrap gap-4 items-center p-6 bg-white rounded-lg">
              <div className="flex flex-col gap-2">
                <span className="text-caps text-gray-500">Static Default (32px)</span>
                <div className="flex gap-2">
                  <Tag variant="static">React</Tag>
                  <Tag variant="static">Node.js</Tag>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-caps text-gray-500">Static Small (24px)</span>
                <div className="flex gap-2">
                  <Tag variant="static" size="sm">React</Tag>
                  <Tag variant="static" size="sm">Node.js</Tag>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-caps text-gray-500">Control (24px)</span>
                <div className="flex gap-2">
                  <Tag variant="control" onRemove={() => console.log("remove")}>TypeScript</Tag>
                  <Tag variant="control" onRemove={() => console.log("remove")}>AWS</Tag>
                </div>
              </div>
            </div>
          </div>

          {/* Input / TextArea */}
          <div className="mb-12">
            <h3 className="text-h3 mb-6">Input / TextArea</h3>
            <div className="grid grid-cols-2 gap-8 p-6 bg-white rounded-lg">
              <Input label="HEAD LINE" placeholder="Michael Lee" />
              <TextArea label="HEAD LINE" placeholder="type something here" />
            </div>
          </div>

          {/* Dropdown */}
          <div className="mb-12">
            <h3 className="text-h3 mb-6">Dropdown</h3>
            <div className="grid grid-cols-3 gap-8 p-6 bg-white rounded-lg">
              <Dropdown 
                label="HEAD LINE" 
                value={dropdownValue}
                placeholder="frontend-team"
                options={["frontend-team", "backend-team", "design-team"]}
                onChange={setDropdownValue}
              />
              <Dropdown 
                variant="on-color"
                label="HEAD LINE" 
                value="frontend-team"
                options={["frontend-team", "backend-team"]}
              />
              <Dropdown 
                label="EMPTY" 
                placeholder="Select..."
                options={["Option 1", "Option 2"]}
              />
            </div>
          </div>

          {/* Bar / Graph */}
          <div className="mb-12">
            <h3 className="text-h3 mb-6">Bar / Graph</h3>
            {/* Single row bars on dark bg */}
            <div className="p-6 bg-gray-400 rounded-lg space-y-6">
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <span className="text-caps text-white">Default 100%</span>
                  <Bar progress={100} />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-caps text-white">Default 75%</span>
                  <Bar progress={75} />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-caps text-white">Big 50%</span>
                  <Bar variant="big" progress={50} />
                </div>
              </div>
            </div>
            {/* Double row bar */}
            <div className="mt-6 p-6 bg-white rounded-lg space-y-4">
              <span className="text-caps text-gray-500 block">Double (Green/Mint)</span>
              <Bar variant="double" progress={91} />
              <Bar variant="double" progress={50} />
              <Bar variant="double" progress={25} />
            </div>
            {/* Graph */}
            <div className="mt-6 p-6 bg-white rounded-lg">
              <span className="text-caps text-gray-500 block mb-4">Graph</span>
              <Graph values={[80, 50]} />
            </div>
          </div>

          {/* Node Connector */}
          <div className="mb-12">
            <h3 className="text-h3 mb-6">Node Connector</h3>
            <div className="flex flex-wrap gap-8 items-center p-6 bg-white rounded-lg">
              <div className="flex flex-col gap-2 items-center">
                <NodeConnector type="in" />
                <span className="text-caps text-gray-500">In (Gray)</span>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <NodeConnector type="out" />
                <span className="text-caps text-gray-500">Out (Black)</span>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <NodeConnector type="in" size={16} />
                <span className="text-caps text-gray-500">In Large</span>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <NodeConnector type="out" size={16} />
                <span className="text-caps text-gray-500">Out Large</span>
              </div>
            </div>
          </div>

          {/* Error */}
          <div className="mb-12">
            <h3 className="text-h3 mb-6">Error</h3>
            <div className="p-6 bg-white rounded-lg">
              <Error message="add more money for salary" />
            </div>
          </div>

          {/* Typography Preview */}
          <div className="mb-12">
            <h3 className="text-h3 mb-6">Typography</h3>
            <div className="p-6 bg-white rounded-lg space-y-4">
              <p className="text-h1">H1 - Instrument Serif 84px</p>
              <p className="text-h2">H2 - Instrument Serif 40px</p>
              <p className="text-description">Description - Pixform 30px Uppercase</p>
              <p className="text-h3">H3 - Akkurat 20px Semibold</p>
              <p className="text-h4">H4 - Akkurat 15px Semibold</p>
              <p className="text-pixel">Text Pixel - Pixform 10px Uppercase</p>
              <p className="text-grotesk">Text Grotesk - Akkurat 11px Regular</p>
              <p className="text-bold">Text Bold - Akkurat 11px Bold</p>
              <p className="text-caps">Caps - Akkurat 8px Uppercase</p>
            </div>
          </div>

          {/* Colors Preview */}
          <div className="mb-12">
            <h3 className="text-h3 mb-6">Colors</h3>
            <div className="p-6 bg-white rounded-lg">
              <div className="grid grid-cols-6 gap-4">
                <ColorSwatch color="bg-black" name="Black" />
                <ColorSwatch color="bg-white border" name="White" />
                <ColorSwatch color="bg-gray-100" name="Gray 100" />
                <ColorSwatch color="bg-gray-200" name="Gray 200" />
                <ColorSwatch color="bg-gray-400" name="Gray 400" />
                <ColorSwatch color="bg-gray-500" name="Gray 500" />
                <ColorSwatch color="bg-yellow" name="Yellow" />
                <ColorSwatch color="bg-gold" name="Gold" />
                <ColorSwatch color="bg-pink-soft" name="Pink Soft" />
                <ColorSwatch color="bg-pink" name="Pink" />
                <ColorSwatch color="bg-lavender" name="Lavender" />
                <ColorSwatch color="bg-mint" name="Mint" />
                <ColorSwatch color="bg-yellow-green" name="Yellow Green" />
                <ColorSwatch color="bg-peach" name="Peach" />
                <ColorSwatch color="bg-lemon" name="Lemon" />
                <ColorSwatch color="bg-error-bg" name="Error BG" />
                <ColorSwatch color="bg-green" name="Green" />
                <ColorSwatch color="bg-red" name="Red" />
                <ColorSwatch color="bg-purple" name="Purple" />
              </div>
            </div>
          </div>
        </section>

        {/* Molecules Section */}
        <section className="mb-16">
          <h2 className="text-h2 mb-8 pb-4 border-b border-gray-200">Molecules</h2>

          {/* Profile */}
          <div className="mb-12">
            <h3 className="text-h3 mb-6">Profile</h3>
            <div className="flex flex-col gap-4 p-6 bg-white rounded-lg">
              <Profile 
                variant="long"
                name="Michael Lee"
                role="senior frontend developer"
                avatarSrc="/assets/avatar-katya.png"
                statusType="green"
                progress={75}
              />
              <div className="flex gap-4">
                <Profile 
                  variant="short"
                  name="Michael Lee"
                  role="senior frontend developer"
                  avatarSrc="/assets/avatar-petya.png"
                />
                <Profile 
                  variant="short-outlined"
                  name="Anna Smith"
                  role="product manager"
                  avatarSrc="/assets/avatar-dog.png"
                />
              </div>
            </div>
          </div>

          {/* Node */}
          <div className="mb-12">
            <h3 className="text-h3 mb-6">Node</h3>
            <div className="p-6 bg-white rounded-lg flex gap-6">
              <Node 
                title="Start Trigger" 
                subtitle="new application received" 
                hasInput={true}
                hasOutput={true}
              />
              <Node 
                title="Send Email" 
                subtitle="welcome message" 
                hasInput={true}
                hasOutput={true}
              />
              <Node 
                title="End" 
                subtitle="flow complete" 
                hasInput={true}
                hasOutput={false}
              />
            </div>
          </div>

          {/* Team */}
          <div className="mb-12">
            <h3 className="text-h3 mb-6">Team</h3>
            <div className="grid grid-cols-2 gap-6">
              <Team 
                name="Engineering team"
                peopleCount={12}
                productivity={91}
                highlight="This is the week highlight text for the team card component"
              />
              <Team 
                name="Design team"
                peopleCount={6}
                productivity={78}
                highlight="Completed the new dashboard redesign"
              />
            </div>
          </div>

          {/* CampaignPreview */}
          <div className="mb-12">
            <h3 className="text-h3 mb-6">Campaign Preview</h3>
            <CampaignPreview 
              title="Hiring Campaign"
              statusType="green"
              stats={{
                applied: 142,
                rejected: 89,
                inProgress: 282,
                finalRound: 31,
                offersSent: 4,
              }}
            />
          </div>

          {/* ProjectPreview */}
          <div className="mb-12">
            <h3 className="text-h3 mb-6">Project Preview</h3>
            <div className="p-6 bg-white rounded-lg">
              <ProjectPreview 
                description="Building a scalable microservices architecture for the e-commerce platform"
                tags={["React", "Node.js", "AWS", "Docker"]}
              />
            </div>
          </div>

          {/* ExperiencePreview */}
          <div className="mb-12">
            <h3 className="text-h3 mb-6">Experience Preview</h3>
            <div className="p-6 bg-white rounded-lg">
              <ExperiencePreview 
                dateRange="jan 2022 — nov 2024"
                title="Senior Frontend Developer"
                company="Google"
                description="Led the development of the new Google Maps feature for indoor navigation"
              />
            </div>
          </div>

          {/* CardMetric & CardsMetrica */}
          <div className="mb-12">
            <h3 className="text-h3 mb-6">Card Metric / Cards Metrica</h3>
            <div className="flex gap-6">
              <CardMetric title="Health" label="stable" />
              <CardsMetrica title="Productivity" value="91%" label="this week" />
            </div>
          </div>

          {/* Notify */}
          <div className="mb-12">
            <h3 className="text-h3 mb-6">Notify</h3>
            <Notify message="New team member added successfully!" />
          </div>

          {/* Attempt */}
          <div className="mb-12">
            <h3 className="text-h3 mb-6">Attempt</h3>
            <Attempt 
              type="past"
              label="Past attempt"
              yourOffer={{
                salary: "$120,000",
                perks: ["Remote work", "Health insurance", "Stock options"],
              }}
              theirOffer={{
                salary: "$140,000",
                perks: ["Remote work", "Health insurance", "More equity"],
              }}
              statusType="red"
              statusLabel="failed"
            />
          </div>
        </section>

        {/* Organisms Section */}
        <section className="mb-16">
          <h2 className="text-h2 mb-8 pb-4 border-b border-gray-200">Organisms</h2>

          {/* TopMenu */}
          <div className="mb-12">
            <h3 className="text-h3 mb-6">Top Menu</h3>
            <div className="bg-white rounded-lg overflow-hidden">
              <TopMenu />
            </div>
          </div>

          {/* SecondRow */}
          <div className="mb-12">
            <h3 className="text-h3 mb-6">Second Row</h3>
            <div className="space-y-4 bg-white rounded-lg p-4">
              <SecondRow 
                variant="breadcrumb"
                breadcrumbs={[
                  { label: "All teams" },
                  { label: "Engineering" },
                  { label: "Michael Lee" },
                ]}
              />
              <SecondRow variant="builder" />
            </div>
          </div>

          {/* Header */}
          <div className="mb-12">
            <h3 className="text-h3 mb-6">Header (Full)</h3>
            <div className="rounded-lg overflow-hidden">
              <Header 
                breadcrumbs={[
                  { label: "All teams" },
                  { label: "Engineering" },
                ]}
                stages={[
                  { label: "Applied", completed: true },
                  { label: "Screening", completed: true },
                  { label: "Interview", active: true },
                  { label: "Offer" },
                ]}
              />
            </div>
          </div>

          {/* MenuSwitch */}
          <div className="mb-12">
            <h3 className="text-h3 mb-6">Menu Switch</h3>
            <div className="p-6 bg-white rounded-lg">
              <div className="flex gap-0">
                <MenuSwitch 
                  label="All teams" 
                  active={activeMenuTab === "all-teams"}
                  onClick={() => setActiveMenuTab("all-teams")}
                />
                <MenuSwitch 
                  label="All templates" 
                  active={activeMenuTab === "all-templates"}
                  onClick={() => setActiveMenuTab("all-templates")}
                />
              </div>
            </div>
          </div>

          {/* Task */}
          <div className="mb-12">
            <h3 className="text-h3 mb-6">Task</h3>
            <div className="p-6 bg-white rounded-lg">
              <Task 
                title="Review candidate application"
                completed={taskCompleted}
                onToggle={setTaskCompleted}
              />
              <Task 
                title="Schedule interview with HR"
                error="missing date"
              />
            </div>
          </div>

          {/* CardTop */}
          <div className="mb-12">
            <h3 className="text-h3 mb-6">Card Top (Hero)</h3>
            <div className="grid grid-cols-2 gap-6">
              <CardTop 
                variant="yellow"
                name="Michael Lee"
                role="Senior Frontend Developer"
                actions={[
                  { label: "Promote" },
                  { label: "Negotiate" },
                  { label: "Suspend" },
                ]}
              />
              <CardTop 
                variant="gray"
                name="Anna Smith"
                role="Product Manager"
                coverImage="/assets/Cover Image-1.jpg"
                actions={[
                  { label: "View Profile" },
                ]}
              />
            </div>
          </div>

          {/* Kanban */}
          <div className="mb-12">
            <h3 className="text-h3 mb-6">Kanban</h3>
            <div className="p-6 bg-white rounded-lg">
              <Kanban 
                columns={mockKanbanColumns}
                onCardClick={(id) => console.log("Card clicked:", id)}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function ColorSwatch({ color, name }: { color: string; name: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`w-16 h-16 rounded-lg ${color}`} />
      <span className="text-caps text-gray-500">{name}</span>
    </div>
  );
}
