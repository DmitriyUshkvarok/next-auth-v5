import UpdateProjectForm from '@/components/forms/updateProjectForm';
import { getPortfolioProjectById } from '@/action/portfolioAction';
const EditProjectPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const project = await getPortfolioProjectById(id);

  return (
    <div>
      <UpdateProjectForm id={id} project={project} />
    </div>
  );
};

export default EditProjectPage;
