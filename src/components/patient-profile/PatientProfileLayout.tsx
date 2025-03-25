'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Calendar,
  ClipboardList,
  Folder,
  MessageSquare,
  User,
  CalendarDays,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

const navigation = [
  { name: 'Профиль', href: '/patient-profile', icon: User },
  { name: 'Приемы', href: '/patient-profile/appointments', icon: Calendar },
  { name: 'Диагнозы', href: '/patient-profile/diagnoses', icon: ClipboardList },
  { name: 'Файлы', href: '/patient-profile/files', icon: Folder },
  { name: 'Чат', href: '/patient-profile/chat', icon: MessageSquare },
  {
    name: 'Запись на прием',
    href: '/patient-profile/book',
    icon: CalendarDays,
  },
];

interface PatientProfileLayoutProps {
  children: React.ReactNode;
}

const PatientProfileLayout: React.FC<PatientProfileLayoutProps> = ({
  children,
}) => {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col">
          <div className="flex min-h-0 flex-1 flex-col border-r">
            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
              <div className="flex flex-shrink-0 items-center px-4">
                <h1 className="text-xl font-semibold">МедКарта</h1>
              </div>
              <ScrollArea className="mt-5 flex-1 px-2">
                <nav className="space-y-1">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors',
                          isActive
                            ? 'bg-accent text-accent-foreground'
                            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                        )}
                      >
                        <item.icon
                          className={cn(
                            'mr-3 h-6 w-6 flex-shrink-0',
                            isActive
                              ? 'text-accent-foreground'
                              : 'text-muted-foreground group-hover:text-accent-foreground'
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
              </ScrollArea>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-1 flex-col">
          <main className="flex-1">
            <div className="py-6">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default PatientProfileLayout;
