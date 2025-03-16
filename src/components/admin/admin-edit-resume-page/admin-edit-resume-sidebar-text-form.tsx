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
import { Textarea } from '@/components/ui/textarea';
import { updateResumeSidebarTextSchema } from '@/validation/schemaResumePage';
import { updateResumePageSidebarText } from '@/action/resumePageActions';
type AdminSidebarTextDataProps = {
  data: {
    title: {
      en: string;
      ru: string;
      uk: string;
    };
    description: {
      en: string;
      ru: string;
      uk: string;
    };
  };
};
const AdminEditResumeSidebarTextForm = ({
  data,
}: AdminSidebarTextDataProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof updateResumeSidebarTextSchema>>({
    resolver: zodResolver(updateResumeSidebarTextSchema),
    defaultValues: {
      title: data?.title || { en: '', ru: '', uk: '' },
      description: data?.description || { en: '', ru: '', uk: '' },
    },
  });

  const handleSubmit = async (
    data: z.infer<typeof updateResumeSidebarTextSchema>
  ) => {
    const result = await updateResumePageSidebarText(data);

    if (result.success) {
      toast({
        description: `${result.message}`,
      });
      router.push('/resume');
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
            <CardTitle>
              Modify the Resume Sidebar Title and Description
            </CardTitle>
            <CardDescription className="capitalize">
              Updating Text for the Resume Sidebar Page
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
              <FormField
                control={form.control}
                name="title.en"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title (English)</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Enter title (EN)" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title.ru"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title (Russian)</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Введите заголовок (RU)"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title.uk"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title (Ukrainian)</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Введіть заголовок (UK)"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description Fields */}
              <FormField
                control={form.control}
                name="description.en"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (EN)</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Enter description (EN)"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description.ru"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (RU)</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Введите описание (RU)"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description.uk"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (UK)</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Введіть опис (UK)" />
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
                text="Update Text"
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
              <BreadcrumbLink href="/admin/resume/navigation">
                Edit Sidebar Navigation Links
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
              <BreadcrumbPage>Update Resume Sidebar Text</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </CardFooter>
    </Card>
  );
};

export default AdminEditResumeSidebarTextForm;
