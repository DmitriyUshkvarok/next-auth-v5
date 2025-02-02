'use client';

import { SubmitButton } from './buttons';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { updatePasswordSchema } from '@/validation/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { updatePassword } from '@/action/authActions';
import Link from 'next/link';

type Props = {
  token: string;
};

const UpdatePasswordForm = ({ token }: Props) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof updatePasswordSchema>>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
  });

  const handleSubmit = async (data: z.infer<typeof updatePasswordSchema>) => {
    const response = await updatePassword({
      token,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
    });

    if (response?.tokenInvalid) {
      window.location.reload();
    }

    if (!response?.success) {
      form.setError('root', {
        message: response?.message,
      });
    }

    if (response?.success) {
      toast({
        title: 'Password changed',
        description: `${response.message}`,
        className: 'bg-green-500 text-white',
      });
      form.reset();
    }
  };

  return form.formState.isSubmitSuccessful ? (
    <div>
      You password has been updated.
      <Link className="underline" href="/login">
        Click here to login to your account
      </Link>
    </div>
  ) : (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <fieldset
          disabled={form.formState.isSubmitting}
          className="flex flex-col gap-2"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password Confirm</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!!form.formState.errors.root?.message && (
            <FormItem>
              <FormMessage>{form.formState.errors.root?.message}</FormMessage>
            </FormItem>
          )}
          <SubmitButton
            text="Update Password"
            isLoading={form.formState.isSubmitting}
          />
        </fieldset>
      </form>
    </Form>
  );
};

export default UpdatePasswordForm;
