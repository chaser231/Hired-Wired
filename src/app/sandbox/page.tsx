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

export default function SandboxPage() {
  const [switchOn, setSwitchOn] = useState(true);
  const [flagChecked, setFlagChecked] = useState(false);
  const [dropdownValue, setDropdownValue] = useState("");

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <header className="mb-12">
        <h1 className="text-h1 mb-4">Design System Sandbox</h1>
        <p className="text-description text-gold">
          Component Testing Playground
        </p>
      </header>

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
              <Avatar src="/assets/type=katya.png" />
              <span className="text-caps text-gray-500">Katya</span>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <Avatar src="/assets/type=petya.png" />
              <span className="text-caps text-gray-500">Petya</span>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <Avatar src="/assets/type=dog.png" />
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
            <Tag variant="static">React</Tag>
            <Tag variant="static">Node.js</Tag>
            <Tag variant="control" onRemove={() => console.log("remove")}>TypeScript</Tag>
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
          <div className="grid grid-cols-2 gap-8 p-6 bg-white rounded-lg">
            <div className="space-y-4">
              <Bar progress={75} />
              <Bar progress={20} />
              <Bar variant="big" progress={50} />
            </div>
            <div>
              <Graph values={[80, 50]} />
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
              statusType="green"
              progress={75}
            />
            <div className="flex gap-4">
              <Profile 
                variant="short"
                name="Michael Lee"
                role="senior frontend developer"
              />
              <Profile 
                variant="short-outlined"
                name="Anna Smith"
                role="product manager"
              />
            </div>
          </div>
        </div>

        {/* Node */}
        <div className="mb-12">
          <h3 className="text-h3 mb-6">Node</h3>
          <div className="p-6 bg-white rounded-lg">
            <Node title="Starting point" subtitle="more info" />
          </div>
        </div>

        {/* Team */}
        <div className="mb-12">
          <h3 className="text-h3 mb-6">Team</h3>
          <div className="p-6 bg-gray-100 rounded-lg">
            <Team 
              name="Engineering team"
              peopleCount={12}
              productivity={91}
              highlight="This is the week highlight text for the team card component"
            />
          </div>
        </div>

        {/* CampaignPreview */}
        <div className="mb-12">
          <h3 className="text-h3 mb-6">Campaign Preview</h3>
          <div className="p-6 bg-gray-100 rounded-lg">
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
          <div className="flex gap-6 p-6 bg-gray-100 rounded-lg">
            <CardMetric title="Health" label="stable" />
            <CardsMetrica title="Productivity" value="91%" label="this week" />
          </div>
        </div>

        {/* Notify */}
        <div className="mb-12">
          <h3 className="text-h3 mb-6">Notify</h3>
          <div className="p-6 bg-white rounded-lg">
            <Notify message="New team member added successfully!" />
          </div>
        </div>

        {/* Attempt */}
        <div className="mb-12">
          <h3 className="text-h3 mb-6">Attempt</h3>
          <div className="p-6 bg-gray-100 rounded-lg">
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
        </div>
      </section>

      {/* Organisms Section */}
      <section className="mb-16">
        <h2 className="text-h2 mb-8 pb-4 border-b border-gray-200">Organisms</h2>
        <div className="p-6 bg-white rounded-lg">
          <p className="text-grotesk text-gray-500">Coming soon...</p>
        </div>
      </section>
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
