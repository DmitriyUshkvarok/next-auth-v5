import { getUserDeviceInfo } from '@/utils/userDevice';
import ImageAvatarInputContainer from '../forms/ImageAvatarInputContainer';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Label } from '../ui/label';
import UpdateUserForm from '../forms/updateUserForm';
import TwoFactorAuthForm from '../forms/two-factor-auth-form';
import { Suspense } from 'react';
import { auth } from '../../../auth';
import Link from 'next/link';
import LogoutButton from '../forms/logout-button';
import { SessionProfile, UserForAccount } from '@/utils/types';

const AccountSidebar = ({
  session,
  user,
  provider,
}: {
  session: SessionProfile;
  user: UserForAccount;
  provider: boolean;
}) => {
  return (
    <Card className="min-h-full">
      <CardHeader className="p-3">
        <CardTitle className="text-center">
          {session?.user.name
            ? session.user.name.length > 20
              ? session.user.name.slice(0, 20) + '...'
              : session.user.name
            : 'User'}
        </CardTitle>
        <CardDescription className="text-center">My Account</CardDescription>
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
              <Label className="mr-2 text-[#E62667]">Account created:</Label>
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
  );
};

export default AccountSidebar;

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
