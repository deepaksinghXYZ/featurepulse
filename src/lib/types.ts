export type FeedbackStatus = 'UNDER_REVIEW' | 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED';

export interface FeedbackItem {
  id: string;
  title: string;
  description: string;
  category: string;
  status: FeedbackStatus;
  upvotes: number;
  authorName: string;
  createdAt: string;
}