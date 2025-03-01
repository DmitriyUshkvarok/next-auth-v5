import { auth } from '../../../../auth';
import db from '@/db/drizzle';
import { users } from '@/db/schema/userSchema';
import { eq } from 'drizzle-orm';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import AccountSidebar from '@/components/account/AccountSidebar';
import AccountSettingsPanel from '@/components/account/AccountSettingsPanel';

export default async function MyAccount() {
  const session = await auth();
  const provider = session?.user?.provider !== 'google';
  const role = session?.user?.role === 'admin';

  const [user] = await db
    .select({
      twoFactorActivated: users.twoFactorActivated,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.id, session?.user?.id ?? '0'));

  if (!session?.user?.id) {
    return <div>User Not Found</div>;
  }

  return (
    <section>
      <ResizablePanelGroup
        direction="horizontal"
        className="w-full max-w-[95%] min-h-screen rounded-lg border mx-auto my-4"
      >
        <ResizablePanel defaultSize={150} className="p-2">
          <AccountSidebar session={session} user={user} provider={provider} />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={15}>
              <AccountSettingsPanel role={role} />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={75}>
              <div className="flex h-full items-center justify-center p-6"></div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </section>
  );
}
