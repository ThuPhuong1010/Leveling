import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  Home as HomeIcon, 
  LayoutDashboard, 
  Sword, 
  Target, 
  Sparkles, 
  Settings, 
  LogOut, 
  Moon, 
  Sun,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Clock,
  ChevronRight,
  Plus,
  MoreVertical,
  FlaskConical,
  Award,
  ZapOff
} from 'lucide-react';
import { 
  Quest, 
  UserStats, 
  Project, 
  Skill, 
  InventoryItem, 
  LogEntry, 
  QuestStatus 
} from './types';
import { 
  INITIAL_STATS, 
  INITIAL_QUESTS, 
  INITIAL_PROJECTS, 
  INITIAL_SKILLS, 
  INITIAL_INVENTORY, 
  INITIAL_LOGS,
  REWARDS
} from './mockData';

// --- Shared Components ---

const ProgressBar = ({ value, max, color, label }: { value: number, max: number, color: string, label?: string }) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  return (
    <div className="w-full space-y-1">
      {(label || true) && (
        <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider text-white/50">
          <span>{label}</span>
          <span>{value}/{max}</span>
        </div>
      )}
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div 
          className={`h-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

// --- Home Components ---

const FeaturedQuestCard = ({ quest, onCheckIn }: { quest: Quest, onCheckIn: (q: Quest) => void }) => {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="featured-quest-border p-6 rounded-2xl quest-card-glow bg-surface-dark group"
    >
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-blue">
            Quest of the Day
          </span>
          <div className="flex gap-2">
            <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-bold uppercase">
              {quest.difficulty}
            </span>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-1">{quest.title}</h2>
          <div className="flex gap-2 text-xs text-white/50">
            <span>{quest.category}</span>
            <span>•</span>
            <span>{quest.type}</span>
          </div>
        </div>

        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
          <p className="text-[10px] font-bold uppercase tracking-wider text-amber-500 mb-1">Min Action</p>
          <p className="text-sm font-medium text-amber-200">{quest.minAction}</p>
        </div>

        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-white/30">Rewards</p>
          <div className="flex flex-wrap gap-3 text-xs">
            <span className="flex items-center gap-1 text-xp-blue font-bold">
              <Zap size={14} /> +{quest.xpReward} XP
            </span>
            <span className="flex items-center gap-1 text-gold font-bold">
              <Sparkles size={14} /> +{quest.goldReward} Gold
            </span>
            {quest.sxpReward && (
              <span className="flex items-center gap-1 text-mp-purple font-bold">
                <Target size={14} /> +{quest.sxpReward.amount} SXP
              </span>
            )}
          </div>
        </div>

        <button 
          onClick={() => onCheckIn(quest)}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple font-bold text-sm tracking-widest uppercase hover:brightness-110 active:scale-[0.98] transition-all"
        >
          Check-in Quest
        </button>
      </div>
    </motion.div>
  );
};

// --- Main Views ---

const HomeView = ({ 
  quests, 
  stats, 
  onCheckIn 
}: { 
  quests: Quest[], 
  stats: UserStats, 
  onCheckIn: (q: Quest) => void 
}) => {
  const featuredQuest = quests[0];
  const otherQuests = quests.slice(1, 3);
  const completedCount = quests.filter(q => q.status === 'completed').length;

  return (
    <div className="max-w-md mx-auto py-8 px-4 space-y-8 pb-24">
      {/* Header / Urgent Banner (Mocked) */}
      {stats.hp <= 30 && (
        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center gap-3">
          <ShieldCheck className="text-blue-400" size={24} />
          <div className="text-xs">
            <p className="font-bold text-blue-200">Tourist Mode Active</p>
            <p className="text-blue-400/80">Your progress is protected. Focus on min actions.</p>
          </div>
        </div>
      )}

      {/* Hero: Quest of the Day */}
      <section className="space-y-4">
        {featuredQuest ? (
          <FeaturedQuestCard quest={featuredQuest} onCheckIn={onCheckIn} />
        ) : (
          <div className="p-12 rounded-2xl border-2 border-dashed border-white/10 text-center space-y-4">
            <p className="text-white/50">All core quests done today!</p>
            <button className="text-sm font-bold text-accent-blue">View Bonus Quests</button>
          </div>
        )}
      </section>

      {/* Today Progress */}
      <section className="space-y-4 p-5 rounded-2xl bg-white/5 rpg-border">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white/50">Today Progress</h3>
          <span className="text-xs font-bold">{completedCount}/{quests.length} Done</span>
        </div>
        <div className="h-3 bg-white/5 rounded-full overflow-hidden p-0.5">
          <motion.div 
            className="h-full bg-gradient-to-r from-success to-emerald-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(completedCount / quests.length) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] font-bold text-white/40">
          <span className="flex items-center gap-1"><Zap size={10} /> +150 XP Today</span>
          <span className="flex items-center gap-1"><CheckCircle2 size={10} /> {stats.streak} Day Streak</span>
        </div>
      </section>

      {/* Also Today */}
      <section className="space-y-4">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 px-1">Also Today</h3>
        <div className="space-y-3">
          {otherQuests.map(q => (
            <div 
              key={q.id}
              onClick={() => onCheckIn(q)}
              className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg bg-white/5 text-white/30 group-hover:text-white transition-colors`}>
                  <Sword size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white/80">{q.title}</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider">{q.category} • {q.difficulty}</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-white/20" />
            </div>
          ))}
        </div>
      </section>

      {/* Compact HUD */}
      <section className="p-4 rounded-2xl bg-white/5 border border-white/10 flex gap-4">
        <div className="flex-1 space-y-3">
          <ProgressBar value={stats.hp} max={stats.maxHp} color="bg-hp-red" label="HP" />
          <ProgressBar value={stats.xp} max={stats.maxXp} color="bg-xp-blue" label="XP" />
        </div>
        <div className="w-px bg-white/10 h-10 self-center" />
        <div className="text-center justify-center flex flex-col min-w-[60px]">
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider">Level</p>
          <p className="text-xl font-bold">{stats.level}</p>
        </div>
      </section>
    </div>
  );
};

