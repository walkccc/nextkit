import { redirect } from 'next/navigation';

import { DashboardHeader } from '@/components/dashboard-header';
import { DashboardShell } from '@/components/dashboard-shell';
import { UserNameForm } from '@/components/user-name-form';
import { getCurrentUser } from '@/lib/auth';

export const metadata = {
  title: 'Settings',
  description: 'Manage account and website settings.',
};

export default async function SettingsPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser || !currentUser.id) {
    redirect('/login');
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="grid gap-10">
        <UserNameForm
          user={{ id: currentUser.id, name: currentUser.name || '' }}
        />
      </div>
    </DashboardShell>
  );
}
