"use client";

import { create } from "zustand";
import { Team, AvatarData } from "./types";

// ============= Mock Data =============

const mockTeams: Team[] = [
  {
    id: "team-1",
    name: "Engineering",
    description: "Core development team responsible for platform features",
    peopleCount: 12,
    productivity: 87,
    highlight: "Shipped new automation module ahead of schedule",
    avatars: [
      { src: "/assets/avatar-katya.png" },
      { src: "/assets/avatar-petya.png" },
      { src: "/assets/avatar-dog.png" },
    ],
    memberIds: ["emp-1", "emp-2", "emp-3", "emp-4", "emp-5"],
  },
  {
    id: "team-2",
    name: "Design",
    description: "UI/UX and visual design specialists",
    peopleCount: 6,
    productivity: 92,
    highlight: "Completed rebrand assets for Q4 launch",
    avatars: [
      { src: "/assets/avatar-petya.png" },
      { src: "/assets/avatar-katya.png" },
    ],
    memberIds: ["emp-6", "emp-7", "emp-8"],
  },
  {
    id: "team-3",
    name: "Product",
    description: "Product strategy and roadmap planning",
    peopleCount: 4,
    productivity: 78,
    highlight: "Defined 2024 product vision and OKRs",
    avatars: [
      { src: "/assets/avatar-dog.png" },
      { src: "/assets/avatar-katya.png" },
    ],
    memberIds: ["emp-9", "emp-10"],
  },
  {
    id: "team-4",
    name: "Marketing",
    description: "Growth, content, and brand awareness",
    peopleCount: 8,
    productivity: 65,
    highlight: "Launched viral TikTok campaign",
    avatars: [
      { src: "/assets/avatar-katya.png" },
      { src: "/assets/avatar-petya.png" },
      { src: "/assets/avatar-dog.png" },
    ],
    memberIds: ["emp-11", "emp-12", "emp-13"],
  },
  {
    id: "team-5",
    name: "Sales",
    description: "Enterprise sales and partnerships",
    peopleCount: 10,
    productivity: 94,
    highlight: "Closed $2M deal with Fortune 500 client",
    avatars: [
      { src: "/assets/avatar-petya.png" },
      { src: "/assets/avatar-dog.png" },
    ],
    memberIds: ["emp-14", "emp-15", "emp-16"],
  },
  {
    id: "team-6",
    name: "Support",
    description: "Customer success and technical support",
    peopleCount: 15,
    productivity: 88,
    highlight: "Reduced average response time by 40%",
    avatars: [
      { src: "/assets/avatar-katya.png" },
      { src: "/assets/avatar-dog.png" },
      { src: "/assets/avatar-petya.png" },
    ],
    memberIds: ["emp-17", "emp-18", "emp-19", "emp-20"],
  },
];

// ============= Store Interface =============

interface TeamsStore {
  teams: Team[];
  
  // CRUD Operations
  getTeam: (id: string) => Team | undefined;
  addTeam: (team: Omit<Team, "id">) => void;
  updateTeam: (id: string, updates: Partial<Team>) => void;
  deleteTeam: (id: string) => void;
  
  // Specific operations
  updateProductivity: (id: string, productivity: number) => void;
  addMember: (teamId: string, employeeId: string, avatar?: AvatarData) => void;
  removeMember: (teamId: string, employeeId: string) => void;
}

// ============= Store =============

export const useTeamsStore = create<TeamsStore>((set, get) => ({
  teams: mockTeams,

  getTeam: (id) => {
    return get().teams.find((team) => team.id === id);
  },

  addTeam: (teamData) => {
    const newTeam: Team = {
      ...teamData,
      id: `team-${Date.now()}`,
    };
    set((state) => ({
      teams: [...state.teams, newTeam],
    }));
  },

  updateTeam: (id, updates) => {
    set((state) => ({
      teams: state.teams.map((team) =>
        team.id === id ? { ...team, ...updates } : team
      ),
    }));
  },

  deleteTeam: (id) => {
    set((state) => ({
      teams: state.teams.filter((team) => team.id !== id),
    }));
  },

  updateProductivity: (id, productivity) => {
    set((state) => ({
      teams: state.teams.map((team) =>
        team.id === id ? { ...team, productivity } : team
      ),
    }));
  },

  addMember: (teamId, employeeId, avatar) => {
    set((state) => ({
      teams: state.teams.map((team) => {
        if (team.id !== teamId) return team;
        
        const memberIds = [...team.memberIds, employeeId];
        const avatars = avatar 
          ? [...team.avatars.slice(0, 2), avatar] 
          : team.avatars;
        
        return {
          ...team,
          memberIds,
          avatars,
          peopleCount: team.peopleCount + 1,
        };
      }),
    }));
  },

  removeMember: (teamId, employeeId) => {
    set((state) => ({
      teams: state.teams.map((team) => {
        if (team.id !== teamId) return team;
        
        return {
          ...team,
          memberIds: team.memberIds.filter((id) => id !== employeeId),
          peopleCount: Math.max(0, team.peopleCount - 1),
        };
      }),
    }));
  },
}));

