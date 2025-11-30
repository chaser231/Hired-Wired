// ============================================
// Hired & Wired — Data Types
// ============================================

// ============= Base Types =============

export type StatusType = "green" | "red" | "purple" | "stopped";

export interface AvatarData {
  src: string;
}

// ============= Employee Types =============

export interface Employee {
  id: string;
  name: string;
  role: string;
  avatarSrc: string;
  statusType: StatusType;
  statusLabel?: string;
  progress: number;
  teamId: string;
  email?: string;
  phone?: string;
  achievements?: string[];
  reportsTo?: string; // employee id
  mentoring?: string[]; // employee ids
}

// ============= Team Types =============

export interface Team {
  id: string;
  name: string;
  description?: string;
  peopleCount: number;
  productivity: number;
  highlight?: string;
  avatars: AvatarData[];
  memberIds: string[];
}

// ============= Campaign Types =============

export interface CampaignStats {
  applied: number;
  rejected: number;
  inProgress: number;
  finalRound: number;
  offersSent: number;
}

export interface KanbanCard {
  id: string;
  name: string;
  role: string;
  avatarSrc?: string;
  statusType?: StatusType;
}

export interface KanbanColumn {
  id: string;
  title: string;
  cards: KanbanCard[];
}

export interface Campaign {
  id: string;
  title: string;
  statusType: StatusType;
  statusLabel?: string;
  stats: CampaignStats;
  pipeline: KanbanColumn[];
  tasks: CampaignTask[];
}

export interface CampaignTask {
  id: string;
  title: string;
  completed: boolean;
  hasError?: boolean;
  errorMessage?: string;
}

// ============= Automation Types =============

export interface Position {
  x: number;
  y: number;
}

export type NodeType = 
  | "trigger" 
  | "email" 
  | "delay" 
  | "condition" 
  | "action";

export interface AutomationNode {
  id: string;
  type: NodeType;
  title: string;
  subtitle: string;
  hasInput: boolean;
  hasOutput: boolean;
  position: Position;
}

export interface NodeConnection {
  id: string;
  fromNodeId: string;
  toNodeId: string;
}

export interface AutomationFlow {
  id: string;
  name: string;
  description?: string;
  nodes: AutomationNode[];
  connections: NodeConnection[];
  isActive: boolean;
}

