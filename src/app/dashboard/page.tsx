'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import StatsOverview from '@/components/StatsOverview';
import { FeedbackItem, FeedbackStatus } from '@/lib/types';

export default function AdminDashboard() {
  const [items, setItems] = useState<FeedbackItem[]>([]);
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

  const updateStatus = async (id: string, newStatus: FeedbackStatus) => {
    try {
      const res = await fetch('/api/feedback', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setItems((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
      }
    } catch (error) {
      console.error('Failed to update status', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Product Dashboard</h1>
            <p className="text-sm text-slate-500">Manage roadmap status and community feedback prioritization.</p>
          </div>
          <Link
            href="/"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            ← View Public Board
          </Link>
        </div>

        <StatsOverview items={items} />

        <div className="mt-8 rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-4 font-semibold text-slate-800">
            All Feedback Submissions ({items.length})
          </div>

          {loading ? (
            <div className="p-8 text-center text-sm text-slate-400">Loading feedback list...</div>
          ) : (
            <div className="divide-y divide-slate-100">
              {items.map((item) => (
                <div key={item.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900">{item.title}</span>
                      <span className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-600">{item.category}</span>
                      <span className="text-xs font-bold text-indigo-600">▲ {item.upvotes}</span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{item.description}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-xs font-medium text-slate-600">Status:</label>
                    <select
                      value={item.status}
                      onChange={(e) => updateStatus(item.id, e.target.value as FeedbackStatus)}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium outline-none focus:border-indigo-600"
                    >
                      <option value="UNDER_REVIEW">Under Review</option>
                      <option value="PLANNED">Planned</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="COMPLETED">Completed</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}