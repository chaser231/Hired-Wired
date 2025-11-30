"use client";

import { use, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SecondRow } from "@/components/organisms";
import { Node as NodeComponent } from "@/components/molecules";
import { Button } from "@/components/atoms";
import { useAutomationStore, AutomationNode, NodeType } from "@/stores";

interface AutomationPageProps {
  params: Promise<{ id: string }>;
}

// Node Library items
const nodeLibrary: { type: NodeType; title: string; subtitle: string }[] = [
  { type: "trigger", title: "Trigger", subtitle: "Start automation" },
  { type: "email", title: "Email", subtitle: "Send email" },
  { type: "delay", title: "Delay", subtitle: "Wait period" },
  { type: "condition", title: "Condition", subtitle: "If/else logic" },
  { type: "action", title: "Action", subtitle: "Perform action" },
];

export default function AutomationPage({ params }: AutomationPageProps) {
  const router = useRouter();
  const { id } = use(params);
  const canvasRef = useRef<HTMLDivElement>(null);
  
  const flow = useAutomationStore((state) => state.getFlow(id));
  const updateFlow = useAutomationStore((state) => state.updateFlow);
  const addNode = useAutomationStore((state) => state.addNode);
  const moveNode = useAutomationStore((state) => state.moveNode);
  const selectNode = useAutomationStore((state) => state.selectNode);
  const selectedNodeId = useAutomationStore((state) => state.selectedNodeId);
  const deleteNode = useAutomationStore((state) => state.deleteNode);

  const [isDragging, setIsDragging] = useState(false);
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  if (!flow) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <span className="text-h2 text-gray-400">Flow not found</span>
          <button 
            onClick={() => router.push("/automation")}
            className="block mt-[14px] text-pixel text-black underline"
          >
            Back to Automations
          </button>
        </div>
      </div>
    );
  }

  const selectedNode = flow.nodes.find(n => n.id === selectedNodeId);

  const handleNodeDragStart = (e: React.MouseEvent, nodeId: string) => {
    const node = flow.nodes.find(n => n.id === nodeId);
    if (!node) return;
    
    setIsDragging(true);
    setDraggedNodeId(nodeId);
    setDragOffset({
      x: e.clientX - node.position.x,
      y: e.clientY - node.position.y,
    });
    selectNode(nodeId);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !draggedNodeId) return;
    
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    
    moveNode(id, draggedNodeId, { x: Math.max(0, newX), y: Math.max(0, newY) });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedNodeId(null);
  };

  const handleAddNode = (type: NodeType, title: string, subtitle: string) => {
    const lastNode = flow.nodes[flow.nodes.length - 1];
    const newPosition = lastNode 
      ? { x: lastNode.position.x + 250, y: lastNode.position.y }
      : { x: 100, y: 100 };

    addNode(id, {
      type,
      title,
      subtitle,
      hasInput: type !== "trigger",
      hasOutput: type !== "action",
      position: newPosition,
    });
  };

  const handleDeleteSelected = () => {
    if (selectedNodeId) {
      deleteNode(id, selectedNodeId);
    }
  };

  const handleSave = () => {
    console.log("Saving flow:", flow);
    // In real app, would save to backend
  };

  const handleDeploy = () => {
    updateFlow(id, { isActive: true });
    console.log("Deploying flow:", flow.name);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="px-[30px] border-b border-gray-200 bg-white shrink-0">
        <div className="flex items-center justify-between py-[14px]">
          <div className="flex items-center gap-[30px]">
            <span 
              className="text-h2 italic cursor-pointer"
              onClick={() => router.push("/")}
            >
              Hired & Wired
            </span>
            <span className="text-h3">{flow.name}</span>
            <div className={`px-[8px] py-[4px] rounded-sm text-caps ${flow.isActive ? "bg-green text-white" : "bg-gray-200"}`}>
              {flow.isActive ? "ACTIVE" : "DRAFT"}
            </div>
          </div>
        </div>
        
        {/* Builder Controls */}
        <SecondRow 
          variant="builder"
          onBack={() => router.push("/automation")}
          onSave={handleSave}
          onDeploy={handleDeploy}
        />
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Node Library */}
        <aside className="w-[280px] bg-white border-r border-gray-200 overflow-y-auto shrink-0">
          <div className="p-[14px]">
            <span className="text-h3 block mb-[14px]">Node Library</span>
            <div className="flex flex-col gap-[8px]">
              {nodeLibrary.map((item) => (
                <button
                  key={item.type}
                  onClick={() => handleAddNode(item.type, item.title, item.subtitle)}
                  className="text-left p-[14px] bg-gray-100 rounded-sm hover:bg-gray-200 transition-colors"
                >
                  <span className="text-h4 block">{item.title}</span>
                  <span className="text-caps text-gray-500">{item.subtitle}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Templates */}
          <div className="p-[14px] border-t border-gray-200">
            <span className="text-h3 block mb-[14px]">Templates</span>
            <div className="flex flex-col gap-[8px]">
              <button className="text-left p-[14px] bg-mint rounded-sm hover:opacity-80 transition-opacity">
                <span className="text-h4 block">Welcome Series</span>
                <span className="text-caps text-gray-500">3 nodes</span>
              </button>
              <button className="text-left p-[14px] bg-lavender rounded-sm hover:opacity-80 transition-opacity">
                <span className="text-h4 block">Interview Follow-up</span>
                <span className="text-caps text-gray-500">4 nodes</span>
              </button>
              <button className="text-left p-[14px] bg-pink rounded-sm hover:opacity-80 transition-opacity">
                <span className="text-h4 block">Rejection Notice</span>
                <span className="text-caps text-gray-500">2 nodes</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Canvas */}
        <div 
          ref={canvasRef}
          className="flex-1 relative overflow-auto bg-[#FAFAFA]"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onClick={() => selectNode(null)}
          style={{
            backgroundImage: `radial-gradient(circle, #ddd 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        >
          {/* Connection Lines */}
          <svg className="absolute inset-0 pointer-events-none" style={{ width: "100%", height: "100%", minWidth: "2000px", minHeight: "1000px" }}>
            {flow.connections.map((conn) => {
              const fromNode = flow.nodes.find(n => n.id === conn.fromNodeId);
              const toNode = flow.nodes.find(n => n.id === conn.toNodeId);
              if (!fromNode || !toNode) return null;

              const x1 = fromNode.position.x + 180; // node width
              const y1 = fromNode.position.y + 80; // approx center
              const x2 = toNode.position.x;
              const y2 = toNode.position.y + 80;

              return (
                <path
                  key={conn.id}
                  d={`M ${x1} ${y1} C ${x1 + 50} ${y1}, ${x2 - 50} ${y2}, ${x2} ${y2}`}
                  stroke="#000"
                  strokeWidth="2"
                  fill="none"
                />
              );
            })}
          </svg>

          {/* Nodes */}
          {flow.nodes.map((node) => (
            <div
              key={node.id}
              className={`absolute cursor-move select-none ${selectedNodeId === node.id ? "ring-2 ring-yellow ring-offset-2" : ""}`}
              style={{
                left: node.position.x,
                top: node.position.y,
                width: 180,
              }}
              onMouseDown={(e) => {
                e.stopPropagation();
                handleNodeDragStart(e, node.id);
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <NodeComponent
                title={node.title}
                subtitle={node.subtitle}
                hasInput={node.hasInput}
                hasOutput={node.hasOutput}
              />
            </div>
          ))}

          {/* Empty state */}
          {flow.nodes.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className="text-h2 text-gray-300 block mb-[14px]">Start Building</span>
                <span className="text-pixel text-gray-400">
                  Add nodes from the library to create your automation flow
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar - Properties */}
        <aside className="w-[280px] bg-white border-l border-gray-200 overflow-y-auto shrink-0">
          <div className="p-[14px]">
            <span className="text-h3 block mb-[14px]">Properties</span>
            
            {selectedNode ? (
              <div className="flex flex-col gap-[14px]">
                <div className="flex flex-col gap-[4px]">
                  <span className="text-caps text-gray-400">Type</span>
                  <span className="text-h4 capitalize">{selectedNode.type}</span>
                </div>
                
                <div className="flex flex-col gap-[4px]">
                  <span className="text-caps text-gray-400">Title</span>
                  <input 
                    type="text"
                    value={selectedNode.title}
                    className="text-pixel p-[8px] border border-gray-200 rounded-sm"
                    readOnly
                  />
                </div>
                
                <div className="flex flex-col gap-[4px]">
                  <span className="text-caps text-gray-400">Subtitle</span>
                  <input 
                    type="text"
                    value={selectedNode.subtitle}
                    className="text-pixel p-[8px] border border-gray-200 rounded-sm"
                    readOnly
                  />
                </div>

                <div className="flex flex-col gap-[4px]">
                  <span className="text-caps text-gray-400">Position</span>
                  <span className="text-pixel">
                    X: {Math.round(selectedNode.position.x)}, Y: {Math.round(selectedNode.position.y)}
                  </span>
                </div>

                <button
                  onClick={handleDeleteSelected}
                  className="mt-[14px] px-[14px] py-[8px] bg-red text-white rounded-sm text-pixel hover:opacity-80 transition-opacity"
                >
                  Delete Node
                </button>
              </div>
            ) : (
              <div className="py-[30px] text-center">
                <span className="text-pixel text-gray-400">
                  Select a node to view properties
                </span>
              </div>
            )}
          </div>
          
          {/* Flow Info */}
          <div className="p-[14px] border-t border-gray-200">
            <span className="text-h3 block mb-[14px]">Flow Info</span>
            <div className="flex flex-col gap-[8px]">
              <div className="flex justify-between">
                <span className="text-caps text-gray-400">Nodes</span>
                <span className="text-pixel">{flow.nodes.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-caps text-gray-400">Connections</span>
                <span className="text-pixel">{flow.connections.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-caps text-gray-400">Status</span>
                <span className={`text-pixel ${flow.isActive ? "text-green" : "text-gray-500"}`}>
                  {flow.isActive ? "Active" : "Draft"}
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

