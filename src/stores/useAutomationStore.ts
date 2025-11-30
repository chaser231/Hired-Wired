"use client";

import { create } from "zustand";
import { AutomationFlow, AutomationNode, NodeConnection, NodeType, Position } from "./types";

// ============= Mock Data =============

const mockFlows: AutomationFlow[] = [
  {
    id: "flow-1",
    name: "Welcome Email Sequence",
    description: "Automated onboarding email flow for new candidates",
    isActive: true,
    nodes: [
      {
        id: "node-1",
        type: "trigger",
        title: "New Application",
        subtitle: "When candidate applies",
        hasInput: false,
        hasOutput: true,
        position: { x: 100, y: 100 },
      },
      {
        id: "node-2",
        type: "email",
        title: "Welcome Email",
        subtitle: "Send introduction",
        hasInput: true,
        hasOutput: true,
        position: { x: 350, y: 100 },
      },
      {
        id: "node-3",
        type: "delay",
        title: "Wait 2 Days",
        subtitle: "Delay before follow-up",
        hasInput: true,
        hasOutput: true,
        position: { x: 600, y: 100 },
      },
      {
        id: "node-4",
        type: "condition",
        title: "Check Response",
        subtitle: "If email opened",
        hasInput: true,
        hasOutput: true,
        position: { x: 850, y: 100 },
      },
      {
        id: "node-5",
        type: "email",
        title: "Follow-up Email",
        subtitle: "Send reminder",
        hasInput: true,
        hasOutput: true,
        position: { x: 1100, y: 50 },
      },
      {
        id: "node-6",
        type: "action",
        title: "Update Status",
        subtitle: "Mark as engaged",
        hasInput: true,
        hasOutput: false,
        position: { x: 1100, y: 200 },
      },
    ],
    connections: [
      { id: "conn-1", fromNodeId: "node-1", toNodeId: "node-2" },
      { id: "conn-2", fromNodeId: "node-2", toNodeId: "node-3" },
      { id: "conn-3", fromNodeId: "node-3", toNodeId: "node-4" },
      { id: "conn-4", fromNodeId: "node-4", toNodeId: "node-5" },
      { id: "conn-5", fromNodeId: "node-4", toNodeId: "node-6" },
    ],
  },
  {
    id: "flow-2",
    name: "Interview Reminder",
    description: "Send reminders before scheduled interviews",
    isActive: true,
    nodes: [
      {
        id: "node-7",
        type: "trigger",
        title: "Interview Scheduled",
        subtitle: "When interview is set",
        hasInput: false,
        hasOutput: true,
        position: { x: 100, y: 100 },
      },
      {
        id: "node-8",
        type: "delay",
        title: "Wait Until -1 Day",
        subtitle: "One day before",
        hasInput: true,
        hasOutput: true,
        position: { x: 350, y: 100 },
      },
      {
        id: "node-9",
        type: "email",
        title: "Reminder Email",
        subtitle: "Send interview details",
        hasInput: true,
        hasOutput: false,
        position: { x: 600, y: 100 },
      },
    ],
    connections: [
      { id: "conn-6", fromNodeId: "node-7", toNodeId: "node-8" },
      { id: "conn-7", fromNodeId: "node-8", toNodeId: "node-9" },
    ],
  },
  {
    id: "flow-3",
    name: "Rejection Notification",
    description: "Notify candidates of rejection with feedback",
    isActive: false,
    nodes: [
      {
        id: "node-10",
        type: "trigger",
        title: "Candidate Rejected",
        subtitle: "When status changes",
        hasInput: false,
        hasOutput: true,
        position: { x: 100, y: 100 },
      },
      {
        id: "node-11",
        type: "email",
        title: "Rejection Email",
        subtitle: "Send with feedback",
        hasInput: true,
        hasOutput: false,
        position: { x: 350, y: 100 },
      },
    ],
    connections: [
      { id: "conn-8", fromNodeId: "node-10", toNodeId: "node-11" },
    ],
  },
];

// ============= Store Interface =============

interface AutomationStore {
  flows: AutomationFlow[];
  activeFlowId: string | null;
  selectedNodeId: string | null;
  
  // Flow CRUD Operations
  getFlow: (id: string) => AutomationFlow | undefined;
  getActiveFlow: () => AutomationFlow | undefined;
  addFlow: (flow: Omit<AutomationFlow, "id">) => void;
  updateFlow: (id: string, updates: Partial<AutomationFlow>) => void;
  deleteFlow: (id: string) => void;
  setActiveFlow: (id: string | null) => void;
  toggleFlowActive: (id: string) => void;
  
  // Node Operations
  addNode: (flowId: string, node: Omit<AutomationNode, "id">) => void;
  updateNode: (flowId: string, nodeId: string, updates: Partial<AutomationNode>) => void;
  deleteNode: (flowId: string, nodeId: string) => void;
  moveNode: (flowId: string, nodeId: string, position: Position) => void;
  selectNode: (nodeId: string | null) => void;
  
