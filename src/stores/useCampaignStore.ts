"use client";

import { create } from "zustand";
import { Campaign, CampaignTask, KanbanCard, KanbanColumn, StatusType, CampaignStats } from "./types";

// ============= Mock Data =============

const mockCampaigns: Campaign[] = [
  {
    id: "campaign-1",
    title: "Senior Frontend Engineer",
    statusType: "green",
    statusLabel: "Active",
    stats: {
      applied: 142,
      rejected: 89,
      inProgress: 282,
      finalRound: 31,
      offersSent: 4,
    },
    pipeline: [
      {
        id: "col-applied",
        title: "APPLIED",
        cards: [
          { id: "card-1", name: "John Smith", role: "FRONTEND DEVELOPER", avatarSrc: "/assets/avatar-petya.png" },
          { id: "card-2", name: "Jane Doe", role: "REACT ENGINEER", avatarSrc: "/assets/avatar-katya.png" },
          { id: "card-3", name: "Mike Johnson", role: "WEB DEVELOPER", avatarSrc: "/assets/avatar-dog.png" },
        ],
      },
      {
        id: "col-screening",
        title: "SCREENING",
        cards: [
          { id: "card-4", name: "Sarah Williams", role: "SENIOR DEVELOPER", avatarSrc: "/assets/avatar-katya.png", statusType: "green" },
          { id: "card-5", name: "Tom Brown", role: "FRONTEND SPECIALIST", avatarSrc: "/assets/avatar-petya.png" },
        ],
      },
      {
        id: "col-interview",
        title: "INTERVIEW",
        cards: [
          { id: "card-6", name: "Emily Davis", role: "TECH LEAD", avatarSrc: "/assets/avatar-dog.png", statusType: "purple" },
        ],
      },
      {
        id: "col-offer",
        title: "OFFER",
        cards: [
          { id: "card-7", name: "Chris Taylor", role: "SENIOR FRONTEND", avatarSrc: "/assets/avatar-katya.png", statusType: "green" },
        ],
      },
    ],
    tasks: [
      { id: "task-1", title: "Review 15 new applications", completed: true },
      { id: "task-2", title: "Schedule technical interviews", completed: true },
      { id: "task-3", title: "Send feedback to rejected candidates", completed: false, hasError: true, errorMessage: "3 emails failed to send" },
      { id: "task-4", title: "Prepare offer letter for Chris Taylor", completed: false },
      { id: "task-5", title: "Update job description", completed: false },
    ],
  },
  {
    id: "campaign-2",
    title: "Product Designer",
    statusType: "purple",
    statusLabel: "High Priority",
    stats: {
      applied: 78,
      rejected: 45,
      inProgress: 120,
      finalRound: 12,
      offersSent: 2,
    },
    pipeline: [
      {
        id: "col-applied",
        title: "APPLIED",
        cards: [
          { id: "card-8", name: "Alex Morgan", role: "UI DESIGNER", avatarSrc: "/assets/avatar-petya.png" },
          { id: "card-9", name: "Lisa Chen", role: "PRODUCT DESIGNER", avatarSrc: "/assets/avatar-katya.png" },
        ],
      },
      {
        id: "col-screening",
        title: "SCREENING",
        cards: [
          { id: "card-10", name: "David Park", role: "UX DESIGNER", avatarSrc: "/assets/avatar-dog.png" },
        ],
      },
      {
        id: "col-interview",
        title: "INTERVIEW",
        cards: [],
      },
      {
        id: "col-offer",
        title: "OFFER",
        cards: [],
      },
    ],
    tasks: [
      { id: "task-6", title: "Review portfolio submissions", completed: false },
      { id: "task-7", title: "Schedule design challenge", completed: false },
    ],
  },
  {
    id: "campaign-3",
    title: "DevOps Engineer",
    statusType: "stopped",
    statusLabel: "Paused",
    stats: {
      applied: 56,
      rejected: 30,
      inProgress: 15,
      finalRound: 5,
      offersSent: 1,
    },
    pipeline: [
      { id: "col-applied", title: "APPLIED", cards: [] },
      { id: "col-screening", title: "SCREENING", cards: [] },
      { id: "col-interview", title: "INTERVIEW", cards: [] },
      { id: "col-offer", title: "OFFER", cards: [] },
    ],
    tasks: [],
  },
  {
    id: "campaign-4",
    title: "Marketing Manager",
    statusType: "red",
    statusLabel: "Behind Schedule",
    stats: {
      applied: 210,
      rejected: 180,
      inProgress: 25,
      finalRound: 3,
      offersSent: 0,
    },
    pipeline: [
      {
        id: "col-applied",
        title: "APPLIED",
        cards: [
          { id: "card-11", name: "Rachel Green", role: "MARKETING LEAD", avatarSrc: "/assets/avatar-katya.png" },
        ],
      },
      { id: "col-screening", title: "SCREENING", cards: [] },
      { id: "col-interview", title: "INTERVIEW", cards: [] },
      { id: "col-offer", title: "OFFER", cards: [] },
    ],
    tasks: [
      { id: "task-8", title: "Urgently review remaining candidates", completed: false, hasError: true, errorMessage: "Deadline approaching" },
    ],
  },
];

// ============= Store Interface =============

interface CampaignStore {
  campaigns: Campaign[];
  
  // CRUD Operations
  getCampaign: (id: string) => Campaign | undefined;
  addCampaign: (campaign: Omit<Campaign, "id">) => void;
  updateCampaign: (id: string, updates: Partial<Campaign>) => void;
  deleteCampaign: (id: string) => void;
  
