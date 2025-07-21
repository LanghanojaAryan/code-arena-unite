import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  BookOpen,
  Calendar,
  Code,
  Home,
  Trophy,
  Users,
  Zap,
  Settings,
  FileText
} from "lucide-react";

interface SidebarProps {
  userRole: 'student' | 'faculty';
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen: boolean;
}

export function Sidebar({ userRole, activeTab, onTabChange, isOpen }: SidebarProps) {
  const studentNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'problems', label: 'Problems', icon: Code },
    { id: 'contests', label: 'Contests', icon: Trophy },
    { id: 'classes', label: 'My Classes', icon: BookOpen },
    { id: 'leaderboard', label: 'Leaderboard', icon: BarChart3 },
  ];

  const facultyNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'problems', label: 'Problem Bank', icon: Code },
    { id: 'contests', label: 'Manage Contests', icon: Trophy },
    { id: 'classes', label: 'My Classes', icon: Users },
    { id: 'exams', label: 'Exams', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const navItems = userRole === 'student' ? studentNavItems : facultyNavItems;

  return (
    <div className={cn(
      "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-card border-r transition-all duration-300 z-40",
      isOpen ? "w-64" : "w-16"
    )}>
      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "default" : "ghost"}
            className={cn(
              "w-full justify-start gap-3",
              !isOpen && "justify-center px-0"
            )}
            onClick={() => onTabChange(item.id)}
          >
            <item.icon className="h-5 w-5" />
            {isOpen && (
              <span className="truncate">{item.label}</span>
            )}
          </Button>
        ))}
        
        {isOpen && (
          <div className="pt-4 border-t mt-4">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3"
            >
              <Settings className="h-5 w-5" />
              <span className="truncate">Settings</span>
            </Button>
          </div>
        )}
      </nav>
      
      {/* Quick Stats (only when sidebar is open) */}
      {isOpen && (
        <div className="absolute bottom-4 left-4 right-4 space-y-3">
          <div className="p-3 bg-primary/10 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Progress</span>
            </div>
            {userRole === 'student' ? (
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Problems Solved</span>
                  <span className="font-bold">47/200</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-1.5">
                  <div className="bg-primary h-1.5 rounded-full" style={{width: '23.5%'}}></div>
                </div>
              </div>
            ) : (
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>Active Contests</span>
                  <Badge variant="secondary" className="text-xs">3</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Total Students</span>
                  <Badge variant="secondary" className="text-xs">156</Badge>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}