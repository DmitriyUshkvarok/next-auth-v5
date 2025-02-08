import { auth } from '../../../../auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import TwoFactorAuthForm from '@/components/forms/two-factor-auth-form';
import db from '@/db/drizzle';
import { users } from '@/db/schema/userSchema';
import { eq } from 'drizzle-orm';

export default async function MyAccount() {
  const session = await auth();
  const provider = session?.user?.provider !== 'google';

  const [user] = await db
    .select({
      twoFactorActivated: users.twoFactorActivated,
    })
    .from(users)
    .where(eq(users.id, session?.user?.id ?? '0'));

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>My Account</CardTitle>
      </CardHeader>
      <CardContent>
        <Label>Email Address</Label>
        <div className="text-muted-foreground">{session?.user?.email}</div>
        {provider && (
          <TwoFactorAuthForm
            twoFactorActivated={user?.twoFactorActivated ?? false}
          />
        )}
      </CardContent>
    </Card>
  );
}
