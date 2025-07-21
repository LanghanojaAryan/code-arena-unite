import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Trophy,
  Code,
  BookOpen,
  Clock,
  TrendingUp,
  Target,
  Calendar,
  Award
} from "lucide-react";

export function StudentDashboard() {
  const recentSubmissions = [
    { problem: "Two Sum", status: "Accepted", time: "2h ago", difficulty: "Easy" },
    { problem: "Binary Tree Traversal", status: "Wrong Answer", time: "4h ago", difficulty: "Medium" },
    { problem: "Longest Substring", status: "Accepted", time: "1d ago", difficulty: "Medium" },
  ];

  const upcomingContests = [
    { name: "Weekly Contest 127", date: "Tomorrow, 10:00 AM", participants: 234 },
    { name: "Algorithms Challenge", date: "Dec 15, 2:00 PM", participants: 156 },
  ];

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Problems Solved</CardTitle>
            <Code className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">+3 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Acceptance Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">73%</div>
            <p className="text-xs text-muted-foreground">+2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contest Ranking</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#23</div>
            <p className="text-xs text-muted-foreground">Top 15%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Streak</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 days</div>
            <p className="text-xs text-muted-foreground">Keep it up!</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Progress Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Easy Problems</span>
                <span className="text-sm font-medium">32/50</span>
              </div>
              <Progress value={64} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Medium Problems</span>
                <span className="text-sm font-medium">12/75</span>
              </div>
              <Progress value={16} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Hard Problems</span>
                <span className="text-sm font-medium">3/25</span>
              </div>
              <Progress value={12} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Submissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentSubmissions.map((submission, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{submission.problem}</span>
                    <span className="text-xs text-muted-foreground">{submission.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={submission.difficulty === 'Easy' ? 'secondary' : submission.difficulty === 'Medium' ? 'default' : 'destructive'}
                      className="text-xs"
                    >
                      {submission.difficulty}
                    </Badge>
                    <Badge 
                      variant={submission.status === 'Accepted' ? 'default' : 'destructive'}
                      className="text-xs"
                    >
                      {submission.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-3">
              View All Submissions
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Contests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Contests
          </CardTitle>
          <CardDescription>
            Join contests to improve your ranking and skills
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingContests.map((contest, index) => (
              <div key={index} className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{contest.name}</h4>
                  <Trophy className="h-4 w-4 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground mb-2">{contest.date}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs">{contest.participants} participants</span>
                  <Button size="sm">Register</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}