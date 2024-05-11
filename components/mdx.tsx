import Image from 'next/image';
import * as React from 'react';
import * as runtime from 'react/jsx-runtime';

import { Callout } from '@/components/callout';
import { MdxCard } from '@/components/mdx-card';
import { cn } from '@/lib/utils';

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

const components = {
  Image,
  Card: MdxCard,
  Callout,
};

interface MDXProps {
  code: string;
}

export function MDX({ code }: MDXProps) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}
