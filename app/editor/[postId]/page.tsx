import { Post, User } from '@prisma/client';
import { notFound, redirect } from 'next/navigation';

import { Editor } from '@/components/editor';
import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';

async function getPostForUser(postId: Post['id'], authorId: User['id']) {
  return await db.post.findFirst({
    where: {
      id: postId,
      authorId,
    },
  });
}

interface EditorPageProps {
  params: { postId: string };
}

export default async function EditorPage({ params }: EditorPageProps) {
  const currentUser = await getCurrentUser();
  if (!currentUser || !currentUser.id) {
    redirect('/login');
  }

  const post = await getPostForUser(params.postId, currentUser.id);
  if (!post) {
    notFound();
  }

  return (
    <Editor
      post={{
        id: post.id,
        title: post.title,
        content: post.content,
        published: post.published,
      }}
    />
  );
}