  // Status operations
  updateStatus: (id: string, statusType: StatusType, statusLabel?: string) => void;
  updateStats: (id: string, stats: Partial<CampaignStats>) => void;
  
  // Pipeline operations
  moveCard: (campaignId: string, cardId: string, fromColumnId: string, toColumnId: string) => void;
  addCandidate: (campaignId: string, columnId: string, card: Omit<KanbanCard, "id">) => void;
  removeCandidate: (campaignId: string, cardId: string) => void;
  
  // Task operations
  addTask: (campaignId: string, task: Omit<CampaignTask, "id">) => void;
  updateTask: (campaignId: string, taskId: string, updates: Partial<CampaignTask>) => void;
  toggleTaskComplete: (campaignId: string, taskId: string) => void;
  deleteTask: (campaignId: string, taskId: string) => void;
}

// ============= Store =============

export const useCampaignStore = create<CampaignStore>((set, get) => ({
  campaigns: mockCampaigns,

  getCampaign: (id) => {
    return get().campaigns.find((c) => c.id === id);
  },

  addCampaign: (campaignData) => {
    const newCampaign: Campaign = {
      ...campaignData,
      id: `campaign-${Date.now()}`,
    };
    set((state) => ({
      campaigns: [...state.campaigns, newCampaign],
    }));
  },

  updateCampaign: (id, updates) => {
    set((state) => ({
      campaigns: state.campaigns.map((c) =>
        c.id === id ? { ...c, ...updates } : c
      ),
    }));
  },

  deleteCampaign: (id) => {
    set((state) => ({
      campaigns: state.campaigns.filter((c) => c.id !== id),
    }));
  },

  updateStatus: (id, statusType, statusLabel) => {
    set((state) => ({
      campaigns: state.campaigns.map((c) =>
        c.id === id ? { ...c, statusType, statusLabel } : c
      ),
    }));
  },

  updateStats: (id, statsUpdates) => {
    set((state) => ({
      campaigns: state.campaigns.map((c) =>
        c.id === id ? { ...c, stats: { ...c.stats, ...statsUpdates } } : c
      ),
    }));
  },

  moveCard: (campaignId, cardId, fromColumnId, toColumnId) => {
    set((state) => ({
      campaigns: state.campaigns.map((campaign) => {
        if (campaign.id !== campaignId) return campaign;

        let movedCard: KanbanCard | null = null;

        const updatedPipeline = campaign.pipeline.map((column) => {
          if (column.id === fromColumnId) {
            const card = column.cards.find((c) => c.id === cardId);
            if (card) movedCard = card;
            return {
              ...column,
              cards: column.cards.filter((c) => c.id !== cardId),
            };
          }
          if (column.id === toColumnId && movedCard) {
            return {
              ...column,
              cards: [...column.cards, movedCard],
            };
          }
          return column;
        });

        return { ...campaign, pipeline: updatedPipeline };
      }),
    }));
  },

  addCandidate: (campaignId, columnId, cardData) => {
    const newCard: KanbanCard = {
      ...cardData,
      id: `card-${Date.now()}`,
    };

    set((state) => ({
      campaigns: state.campaigns.map((campaign) => {
        if (campaign.id !== campaignId) return campaign;

        const updatedPipeline = campaign.pipeline.map((column) => {
          if (column.id !== columnId) return column;
          return {
            ...column,
            cards: [...column.cards, newCard],
          };
        });

        // Update applied count
        const newStats = { ...campaign.stats, applied: campaign.stats.applied + 1 };

        return { ...campaign, pipeline: updatedPipeline, stats: newStats };
      }),
    }));
  },

  removeCandidate: (campaignId, cardId) => {
    set((state) => ({
      campaigns: state.campaigns.map((campaign) => {
        if (campaign.id !== campaignId) return campaign;

        const updatedPipeline = campaign.pipeline.map((column) => ({
          ...column,
          cards: column.cards.filter((c) => c.id !== cardId),
        }));

        return { ...campaign, pipeline: updatedPipeline };
      }),
    }));
  },

  addTask: (campaignId, taskData) => {
    const newTask: CampaignTask = {
      ...taskData,
      id: `task-${Date.now()}`,
    };

    set((state) => ({
      campaigns: state.campaigns.map((campaign) => {
        if (campaign.id !== campaignId) return campaign;
        return {
          ...campaign,
          tasks: [...campaign.tasks, newTask],
        };
      }),
    }));
  },

  updateTask: (campaignId, taskId, updates) => {
    set((state) => ({
      campaigns: state.campaigns.map((campaign) => {
        if (campaign.id !== campaignId) return campaign;
        return {
          ...campaign,
          tasks: campaign.tasks.map((task) =>
            task.id === taskId ? { ...task, ...updates } : task
          ),
        };
      }),
    }));
  },

  toggleTaskComplete: (campaignId, taskId) => {
    set((state) => ({
      campaigns: state.campaigns.map((campaign) => {
        if (campaign.id !== campaignId) return campaign;
        return {
          ...campaign,
          tasks: campaign.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          ),
        };
      }),
    }));
  },

  deleteTask: (campaignId, taskId) => {
    set((state) => ({
      campaigns: state.campaigns.map((campaign) => {
        if (campaign.id !== campaignId) return campaign;
        return {
          ...campaign,
          tasks: campaign.tasks.filter((task) => task.id !== taskId),
        };
      }),
    }));
  },
}));

