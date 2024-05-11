import { MarketingConfig } from '@/types';

export const marketingConfig: MarketingConfig = {
  navItems: [
    {
      title: 'Features',
      href: '/#features',
    },
    {
      title: 'Pricing',
      href: '/pricing',
    },
    {
      title: 'Demo',
      href: '/demo',
      disabled: true,
    },
    {
      title: 'Documentation',
      href: '/docs',
    },
  ],
};
