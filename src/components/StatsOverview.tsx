import React from 'react';
import { FeedbackItem } from '@/lib/types';

interface Props {
  items: FeedbackItem[];
}

export default function StatsOverview({ items }: Props) {
  const totalVotes = items.reduce((acc, curr) => acc + curr.upvotes, 0);
  const inProgressCount = items.filter((i) => i.status === 'IN_PROGRESS').length;
  const completedCount = items.filter((i) => i.status === 'COMPLETED').length;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Upvotes</span>
        <p className="mt-2 text-3xl font-extrabold text-indigo-600">{totalVotes}</p>
        <span className="mt-1 text-xs text-slate-400">Community engagement</span>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">In Development</span>
        <p className="mt-2 text-3xl font-extrabold text-purple-600">{inProgressCount}</p>
        <span className="mt-1 text-xs text-slate-400">Currently being built</span>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Shipped Features</span>
        <p className="mt-2 text-3xl font-extrabold text-emerald-600">{completedCount}</p>
        <span className="mt-1 text-xs text-slate-400">Delivered to users</span>
      </div>
    </div>
  );
}