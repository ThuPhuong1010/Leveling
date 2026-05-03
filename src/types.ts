export type QuestType = 'Daily' | 'One-time' | 'Project';
export type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Boss';
export type QuestStatus = 'active' | 'completed' | 'min_completed' | 'skipped';

export interface Quest {
  id: string;
  title: string;
  category: string;
  type: QuestType;
  difficulty: Difficulty;
  minAction: string;
  xpReward: number;
  goldReward: number;
  sxpReward?: { skillId: string; amount: number };
  hpCost: number;
  dueDate?: string;
  status: QuestStatus;
  linkedProjectId?: string;
  streakImpact: boolean;
}

export interface UserStats {
  level: number;
  title: string;
  class: string;
  hp: number;
  maxHp: number;
  xp: number;
  maxXp: number;
  mp: number;
  maxMp: number;
  gold: number;
  streak: number;
  focus: number;
  grit: number;
  sense: number;
  evasion: number;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  progress: number; // 0 to 100
  totalQuests: number;
  completedQuests: number;
  nextQuestTitle?: string;
  deadline?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  sxp: number;
  maxSxp: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  type: 'HP_Potion' | 'XP_Potion' | 'Skip_Ticket' | 'Streak_Shield';
}

export interface LogEntry {
  id: string;
  timestamp: string;
  title: string;
  type: 'quest' | 'level' | 'loot';
  result?: string;
}
