"use client";

import { create } from "zustand";
import { Employee, StatusType } from "./types";

// ============= Mock Data =============

const mockEmployees: Employee[] = [
  // Engineering Team
  {
    id: "emp-1",
    name: "Katya Ivanova",
    role: "SENIOR FRONTEND ENGINEER",
    avatarSrc: "/assets/avatar-katya.png",
    statusType: "green",
    statusLabel: "On Track",
    progress: 92,
    teamId: "team-1",
    email: "katya@hiredwired.com",
    achievements: ["React Expert", "TypeScript Pro", "Design System Lead"],
    reportsTo: "emp-4",
    mentoring: ["emp-2", "emp-3"],
  },
  {
    id: "emp-2",
    name: "Petya Sidorov",
    role: "FRONTEND ENGINEER",
    avatarSrc: "/assets/avatar-petya.png",
    statusType: "purple",
    statusLabel: "Rocket Growth",
    progress: 78,
    teamId: "team-1",
    email: "petya@hiredwired.com",
    achievements: ["Fast Learner", "CSS Wizard"],
    reportsTo: "emp-1",
  },
  {
    id: "emp-3",
    name: "Alex Dogov",
    role: "JUNIOR DEVELOPER",
    avatarSrc: "/assets/avatar-dog.png",
    statusType: "green",
    statusLabel: "On Track",
    progress: 65,
    teamId: "team-1",
    email: "alex@hiredwired.com",
    achievements: ["Quick Onboarding"],
    reportsTo: "emp-1",
  },
  {
    id: "emp-4",
    name: "Maria Chen",
    role: "ENGINEERING MANAGER",
    avatarSrc: "/assets/avatar-katya.png",
    statusType: "green",
    statusLabel: "On Track",
    progress: 88,
    teamId: "team-1",
    email: "maria@hiredwired.com",
    achievements: ["Team Builder", "Agile Master", "Performance Champion"],
    mentoring: ["emp-1"],
  },
  {
    id: "emp-5",
    name: "Ivan Petrov",
    role: "BACKEND ENGINEER",
    avatarSrc: "/assets/avatar-petya.png",
    statusType: "red",
    statusLabel: "Needs Attention",
    progress: 45,
    teamId: "team-1",
    email: "ivan@hiredwired.com",
    reportsTo: "emp-4",
  },
  // Design Team
  {
    id: "emp-6",
    name: "Anna Lee",
    role: "LEAD DESIGNER",
    avatarSrc: "/assets/avatar-katya.png",
    statusType: "green",
    statusLabel: "On Track",
    progress: 95,
    teamId: "team-2",
    email: "anna@hiredwired.com",
    achievements: ["Design System Expert", "Figma Pro"],
  },
  {
    id: "emp-7",
    name: "Mike Brown",
    role: "UX RESEARCHER",
    avatarSrc: "/assets/avatar-petya.png",
    statusType: "green",
    statusLabel: "On Track",
    progress: 82,
    teamId: "team-2",
    email: "mike@hiredwired.com",
    reportsTo: "emp-6",
  },
  {
    id: "emp-8",
    name: "Sara Wilson",
    role: "VISUAL DESIGNER",
    avatarSrc: "/assets/avatar-dog.png",
    statusType: "purple",
    statusLabel: "Rocket Growth",
    progress: 88,
    teamId: "team-2",
    email: "sara@hiredwired.com",
    achievements: ["Brand Champion"],
    reportsTo: "emp-6",
  },
  // Product Team
  {
    id: "emp-9",
    name: "David Kim",
    role: "PRODUCT MANAGER",
    avatarSrc: "/assets/avatar-petya.png",
    statusType: "green",
    statusLabel: "On Track",
    progress: 76,
    teamId: "team-3",
    email: "david@hiredwired.com",
    achievements: ["Roadmap Expert", "Stakeholder Whisperer"],
  },
  {
    id: "emp-10",
    name: "Lisa Park",
    role: "PRODUCT ANALYST",
    avatarSrc: "/assets/avatar-katya.png",
    statusType: "stopped",
    statusLabel: "On Leave",
    progress: 60,
    teamId: "team-3",
    email: "lisa@hiredwired.com",
    reportsTo: "emp-9",
  },
  // Marketing Team
  {
    id: "emp-11",
    name: "Tom Harris",
    role: "MARKETING LEAD",
    avatarSrc: "/assets/avatar-petya.png",
    statusType: "green",
    statusLabel: "On Track",
    progress: 70,
    teamId: "team-4",
    email: "tom@hiredwired.com",
  },
  {
    id: "emp-12",
    name: "Emma Stone",
    role: "CONTENT STRATEGIST",
    avatarSrc: "/assets/avatar-katya.png",
    statusType: "green",
    statusLabel: "On Track",
    progress: 85,
    teamId: "team-4",
    email: "emma@hiredwired.com",
    reportsTo: "emp-11",
  },
  {
    id: "emp-13",
    name: "Jake White",
    role: "GROWTH HACKER",
    avatarSrc: "/assets/avatar-dog.png",
    statusType: "purple",
    statusLabel: "Rocket Growth",
    progress: 91,
    teamId: "team-4",
    email: "jake@hiredwired.com",
    achievements: ["Viral Wizard", "Analytics Pro"],
    reportsTo: "emp-11",
  },
  // Sales Team
  {
    id: "emp-14",
    name: "Chris Taylor",
    role: "SALES DIRECTOR",
    avatarSrc: "/assets/avatar-petya.png",
    statusType: "green",
    statusLabel: "On Track",
    progress: 97,
    teamId: "team-5",
    email: "chris@hiredwired.com",
    achievements: ["Top Closer", "Enterprise Expert"],
  },
  {
    id: "emp-15",
    name: "Rachel Green",
    role: "ACCOUNT EXECUTIVE",
    avatarSrc: "/assets/avatar-katya.png",
    statusType: "green",
    statusLabel: "On Track",
    progress: 89,
    teamId: "team-5",
    email: "rachel@hiredwired.com",
    reportsTo: "emp-14",
  },
  {
    id: "emp-16",
    name: "Bob Martinez",
    role: "SDR",
    avatarSrc: "/assets/avatar-dog.png",
    statusType: "red",
    statusLabel: "Needs Coaching",
    progress: 52,
    teamId: "team-5",
    email: "bob@hiredwired.com",
    reportsTo: "emp-15",
  },
];

