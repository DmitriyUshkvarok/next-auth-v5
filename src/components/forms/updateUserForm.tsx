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

const UpdateUserForm = ({ name }: { name: string }) => {
  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: name || 'User Name',
    },
  });

  const handleSubmit = (data: z.infer<typeof updateUserSchema>) => {
    console.log(data);
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
                    <Input {...field} type="text" />
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
