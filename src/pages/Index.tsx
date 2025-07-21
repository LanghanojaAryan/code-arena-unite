import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { StudentDashboard } from "@/components/dashboard/StudentDashboard";
import { FacultyDashboard } from "@/components/dashboard/FacultyDashboard";
import { ProblemList } from "@/components/problems/ProblemList";
import { cn } from "@/lib/utils";

const Index = () => {
  const [userRole, setUserRole] = useState<'student' | 'faculty'>('student');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleRoleSwitch = (role: 'student' | 'faculty') => {
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
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Contests page coming soon...</p>
          </div>
        );
      case 'classes':
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Classes page coming soon...</p>
          </div>
        );
      case 'leaderboard':
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Leaderboard page coming soon...</p>
          </div>
        );
      case 'exams':
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Exams page coming soon...</p>
          </div>
        );
      case 'analytics':
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Analytics page coming soon...</p>
          </div>
        );
      default:
        return userRole === 'student' ? <StudentDashboard /> : <FacultyDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole={userRole} 
        onRoleSwitch={handleRoleSwitch}
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <div className="flex">
        <Sidebar 
          userRole={userRole}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isOpen={sidebarOpen}
        />
        
        <main className={cn(
          "flex-1 transition-all duration-300",
          sidebarOpen ? "ml-64" : "ml-16"
        )}>
          <div className="container max-w-7xl mx-auto p-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
