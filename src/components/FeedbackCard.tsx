'use client';

import React, { useState } from 'react';
import { FeedbackItem } from '@/lib/types';

interface Props {
  item: FeedbackItem;
  onUpvoted?: (id: string, count: number) => void;
}

export default function FeedbackCard({ item, onUpvoted }: Props) {
  const [votes, setVotes] = useState(item.upvotes);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleVote = async () => {
    if (hasVoted || loading) return;
    setLoading(true);
    setVotes((prev) => prev + 1);
    setHasVoted(true);

    try {
      const res = await fetch('/api/upvote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item.id }),
      });
      const data = await res.json();
      if (onUpvoted) onUpvoted(item.id, data.upvotes);
    } catch {
      setVotes((prev) => prev - 1);
      setHasVoted(false);
    } finally {
      setLoading(false);
    }
  };

  const statusColors = {
    UNDER_REVIEW: 'bg-amber-100 text-amber-800 border-amber-200',
    PLANNED: 'bg-blue-100 text-blue-800 border-blue-200',
    IN_PROGRESS: 'bg-purple-100 text-purple-800 border-purple-200',
    COMPLETED: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  };

  return (
    <div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <button
        onClick={handleVote}
        disabled={hasVoted}
        className={`flex flex-col items-center justify-center rounded-lg border px-3 py-2 transition ${
          hasVoted
            ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
            : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-indigo-400 hover:bg-white'
        }`}
      >
        <span className="text-sm font-semibold">▲</span>
        <span className="text-sm font-bold">{votes}</span>
      </button>

      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-semibold text-slate-900">{item.title}</h3>
          <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${statusColors[item.status]}`}>
            {item.status.replace('_', ' ')}
          </span>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
            {item.category}
          </span>
        </div>
        <p className="mt-1 text-sm text-slate-600">{item.description}</p>
        <div className="mt-3 flex items-center gap-3 text-xs text-slate-400">
          <span>By {item.authorName}</span>
          <span>•</span>
          <span>{new Date(item.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}