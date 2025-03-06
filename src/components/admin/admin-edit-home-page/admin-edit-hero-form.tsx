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
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { SubmitButton } from '@/components/forms/buttons';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { FolderPlus } from 'lucide-react';
import { updateHomePageHeroSchema } from '@/validation/schemasHomePage';
import { updateHomePageHero } from '@/action/homePageActions';
import Image from 'next/image';
import { Textarea } from '@/components/ui/textarea';

interface HeroData {
  position: string;
  title: string;
  developerName: string;
  description: string;
  image: string | null;
}

const AdminEditHeroForm = ({ data }: { data: HeroData }) => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof updateHomePageHeroSchema>>({
    resolver: zodResolver(updateHomePageHeroSchema),
    defaultValues: {
      position: data.position,
      title: data.title,
      developerName: data.developerName,
      description: data.description,
      image: undefined,
    },
  });

  const handleSubmit = async (
    data: z.infer<typeof updateHomePageHeroSchema>
  ) => {
    const formData = new FormData();

    if (data.image) {
      formData.append('image', data.image);
    }
    const result = await updateHomePageHero(data, formData);

    if (result.success) {
      toast({
        description: `${result.message}`,
      });
      router.push('/');
    } else {
      form.setError('root', {
        message: result.message,
      });
    }
  };

  return (
    <Card className="max-w-full mx-4 mb-4">
      <CardHeader>
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <CardTitle>Update Hero</CardTitle>
            <CardDescription className="capitalize">
              Updating the Hero for the homepage.
            </CardDescription>
          </div>
          <div>
            <FolderPlus className="w-[100px] h-[80px]" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <fieldset
              disabled={form.formState.isSubmitting}
              className="flex flex-col gap-2"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Current Image</CardTitle>
                </CardHeader>
                <CardContent className="relative h-[600px] p-4">
                  <Image
                    src={data.image ?? '/placeholder.png'}
                    alt={data.title ?? 'project image'}
                    className="object-contain"
                    fill
                  />
                </CardContent>
              </Card>

              <FormField
                control={form.control}
                name="image"
                render={({ field: { onChange, ref } }) => (
                  <FormItem>
                    <FormLabel>Update Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        ref={ref}
                        onChange={(e) => onChange(e.target.files?.[0])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="developerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Developer Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {!!form.formState.errors.root?.message && (
                <FormItem>
                  <FormMessage>
                    {form.formState.errors.root.message}
                  </FormMessage>
                </FormItem>
              )}
              <SubmitButton
                text="Update Hero"
                isLoading={form.formState.isSubmitting}
              />
            </fieldset>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/home/navigation">
                Edit Navigation Links
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/home/social-links">
                Edit Social Links
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/home/statistics">
                Edit Statistics
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/home/resume">
                Edit Resume
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Update Hero</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </CardFooter>
    </Card>
  );
};

export default AdminEditHeroForm;
