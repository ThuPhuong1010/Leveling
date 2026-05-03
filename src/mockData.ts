import { Quest, Skill, UserStats, Project, InventoryItem, LogEntry } from './types';

export const INITIAL_STATS: UserStats = {
  level: 12,
  title: 'Persistent Soul',
  class: 'Shadow Monarch (Novice)',
  hp: 85,
  maxHp: 100,
  xp: 450,
  maxXp: 1000,
  mp: 20,
  maxMp: 50,
  gold: 1240,
  streak: 12,
  focus: 14,
  grit: 18,
  sense: 10,
  evasion: 12,
};

export const INITIAL_QUESTS: Quest[] = [
  {
    id: '1',
    title: 'Morning Workout',
    category: 'Health',
    type: 'Daily',
    difficulty: 'Easy',
    minAction: '10 push-ups',
    xpReward: 50,
    goldReward: 10,
    sxpReward: { skillId: 's1', amount: 5 },
    hpCost: 10,
    status: 'active',
    streakImpact: true,
  },
  {
    id: '2',
    title: 'Read Technical Docs',
    category: 'Skill',
    type: 'Project',
    difficulty: 'Medium',
    minAction: 'Read 2 pages',
    xpReward: 120,
    goldReward: 30,
    sxpReward: { skillId: 's2', amount: 15 },
    hpCost: 15,
    dueDate: 'Today',
    status: 'active',
    streakImpact: false,
  },
  {
    id: '3',
    title: 'Clean Desktop',
    category: 'Life',
    type: 'One-time',
    difficulty: 'Easy',
    minAction: 'Throw 5 items',
    xpReward: 30,
    goldReward: 5,
    hpCost: 5,
    status: 'active',
    streakImpact: false,
  },
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Master Shadcn/UI',
    category: 'Coding',
    progress: 65,
    totalQuests: 10,
    completedQuests: 6,
    nextQuestTitle: 'Build custom Theme Switcher',
    deadline: '2026-05-15',
  },
  {
    id: 'p2',
    title: 'B2 English Level',
    category: 'Learning',
    progress: 30,
    totalQuests: 20,
    completedQuests: 6,
    nextQuestTitle: 'Write 300 words essay',
  }
];

export const INITIAL_SKILLS: Skill[] = [
  { id: 's1', name: 'Fitness', level: 4, sxp: 45, maxSxp: 100 },
  { id: 's2', name: 'Frontend Dev', level: 8, sxp: 720, maxSxp: 1000 },
  { id: 's3', name: 'Focus', level: 3, sxp: 10, maxSxp: 50 },
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  { id: 'i1', name: 'HP Potion', description: 'Restores 20 HP', quantity: 3, type: 'HP_Potion' },
  { id: 'i2', name: 'Skip Ticket', description: 'Skip a quest without HP penalty', quantity: 1, type: 'Skip_Ticket' },
];

export const REWARDS = [
  { id: 'r1', title: 'Iced Americano', description: 'Real-world reward: Go get a coffee', cost: 200, category: 'Real Life' },
  { id: 'r2', title: '15min Gaming', description: 'Controlled relaxation time', cost: 100, category: 'Digital' },
  { id: 'r3', title: 'Buy a Skin', description: 'In-game reward for another game', cost: 1500, category: 'Loot' },
];

export const INITIAL_LOGS: LogEntry[] = [
  { id: 'l1', timestamp: '2026-05-03T08:00:00Z', title: 'Morning Workout', type: 'quest', result: '+50 XP · +10 G' },
  { id: 'l2', timestamp: '2026-05-02T21:00:00Z', title: 'Level Up!', type: 'level', result: 'Level 12 reached' },
  { id: 'l3', timestamp: '2026-05-02T18:30:00Z', title: 'Deep Work Session', type: 'quest', result: '+120 XP' },
  { id: 'l4', timestamp: '2026-05-02T12:00:00Z', title: 'Loot Found!', type: 'loot', result: 'Found 1x Skip Ticket' },
];
