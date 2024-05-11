import { Icons } from '@/components/icons';

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MarketingConfig = {
  navItems: NavItem[];
};

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  links: {
    twitter: string;
    github: string;
  };
};

export type SidebarNavItem = {
  title: string;
  href: string;
  disabled?: boolean;
  icon?: keyof typeof Icons;
};

export type DashboardConfig = {
  navItems: NavItem[];
  sidebarNavItems: SidebarNavItem[];
};
