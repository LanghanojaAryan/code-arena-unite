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
  FileText,
  Sparkles
} from "lucide-react";

export function Sidebar({ userRole, activeTab, onTabChange, isOpen }) {
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
      "fixed left-0 top-16 h-[calc(100vh-4rem)] gradient-card border-r border-primary/20 transition-all duration-300 z-40 glass",
      isOpen ? "w-64" : "w-16"
    )}>
      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "default" : "ghost"}
            className={cn(
              "w-full justify-start gap-3 transition-all hover:bg-primary/10 group",
              !isOpen && "justify-center px-0",
              activeTab === item.id && "gradient-primary text-white shadow-lg hover:shadow-xl"
            )}
            onClick={() => onTabChange(item.id)}
          >
            <item.icon className={cn(
              "h-5 w-5 transition-transform group-hover:scale-110",
              activeTab === item.id && "text-white"
            )} />
            {isOpen && (
              <span className="truncate">{item.label}</span>
            )}
          </Button>
        ))}
        
        {isOpen && (
          <div className="pt-4 border-t border-primary/20 mt-4">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 hover:bg-primary/10 group"
            >
              <Settings className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="truncate">Settings</span>
            </Button>
          </div>
        )}
      </nav>
      
      {/* Enhanced Quick Stats */}
      {isOpen && (
        <div className="absolute bottom-4 left-4 right-4 space-y-3">
          <div className="p-4 glass rounded-xl border border-primary/20">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 rounded-full bg-primary/20">
                <Zap className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-semibold">Progress</span>
              <Sparkles className="h-3 w-3 text-primary ml-auto" />
            </div>
            {userRole === 'student' ? (
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Problems Solved</span>
                  <span className="font-bold text-primary">47/200</span>
                </div>
                <div className="w-full bg-secondary/50 rounded-full h-2 overflow-hidden">
                  <div className="gradient-primary h-2 rounded-full transition-all duration-500" style={{width: '23.5%'}}></div>
                </div>
                <div className="text-xs text-center text-muted-foreground">
                  🔥 12-day streak!
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Active Contests</span>
                  <Badge variant="secondary" className="text-xs gradient-primary text-white">3</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Total Students</span>
                  <Badge variant="secondary" className="text-xs bg-success/20 text-success border-success/30">156</Badge>
                </div>
                <div className="text-xs text-center text-muted-foreground">
                  📊 87% active rate
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}