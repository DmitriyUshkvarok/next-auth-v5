import {
  getMonthlyDevelopmentStats,
  getPortfolioAnalytics,
} from '@/action/portfolioAction';
import ProjectsStats from '@/components/admin/admin-home/projects/project-stats';
import ProjectsTypes from '@/components/admin/admin-home/projectsTypes/projects-types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AdminPage = async () => {
  const portfolioAnalytics = await getPortfolioAnalytics({});
  const monthlyDevelopmentStats = await getMonthlyDevelopmentStats({
    year: 2024,
  });

  console.log(portfolioAnalytics);
  console.log(monthlyDevelopmentStats);
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
