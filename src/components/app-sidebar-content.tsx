"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { BookOpen, CheckSquare, FileText, Home, Settings, LifeBuoy, GraduationCap } from 'lucide-react'; // Added GraduationCap
import { cn } from '@/lib/utils';

export default function AppSidebarContent() {
  const pathname = usePathname();

  // Updated isActive to handle nested routes better
  const isActive = (path: string, exact = false) => {
    if (exact) {
      return pathname === path;
    }
    // For nested routes like /training/modules/*
    return pathname.startsWith(path);
  };


  return (
    <>
      <SidebarHeader>
        {/* Optionally add logo or branding here */}
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
           <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive('/', true)} // Exact match for dashboard
              tooltip={{ children: 'Dashboard', side: 'right' }}
            >
              <Link href="/">
                <Home />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
           <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive('/training', true)} // Training Overview Page (exact match)
              tooltip={{ children: 'Training Overview', side: 'right' }}
            >
              <Link href="/training">
                 <GraduationCap /> {/* Icon for overview */}
                <span>Training Overview</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              // isActive should check for /training/modules and its children
              isActive={isActive('/training/modules')}
              tooltip={{ children: 'Training Modules', side: 'right' }}
            >
              <Link href="/training/modules"> {/* Link to the modules list */}
                <BookOpen />
                <span>Training Modules</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive('/checklists')}
              tooltip={{ children: 'Cleaning Checklists', side: 'right' }}
            >
              <Link href="/checklists">
                <CheckSquare />
                <span>Cleaning Checklists</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive('/inspections')}
              tooltip={{ children: 'Inspection Reports', side: 'right' }}
            >
              <Link href="/inspections">
                <FileText />
                <span>Inspection Reports</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive('/settings')}
              tooltip={{ children: 'Settings', side: 'right' }}
            >
              <Link href="/settings">
                <Settings />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
           <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive('/support')}
              tooltip={{ children: 'Support', side: 'right' }}
            >
              <Link href="/support">
                <LifeBuoy />
                <span>Support</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
