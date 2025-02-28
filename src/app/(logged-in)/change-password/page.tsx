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
    <section className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-[450px]">
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent>
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </section>
  );
}
