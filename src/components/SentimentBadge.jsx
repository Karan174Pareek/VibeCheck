import React from 'react';
import { ThumbsUp, ThumbsDown, Minus } from 'lucide-react';

/**
 * Small reusable colored pill component for displaying sentiment labels
 */
export function SentimentBadge({ label, size = 'md' }) {
  const isPositive = label === 'Positive';
  const isNegative = label === 'Negative';

  const styles = isPositive
    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
    : isNegative
    ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
    : 'bg-slate-800 border-slate-700 text-slate-300';

  const iconSize = size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5';
  const padding = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-bold border shadow-sm ${padding} ${styles}`}>
      {isPositive && <ThumbsUp className={iconSize} />}
      {isNegative && <ThumbsDown className={iconSize} />}
      {!isPositive && !isNegative && <Minus className={iconSize} />}
      <span>{label}</span>
    </span>
  );
}
