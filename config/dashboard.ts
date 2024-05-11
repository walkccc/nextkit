import { DashboardConfig } from '@/types';

export const dashboardConfig: DashboardConfig = {
  navItems: [
    {
      title: 'Documentation',
      href: '/docs',
    },
    {
      title: 'Demo',
      href: '/demo',
      disabled: true,
    },
  ],
  sidebarNavItems: [
    {
      title: 'Posts',
      href: '/dashboard',
      icon: 'post',
    },
    {
      title: 'Billing',
      href: '/dashboard/billing',
      icon: 'billing',
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: 'settings',
    },
  ],
};
