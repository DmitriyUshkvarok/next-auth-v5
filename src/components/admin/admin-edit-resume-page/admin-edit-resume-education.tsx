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
import { updateResumeEducation } from '@/action/resumePageActions';
import { resumeEducationsSchema } from '@/validation/schemaResumePage';

type AdminResumeEducationProps = {
  data: {
    title: string;
    description: string;
    educations: Array<{
      start: string;
      end: string;
      course: string;
      typeCourse: string;
    }> | null;
  } | null;
};

const AdminEditResumeEducation = ({ data }: AdminResumeEducationProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof resumeEducationsSchema>>({
    resolver: zodResolver(resumeEducationsSchema),
    defaultValues: {
      title: data?.title ?? '',
      description: data?.description ?? '',
      educations: data?.educations ?? [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'educations',
  });

  const handleSubmit = async (data: z.infer<typeof resumeEducationsSchema>) => {
    const response = await updateResumeEducation(data);
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
            <CardTitle>Update Education</CardTitle>
            <CardDescription className="capitalize">
              Updating the education for the resume page.
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
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Title" />
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
                      <Textarea {...field} placeholder="Enter Description" />
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
                    name={`educations.${index}.start`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Experience</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter a Start Education"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`educations.${index}.end`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Education</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter an End Education"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`educations.${index}.course`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter a Course" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`educations.${index}.typeCourse`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type Course</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter a Type Course" />
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
                  append({ start: '', end: '', course: '', typeCourse: '' })
                }
              >
                ➕ Add Item
              </Button>
              {!!form.formState.errors.root?.message && (
                <FormItem>
                  <FormMessage>
                    {form.formState.errors.root.message}
                  </FormMessage>
                </FormItem>
              )}
              <SubmitButton
                text="Update Education"
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
              <BreadcrumbPage>Update Education</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </CardFooter>
    </Card>
  );
};

export default AdminEditResumeEducation;