// ============= Store Interface =============

interface EmployeeStore {
  employees: Employee[];
  
  // CRUD Operations
  getEmployee: (id: string) => Employee | undefined;
  getEmployeesByTeam: (teamId: string) => Employee[];
  addEmployee: (employee: Omit<Employee, "id">) => void;
  updateEmployee: (id: string, updates: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  
  // Status operations
  updateStatus: (id: string, statusType: StatusType, statusLabel?: string) => void;
  updateProgress: (id: string, progress: number) => void;
  
  // Relationship operations
  setReportsTo: (employeeId: string, managerId: string) => void;
  addMentee: (mentorId: string, menteeId: string) => void;
  removeMentee: (mentorId: string, menteeId: string) => void;
  
  // Achievement operations
  addAchievement: (employeeId: string, achievement: string) => void;
  removeAchievement: (employeeId: string, achievement: string) => void;
}

// ============= Store =============

export const useEmployeeStore = create<EmployeeStore>((set, get) => ({
  employees: mockEmployees,

  getEmployee: (id) => {
    return get().employees.find((emp) => emp.id === id);
  },

  getEmployeesByTeam: (teamId) => {
    return get().employees.filter((emp) => emp.teamId === teamId);
  },

  addEmployee: (employeeData) => {
    const newEmployee: Employee = {
      ...employeeData,
      id: `emp-${Date.now()}`,
    };
    set((state) => ({
      employees: [...state.employees, newEmployee],
    }));
  },

  updateEmployee: (id, updates) => {
    set((state) => ({
      employees: state.employees.map((emp) =>
        emp.id === id ? { ...emp, ...updates } : emp
      ),
    }));
  },

  deleteEmployee: (id) => {
    set((state) => ({
      employees: state.employees.filter((emp) => emp.id !== id),
    }));
  },

  updateStatus: (id, statusType, statusLabel) => {
    set((state) => ({
      employees: state.employees.map((emp) =>
        emp.id === id ? { ...emp, statusType, statusLabel } : emp
      ),
    }));
  },

  updateProgress: (id, progress) => {
    set((state) => ({
      employees: state.employees.map((emp) =>
        emp.id === id ? { ...emp, progress: Math.min(100, Math.max(0, progress)) } : emp
      ),
    }));
  },

  setReportsTo: (employeeId, managerId) => {
    set((state) => ({
      employees: state.employees.map((emp) =>
        emp.id === employeeId ? { ...emp, reportsTo: managerId } : emp
      ),
    }));
  },

  addMentee: (mentorId, menteeId) => {
    set((state) => ({
      employees: state.employees.map((emp) => {
        if (emp.id !== mentorId) return emp;
        const mentoring = emp.mentoring || [];
        if (mentoring.includes(menteeId)) return emp;
        return { ...emp, mentoring: [...mentoring, menteeId] };
      }),
    }));
  },

  removeMentee: (mentorId, menteeId) => {
    set((state) => ({
      employees: state.employees.map((emp) => {
        if (emp.id !== mentorId) return emp;
        return {
          ...emp,
          mentoring: emp.mentoring?.filter((id) => id !== menteeId),
        };
      }),
    }));
  },

  addAchievement: (employeeId, achievement) => {
    set((state) => ({
      employees: state.employees.map((emp) => {
        if (emp.id !== employeeId) return emp;
        const achievements = emp.achievements || [];
        if (achievements.includes(achievement)) return emp;
        return { ...emp, achievements: [...achievements, achievement] };
      }),
    }));
  },

  removeAchievement: (employeeId, achievement) => {
    set((state) => ({
      employees: state.employees.map((emp) => {
        if (emp.id !== employeeId) return emp;
        return {
          ...emp,
          achievements: emp.achievements?.filter((a) => a !== achievement),
        };
      }),
    }));
  },
}));

