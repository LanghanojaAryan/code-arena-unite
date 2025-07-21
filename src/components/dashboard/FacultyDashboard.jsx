import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  BookOpen,
  Trophy,
  FileText,
  Plus,
  BarChart3,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export function FacultyDashboard() {
  const recentActivity = [
    { action: "New student joined CS101", time: "2h ago", type: "student" },
    { action: "Contest 'Binary Trees' ended", time: "4h ago", type: "contest" },
    { action: "Exam results published for DS Course", time: "1d ago", type: "exam" },
  ];

  const activeContests = [
    { name: "Data Structures Final", students: 45, endTime: "2h remaining" },
    { name: "Algorithm Design Contest", students: 28, endTime: "1d 4h remaining" },
  ];

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">+12 this semester</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Classes</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">CS101, CS201, CS301, CS401</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Contests</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">2 ending today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Exam submissions</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks to manage your classes and contests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <Button className="h-auto p-4 flex flex-col items-center gap-2">
              <Plus className="h-5 w-5" />
              <span className="text-sm">Create Contest</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <BookOpen className="h-5 w-5" />
              <span className="text-sm">New Class</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <FileText className="h-5 w-5" />
              <span className="text-sm">Schedule Exam</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              <span className="text-sm">View Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Contests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Active Contests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeContests.map((contest, index) => (
                <div key={index} className="p-3 rounded-lg border bg-card">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{contest.name}</h4>
                    <Badge variant="secondary">{contest.students} students</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{contest.endTime}</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline">View Results</Button>
                    <Button size="sm" variant="outline">Monitor</Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Manage All Contests
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`p-1 rounded-full ${
                    activity.type === 'student' ? 'bg-primary/20' :
                    activity.type === 'contest' ? 'bg-warning/20' : 'bg-success/20'
                  }`}>
                    {activity.type === 'student' && <Users className="h-3 w-3" />}
                    {activity.type === 'contest' && <Trophy className="h-3 w-3" />}
                    {activity.type === 'exam' && <FileText className="h-3 w-3" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Activity
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Class Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Class Overview</CardTitle>
          <CardDescription>Performance summary of your classes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {['CS101', 'CS201', 'CS301', 'CS401'].map((classCode) => (
              <div key={classCode} className="p-4 rounded-lg border bg-card">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold">{classCode}</h4>
                  <Badge variant="outline">38 students</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-success" />
                      Active
                    </span>
                    <span>87% completion</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <AlertCircle className="h-3 w-3 text-warning" />
                      Pending
                    </span>
                    <span>5 submissions</span>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full mt-3">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}