import { auth } from '../../../../auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import TwoFactorAuthForm from '@/components/forms/two-factor-auth-form';
import db from '@/db/drizzle';
import { users } from '@/db/schema/userSchema';
import { eq } from 'drizzle-orm';
import UpdateUserForm from '@/components/forms/updateUserForm';
import ImageAvatarInputContainer from '@/components/forms/ImageAvatarInputContainer';

export default async function MyAccount() {
  const session = await auth();
  const provider = session?.user?.provider !== 'google';
  console.log(session);

  const [user] = await db
    .select({
      twoFactorActivated: users.twoFactorActivated,
    })
    .from(users)
    .where(eq(users.id, session?.user?.id ?? '0'));

  return (
    <Card className="w-full max-w-[500px]">
      <CardHeader>
        <CardTitle>
          My Account: <span>{session?.user.name || 'User'}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Label>Email Address</Label>
        <div className="text-muted-foreground">{session?.user?.email}</div>
        <ImageAvatarInputContainer
          image={session?.user.image ?? null}
          name={session?.user.name ?? 'User Name'}
          text={'Update Profile Image'}
        />
        <UpdateUserForm name={session?.user.name ?? 'User Name'} />
        {provider && (
          <TwoFactorAuthForm
            twoFactorActivated={user?.twoFactorActivated ?? false}
          />
        )}
      </CardContent>
    </Card>
  );
}
