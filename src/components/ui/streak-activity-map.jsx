import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame } from "lucide-react";

// Generate activity data for the past year (simplified)
const generateActivityData = () => {
  const data = [];
  const today = new Date();
  
  // Go back 365 days
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Random activity level (0-4)
    const level = Math.random() > 0.3 ? Math.floor(Math.random() * 5) : 0;
    
    data.push({
      date: date.toISOString().split('T')[0],
      level,
      problems: level * Math.floor(Math.random() * 3) + level
    });
  }
  
  return data;
};

const activityData = generateActivityData();

const getIntensityClass = (level) => {
  const intensities = {
    0: 'bg-muted',
    1: 'bg-success/20',
    2: 'bg-success/40', 
    3: 'bg-success/70',
    4: 'bg-success'
  };
  return intensities[level] || 'bg-muted';
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  });
};

export function StreakActivityMap() {
  // Group data by weeks for display
  const weeks = [];
  for (let i = 0; i < activityData.length; i += 7) {
    weeks.push(activityData.slice(i, i + 7));
  }

  const currentStreak = 47;
  const longestStreak = 89;
  const totalContributions = activityData.filter(d => d.level > 0).length;

  return (
    <Card className="glass backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flame className="h-5 w-5" />
          Problem Solving Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{currentStreak}</div>
              <p className="text-xs text-muted-foreground">Current Streak</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-success">{longestStreak}</div>
              <p className="text-xs text-muted-foreground">Longest Streak</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">{totalContributions}</div>
              <p className="text-xs text-muted-foreground">Active Days</p>
            </div>
          </div>

          {/* Activity Map */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Less</span>
              <span>More</span>
            </div>
            
            <div className="grid grid-cols-53 gap-1 max-w-full overflow-hidden">
              {activityData.map((day, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-sm ${getIntensityClass(day.level)} hover:scale-110 transition-transform cursor-pointer`}
                  title={`${formatDate(day.date)}: ${day.problems} problems solved`}
                />
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-1 mt-2">
              {[0, 1, 2, 3, 4].map(level => (
                <div
                  key={level}
                  className={`w-2 h-2 rounded-sm ${getIntensityClass(level)}`}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}