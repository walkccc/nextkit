import { Post } from '@prisma/client';
import Link from 'next/link';

import { PostOperations } from '@/components/post-operations';
import { formatDate } from '@/lib/utils';

interface PostItemProps {
  post: Post;
}

export function PostItem({ post }: PostItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/editor/${post.id}`}
          className="font-semibold hover:underline"
        >
          {post.title}
        </Link>
        <div>
          <p className="text-sm text-slate-600">
            {formatDate(post.createdAt?.toDateString())}
          </p>
        </div>
      </div>
      <PostOperations post={{ id: post.id, title: post.title }} />
      {/* <PostDeleteButton post={{ id: post.id, title: post.title }} /> */}
    </div>
  );
}

PostItem.Skeleton = function PostItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <div className="h-5 w-2/5 animate-pulse rounded-lg bg-slate-100"></div>
        <div className="h-4 w-4/5 animate-pulse rounded-lg bg-slate-100"></div>
      </div>
    </div>
  );
};