  // Connection Operations
  addConnection: (flowId: string, fromNodeId: string, toNodeId: string) => void;
  deleteConnection: (flowId: string, connectionId: string) => void;
  
  // Canvas Operations
  duplicateNode: (flowId: string, nodeId: string) => void;
}

// ============= Store =============

export const useAutomationStore = create<AutomationStore>((set, get) => ({
  flows: mockFlows,
  activeFlowId: null,
  selectedNodeId: null,

  getFlow: (id) => {
    return get().flows.find((f) => f.id === id);
  },

  getActiveFlow: () => {
    const { flows, activeFlowId } = get();
    return flows.find((f) => f.id === activeFlowId);
  },

  addFlow: (flowData) => {
    const newFlow: AutomationFlow = {
      ...flowData,
      id: `flow-${Date.now()}`,
    };
    set((state) => ({
      flows: [...state.flows, newFlow],
      activeFlowId: newFlow.id,
    }));
  },

  updateFlow: (id, updates) => {
    set((state) => ({
      flows: state.flows.map((f) =>
        f.id === id ? { ...f, ...updates } : f
      ),
    }));
  },

  deleteFlow: (id) => {
    set((state) => ({
      flows: state.flows.filter((f) => f.id !== id),
      activeFlowId: state.activeFlowId === id ? null : state.activeFlowId,
    }));
  },

  setActiveFlow: (id) => {
    set({ activeFlowId: id, selectedNodeId: null });
  },

  toggleFlowActive: (id) => {
    set((state) => ({
      flows: state.flows.map((f) =>
        f.id === id ? { ...f, isActive: !f.isActive } : f
      ),
    }));
  },

  addNode: (flowId, nodeData) => {
    const newNode: AutomationNode = {
      ...nodeData,
      id: `node-${Date.now()}`,
    };

    set((state) => ({
      flows: state.flows.map((flow) => {
        if (flow.id !== flowId) return flow;
        return {
          ...flow,
          nodes: [...flow.nodes, newNode],
        };
      }),
      selectedNodeId: newNode.id,
    }));
  },

  updateNode: (flowId, nodeId, updates) => {
    set((state) => ({
      flows: state.flows.map((flow) => {
        if (flow.id !== flowId) return flow;
        return {
          ...flow,
          nodes: flow.nodes.map((node) =>
            node.id === nodeId ? { ...node, ...updates } : node
          ),
        };
      }),
    }));
  },

  deleteNode: (flowId, nodeId) => {
    set((state) => ({
      flows: state.flows.map((flow) => {
        if (flow.id !== flowId) return flow;
        return {
          ...flow,
          nodes: flow.nodes.filter((n) => n.id !== nodeId),
          connections: flow.connections.filter(
            (c) => c.fromNodeId !== nodeId && c.toNodeId !== nodeId
          ),
        };
      }),
      selectedNodeId: state.selectedNodeId === nodeId ? null : state.selectedNodeId,
    }));
  },

  moveNode: (flowId, nodeId, position) => {
    set((state) => ({
      flows: state.flows.map((flow) => {
        if (flow.id !== flowId) return flow;
        return {
          ...flow,
          nodes: flow.nodes.map((node) =>
            node.id === nodeId ? { ...node, position } : node
          ),
        };
      }),
    }));
  },

  selectNode: (nodeId) => {
    set({ selectedNodeId: nodeId });
  },

  addConnection: (flowId, fromNodeId, toNodeId) => {
    // Check if connection already exists
    const flow = get().flows.find((f) => f.id === flowId);
    if (!flow) return;
    
    const exists = flow.connections.some(
      (c) => c.fromNodeId === fromNodeId && c.toNodeId === toNodeId
    );
    if (exists) return;

    const newConnection: NodeConnection = {
      id: `conn-${Date.now()}`,
      fromNodeId,
      toNodeId,
    };

    set((state) => ({
      flows: state.flows.map((f) => {
        if (f.id !== flowId) return f;
        return {
          ...f,
          connections: [...f.connections, newConnection],
        };
      }),
    }));
  },

  deleteConnection: (flowId, connectionId) => {
    set((state) => ({
      flows: state.flows.map((flow) => {
        if (flow.id !== flowId) return flow;
        return {
          ...flow,
          connections: flow.connections.filter((c) => c.id !== connectionId),
        };
      }),
    }));
  },

  duplicateNode: (flowId, nodeId) => {
    const flow = get().flows.find((f) => f.id === flowId);
    if (!flow) return;

    const nodeToDuplicate = flow.nodes.find((n) => n.id === nodeId);
    if (!nodeToDuplicate) return;

    const newNode: AutomationNode = {
      ...nodeToDuplicate,
      id: `node-${Date.now()}`,
      position: {
        x: nodeToDuplicate.position.x + 50,
        y: nodeToDuplicate.position.y + 50,
      },
    };

    set((state) => ({
      flows: state.flows.map((f) => {
        if (f.id !== flowId) return f;
        return {
          ...f,
          nodes: [...f.nodes, newNode],
        };
      }),
      selectedNodeId: newNode.id,
    }));
  },
}));

