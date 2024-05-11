import type { User } from '@prisma/client';
import { redirect } from 'next/navigation';

import { DashboardHeader } from '@/components/dashboard-header';
import { DashboardShell } from '@/components/dashboard-shell';
import { EmptyPlaceholder } from '@/components/empty-placeholder';
import { PostCreateButton } from '@/components/post-create-button';
import { PostItem } from '@/components/post-item';
import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';

export default async function DashboardPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser || !currentUser.id) {
    redirect('/login');
  }

  const posts = await getAllPostsForAuthor(currentUser.id);

  return (
    <DashboardShell>
      <DashboardHeader heading="Posts" text="Create and manage posts.">
        <PostCreateButton />
      </DashboardHeader>
      {posts.length === 0 ? (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="post" />
          <EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any posts yet. Start creating content.
          </EmptyPlaceholder.Description>
          <PostCreateButton variant="outline" />
        </EmptyPlaceholder>
      ) : (
        <div className="divide-y divide-border rounded-md border">
          {posts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
      )}
    </DashboardShell>
  );
}

async function getAllPostsForAuthor(authorId: User['id']) {
  return await db.post.findMany({
    where: { authorId },
    orderBy: { updatedAt: 'desc' },
  });
}
