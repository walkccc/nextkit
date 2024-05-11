'use client';

import * as React from 'react';

import { useMounted } from '@/hooks/use-mounted';
import { cn } from '@/lib/utils';

function useActiveItem(itemIds: string[]) {
  const [activeItem, setActiveItem] = React.useState(null);

  React.useEffect(() => {
    const handleScroll = () => {
      let currentActiveItem = null;
      itemIds.forEach((id) => {
        const element = document.getElementById(id);
        if (
          element &&
          element.getBoundingClientRect().top < window.innerHeight * 0.01
        ) {
          currentActiveItem = id;
        }
      });
      setActiveItem(currentActiveItem);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [itemIds]);

  return activeItem;
}

interface TreeProps {
  tree: TocEntry;
  level: number;
  activeItem?: string | null;
}

function Tree({ tree, level, activeItem }: TreeProps) {
  return tree.items.length && level < 3 ? (
    <ul className={cn('m-0 list-none', { 'pl-4': level !== 1 })}>
      {tree.items.map((item, index) => {
        return (
          <li key={index} className={cn('mt-0 pt-2')}>
            <a
              href={item.url}
              className={cn(
                'inline-block no-underline',
                item.url === `#${activeItem}`
                  ? 'font-medium text-primary'
                  : 'text-sm text-muted-foreground',
              )}
            >
              {item.title}
            </a>
            {item.items?.length ? (
              <Tree tree={item} level={level + 1} activeItem={activeItem} />
            ) : null}
          </li>
        );
      })}
    </ul>
  ) : null;
}

type TocEntry = {
  title: string;
  url: string;
  items: TocEntry[];
};

interface DocsTocProps {
  toc: TocEntry;
}

export function DocsToc({ toc }: DocsTocProps) {
  const itemIds = React.useMemo(
    () =>
      toc.items.length === 0
        ? []
        : toc.items
            .flatMap((item) => [
              item.url,
              item?.items?.map((item: { url: any }) => item.url),
            ])
            .flat()
            .filter(Boolean)
            .map((id) => id?.split('#')[1]),
    [toc],
  );
  const activeHeading = useActiveItem(itemIds);
  const mounted = useMounted();

  if (toc.items.length === 0) {
    return null;
  }

  return mounted ? (
    <div className="space-y-2">
      <p className="font-medium">On This Page</p>
      <Tree tree={toc} level={1} activeItem={activeHeading} />
    </div>
  ) : null;
}
