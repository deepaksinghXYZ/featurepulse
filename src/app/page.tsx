'use client';

import React, { useEffect, useState } from 'react';
import FeedbackCard from '@/components/FeedbackCard';
import FeedbackModal from '@/components/FeedbackModal';
import { FeedbackItem } from '@/lib/types';

export default function HomePage() {
  const [items, setItems] = useState<FeedbackItem[]>([]);
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/feedback');
      const data = await res.json();
      setItems(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const filteredItems = items.filter((item) =>
    categoryFilter === 'ALL' ? true : item.category === categoryFilter
  );

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 font-bold text-white">
              FP
            </span>
            <span className="text-xl font-bold tracking-tight text-slate-900">FeaturePulse</span>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            + Give Feedback
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Community Requests & Roadmap</h1>
            <p className="text-sm text-slate-500">Vote on features you want built next or submit your own.</p>
          </div>

          <div className="flex gap-2">
            {['ALL', 'Feature', 'Bug Fix', 'Integration', 'UI/UX'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  categoryFilter === cat
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 space-y-3">
          {loading ? (
            <p className="text-center text-sm text-slate-400 py-10">Loading community feedback...</p>
          ) : filteredItems.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 p-12 text-center">
              <p className="text-slate-500">No requests in this category yet.</p>
              <button
                onClick={() => setModalOpen(true)}
                className="mt-3 text-sm font-semibold text-indigo-600 hover:underline"
              >
                Be the first to suggest one
              </button>
            </div>
          ) : (
            filteredItems.map((item) => <FeedbackCard key={item.id} item={item} />)
          )}
        </div>
      </div>

      <FeedbackModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={fetchItems}
      />
    </main>
  );
}