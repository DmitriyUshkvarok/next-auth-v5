export type actionFunction = (
  prevState: unknown,
  formData: FormData
) => Promise<{ message: string }>;

export type PortfolioProject = {
  id: string;
  userId: string;
  title: string | null;
  description: string | null;
  realizedAt: Date | null;
  technologies: { name: string; icon: string }[] | null;
  image: string | null;
  githubUrl: string | null;
  websiteUrl: string | null;
  order: number | null;
  budget: string | null;
  createdAt: Date | null;
};

export interface PortfolioSearchParams {
  search?: string;
  month?: number;
  year?: number;
  technology?: string;
  currentPage?: number;
  pageSize?: number;
}
