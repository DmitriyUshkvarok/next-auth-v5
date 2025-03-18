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
import { Textarea } from '@/components/ui/textarea';
import { updateResumeAbout } from '@/action/resumePageActions';
import { resumeAboutSchema } from '@/validation/schemaResumePage';

type AdminResumeAboutFormProps = {
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
    subDescription: {
      en: string;
      ru: string;
      uk: string;
    };
    name: {
      en: string;
      ru: string;
      uk: string;
    };
    email: string;
    experience: {
      en: string;
      ru: string;
      uk: string;
    };
    nationality: {
      en: string;
      ru: string;
      uk: string;
    };
    dateOfBirth: string;
    location: {
      en: string;
      ru: string;
      uk: string;
    };
  } | null;
};

const AdminEditResumeAbout = ({ data }: AdminResumeAboutFormProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof resumeAboutSchema>>({
    resolver: zodResolver(resumeAboutSchema),
    defaultValues: {
      title: data?.title ?? { en: '', ru: '', uk: '' },
      description: data?.description ?? { en: '', ru: '', uk: '' },
      subDescription: data?.subDescription ?? { en: '', ru: '', uk: '' },
      name: data?.name ?? { en: '', ru: '', uk: '' },
      email: data?.email ?? '',
      experience: data?.experience ?? { en: '', ru: '', uk: '' },
      nationality: data?.nationality ?? { en: '', ru: '', uk: '' },
      dateOfBirth: data?.dateOfBirth ?? '',
      location: data?.location ?? { en: '', ru: '', uk: '' },
    },
  });

  const handleSubmit = async (data: z.infer<typeof resumeAboutSchema>) => {
    const response = await updateResumeAbout(data);
    if (response.success) {
      toast({
        description: `${response.message}`,
      });
      router.push('/resume');
    } else {
      form.setError('root', {
        message: response.message,
      });
    }
  };

  return (
    <Card className="max-w-full mx-4 mb-4">
      <CardHeader>
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <CardTitle>Update About</CardTitle>
            <CardDescription className="capitalize">
              Updating the about for the resume page.
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
              className="flex flex-col gap-4"
            >
              {/* Title and Description fields */}
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
              {/* Sub Description Fields */}
              <FormField
                control={form.control}
                name="subDescription.en"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sub Description (EN)</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Enter sub description (EN)"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subDescription.ru"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sub Description (RU)</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Введите под описание (RU)"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subDescription.uk"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sub Description (UK)</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Введіть під опис (UK)"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Name Fields */}
              <FormField
                control={form.control}
                name="name.en"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name (EN)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter name (EN)" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name.ru"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name (RU)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Введите имя (RU)" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name.uk"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name (UK)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Введіть ім'я (UK)" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Email Fields */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Experience Fields */}
              <FormField
                control={form.control}
                name="experience.en"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience (EN)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter experience (EN)" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="experience.ru"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience (RU)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Введите опыт (RU)" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="experience.uk"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience (UK)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Введіть опыт (UK)" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Nationality Fields */}
              <FormField
                control={form.control}
                name="nationality.en"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nationality (EN)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter nationality (EN)" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nationality.ru"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nationality (RU)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Введите национальность (RU)"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nationality.uk"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nationality (UK)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Введіть національність (UK)"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Date of Birth Fields */}
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter date of birth" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Location Fields */}
              <FormField
                control={form.control}
                name="location.en"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location (EN)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter location (EN)" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location.ru"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location (RU)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Введите местоположение (RU)"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location.uk"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location (UK)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Введіть місцезнаходження (UK)"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SubmitButton
                text="Update About"
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
              <BreadcrumbLink href="/admin/resume.text">
                Admin Edit Resume Page Text
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/resume/navigation">
                Admin Edit Resume Navigation
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Update About</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </CardFooter>
    </Card>
  );
};

export default AdminEditResumeAbout;
