import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CircularProgress } from "./circular-progress";
import { CheckCircle, Clock } from "lucide-react";

export function ProblemProgressCard({ 
  solved = 510, 
  total = 3625, 
  attempting = 8,
  difficulties = {
    easy: { solved: 162, total: 886 },
    medium: { solved: 287, total: 1884 },
    hard: { solved: 61, total: 855 }
  }
}) {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'success';
      case 'medium': return 'warning'; 
      case 'hard': return 'danger';
      default: return 'secondary';
    }
  };

  const getDifficultyLabel = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'Easy';
      case 'medium': return 'Med.';
      case 'hard': return 'Hard';
      default: return '';
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg">Problem Solving Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Circular Progress */}
          <div className="flex flex-col items-center space-y-4">
            <CircularProgress 
              value={solved} 
              max={total} 
              size={180}
              strokeWidth={12}
            >
              <div className="text-center">
                <div className="text-4xl font-bold text-foreground">{solved}</div>
                <div className="text-sm text-muted-foreground">/{total}</div>
                <div className="flex items-center justify-center gap-1 mt-2 text-success">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">Solved</span>
                </div>
              </div>
            </CircularProgress>
            
            {attempting > 0 && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{attempting} Attempting</span>
              </div>
            )}
          </div>

          {/* Difficulty Breakdown */}
          <div className="flex-1 space-y-6">
            {Object.entries(difficulties).map(([difficulty, { solved, total }]) => {
              const percentage = Math.round((solved / total) * 100);
              return (
                <div key={difficulty} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge 
                        variant={getDifficultyColor(difficulty)}
                        className="min-w-[60px] justify-center text-xs font-medium"
                      >
                        {getDifficultyLabel(difficulty)}
                      </Badge>
                      <span className="text-2xl font-bold text-foreground">
                        {solved}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">
                        /{total}
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        difficulty === 'easy' ? 'bg-success' :
                        difficulty === 'medium' ? 'bg-warning' : 'bg-danger'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    {percentage}% completed
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}