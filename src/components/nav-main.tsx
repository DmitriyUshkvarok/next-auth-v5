'use client';
import {
  ChevronRight,
  type LucideIcon,
  Palette,
  Sun,
  Moon,
  Monitor,
} from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { useTheme } from 'next-themes';
import LocaleSwitcher from './ui/LocaleSwitcher.tsx/LocaleSwitcher';

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
      icon?: LucideIcon;
    }[];
  }[];
}) {
  const [openGeneral, setOpenGeneral] = useState(false);
  const { setTheme } = useTheme();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      {subItem.title === 'General' ? (
                        <>
                          <SidebarMenuSubButton
                            asChild
                            onClick={() => setOpenGeneral(!openGeneral)}
                          >
                            <div className="flex items-center justify-between cursor-pointer">
                              <span>{subItem.title}</span>
                              <ChevronRight
                                className={`ml-auto transition-transform duration-200 ${openGeneral ? 'rotate-90' : ''}`}
                              />
                            </div>
                          </SidebarMenuSubButton>
                          {openGeneral && (
                            <SidebarMenuSub className="ml-4">
                              <SidebarMenuSubItem>
                                <SidebarMenuSubButton asChild>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        variant="outline"
                                        // size="icon"
                                        className="bg-transparent hover:bg-transparent border-none px-[0.5rem]"
                                      >
                                        <Palette className="mr-2" /> Theme
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem
                                        onClick={() => setTheme('light')}
                                      >
                                        <Sun className="mr-2" /> Light
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={() => setTheme('dark')}
                                      >
                                        <Moon className="mr-2" /> Dark
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={() => setTheme('system')}
                                      >
                                        <Monitor className="mr-2" /> System
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                              <SidebarMenuSubItem>
                                <SidebarMenuSubButton asChild>
                                  <div className="flex items-center justify-start gap-4">
                                    <LocaleSwitcher />

                                    <div>Localization</div>
                                  </div>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            </SidebarMenuSub>
                          )}
                        </>
                      ) : (
                        <SidebarMenuSubButton asChild>
                          <a href={subItem.url}>
                            <span>{subItem.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      )}
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
