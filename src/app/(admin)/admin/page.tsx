import ProjectsStats from '@/components/admin/admin-home/project-stats';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AdminPage = () => {
  return (
    <>
      <Tabs defaultValue="projects" className="px-4">
        <TabsList className="mb-4">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>
        <TabsContent value="projects">
          <ProjectsStats />
        </TabsContent>
        <TabsContent value="skills">{/* <TeamsStats /> */}</TabsContent>
      </Tabs>
    </>
  );
};

export default AdminPage;
