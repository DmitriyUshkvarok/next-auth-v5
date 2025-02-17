import {
  getFilteredPortfolioProjects,
  getTechnologies,
} from '@/action/portfolioAction';
import PortfolioProjectsContainer from '@/components/portfolioProjectsContainer/portfolioProjectsContainer';
import NavSearch from '@/components/ui/navSearch/NavSearch';
import TechnologiesSelect from '@/components/ui/technologiesSelect/TechnologiesSelect';
import DynamicPagination from '@/components/ui/dynamicPagination/DynamicPagination';
const AllProjectPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    technology?: string;
    page?: number;
  }>;
}) => {
  const { search, technology, page = '1' } = await searchParams;
  const currentPage = Number(page);

  const allTechnologies = await getTechnologies();
  const { projects, totalPages } = await getFilteredPortfolioProjects({
    search,
    technology,
    currentPage,
  });
  if (!projects) return [];
  console.log(totalPages);

  return (
    <main className="px-4 flex flex-col min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <NavSearch />
        <TechnologiesSelect allTechnologies={allTechnologies} />
      </div>

      <div className="flex-1">
        <PortfolioProjectsContainer projects={projects} />
      </div>

      {totalPages > 1 && (
        <div className="mt-auto py-4">
          <DynamicPagination
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      )}
    </main>
  );
};

export default AllProjectPage;
