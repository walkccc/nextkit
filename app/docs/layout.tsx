import * as navigation from 'next/navigation';

import { DocsSidebarNav } from '@/components/docs-sidebar-nav';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { docsConfig } from '@/config/docs';
import { getCurrentUser } from '@/lib/auth';

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default async function DocsLayout({ children }: DocsLayoutProps) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return navigation.notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar
        navItems={docsConfig.navItems}
        currentUser={currentUser}
        className="sticky top-0 border-b bg-background"
      />
      <div className="container flex-1">
        <div className="flex-1 md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
          <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r py-6 pr-2 md:sticky md:block lg:py-10">
            <DocsSidebarNav items={docsConfig.sidebarNavItems} />
          </aside>
          <main>{children}</main>
        </div>
      </div>
      <Footer className="border-t" />
    </div>
  );
}
