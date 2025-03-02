import {
  getMonthlyDevelopmentStats,
  getPortfolioAnalytics,
  getAvailableYearsAndMonths,
} from '@/action/portfolioAction';
import ProjectsStats from '@/components/admin/admin-home/projects/project-stats';
import ProjectsTypes from '@/components/admin/admin-home/projectsTypes/projects-types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AdminPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    year?: number;
  }>;
}) => {
  const { year } = await searchParams;
  const currentYear = year ? Number(year) : new Date().getFullYear();

  const portfolioAnalytics = await getPortfolioAnalytics({});
  const monthlyDevelopmentStats = await getMonthlyDevelopmentStats({
    year: currentYear,
  });
  const availableYearsAndMonths = await getAvailableYearsAndMonths();

  return (
    <>
      <Tabs defaultValue="projects" className="px-4">
        <TabsList className="mb-4">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="types">Types</TabsTrigger>
        </TabsList>
        <TabsContent value="projects">
          <ProjectsStats
            stats={portfolioAnalytics}
            data={monthlyDevelopmentStats}
            yearsAndMonths={availableYearsAndMonths}
            selectedYear={currentYear.toString()}
          />
        </TabsContent>
        <TabsContent value="types">
          <ProjectsTypes stats={portfolioAnalytics} />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default AdminPage;
