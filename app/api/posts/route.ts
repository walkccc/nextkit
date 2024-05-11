import { z } from 'zod';

import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { postCreateSchema } from '@/lib/validations/post';

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || !currentUser.id) {
      return new Response('Unauthorized', { status: 403 });
    }

    // TODO: Check if the current user is on the PRO plan.

    const json = await req.json();
    const body = postCreateSchema.parse(json);

    const post = await db.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: currentUser.id,
      },
      select: {
        id: true,
      },
    });

    return new Response(JSON.stringify(post));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    // TODO: Handle RequiresProPlanError

    return new Response(null, { status: 500 });
  }
}
