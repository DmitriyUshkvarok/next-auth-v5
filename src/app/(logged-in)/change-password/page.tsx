import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ChangePasswordForm from '@/components/forms/change-password-form';
import { auth } from '../../../../auth';
import { redirect } from 'next/navigation';

export default async function ChangePassword() {
  const session = await auth();
  if (session?.user.provider === 'google') {
    redirect('/my-account');
  }
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
      </CardHeader>
      <CardContent>
        <ChangePasswordForm />
      </CardContent>
    </Card>
  );
}
