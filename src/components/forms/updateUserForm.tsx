'use client';
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
import { SubmitButton } from '@/components/forms/buttons';
import { updateUserSchema } from '@/validation/schemas';
import { updateUserAction } from '@/action/userProfileActions';
import { useToast } from '@/hooks/use-toast';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const UpdateUserForm = ({ name }: { name: string }) => {
  const { data: session, update } = useSession();

  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: name || 'User Name',
    },
  });

  const handleSubmit = async (data: z.infer<typeof updateUserSchema>) => {
    const result = await updateUserAction(data);

    if (result?.success) {
      await update({
        ...session,
        name: data.name,
        image: session?.user.image,
      });
      router.replace('/my-account');
      toast({
        description: `${result?.message}`,
      });
    } else {
      form.setError('root', {
        message: result?.message || 'Something went wrong. Please try again.',
      });
    }
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <fieldset
            disabled={form.formState.isSubmitting}
            className="flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      className="text-[10px] sm:text-[14px]"
                      {...field}
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            {!!form.formState.errors.root?.message && (
              <FormItem>
                <FormMessage>{form.formState.errors.root.message}</FormMessage>
              </FormItem>
            )}
            <SubmitButton
              className="py-[8px] px-[16px] w-full text-[10px] sm:text-[14px]"
              text="Update User Name"
              isLoading={form.formState.isSubmitting}
            />
          </fieldset>
        </form>
      </Form>
    </>
  );
};

export default UpdateUserForm;
