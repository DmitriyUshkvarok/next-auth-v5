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
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
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
import { updateResumeSkills } from '@/action/resumePageActions';
import { resumeSkillsSchema } from '@/validation/schemaResumePage';

type AdminResumeSkillsProps = {
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
    skills: Array<{
      skillName: {
        en: string;
        ru: string;
        uk: string;
      };
    }> | null;
  } | null;
};

const AdminEditResumeSkills = ({ data }: AdminResumeSkillsProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof resumeSkillsSchema>>({
    resolver: zodResolver(resumeSkillsSchema),
    defaultValues: {
      title: data?.title ?? { en: '', ru: '', uk: '' },
      description: data?.description ?? { en: '', ru: '', uk: '' },
      skills: data?.skills ?? [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'skills',
  });

  const handleSubmit = async (data: z.infer<typeof resumeSkillsSchema>) => {
    const response = await updateResumeSkills(data);
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
            <CardTitle>Update Skills</CardTitle>
            <CardDescription className="capitalize">
              Updating the skills for the resume page.
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
              {/* Title Fields */}
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

              {/* Experiences fields */}
              {fields.map((field, index) => (
                <div key={field.id} className="flex flex-col gap-2">
                  <FormField
                    control={form.control}
                    name={`skills.${index}.skillName.en`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Skill Name (English)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter skill name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`skills.${index}.skillName.ru`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Skill Name (Russian)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Введите название навыка"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`skills.${index}.skillName.uk`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Skill Name (Ukrainian)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Введіть назву навички"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Remove experience button */}
                  <Button
                    className="w-full max-w-[50px] ml-auto"
                    type="button"
                    onClick={() => remove(index)}
                  >
                    ❌
                  </Button>
                </div>
              ))}

              {/* Add new experience button */}
              <Button
                type="button"
                onClick={() =>
                  append({ skillName: { en: '', ru: '', uk: '' } })
                }
              >
                ➕ Add Skill
              </Button>
              {!!form.formState.errors.root?.message && (
                <FormItem>
                  <FormMessage>
                    {form.formState.errors.root.message}
                  </FormMessage>
                </FormItem>
              )}
              <SubmitButton
                text="Update Skills"
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
              <BreadcrumbLink href="/admin/resume/educatio">
                Admin Edit Resume Education
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/resume/experience">
                Admin Edit Resume Experience
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Update Skills</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </CardFooter>
    </Card>
  );
};

export default AdminEditResumeSkills;
