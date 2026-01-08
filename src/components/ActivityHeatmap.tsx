import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import type { LeetCodeProblem } from '@/hooks/useGitHubLeetCode';

interface ActivityDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ActivityHeatmapProps {
  problems?: LeetCodeProblem[];
}

const levelColors = {
  0: 'bg-muted',
  1: 'bg-easy/30',
  2: 'bg-easy/50',
  3: 'bg-easy/70',
  4: 'bg-easy',
};

// Generate activity data from problems (placeholder - would need commit dates from GitHub)
function generateActivityFromProblems(problems: LeetCodeProblem[]): ActivityDay[] {
  const days: ActivityDay[] = [];
  const today = new Date();
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  // Start from the beginning of the week
  const startDate = new Date(oneYearAgo);
  startDate.setDate(startDate.getDate() - startDate.getDay());

  // For now, we'll generate empty data since we don't have commit dates
  // In a real implementation, you'd fetch commit history from GitHub
  for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
    days.push({
      date: d.toISOString().split('T')[0],
      count: 0,
      level: 0,
    });
  }

  return days;
}

function groupByWeeks(data: ActivityDay[]): ActivityDay[][] {
  const weeks: ActivityDay[][] = [];
  let currentWeek: ActivityDay[] = [];
  
  data.forEach((day, index) => {
    const date = new Date(day.date);
    const dayOfWeek = date.getDay();
    
    if (dayOfWeek === 0 && currentWeek.length > 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    
    currentWeek.push(day);
    
    if (index === data.length - 1 && currentWeek.length > 0) {
      weeks.push(currentWeek);
    }
  });
  
  return weeks;
}

function getMonthLabels(data: ActivityDay[]): { month: string; index: number }[] {
  const labels: { month: string; index: number }[] = [];
  let lastMonth = -1;
  
  const weeks = groupByWeeks(data);
  
  weeks.forEach((week, weekIndex) => {
    const firstDay = week[0];
    if (firstDay) {
      const date = new Date(firstDay.date);
      const month = date.getMonth();
      
      if (month !== lastMonth) {
        const monthName = date.toLocaleString('default', { month: 'short' });
        labels.push({ month: monthName, index: weekIndex });
        lastMonth = month;
      }
    }
  });
  
  return labels;
}

export function ActivityHeatmap({ problems = [] }: ActivityHeatmapProps) {
  const [hoveredDay, setHoveredDay] = useState<ActivityDay | null>(null);
  
  const activityData = useMemo(() => generateActivityFromProblems(problems), [problems]);
  const weeks = useMemo(() => groupByWeeks(activityData), [activityData]);
  const monthLabels = useMemo(() => getMonthLabels(activityData), [activityData]);

  // Calculate stats
  const activeDays = activityData.filter(day => day.count > 0).length;
  const totalProblems = activityData.reduce((sum, day) => sum + day.count, 0);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-card/70 backdrop-blur-xl rounded-3xl border border-border/50 p-6 overflow-hidden shadow-xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Activity</h3>
          <p className="text-sm text-muted-foreground">
            {problems.length} problems solved total
          </p>
        </div>
        
        {/* Legend */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`w-3 h-3 rounded-sm ${levelColors[level as keyof typeof levelColors]}`}
            />
          ))}
          <span>More</span>
        </div>
      </div>

      {/* Info message about activity tracking */}
      <div className="mb-6 p-4 bg-muted/30 rounded-lg border border-border">
        <p className="text-sm text-muted-foreground">
          📊 Activity heatmap will show your daily solving pattern once commit dates are integrated from GitHub.
        </p>
      </div>

      {/* Heatmap Container */}
      <div className="overflow-x-auto pb-2">
        <div className="inline-block min-w-full">
          {/* Month Labels */}
          <div className="flex mb-2 pl-8">
            {monthLabels.map((label, i) => (
              <div
                key={`${label.month}-${i}`}
                className="text-xs text-muted-foreground"
                style={{
                  position: 'relative',
                  left: `${label.index * 14}px`,
                  marginRight: i < monthLabels.length - 1 ? 
                    `${((monthLabels[i + 1]?.index || 0) - label.index - 1) * 14}px` : 0,
                }}
              >
                {label.month}
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="flex gap-1">
            {/* Day Labels */}
            <div className="flex flex-col gap-1 pr-2">
              <span className="h-3 text-xs text-muted-foreground opacity-0">S</span>
              <span className="h-3 text-xs text-muted-foreground">Mon</span>
              <span className="h-3 text-xs text-muted-foreground opacity-0">T</span>
              <span className="h-3 text-xs text-muted-foreground">Wed</span>
              <span className="h-3 text-xs text-muted-foreground opacity-0">T</span>
              <span className="h-3 text-xs text-muted-foreground">Fri</span>
              <span className="h-3 text-xs text-muted-foreground opacity-0">S</span>
            </div>

            {/* Weeks */}
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {weekIndex === 0 && week.length < 7 && (
                  <>
                    {Array(7 - week.length).fill(null).map((_, i) => (
                      <div key={`pad-${i}`} className="w-3 h-3" />
                    ))}
                  </>
                )}
                
                {week.map((day) => (
                  <Tooltip key={day.date}>
                    <TooltipTrigger asChild>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          delay: weekIndex * 0.01,
                          type: 'spring',
                          stiffness: 300,
                          damping: 20
                        }}
                        className={`
                          w-3 h-3 rounded-sm cursor-pointer transition-all
                          ${levelColors[day.level]}
                          hover:ring-2 hover:ring-primary/50 hover:ring-offset-1 hover:ring-offset-background
                        `}
                        onMouseEnter={() => setHoveredDay(day)}
                        onMouseLeave={() => setHoveredDay(null)}
                      />
                    </TooltipTrigger>
                    <TooltipContent 
                      side="top" 
                      className="bg-popover border border-border shadow-lg"
                    >
                      <p className="font-medium text-foreground">
                        {day.count === 0 
                          ? 'No problems' 
                          : `${day.count} problem${day.count > 1 ? 's' : ''} solved`
                        }
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(day.date)}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                ))}
                
                {weekIndex === weeks.length - 1 && week.length < 7 && (
                  <>
                    {Array(7 - week.length).fill(null).map((_, i) => (
                      <div key={`pad-end-${i}`} className="w-3 h-3" />
                    ))}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Footer */}
      <div className="flex items-center gap-6 mt-6 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-easy animate-pulse" />
          <span className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{activeDays}</span> active days
          </span>
        </div>
      </div>
    </motion.div>
  );
}
