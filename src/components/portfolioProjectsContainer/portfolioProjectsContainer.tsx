import { getFilteredPortfolioProjects } from '@/action/portfolioAction';

const PortfolioProjectsContainer = async () => {
  const results = await getFilteredPortfolioProjects();

  if (results?.length === 0) {
    return <p>No portfolio projects found.</p>;
  }
  console.log(results);
  return (
    <ul>
      {results?.map((result) => (
        <li key={result.id}>
          <h2>{result.title}</h2>
        </li>
      ))}
    </ul>
  );
};

export default PortfolioProjectsContainer;
