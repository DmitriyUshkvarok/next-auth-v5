import { ProjectStatsProps } from '@/utils/types';
import ProjectsTypesTrend from './projects-types-trend';

const ProjectsTypes = ({ stats }: { stats: ProjectStatsProps }) => {
  return (
    <div>
      <ProjectsTypesTrend stats={stats} />
    </div>
  );
};

export default ProjectsTypes;
