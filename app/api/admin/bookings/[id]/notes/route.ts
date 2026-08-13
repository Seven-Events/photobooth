import { requireAdminApi, logActivity } from '@/lib/admin-api';
import { NextResponse } from 'next/server';

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const gate = await requireAdminApi();
  if (gate.error) return gate.error;

  const { id } = await params;
  const { body } = await request.json();

  if (typeof body !== 'string' || !body.trim()) {
    return NextResponse.json({ error: 'Write something first.' }, { status: 400 });
  }

  const { data, error } = await gate.db
    .from('booking_notes')
    .insert({ event_id: id, author_id: gate.actor.id, body: body.trim() })
    .select('id, body, created_at, author_id, users:author_id(full_name, email)')
    .single();

  if (error) {
    console.error('Could not save note:', error);
    return NextResponse.json({ error: 'Could not save the note' }, { status: 500 });
  }

  await logActivity(gate.db, { eventId: id, actorId: gate.actor.id, action: 'added a note' });

  return NextResponse.json({ note: data }, { status: 201 });
}
