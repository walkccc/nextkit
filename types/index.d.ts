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
