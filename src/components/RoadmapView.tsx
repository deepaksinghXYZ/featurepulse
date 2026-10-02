import React from 'react';
import { FeedbackItem, FeedbackStatus } from '@/lib/types';
import FeedbackCard from './FeedbackCard';

interface Props {
  items: FeedbackItem[];
}

const columns: { label: string; status: FeedbackStatus; color: string }[] = [
  { label: 'Planned', status: 'PLANNED', color: 'border-blue-500' },
  { label: 'In Progress', status: 'IN_PROGRESS', color: 'border-purple-500' },
  { label: 'Completed', status: 'COMPLETED', color: 'border-emerald-500' },
];

export default function RoadmapView({ items }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {columns.map((col) => {
        const columnItems = items.filter((item) => item.status === col.status);

        return (
          <div key={col.status} className="flex flex-col rounded-xl bg-slate-100 p-4">
            <div className={`mb-4 flex items-center justify-between border-l-4 pl-3 ${col.color}`}>
              <h3 className="font-semibold text-slate-900">{col.label}</h3>
              <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-bold text-slate-600">
                {columnItems.length}
              </span>
            </div>

            <div className="space-y-3">
              {columnItems.length === 0 ? (
                <div className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-xs text-slate-400">
                  No items in this column
                </div>
              ) : (
                columnItems.map((item) => <FeedbackCard key={item.id} item={item} />)
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}