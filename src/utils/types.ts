export type actionFunction = (
  prevState: unknown,
  formData: FormData
) => Promise<{ message: string }>;

export type PortfolioProject = {
  id: string;
  title: string | null;
  description: string | null;
  realizedAt: Date;
  technologies: string[] | null;
  image: string;
  githubUrl: string;
  websiteUrl: string;
  order?: number;
  budget?: string;
  createdAt?: Date;
};

export type PortfolioProjectResponse = {
  success: boolean;
  message: string;
  projects: PortfolioProject[];
};
