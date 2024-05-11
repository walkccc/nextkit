import { notFound } from 'next/navigation';

import { DocsPageHeader } from '@/components/docs-page-header';
import { DocsPager } from '@/components/docs-pager';
import { DocsToc } from '@/components/docs-toc';
import { MDX } from '@/components/mdx';
import { docs } from '#site/content';

interface DocPageProps {
  params: { slug: string[] };
}

async function getDocFromParams(params: DocPageProps['params']) {
  const slug = params.slug?.join('/') || '';
  return docs.find((doc) => doc.slugAsParams === slug);
}

export async function generateStaticParams(): Promise<
  DocPageProps['params'][]
> {
  return docs.map((doc) => ({ slug: doc.slugAsParams.split('/') }));
}

export default async function DocPage({ params }: DocPageProps) {
  const doc = await getDocFromParams(params);
  if (!doc || !doc.published) {
    notFound();
  }

  return (
    <main className="relative py-6 lg:gap-10 lg:py-10 xl:grid xl:grid-cols-[1fr_300px]">
      <article className="prose mx-auto w-full min-w-0">
        <DocsPageHeader heading={doc.title} text={doc.description} />
        <MDX code={doc.body} />
        <hr className="my-4 md:my-6" />
        <DocsPager doc={doc} />
      </article>
      <div className="hidden text-sm xl:block">
        <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
          <DocsToc toc={{ title: '', url: '', items: doc.toc }} />
        </div>
      </div>
    </main>
  );
}
