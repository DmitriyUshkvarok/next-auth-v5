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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CalendarIcon, FolderPlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
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
import { createPortfolioProject } from '@/action/portfolioAction';
import { Calendar } from '../ui/calendar';
import { format } from 'date-fns';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { websiteTypes } from '@/utils/websiteTypes';
import { allowedTechnologies } from '@/utils/technologies';

const CreateProjectForm = () => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof portfolioSchema>>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: {
      title: '',
      description: '',
      websiteUrl: '',
      githubUrl: '',
      videoReviewUrlDesktop: '',
      videoReviewUrlMobile: '',
      websiteType: '',
      isCommercial: false,
      isPublic: false,
      complexity: 'medium',
      budget: 0,
      technologies: [],
      image: undefined,
      realizedAt: new Date(),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'technologies',
  });

  const handleSubmit = async (data: z.infer<typeof portfolioSchema>) => {
    const formData = new FormData();

    if (data.image) {
      formData.append('image', data.image);
    }
    const response = await createPortfolioProject(data, formData);

    if (response.success) {
      toast({
        description: `${response.message}`,
      });
      router.push('/admin/all-projects');
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
              <FormField
                control={form.control}
                name="image"
                render={({ field: { onChange, ref } }) => (
                  <FormItem>
                    <FormLabel>Upload Image</FormLabel>
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
              <FormField
                control={form.control}
                name="videoReviewUrlDesktop"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video Review Desktop</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="videoReviewUrlMobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video Review Mobile</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="websiteType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website Type</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select website type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Choose Type</SelectLabel>
                            {websiteTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="realizedAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Realized Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <div className="relative">
                            <Input
                              readOnly
                              value={
                                field.value
                                  ? format(field.value, 'dd.MM.yyyy')
                                  : ''
                              }
                              placeholder="Select a date"
                              className="pr-10 cursor-pointer"
                            />
                            <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                          </div>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="complexity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Complexity</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select complexity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Complexity Levels</SelectLabel>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isCommercial"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2 mb-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="cursor-pointer !mt-0">
                      Commercial Project
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isPublic"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2 mb-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="cursor-pointer !mt-0">
                      Public Project
                    </FormLabel>
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
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select technology" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>
                                    Available Technologies
                                  </SelectLabel>
                                  {allowedTechnologies.map((tech, i) => (
                                    <SelectItem key={i} value={tech}>
                                      {tech}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
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

              {!!form.formState.errors.root?.message && (
                <FormItem>
                  <FormMessage>
                    {form.formState.errors.root.message}
                  </FormMessage>
                </FormItem>
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
              <BreadcrumbLink href="/admin/all-projects">
                All Projects
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
