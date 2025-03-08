'use client';

import * as React from 'react';
import {
  AudioWaveform,
  BookOpen,
  Command,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  Home,
  LayoutDashboardIcon,
  HammerIcon,
  LaptopIcon,
  Briefcase,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { NavProjects } from './nav-projects';
import { TeamSwitcher } from './team-switcher';
import { NavUser } from './nav-user';

const data = {
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: 'Dashboard',
      url: '/admin/dashboard',
      icon: LayoutDashboardIcon,
      items: [
        {
          title: 'Employees',
          url: '/admin/dashboard/employees',
        },
        {
          title: 'Teams',
          url: '/admin/dashboard/teams',
        },
        {
          title: 'Users',
          url: '/admin/dashboard/users',
        },
      ],
    },
    {
      title: 'Home Page',
      url: '#',
      icon: Home,
      isActive: false,
      items: [
        {
          title: 'Navigation',
          url: '/admin/home/navigation',
        },
        {
          title: 'Hero Section',
          url: '/admin/home/hero',
        },
        {
          title: 'Social Links',
          url: '/admin/home/social-links',
        },
        {
          title: 'Statistics',
          url: '/admin/home/statistics',
        },
        {
          title: 'Resume',
          url: '/admin/home/resume',
        },
      ],
    },
    {
      title: 'Services',
      url: '#',
      icon: LaptopIcon,
      items: [
        {
          title: 'Services Operation',
          url: '/admin/services',
        },
      ],
    },
    {
      title: 'Resume',
      url: '#',
      icon: Briefcase,
      items: [
        {
          title: 'Resume Sidebar Text',
          url: '/admin/resume/text',
        },
        {
          title: 'Resume Sidebar Navigation',
          url: '/admin/resume/navigation',
        },
      ],
    },
    {
      title: 'Documentation',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: 'Introduction',
          url: '#',
        },
        {
          title: 'Get Started',
          url: '#',
        },
        {
          title: 'Tutorials',
          url: '#',
        },
        {
          title: 'Changelog',
          url: '#',
        },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: 'Team',
          url: '#',
        },
        {
          title: 'Billing',
          url: '#',
        },
        {
          title: 'Limits',
          url: '#',
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Project Actions ',
      url: '/admin/all-projects',
      icon: HammerIcon,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
    },
  ],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}
export function AppSidebar({ user, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
