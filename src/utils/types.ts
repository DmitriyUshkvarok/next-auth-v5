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
  videoReviewUrlDesktop: string | null;
  videoReviewUrlMobile: string | null;
  websiteType: string | null;
  isCommercial: boolean | null;
  isPublic: boolean | null;
  complexity: string | null;
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

interface PublicComplexityStats {
  complexity: { complexity: string; count: number }[];
  isPublic: { isPublic: boolean; count: number }[];
}
export interface ProjectStatsProps {
  totalProjects: number;
  totalBudget: number;
  commercial: {
    projects: number;
    budget: number;
  };
  nonCommercial: {
    projects: number;
    budget: number;
  };
  websiteTypes: {
    count: number;
    type: string;
  }[];
  publicComplexityStats: PublicComplexityStats;
}
