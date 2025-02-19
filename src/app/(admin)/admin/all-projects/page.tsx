import {
  getFilteredPortfolioProjects,
  getTechnologies,
  getAvailableYearsAndMonths,
} from '@/action/portfolioAction';
import PortfolioProjectsContainer from '@/components/admin/admin-projects/portfolioProjectsContainer/portfolioProjectsContainer';
import NavSearch from '@/components/ui/navSearch/NavSearch';
import TechnologiesSelect from '@/components/ui/technologiesSelect/TechnologiesSelect';
import DynamicPagination from '@/components/ui/dynamicPagination/DynamicPagination';
import TechnologyDenamicGrapic from '@/components/admin/admin-projects/technologyDenamicGrapic/technologyDenamicGrapic';
import YearAndMonthSelect from '@/components/ui/yearAndMonthSelect/YearAndMonthSelect';

const AllProjectPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    technology?: string;
    year?: number;
    month?: number;
    page?: number;
  }>;
}) => {
  const { search, technology, year, month, page = '1' } = await searchParams;
  const currentPage = Number(page);
  const currentYear = year ? Number(year) : undefined;
  const currentMonth = month ? Number(month) : undefined;
  console.log('year', year);
  console.log('month', month);

  const allTechnologies = await getTechnologies();
  const yearsAndMonthsData = await getAvailableYearsAndMonths();
  const { projects, totalPages } = await getFilteredPortfolioProjects({
    search,
    technology,
    currentPage,
    year: currentYear,
    month: currentMonth,
  });
  if (!projects) return [];

  return (
    <main className="px-4 flex flex-col min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <NavSearch />
        <div className="flex items-center gap-4">
          <YearAndMonthSelect yearsAndMonthsData={yearsAndMonthsData} />
          <TechnologiesSelect allTechnologies={allTechnologies} />
        </div>
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

      <TechnologyDenamicGrapic allTechnologies={allTechnologies} />
    </main>
  );
};

export default AllProjectPage;
