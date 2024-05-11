import Link from 'next/link';

import { Icons } from '@/components/icons';
import { buttonVariants } from '@/components/ui/button';
import { docsConfig } from '@/config/docs';
import { cn } from '@/lib/utils';
import { SidebarNavItem } from '@/types';
import { Docs } from '#site/content';

interface DocsPagerProps {
  doc: Docs;
}

export function DocsPager({ doc }: DocsPagerProps) {
  const pager = getPagerForDoc(doc);

  if (!pager) {
    return null;
  }

  return (
    <div className="flex flex-row items-center justify-between">
      {pager?.prev && (
        <Link
          href={pager.prev.href ?? ''}
          className={cn(buttonVariants({ variant: 'ghost' }))}
        >
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          {pager.prev.title}
        </Link>
      )}
      {pager?.next && (
        <Link
          href={pager.next.href ?? ''}
          className={cn(buttonVariants({ variant: 'ghost' }), 'ml-auto')}
        >
          {pager.next.title}
          <Icons.chevronRight className="ml-2 h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

export function getPagerForDoc(doc: Docs) {
  const flattenedLinks = [null, ...flatten(docsConfig.sidebarNavItems), null];
  const activeIndex = flattenedLinks.findIndex(
    (link) => doc.slug === link?.href,
  );
  const prev = activeIndex !== 0 ? flattenedLinks[activeIndex - 1] : null;
  const next =
    activeIndex !== flattenedLinks.length - 1
      ? flattenedLinks[activeIndex + 1]
      : null;
  return {
    prev,
    next,
  };
}

function flatten(items: SidebarNavItem[]) {
  return items.reduce((acc, item) => {
    if (item.items) {
      acc.push(item, ...flatten(item.items));
    } else {
      acc.push(item);
    }
    return acc;
  }, [] as SidebarNavItem[]);
}
