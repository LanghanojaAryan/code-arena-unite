import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { AppSidebar } from "@/components/layout/Sidebar";
import { StudentDashboard } from "@/components/dashboard/StudentDashboard";
import { FacultyDashboard } from "@/components/dashboard/FacultyDashboard";
import { ProblemList } from "@/components/problems/ProblemList";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { 
  Trophy, 
  BookOpen, 
  BarChart3, 
  FileText 
} from "lucide-react";

const Index = () => {
  const [userRole, setUserRole] = useState('student');
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleRoleSwitch = (role) => {
    setUserRole(role);
    setActiveTab('dashboard'); // Reset to dashboard when switching roles
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return userRole === 'student' ? <StudentDashboard /> : <FacultyDashboard />;
      case 'problems':
        return <ProblemList />;
      case 'contests':
        return (
          <div className="flex items-center justify-center h-64 glass rounded-xl border border-primary/20">
            <div className="text-center">
              <Trophy className="h-16 w-16 text-primary mx-auto mb-4 animate-pulse" />
              <p className="text-muted-foreground text-lg">Contests page coming soon...</p>
              <p className="text-muted-foreground text-sm mt-2">Get ready for epic coding battles! 🏆</p>
            </div>
          </div>
        );
      case 'classes':
        return (
          <div className="flex items-center justify-center h-64 glass rounded-xl border border-primary/20">
            <div className="text-center">
              <BookOpen className="h-16 w-16 text-primary mx-auto mb-4 animate-pulse" />
              <p className="text-muted-foreground text-lg">Classes page coming soon...</p>
              <p className="text-muted-foreground text-sm mt-2">Learn together, grow together! 📚</p>
            </div>
          </div>
        );
      case 'leaderboard':
        return (
          <div className="flex items-center justify-center h-64 glass rounded-xl border border-primary/20">
            <div className="text-center">
              <BarChart3 className="h-16 w-16 text-primary mx-auto mb-4 animate-pulse" />
              <p className="text-muted-foreground text-lg">Leaderboard page coming soon...</p>
              <p className="text-muted-foreground text-sm mt-2">Climb to the top! 🚀</p>
            </div>
          </div>
        );
      case 'exams':
        return (
          <div className="flex items-center justify-center h-64 glass rounded-xl border border-primary/20">
            <div className="text-center">
              <FileText className="h-16 w-16 text-primary mx-auto mb-4 animate-pulse" />
              <p className="text-muted-foreground text-lg">Exams page coming soon...</p>
              <p className="text-muted-foreground text-sm mt-2">Test your skills! ✅</p>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="flex items-center justify-center h-64 glass rounded-xl border border-primary/20">
            <div className="text-center">
              <BarChart3 className="h-16 w-16 text-primary mx-auto mb-4 animate-pulse" />
              <p className="text-muted-foreground text-lg">Analytics page coming soon...</p>
              <p className="text-muted-foreground text-sm mt-2">Insights at your fingertips! 📊</p>
            </div>
          </div>
        );
      default:
        return userRole === 'student' ? <StudentDashboard /> : <FacultyDashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background w-full">
        {/* Header with sidebar trigger */}
        <header className="h-16 flex items-center border-b border-primary/20 bg-card px-4 relative z-50">
          <SidebarTrigger className="mr-2" />
          <div className="flex-1">
            <Header 
              userRole={userRole} 
              onRoleSwitch={handleRoleSwitch}
            />
          </div>
        </header>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full bg-success/5 blur-2xl animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>
        
        <div className="flex w-full">
          <AppSidebar 
            userRole={userRole}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          
          <main className="flex-1 relative z-10">
            <div className="container max-w-7xl mx-auto p-6">
              <div className="animate-fade-in">
                {renderContent()}
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;