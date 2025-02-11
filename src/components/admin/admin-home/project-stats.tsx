import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  AlertTriangleIcon,
  BadgeCheckIcon,
  LaptopIcon,
  PartyPopperIcon,
  UserCheck2Icon,
  UserRoundXIcon,
  FolderArchive,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import ProjectsCompletedTrends from './projects-completed-trend-of';

export default function ProjectsStats() {
  const totalProjects = 100;
  const projectsPresent = 80;
  const projectsPresentPercentage = (projectsPresent / totalProjects) * 100;

  return (
    <>
      <div className="grid lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total Projects</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="flex gap-2">
              <FolderArchive />
              <div className="text-5xl font-bold">{totalProjects}</div>
            </div>
            <div>
              <Button size="lg" asChild>
                <Link href="/dashboard/employees">View all</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Projects present</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              {projectsPresentPercentage > 75 ? (
                <UserCheck2Icon />
              ) : (
                <UserRoundXIcon />
              )}
              <div className="text-5xl font-bold">{projectsPresent}</div>
            </div>
          </CardContent>
          <CardFooter>
            {projectsPresentPercentage > 75 ? (
              <span className="text-xs text-green-500 flex gap-1 items-center">
                <BadgeCheckIcon />
                {projectsPresentPercentage}% of projects are present
              </span>
            ) : (
              <span className="text-xs text-red-500 flex gap-1 items-center">
                <AlertTriangleIcon />
                Only {projectsPresentPercentage}% of projects are present
              </span>
            )}
          </CardFooter>
        </Card>
        <Card
          className=" flex flex-col"
          style={{ borderColor: 'hsl(var(--chart-1))' }}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Projects of the month</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-2 items-center">
            <Avatar>
              <Image
                src="/banner-next-auth.png"
                width={50}
                height={50}
                alt="Employee of the month avatar"
                className="object-cover"
              />
              <AvatarFallback>CM</AvatarFallback>
            </Avatar>
            <span className="text-2xl">Colin Murray!</span>
          </CardContent>
          <CardFooter className="flex gap-2 items-center text-xs text-muted-foreground mt-auto">
            <PartyPopperIcon className="text-pink-500" />
            <span>Congratulations, Colin!</span>
          </CardFooter>
        </Card>
      </div>
      <Card className="my-4">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <LaptopIcon />
            <span>Trend of completed projects</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pl-0">
          <ProjectsCompletedTrends />
        </CardContent>
      </Card>
    </>
  );
}
