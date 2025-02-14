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
import { FolderPlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
// import { useRouter } from 'next/navigation';
// import { useToast } from '@/hooks/use-toast';
import { portfolioSchema } from '@/validation/schemas';
import { SubmitButton } from '@/components/forms/buttons';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
// import ImageInput from './ImageInput';

const CreateProjectForm = () => {
  //   const { toast } = useToast();
  //   const router = useRouter();

  const form = useForm<z.infer<typeof portfolioSchema>>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: {
      title: '',
      description: '',
      websiteUrl: '',
      githubUrl: '',
      technologies: [],
      image: undefined,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'technologies',
  });

  const handleSubmit = async (data: z.infer<typeof portfolioSchema>) => {
    console.log(data);
    const formData = new FormData();
    // Добавляем изображение
    if (data.image) {
      formData.append('image', data.image);
    }
    // Здесь логика отправки данных
  };

  return (
    <Card className="max-w-full mx-4 mb-4">
      <CardHeader>
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <CardTitle>Create Project</CardTitle>
            <CardDescription>Add details about your project.</CardDescription>
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
              <div>
                <FormLabel className="inline-flex mb-3">
                  Project Image
                </FormLabel>
                <Input
                  type="file"
                  {...form.register('image')}
                  className="file-input"
                />
              </div>
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="websiteUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website URL</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="githubUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub URL</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Технологии */}
              <div className="flex flex-col gap-2">
                <FormLabel>Technologies</FormLabel>
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <FormField
                      control={form.control}
                      name={`technologies.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} placeholder="Tech name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`technologies.${index}.icon`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} placeholder="Icon URL" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="button" onClick={() => remove(index)}>
                      ❌
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() => append({ name: '', icon: '' })}
                >
                  ➕ Add Technology
                </Button>
              </div>

              {/* Кнопка отправки */}
              {!!form.formState.errors.root?.message && (
                <FormMessage>{form.formState.errors.root.message}</FormMessage>
              )}
              <SubmitButton
                text="Create Project"
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
              <BreadcrumbLink href="/admin/edit-project">
                Edit Projects
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Create Project</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </CardFooter>
    </Card>
  );
};

export default CreateProjectForm;
