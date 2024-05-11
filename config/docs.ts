import { DocsConfig } from '@/types';

export const docsConfig: DocsConfig = {
  navItems: [
    {
      title: 'Documentation',
      href: '/docs',
    },
    {
      title: 'Dashboard',
      href: '/dashboard',
    },
    {
      title: 'Pricing',
      href: '/pricing',
    },
  ],
  sidebarNavItems: [
    {
      title: 'Demo Pages',
      items: [
        {
          title: 'Home',
          href: '/docs',
        },
      ],
    },
    {
      title: 'Blog',
      items: [
        {
          title: 'Apple macOS Setup',
          href: '/docs/macos',
        },
        {
          title: 'Contentlayer',
          href: '/docs/in-progress',
          disabled: true,
        },
      ],
    },
    {
      title: 'Others',
      items: [
        {
          title: 'Hello World',
          href: '/docs/hello-world',
        },
      ],
    },
  ],
};
