import { auth } from '../../../../auth';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import TwoFactorAuthForm from '@/components/forms/two-factor-auth-form';
import db from '@/db/drizzle';
import { users } from '@/db/schema/userSchema';
import { eq } from 'drizzle-orm';
import UpdateUserForm from '@/components/forms/updateUserForm';
import ImageAvatarInputContainer from '@/components/forms/ImageAvatarInputContainer';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import Link from 'next/link';
import { Suspense } from 'react';
import LogoutButton from '@/components/forms/logout-button';
import { getUserDeviceInfo } from '@/utils/userDevice';
import { Home, UserCog } from 'lucide-react';

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
        <ResizablePanel defaultSize={350} className="p-2">
          <Card className="min-h-full">
            <CardHeader className="p-3">
              <CardTitle className="text-center">
                {session?.user.name
                  ? session.user.name.length > 20
                    ? session.user.name.slice(0, 20) + '...'
                    : session.user.name
                  : 'User'}
              </CardTitle>
              <CardDescription className="text-center">
                My Account
              </CardDescription>
              <CardContent className="p-0">
                <ImageAvatarInputContainer
                  image={session?.user.image ?? null}
                  name={session?.user.name ?? 'User Name'}
                  text="Update Profile Image"
                  className="flex flex-col items-center p-4 bg-background rounded-lg max-w-full" // Контейнер
                  imageClassName="border-4 border-green-500 shadow-md w-full max-w-[200px] h-full max-h-[200px]" // Изображение
                  buttonClassName="bg-green-500 text-white hover:bg-green-700 w-full max-w-[200px] text-[10px] sm:text-[14px]" // Кнопка
                  formClassName="bg-accent p-4 rounded-md shadow-lg" // Форма
                />
                <div className="mb-4">
                  <div>
                    <Label className="mr-2 text-[#E62667]">Email:</Label>
                    <span className="text-muted-foreground">
                      {session?.user?.email}
                    </span>
                  </div>
                  <div>
                    <Label className="mr-2 text-[#E62667]">Name:</Label>
                    <span className="text-muted-foreground">
                      {session?.user?.name}
                    </span>
                  </div>
                  <div>
                    <Label className="mr-2 text-[#E62667]">Provider:</Label>
                    <span className="text-muted-foreground capitalize">
                      {session?.user?.provider}
                    </span>
                  </div>
                  <div>
                    <Label className="mr-2 text-[#E62667]">Device:</Label>
                    <span className="text-muted-foreground capitalize">
                      {getUserDeviceInfo(`${session?.user?.device || ''}`)}
                    </span>
                  </div>
                  <div>
                    <Label className="mr-2 text-[#E62667]">Role:</Label>
                    <span className="text-muted-foreground capitalize">
                      {session?.user?.role}
                    </span>
                  </div>
                  <div>
                    <Label className="mr-2 text-[#E62667]">
                      Account created:
                    </Label>
                    <span className="text-muted-foreground capitalize">
                      {user?.createdAt
                        ? new Intl.DateTimeFormat('en-GB', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          }).format(new Date(user.createdAt))
                        : 'Unknown'}
                    </span>
                  </div>
                </div>
                <UpdateUserForm name={session?.user.name ?? 'User Name'} />
                {provider && (
                  <TwoFactorAuthForm
                    twoFactorActivated={user?.twoFactorActivated ?? false}
                  />
                )}
                <Suspense fallback={null}>
                  <div className="flex justify-center items-center mt-2">
                    <ProviderCheck />
                  </div>
                </Suspense>
              </CardContent>
              <CardFooter className="p-0">
                <div>
                  <LogoutButton />
                </div>
              </CardFooter>
            </CardHeader>
          </Card>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={25}>
              <div className="flex items-center justify-start p-2">
                <nav className="flex items-center justify-between">
                  <ul className="flex flex-col gap-4">
                    <li>
                      <Link href="/">
                        <Home className="mx-auto" />
                      </Link>
                    </li>
                    {role && (
                      <li>
                        <Link href="/admin">
                          <UserCog />
                        </Link>
                      </li>
                    )}
                  </ul>
                </nav>
              </div>
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

async function ProviderCheck() {
  const session = await auth();
  const provider = session?.user?.provider !== 'google';

  return (
    <>
      {provider && (
        <Link className="text-blue-500 underline" href="/change-password">
          Change Password
        </Link>
      )}
    </>
  );
}
