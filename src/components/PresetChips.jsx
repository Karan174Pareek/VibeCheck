import React from 'react';
import { Flame, Heart, Cpu, TrendingUp, Gamepad2, HelpCircle } from 'lucide-react';

const PRESETS = [
  { name: 'reactjs', label: 'r/reactjs', category: 'Dev', icon: Cpu, color: 'hover:border-cyan-500/50 hover:text-cyan-400' },
  { name: 'aww', label: 'r/aww', category: 'Wholesome', icon: Heart, color: 'hover:border-pink-500/50 hover:text-pink-400' },
  { name: 'technology', label: 'r/technology', category: 'News', icon: Flame, color: 'hover:border-indigo-500/50 hover:text-indigo-400' },
  { name: 'wallstreetbets', label: 'r/wallstreetbets', category: 'Finance', icon: TrendingUp, color: 'hover:border-amber-500/50 hover:text-amber-400' },
  { name: 'gaming', label: 'r/gaming', category: 'Gaming', icon: Gamepad2, color: 'hover:border-purple-500/50 hover:text-purple-400' },
  { name: 'askreddit', label: 'r/askreddit', category: 'Community', icon: HelpCircle, color: 'hover:border-emerald-500/50 hover:text-emerald-400' },
];

export function PresetChips({ onSelectPreset, activeSubreddit, disabled }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
      <span className="text-xs font-medium text-slate-400 mr-1 flex items-center gap-1">
        Try popular:
      </span>
      {PRESETS.map((preset) => {
        const Icon = preset.icon;
        const isActive = activeSubreddit && activeSubreddit.toLowerCase() === preset.name;

        return (
          <button
            key={preset.name}
            type="button"
            disabled={disabled}
            onClick={() => onSelectPreset(preset.name)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              isActive
                ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 shadow-sm shadow-indigo-500/20'
                : `bg-slate-900/90 border-slate-800 text-slate-300 ${preset.color} hover:bg-slate-800/80`
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <Icon className="w-3.5 h-3.5 opacity-80" />
            <span>{preset.label}</span>
          </button>
        );
      })}
    </div>
  );
}
