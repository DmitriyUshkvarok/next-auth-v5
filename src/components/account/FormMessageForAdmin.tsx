'use client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { SubmitButton } from '@/components/forms/buttons';
import { useToast } from '@/hooks/use-toast';
import { sendFormForAdminSchema } from '@/validation/schemas';
import { sendFormForAdmin } from '@/action/sendMessageForAdminAction';

const FormMessageForAdmin = ({
  name,
  email,
  photo,
  role,
}: {
  name: string;
  email: string;
  photo: string;
  role: string;
}) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof sendFormForAdminSchema>>({
    resolver: zodResolver(sendFormForAdminSchema),
    defaultValues: {
      name: name,
      email: email,
      role: role,
      message: '',
      photo: photo,
    },
  });

  const handleSubmit = async (data: z.infer<typeof sendFormForAdminSchema>) => {
    const result = await sendFormForAdmin(data);
    if (result.success) {
      toast({
        title: 'The message has been sent',
        description: result.message,
      });
    } else {
      form.setError('root', {
        message: result.message,
      });
      toast({ title: 'Error', description: result.message });
    }
  };
  return (
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
                    readOnly
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="text-[10px] sm:text-[14px]"
                    {...field}
                    type="email"
                    readOnly
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="text-[10px] sm:text-[14px]"
                    {...field}
                    type="hidden"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="photo"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="text-[10px] sm:text-[14px]"
                    {...field}
                    type="hidden"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Type your message here." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!!form.formState.errors.root?.message && (
            <FormItem>
              <FormMessage>{form.formState.errors.root.message}</FormMessage>
            </FormItem>
          )}
          <SubmitButton
            className="py-[4px] px-[12px] h-[30px] sm:h-[44px] sm:py-[8px] sm:px-[16px] w-full text-[10px] sm:text-[14px] mt-4"
            text="Send a Message"
            isLoading={form.formState.isSubmitting}
          />
        </fieldset>
      </form>
    </Form>
  );
};

export default FormMessageForAdmin;
