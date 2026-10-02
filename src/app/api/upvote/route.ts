import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    const updated = await db.feedback.update({
      where: { id },
      data: { upvotes: { increment: 1 } },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Upvote failed' }, { status: 500 });
  }
}