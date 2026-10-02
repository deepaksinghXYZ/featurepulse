import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const feedback = await db.feedback.findMany({
      orderBy: { upvotes: 'desc' },
    });
    return NextResponse.json(feedback);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, category, authorName } = body;

    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description required' }, { status: 400 });
    }

    const item = await db.feedback.create({
      data: {
        title,
        description,
        category: category || 'General',
        authorName: authorName || 'Anonymous',
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
  }
}
export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json();

    const updated = await db.feedback.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update feedback status' }, { status: 500 });
  }
}