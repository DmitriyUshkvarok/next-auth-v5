'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { loginWithCredentials } from '@/action/authActions';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSeparator,
//   InputOTPSlot,
// } from '@/components/ui/input-otp';
import { useToast } from '@/hooks/use-toast';
import { loginSchema } from '@/validation/schemas';
import { SubmitButton } from '@/components/forms/buttons';

export default function Login() {
  const { toast } = useToast();
  const [step, /*setStep*/] = useState(1);
  //   const [otp, setOtp] = useState('');
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (data: z.infer<typeof loginSchema>) => {
    const response = await loginWithCredentials({
      email: data.email,
      password: data.password,
    });

    if (response?.message) {
      toast({
        description: `${response.message}`,
      });
      form.reset();
    }
    if (response.success) {
      router.push('/my-account');
    } else {
      form.setError('root', {
        message: response.message,
      });
    }
  };
  const email = form.getValues('email');
  return (
    <main className="flex justify-center items-center min-h-screen">
      {step === 1 && (
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Login to your account.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)}>
                <fieldset
                  disabled={form.formState.isSubmitting}
                  className="flex flex-col gap-2"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input {...field} type="password" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {!!form.formState.errors.root?.message && (
                    <FormMessage>
                      {form.formState.errors.root.message}
                    </FormMessage>
                  )}
                  <SubmitButton
                    text="Login"
                    isLoading={form.formState.isSubmitting}
                  />
                </fieldset>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <div className="text-muted-foreground text-sm">
              Don&apos;t have an account?
              <Link href="/register" className="underline">
                Register
              </Link>
            </div>
            <div className="text-muted-foreground text-sm">
              Forgot password?{' '}
              <Link
                href={`/password-reset${
                  email ? `?email=${encodeURIComponent(email)}` : ''
                }`}
                className="underline"
              >
                Reset my password
              </Link>
            </div>
          </CardFooter>
        </Card>
      )}
    </main>
  );
}
