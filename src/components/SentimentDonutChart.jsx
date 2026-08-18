import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export function SentimentDonutChart({ counts }) {
  if (!counts) return null;

  const total = (counts.positive || 0) + (counts.neutral || 0) + (counts.negative || 0);

  const data = [
    { name: 'Positive', value: counts.positive || 0, color: '#10b981' },
    { name: 'Neutral', value: counts.neutral || 0, color: '#64748b' },
    { name: 'Negative', value: counts.negative || 0, color: '#f43f5e' }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      const percent = total ? Math.round((item.value / total) * 100) : 0;
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-xl shadow-xl text-xs">
          <p className="font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.payload.color }} />
            {item.name} Posts
          </p>
          <p className="text-slate-300 mt-1 font-mono">
            {item.value} posts ({percent}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-panel rounded-3xl p-6 border shadow-xl flex flex-col justify-between space-y-4">
      <div>
        <h3 className="text-base font-bold text-white font-display">
          Sentiment Breakdown
        </h3>
        <p className="text-xs text-slate-400">Post distribution by sentiment label</p>
      </div>

      {/* Donut Chart Container */}
      <div className="h-56 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={88}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="#0f172a" strokeWidth={3} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center overlay label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-extrabold text-white font-mono">{total}</span>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Total Posts</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 text-xs pt-2 border-t border-slate-800/80">
        <div className="flex items-center gap-1.5 text-slate-300">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span>Pos ({counts.positive})</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-300">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-500" />
          <span>Neu ({counts.neutral})</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-300">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
          <span>Neg ({counts.negative})</span>
        </div>
      </div>
    </div>
  );
}
