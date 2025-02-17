import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Globe } from 'lucide-react';
import { Button } from '../ui/button';
import { LuGithub } from 'react-icons/lu';
import Image from 'next/image';
import Link from 'next/link';
import { PortfolioProject } from '@/utils/types';
import NoDataFound from '../ui/noDataFound/NoDataFound';

const PortfolioProjectsContainer = async ({
  projects,
}: {
  projects: PortfolioProject[];
}) => {
  if (projects.length === 0) {
    return <NoDataFound message="No projects found in your portfolio" />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects?.map((project) => (
        <Card
          key={project.id}
          className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
        >
          <Link href={`/admin/all-projects/${project.id}`}>
            <CardHeader>
              <Image
                src={project.image || '/placeholder.png'}
                alt={project.title || 'project img'}
                width={200}
                height={100}
                className="w-full h-48 object-cover"
              />
              <CardTitle className="text-xl font-semibold">
                {project.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                {project.description}
              </CardDescription>
              <p className="mt-2 text-sm text-gray-400">
                Realized:{' '}
                {project.realizedAt
                  ? new Date(project.realizedAt).toLocaleDateString()
                  : 'Not realized'}
              </p>
            </CardContent>
          </Link>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm" asChild>
              <a
                href={project.githubUrl ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LuGithub className="w-4 h-4 mr-2" /> GitHub
              </a>
            </Button>
            <Button variant="default" size="sm" asChild>
              <a
                href={project.websiteUrl ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe className="w-4 h-4 mr-2" /> Сайт
              </a>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default PortfolioProjectsContainer;
