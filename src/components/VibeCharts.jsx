import React, { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from 'recharts';
import { PieChart as PieIcon, BarChart3 } from 'lucide-react';

export function VibeCharts({ vibeData }) {
  const [activeTab, setActiveTab] = useState('pie'); // 'pie' | 'bar'

  if (!vibeData) return null;

  const { positiveCount, neutralCount, negativeCount, totalPosts, analyzedPosts } = vibeData;

  // Donut Chart Data
  const pieData = [
    { name: 'Positive', value: positiveCount, color: '#10b981' },
    { name: 'Neutral', value: neutralCount, color: '#64748b' },
    { name: 'Negative', value: negativeCount, color: '#f43f5e' }
  ];

  // Distribution Buckets for Bar Chart
  const scoreBuckets = {
    'Strong Negative (-5+)': 0,
    'Negative (-1 to -4)': 0,
    'Neutral (0)': 0,
    'Positive (+1 to +4)': 0,
    'Strong Positive (+5+)': 0
  };

  analyzedPosts.forEach((post) => {
    const s = post.sentiment.score;
    if (s <= -5) scoreBuckets['Strong Negative (-5+)']++;
    else if (s < 0) scoreBuckets['Negative (-1 to -4)']++;
    else if (s === 0) scoreBuckets['Neutral (0)']++;
    else if (s < 5) scoreBuckets['Positive (+1 to +4)']++;
    else scoreBuckets['Strong Positive (+5+)']++;
  });

  const barData = [
    { range: 'Strong Neg', count: scoreBuckets['Strong Negative (-5+)'], fill: '#e11d48' },
    { range: 'Neg', count: scoreBuckets['Negative (-1 to -4)'], fill: '#fb7185' },
    { range: 'Neutral', count: scoreBuckets['Neutral (0)'], fill: '#64748b' },
    { range: 'Pos', count: scoreBuckets['Positive (+1 to +4)'], fill: '#34d399' },
    { range: 'Strong Pos', count: scoreBuckets['Strong Positive (+5+)'], fill: '#059669' }
  ];

  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const percent = Math.round((data.value / totalPosts) * 100);
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-xl shadow-xl text-xs">
          <p className="font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: data.payload.color }}></span>
            {data.name} Posts
          </p>
          <p className="text-slate-300 mt-1 font-mono">
            {data.value} posts ({percent}%)
          </p>
        </div>
      );
    };
    return null;
  };

  const CustomBarTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-xl shadow-xl text-xs">
          <p className="font-bold text-white">{data.range} Range</p>
          <p className="text-slate-300 mt-1 font-mono">{data.count} posts</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-panel rounded-3xl p-6 border shadow-xl space-y-6">
      {/* Header with View Toggle */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white font-display">
            Sentiment Breakdown & Distribution
          </h3>
          <p className="text-xs text-slate-400">Visualizing post sentiment spread across the sample</p>
        </div>

        <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('pie')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'pie'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <PieIcon className="w-3.5 h-3.5" />
            <span>Donut</span>
          </button>
          <button
            onClick={() => setActiveTab('bar')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'bar'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Distribution</span>
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-64 sm:h-72 w-full relative">
        {activeTab === 'pie' ? (
          <div className="w-full h-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#0f172a" strokeWidth={3} />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            {/* Donut Center Overlay Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-extrabold text-white font-mono">{totalPosts}</span>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Total Posts</span>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="range" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} allowDecimals={false} />
              <Tooltip content={<CustomBarTooltip />} />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {barData.map((entry, index) => (
                  <Cell key={`bar-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Legend Footer */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs pt-2 border-t border-slate-800/80">
        <div className="flex items-center gap-2 text-slate-300">
          <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
          <span>Positive ({positiveCount})</span>
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <span className="w-3 h-3 rounded-full bg-slate-500"></span>
          <span>Neutral ({neutralCount})</span>
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <span className="w-3 h-3 rounded-full bg-rose-500"></span>
          <span>Negative ({negativeCount})</span>
        </div>
      </div>
    </div>
  );
}