const DashboardView = ({ 
  stats, 
  projects, 
  skills, 
  inventory 
}: { 
  stats: UserStats, 
  projects: Project[], 
  skills: Skill[],
  inventory: InventoryItem[]
}) => {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-8 pb-24">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-xs text-white/50">System Overview</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-gold uppercase tracking-widest">{stats.title}</p>
          <p className="text-sm font-bold text-white/80">{stats.class}</p>
        </div>
      </header>

      {/* Quick Access Widget */}
      <section className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 no-scrollbar">
        <button className="flex-shrink-0 flex items-center gap-2 p-3 rounded-xl bg-white/5 rpg-border hover:bg-white/10 transition-all group">
          <div className="p-2 rounded-lg bg-accent-blue/10 text-accent-blue group-hover:scale-110 transition-transform">
            <Plus size={18} />
          </div>
          <span className="text-xs font-bold whitespace-nowrap">New Quest</span>
        </button>
        <button className="flex-shrink-0 flex items-center gap-2 p-3 rounded-xl bg-white/5 rpg-border hover:bg-white/10 transition-all group">
          <div className="p-2 rounded-lg bg-gold/10 text-gold group-hover:scale-110 transition-transform">
            <Award size={18} />
          </div>
          <span className="text-xs font-bold whitespace-nowrap">Claim Loot</span>
        </button>
        <button className="flex-shrink-0 flex items-center gap-2 p-3 rounded-xl bg-white/5 rpg-border hover:bg-white/10 transition-all group">
          <div className="p-2 rounded-lg bg-hp-red/10 text-hp-red group-hover:scale-110 transition-transform">
            <FlaskConical size={18} />
          </div>
          <span className="text-xs font-bold whitespace-nowrap">Use Potion</span>
        </button>
      </section>

      {/* Avatar Stats Card */}
      <section className="p-6 rounded-2xl bg-surface-dark rpg-border grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="space-y-4 col-span-2">
          <ProgressBar value={stats.hp} max={stats.maxHp} color="bg-hp-red" label="Health Points" />
          <ProgressBar value={stats.xp} max={stats.maxXp} color="bg-xp-blue" label="Experience" />
          <ProgressBar value={stats.mp} max={stats.maxMp} color="bg-mp-purple" label="Mana Points" />
        </div>
        <div className="col-span-2 grid grid-cols-2 gap-4">
          <div className="p-3 bg-white/5 rounded-xl border border-white/5">
            <p className="text-[10px] font-bold text-white/30 uppercase">Focus</p>
            <p className="text-lg font-bold">{stats.focus}</p>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/5">
            <p className="text-[10px] font-bold text-white/30 uppercase">Grit</p>
            <p className="text-lg font-bold">{stats.grit}</p>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/5">
            <p className="text-[10px] font-bold text-white/30 uppercase">Sense</p>
            <p className="text-lg font-bold">{stats.sense}</p>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/5">
            <p className="text-[10px] font-bold text-white/30 uppercase">Evasion</p>
            <p className="text-lg font-bold">{stats.evasion}</p>
          </div>
        </div>
      </section>

      {/* Active Projects */}
      <section className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/30">Active Projects</h3>
          <span className="text-[10px] font-bold text-accent-blue cursor-pointer">View All</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map(p => (
            <div key={p.id} className="p-5 rounded-2xl bg-white/5 rpg-border hover:bg-white/10 transition-colors cursor-pointer group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-white/90 group-hover:text-white">{p.title}</h4>
                  <p className="text-xs text-white/40">{p.category}</p>
                </div>
                <span className="text-xs font-bold text-accent-blue">{p.progress}%</span>
              </div>
              <ProgressBar value={p.progress} max={100} color="bg-accent-blue" />
              <div className="mt-4 flex items-center gap-2 text-[10px] text-white/40">
                <Clock size={12} />
                <span>Next: {p.nextQuestTitle}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills & Inventory */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 px-1">Top Skills</h3>
          <div className="space-y-4 p-5 rounded-2xl bg-white/5 rpg-border">
            {skills.map(s => (
              <div key={s.id} className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>{s.name}</span>
                  <span className="text-white/40">Lv. {s.level}</span>
                </div>
                <ProgressBar value={s.sxp} max={s.maxSxp} color="bg-white/20" />
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 px-1">Inventory</h3>
          <div className="grid grid-cols-2 gap-3">
            {inventory.map(i => (
              <div key={i.id} className="p-4 rounded-xl bg-white/5 rpg-border flex flex-col justify-between hover:bg-white/10 transition-all cursor-pointer">
                <div>
                   <p className="text-xs font-bold text-white/80">{i.name}</p>
                   <p className="text-[9px] text-white/40 leading-tight mt-1">{i.description}</p>
                </div>
                <div className="mt-3 flex justify-between items-end">
                  <span className="text-xs font-bold text-gold">x{i.quantity}</span>
                  <button className="px-2 py-1 rounded bg-white/5 text-[9px] font-bold uppercase text-white/60 hover:text-white">Use</button>
                </div>
              </div>
            ))}
            <div className="p-4 rounded-xl bg-white/5 border border-dashed border-white/10 flex items-center justify-center text-white/20">
              <Plus size={20} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

// --- Modals ---

const CheckInModal = ({ quest, onClose, onAction }: { quest: Quest, onClose: () => void, onAction: (status: QuestStatus) => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        className="w-full max-w-sm bg-surface-dark border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 space-y-1 border-b border-white/5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Check-in</p>
          <h3 className="text-lg font-bold">{quest.title}</h3>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-sm text-white/60">How did it go?</p>
          
          <button 
            onClick={() => onAction('completed')}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 group transition-all"
          >
            <div className="text-left">
              <p className="font-bold text-white/90">Completed</p>
              <p className="text-xs text-white/40">Full quest done</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-xp-blue">+{quest.xpReward} XP</p>
              <p className="text-[10px] font-bold text-gold">+{quest.goldReward} Gold</p>
            </div>
          </button>

          <button 
            onClick={() => onAction('min_completed')}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 group transition-all"
          >
            <div className="text-left">
              <p className="font-bold text-white/90">Min Action</p>
              <p className="text-xs text-white/40">Smallest version done</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-xp-blue">+{Math.floor(quest.xpReward * 0.4)} XP</p>
              <p className="text-[10px] font-bold text-success uppercase">Protected</p>
            </div>
          </button>

          <button 
            onClick={() => onAction('skipped')}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 group transition-all"
          >
            <div className="text-left">
              <p className="font-bold text-white/90">Skip / Reschedule</p>
              <p className="text-xs text-white/40">Use ticket or lose HP</p>
            </div>
            <div className="text-right text-[10px] font-bold text-hp-red">
              -{quest.hpCost} HP
            </div>
          </button>
        </div>

        <button 
          onClick={onClose}
          className="w-full py-4 text-xs font-bold uppercase tracking-widest text-white/30 hover:text-white transition-colors"
        >
          Cancel
        </button>
      </motion.div>
    </motion.div>
  );
};

const QuestsView = ({ quests, onCheckIn }: { quests: Quest[], onCheckIn: (q: Quest) => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto py-8 px-4 space-y-8 pb-24"
    >
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Active Quests</h1>
          <p className="text-xs text-white/50">{quests.length} objectives identified</p>
        </div>
        <button className="p-3 rounded-xl bg-accent-blue/10 text-accent-blue flex items-center gap-2 hover:bg-accent-blue/20 transition-all">
          <Plus size={20} />
          <span className="text-xs font-bold uppercase tracking-wider">New Quest</span>
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quests.map(q => (
          <div 
            key={q.id}
            onClick={() => onCheckIn(q)}
            className="p-5 rounded-2xl bg-surface-dark rpg-border hover:bg-white/5 transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-accent-blue/60">{q.category}</span>
              <span className="px-2 py-0.5 rounded bg-white/5 text-[9px] font-bold uppercase text-white/40 group-hover:text-white transition-colors">{q.difficulty}</span>
            </div>
            <h4 className="font-bold text-white mb-1 group-hover:text-accent-blue transition-colors">{q.title}</h4>
            <p className="text-xs text-white/40 mb-4 line-clamp-1 italic">{q.minAction}</p>
            <div className="flex justify-between items-center pt-4 border-t border-white/5">
              <div className="flex gap-3">
                <span className="text-[10px] font-bold text-xp-blue">+{q.xpReward} XP</span>
                <span className="text-[10px] font-bold text-gold">+{q.goldReward} G</span>
              </div>
              <ChevronRight size={14} className="text-white/20 group-hover:text-white transition-colors" />
            </div>
          </div>
        ))}
        {quests.length === 0 && (
          <div className="col-span-full py-20 text-center space-y-4">
            <Sword size={40} className="mx-auto text-white/10" />
            <p className="text-white/30 italic">No quests active. Time to scout for new objectives.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const SkillsView = ({ skills }: { skills: Skill[] }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto py-8 px-4 space-y-8 pb-24"
    >
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Growth & Skills</h1>
        <p className="text-xs text-white/50">Tracking your evolution across domains</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map(s => (
          <div key={s.id} className="p-6 rounded-2xl bg-surface-dark rpg-border space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-accent-blue shadow-inner">
                  <Target size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white tracking-wide">{s.name}</h4>
                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Efficiency: 84%</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold italic">Lv. {s.level}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-white/30">
                <span>Experience Points</span>
                <span>{s.sxp}/{s.maxSxp} SXP</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-accent-blue"
                  initial={{ width: 0 }}
                  animate={{ width: `${(s.sxp / s.maxSxp) * 100}%` }}
                />
              </div>
            </div>

            <button className="w-full py-2 rounded-lg bg-white/5 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:bg-white/10 hover:text-white transition-all">
              View Linked Quests
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const ProjectsView = ({ projects }: { projects: Project[] }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto py-8 px-4 space-y-8 pb-24"
    >
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Active Projects</h1>
          <p className="text-xs text-white/50">Large scale operations in progress</p>
        </div>
        <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all rpg-border">
          <Plus size={20} />
        </button>
      </header>

      <div className="space-y-6">
        {projects.map(p => (
          <div key={p.id} className="p-8 rounded-3xl bg-surface-dark rpg-border relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-blue/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-accent-blue/10 transition-all" />
            
            <div className="relative space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent-blue mb-2 block">{p.category}</span>
                  <h3 className="text-xl font-bold tracking-tighter">{p.title}</h3>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold tracking-tighter">{p.progress}%</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">Completion</p>
                </div>
              </div>

              <div className="space-y-3">
                <ProgressBar value={p.progress} max={100} color="bg-gradient-to-r from-accent-blue to-accent-purple" />
                <div className="flex justify-between text-[11px] text-white/50">
                  <span>{p.completedQuests} of {p.totalQuests} Quests Clear</span>
                  {p.deadline && (
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> Ends: {p.deadline}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between group-hover:bg-white/10 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent-blue/10 flex items-center justify-center text-accent-blue">
                    <Sword size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">Next Mission</p>
                    <p className="text-xs font-bold text-white/80">{p.nextQuestTitle}</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-white/20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const AvatarView = ({ stats }: { stats: UserStats }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto py-8 px-4 space-y-8 pb-24"
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="relative">
          <div className="w-40 h-40 rounded-full bg-gradient-to-b from-accent-blue to-accent-purple p-1 shadow-[0_0_40px_rgba(102,126,234,0.3)]">
            <div className="w-full h-full rounded-full bg-bg-dark overflow-hidden rpg-border">
              <img 
                src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${stats.title}&backgroundColor=0a0a0f`} 
                alt="character" 
                className="w-full h-full object-cover scale-110"
              />
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-2xl bg-gold flex flex-col items-center justify-center shadow-lg transform rotate-12">
            <span className="text-[10px] font-bold text-black uppercase leading-none">Lv.</span>
            <span className="text-xl font-bold text-black leading-none">{stats.level}</span>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold tracking-tighter uppercase italic">{stats.title}</h2>
          <p className="text-accent-blue font-bold tracking-[0.2em] uppercase text-xs mt-1">{stats.class}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10">
        <section className="p-8 rounded-3xl bg-surface-dark rpg-border space-y-8">
          <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-white/30">Status Window</h3>
          <div className="space-y-6">
            <ProgressBar value={stats.hp} max={stats.maxHp} color="bg-hp-red" label="Health Points" />
            <ProgressBar value={stats.xp} max={stats.maxXp} color="bg-xp-blue" label="Experience" />
            <ProgressBar value={stats.mp} max={stats.maxMp} color="bg-mp-purple" label="Internal Mana" />
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <StatBox label="Gold" value={stats.gold} icon={<Sparkles size={16} className="text-gold" />} />
            <StatBox label="Streak" value={`${stats.streak}d`} icon={<CheckCircle2 size={16} className="text-success" />} />
          </div>
        </section>

        <section className="p-8 rounded-3xl bg-surface-dark rpg-border">
          <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-white/30 mb-8">Attributes</h3>
          <div className="space-y-4">
            <AttributeRow label="Focus" value={stats.focus} />
            <AttributeRow label="Grit" value={stats.grit} />
            <AttributeRow label="Sense" value={stats.sense} />
            <AttributeRow label="Evasion" value={stats.evasion} />
          </div>
          <p className="mt-8 text-center text-[10px] font-bold text-white/20 uppercase tracking-widest leading-relaxed">
            * Complete quests to earn <br/> attribute points via level up
          </p>
        </section>
      </div>
    </motion.div>
  );
};

const StatBox = ({ label, value, icon }: { label: string, value: string | number, icon: React.ReactNode }) => (
  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
    <div className="flex items-center gap-2 mb-1">
      {icon}
      <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider">{label}</span>
    </div>
    <p className="text-lg font-bold">{value}</p>
  </div>
);

const AttributeRow = ({ label, value }: { label: string, value: number }) => (
  <div className="flex items-center justify-between group">
    <span className="text-sm font-bold text-white/60 group-hover:text-white transition-colors uppercase tracking-widest">{label}</span>
    <div className="flex items-center gap-4">
      <div className="h-1 w-24 bg-white/5 rounded-full overflow-hidden">
        <div className="h-full bg-accent-blue" style={{ width: `${(value / 30) * 100}%` }} />
      </div>
      <span className="text-lg font-bold min-w-[2ch]">{value}</span>
    </div>
  </div>
);

const TutorialOverlay = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState(0);
  const steps = [
    {
      title: "Welcome, Monarch",
      desc: "Solo Leveling helps you evolve by turning real life into a strategic RPG game.",
      icon: <Sword size={32} />
    },
    {
      title: "The Core Principle",
      desc: "Every day, focus on your Quest of the Day. It's the single most important action for your growth.",
      icon: <Zap size={32} />
    },
    {
      title: "Safe to Fail",
      desc: "Energy low? Use 'Min Action' to protect your streak with minimal effort. No shame in recovery.",
      icon: <ShieldCheck size={32} />
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
    >
      <div className="max-w-sm w-full space-y-8 text-center">
        <motion.div 
          key={step}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="space-y-6"
        >
          <div className="w-20 h-20 rounded-3xl bg-accent-blue/20 border border-accent-blue/30 mx-auto flex items-center justify-center text-accent-blue shadow-[0_0_30px_rgba(102,126,234,0.2)]">
            {steps[step].icon}
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight italic uppercase">{steps[step].title}</h2>
            <p className="text-sm text-white/50 leading-relaxed">{steps[step].desc}</p>
          </div>
        </motion.div>

        <div className="flex gap-2 justify-center">
          {steps.map((_, i) => (
            <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-accent-blue' : 'w-2 bg-white/10'}`} />
          ))}
        </div>

        <button 
          onClick={() => step < steps.length - 1 ? setStep(step + 1) : onClose()}
          className="w-full py-4 rounded-2xl bg-white text-black font-bold uppercase tracking-widest transition-all hover:bg-accent-blue hover:text-white"
        >
          {step < steps.length - 1 ? "Next Step" : "Enter System"}
        </button>
      </div>
    </motion.div>
  );
};

const ProgressView = ({ logs }: { logs: LogEntry[] }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto py-8 px-4 space-y-8 pb-24"
    >
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Timeline</h1>
        <p className="text-xs text-white/50">Historical record of your evolution</p>
      </header>

      <div className="space-y-4">
        {logs.map((log, idx) => (
          <div key={log.id} className="relative pl-8 group">
            {idx !== logs.length - 1 && (
              <div className="absolute left-[11px] top-8 bottom-0 w-px bg-white/5" />
            )}
            
            <div className={`absolute left-0 top-2 w-6 h-6 rounded-lg flex items-center justify-center border rpg-border ${
              log.type === 'level' ? 'bg-gold/10 border-gold/30 text-gold shadow-[0_0_10px_rgba(255,214,10,0.2)]' : 
              log.type === 'loot' ? 'bg-mp-purple/10 border-mp-purple/30 text-mp-purple' : 'bg-white/5 border-white/10 text-white/40'
            }`}>
              {log.type === 'level' ? <Award size={14} /> : log.type === 'loot' ? <FlaskConical size={14} /> : <CheckCircle2 size={14} />}
            </div>

            <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-sm font-bold">{log.title}</h4>
                <p className="text-[10px] text-white/20">{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
              <p className="text-xs font-bold text-accent-blue tracking-wider">{log.result}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const RewardsView = ({ stats, setStats }: { stats: UserStats, setStats: any }) => {
  const handleRedeem = (cost: number) => {
    if (stats.gold >= cost) {
      setStats((prev: any) => ({ ...prev, gold: prev.gold - cost }));
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto py-8 px-4 space-y-8 pb-24"
    >
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reward Shop</h1>
          <p className="text-xs text-white/50">Trade Gold for self-approved leisure</p>
        </div>
        <div className="flex items-center gap-2 text-gold">
          <Sparkles size={20} />
          <span className="text-xl font-bold tracking-tighter">{stats.gold}</span>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {REWARDS.map(r => (
          <div key={r.id} className="p-6 rounded-2xl bg-surface-dark border border-white/5 hover:border-gold/30 transition-all group">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2 block">{r.category}</span>
            <h4 className="text-lg font-bold mb-1">{r.title}</h4>
            <p className="text-xs text-white/50 mb-6 leading-relaxed">{r.description}</p>
            <button 
              disabled={stats.gold < r.cost}
              onClick={() => handleRedeem(r.cost)}
              className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${
                stats.gold >= r.cost 
                  ? 'bg-gold text-black hover:scale-[1.02]' 
                  : 'bg-white/5 text-white/20 cursor-not-allowed'
              }`}
            >
              {stats.gold >= r.cost ? `Redeem for ${r.cost} G` : `Requires ${r.cost - stats.gold} G more`}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const DopamineView = ({ stats }: { stats: UserStats }) => {
  const [active, setActive] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: any;
    if (active) {
      interval = setInterval(() => setTimer(t => t + 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [active]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto py-8 px-4 space-y-8 pb-24 h-full flex flex-col justify-center"
    >
      <div className="text-center space-y-12">
        <div className="space-y-4">
          <div className="w-24 h-24 rounded-full bg-mp-purple/10 border border-mp-purple/30 mx-auto flex items-center justify-center text-mp-purple mb-4">
            <FlaskConical size={40} className={active ? 'animate-pulse' : ''} />
          </div>
          <h1 className="text-3xl font-bold italic tracking-tighter">Dopamine Chamber</h1>
          <p className="text-sm text-white/40 max-w-xs mx-auto">Controlled sessions for high-stimulation activities. Keep track of your time.</p>
        </div>

        <div className="py-10 border-y border-white/5">
          <p className="text-6xl font-bold tracking-tighter tabular-nums mb-2">{formatTime(timer)}</p>
          <p className="text-[10px] font-bold text-white/20 tracking-[0.4em] uppercase">Active Session Time</p>
        </div>

        <div className="space-y-4 max-w-xs mx-auto">
          {!active ? (
            <button 
              onClick={() => setActive(true)}
              className="w-full py-4 rounded-2xl bg-mp-purple text-white font-bold uppercase tracking-widest shadow-[0_0_30px_rgba(191,90,242,0.3)] hover:brightness-110 active:scale-95 transition-all"
            >
              Start Session (10 MP)
            </button>
          ) : (
            <button 
              onClick={() => setActive(false)}
              className="w-full py-4 rounded-2xl border-2 border-mp-purple/50 text-mp-purple font-bold uppercase tracking-widest hover:bg-mp-purple/10 transition-all"
            >
              End Session
            </button>
          )}
          <p className="text-[10px] text-white/30 px-6 leading-relaxed font-bold">
            Warning: Overstaying in the chamber may cause temporary focus debuffs or Mana exhaustion.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const SettingsView = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto py-8 px-4 space-y-8 pb-24"
    >
      <header>
        <h1 className="text-2xl font-bold tracking-tight">System Settings</h1>
      </header>

      <section className="p-8 rounded-3xl bg-surface-dark rpg-border space-y-10">
        <div className="space-y-6">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/30">Display</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold">Dark Mode</p>
              <p className="text-xs text-white/40">RPG immersive experience</p>
            </div>
            <button className="w-12 h-6 rounded-full bg-accent-blue/20 p-1 flex justify-end transition-all">
              <div className="h-full aspect-square rounded-full bg-accent-blue shadow-[0_0_10px_rgba(102,126,234,0.5)]" />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/30">Notifications</h3>
          <div className="space-y-4">
            <ToggleOption label="Quest Reminders" active={true} />
            <ToggleOption label="Dopamine Alerts" active={true} />
            <ToggleOption label="Level Up Celebration" active={true} />
          </div>
        </div>

        <div className="pt-6 border-t border-white/5">
          <button className="w-full py-4 rounded-2xl bg-danger/10 text-danger font-bold text-xs uppercase tracking-widest hover:bg-danger/20 transition-all">
            Wipe System Data (Reset All)
          </button>
        </div>
      </section>
    </motion.div>
  );
};

const ToggleOption = ({ label, active }: { label: string, active: boolean }) => (
  <div className="flex items-center justify-between">
    <span className="text-sm font-bold text-white/70">{label}</span>
    <button className={`w-10 h-5 rounded-full transition-all p-1 flex ${active ? 'bg-accent-blue justify-end' : 'bg-white/10 justify-start'}`}>
      <div className="h-full aspect-square rounded-full bg-white shadow-sm" />
    </button>
  </div>
);

// --- Sidebar & Layout Components ---

const Sidebar = ({ activeView, setActiveView }: { activeView: string, setActiveView: (v: any) => void }) => {
  const menuItems = [
    { id: 'home', icon: <HomeIcon size={20} />, label: 'Home' },
    { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { id: 'quests', icon: <Sword size={20} />, label: 'Quests' },
    { id: 'skills', icon: <Target size={20} />, label: 'Skills' },
    { id: 'projects', icon: <BarChart3 size={20} />, label: 'Projects' },
    { id: 'progress', icon: <BarChart3 size={20} />, label: 'Timeline' },
    { id: 'rewards', icon: <Award size={20} />, label: 'Rewards' },
    { id: 'dopamine', icon: <FlaskConical size={20} />, label: 'Dopamine' },
    { id: 'avatar', icon: <ShieldCheck size={20} />, label: 'Avatar' },
  ];

  return (
    <div className="hidden lg:flex flex-col w-64 h-screen sticky top-0 bg-surface-dark border-r border-white/5 p-6 shrink-0 overflow-y-auto no-scrollbar">
      <div className="mb-10 flex items-center gap-3 px-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center shadow-lg shadow-accent-blue/20">
          <Zap size={18} className="text-white" />
        </div>
        <span className="font-bold tracking-tighter text-lg">SOLO LEVELING</span>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              activeView === item.id 
                ? 'bg-accent-blue/10 text-accent-blue font-bold shadow-sm' 
                : 'text-white/40 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className={activeView === item.id ? 'text-accent-blue' : 'group-hover:text-white transition-colors'}>
              {item.icon}
            </span>
            <span className="text-sm tracking-tight">{item.label}</span>
            {activeView === item.id && (
              <motion.div layoutId="activeInd" className="ml-auto w-1 h-4 bg-accent-blue rounded-full" />
            )}
          </button>
        ))}
      </nav>

      <div className="pt-6 border-t border-white/5 space-y-1">
        <button 
          onClick={() => setActiveView('settings')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
            activeView === 'settings' ? 'bg-accent-blue/10 text-accent-blue font-bold' : 'text-white/40 hover:text-white hover:bg-white/5'
          }`}
        >
          <Settings size={20} />
          <span className="text-sm">Settings</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/40 hover:text-danger hover:bg-danger/5 transition-all">
          <LogOut size={20} />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
};

// --- App Root ---

export default function App() {
  const [activeView, setActiveView] = useState<'home' | 'dashboard' | 'quests' | 'skills' | 'progress' | 'projects' | 'avatar' | 'rewards' | 'dopamine' | 'settings'>('home');
  const [stats, setStats] = useState<UserStats>(INITIAL_STATS);
  const [quests, setQuests] = useState<Quest[]>(INITIAL_QUESTS);
  const [projects] = useState<Project[]>(INITIAL_PROJECTS);
  const [skills] = useState<Skill[]>(INITIAL_SKILLS);
  const [inventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [logs] = useState<LogEntry[]>(INITIAL_LOGS);
  const [checkingQuest, setCheckingQuest] = useState<Quest | null>(null);
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('solo_leveling_visited');
    if (!hasVisited) {
      setShowTutorial(true);
      localStorage.setItem('solo_leveling_visited', 'true');
    }
  }, []);

  const handleCheckIn = (status: QuestStatus) => {
    if (!checkingQuest) return;

    let xpGain = 0;
    let goldGain = 0;
    let hpLoss = 0;

    if (status === 'completed') {
       xpGain = checkingQuest.xpReward;
       goldGain = checkingQuest.goldReward;
    } else if (status === 'min_completed') {
       xpGain = Math.floor(checkingQuest.xpReward * 0.4);
    } else if (status === 'skipped') {
       hpLoss = checkingQuest.hpCost;
    }

    setStats(prev => {
      let newXp = prev.xp + xpGain;
      let newLevel = prev.level;
      let newMaxXp = prev.maxXp;

      if (newXp >= prev.maxXp) {
        newLevel += 1;
        newXp -= prev.maxXp;
        newMaxXp = Math.floor(prev.maxXp * 1.2);
        // Trigger level up effect could be added here
      }

      return {
        ...prev,
        level: newLevel,
        xp: newXp,
        maxXp: newMaxXp,
        gold: prev.gold + goldGain,
        hp: Math.min(prev.maxHp, Math.max(1, prev.hp - hpLoss + (status === 'completed' ? 2 : 0))),
        streak: (status === 'skipped' && checkingQuest.streakImpact) ? 0 : prev.streak + (status === 'completed' ? 1 : 0)
      };
    });

    setQuests(prev => prev.filter(q => q.id !== checkingQuest.id));
    setCheckingQuest(null);
  };

  return (
    <div className="flex bg-bg-dark font-mono text-white min-h-screen">
      {/* Desktop Sidebar */}
      <Sidebar activeView={activeView} setActiveView={setActiveView} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen relative overflow-y-auto">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-5 bg-surface-dark/50 backdrop-blur-md sticky top-0 z-30 border-b border-white/5">
          <div className="flex items-center gap-2">
            <Zap size={20} className="text-accent-blue" />
            <span className="font-extrabold tracking-tighter">SOLO LEVELING</span>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-1 text-gold">
               <Sparkles size={14} />
               <span className="text-sm font-bold">{stats.gold}</span>
             </div>
             <div className="w-8 h-8 rounded-full bg-white/10 overflow-hidden rpg-border">
               <img src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${stats.title}`} alt="avatar" />
             </div>
          </div>
        </header>

        <main className="flex-1 pb-32 lg:pb-10">
          {activeView === 'home' && (
            <HomeView 
              quests={quests} 
              stats={stats} 
              onCheckIn={setCheckingQuest} 
            />
          )}
          {activeView === 'dashboard' && (
            <DashboardView 
              stats={stats} 
              projects={projects} 
              skills={skills} 
              inventory={inventory}
            />
          )}
          {activeView === 'quests' && (
            <QuestsView quests={quests} onCheckIn={setCheckingQuest} />
          )}
          {activeView === 'skills' && (
            <SkillsView skills={skills} />
          )}
          {activeView === 'projects' && (
            <ProjectsView projects={projects} />
          )}
          {activeView === 'avatar' && (
            <AvatarView stats={stats} />
          )}
          {activeView === 'progress' && (
            <ProgressView logs={logs} />
          )}
          {activeView === 'rewards' && (
            <RewardsView stats={stats} setStats={setStats} />
          )}
          {activeView === 'dopamine' && (
            <DopamineView stats={stats} />
          )}
          {activeView === 'settings' && (
            <SettingsView />
          )}
        </main>

        {/* Mobile Nav */}
        <nav className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 lg:hidden pointer-events-none">
          <div className="max-w-md mx-auto h-16 bg-surface-dark/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-between px-2 pointer-events-auto">
            <NavButton 
              active={activeView === 'home'} 
              onClick={() => setActiveView('home')} 
              icon={<HomeIcon size={20} />} 
              label="Home" 
            />
            <NavButton 
              active={activeView === 'dashboard'} 
              onClick={() => setActiveView('dashboard')} 
              icon={<LayoutDashboard size={20} />} 
              label="Dash" 
            />
            <NavButton 
              active={activeView === 'quests'} 
              onClick={() => setActiveView('quests')} 
              icon={<Sword size={20} />} 
              label="Quests" 
            />
            <NavButton 
              active={activeView === 'skills'} 
              onClick={() => setActiveView('skills')} 
              icon={<Target size={20} />} 
              label="Skills" 
            />
            <NavButton 
              active={['progress', 'projects', 'avatar', 'rewards', 'dopamine', 'settings'].includes(activeView)} 
              onClick={() => setActiveView('progress')} 
              icon={<Award size={20} />} 
              label="Growth" 
            />
          </div>
        </nav>
      </div>

      {/* Modal Container */}
      <AnimatePresence>
        {checkingQuest && (
          <CheckInModal 
            quest={checkingQuest} 
            onClose={() => setCheckingQuest(null)} 
            onAction={handleCheckIn} 
          />
        )}
        {showTutorial && (
          <TutorialOverlay onClose={() => setShowTutorial(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

const NavButton = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
  <button 
    onClick={onClick}
    className={`flex-1 h-full flex flex-col items-center justify-center space-y-1 transition-all rounded-xl ${active ? 'text-accent-blue bg-white/5' : 'text-white/40 hover:text-white/60'}`}
  >
    {icon}
    <span className="text-[9px] font-bold uppercase tracking-wider">{label}</span>
  </button>
);
