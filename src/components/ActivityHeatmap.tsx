import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { activityData, groupByWeeks, getMonthLabels, getActivityStats, type ActivityDay } from '@/data/activityData';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const levelColors = {
  0: 'bg-muted',
  1: 'bg-easy/30',
  2: 'bg-easy/50',
  3: 'bg-easy/70',
  4: 'bg-easy',
};

export function ActivityHeatmap() {
  const [hoveredDay, setHoveredDay] = useState<ActivityDay | null>(null);
  
  const weeks = useMemo(() => groupByWeeks(activityData), []);
  const monthLabels = useMemo(() => getMonthLabels(activityData), []);
  const stats = useMemo(() => getActivityStats(activityData), []);

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
      className="bg-card rounded-3xl border border-border p-6 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Activity</h3>
          <p className="text-sm text-muted-foreground">
            {stats.totalProblems} problems solved in the last year
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
                {/* Pad the first week if it doesn't start on Sunday */}
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
                
                {/* Pad the last week if needed */}
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
            <span className="font-medium text-foreground">{stats.activeDays}</span> active days
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Current streak: <span className="font-medium text-foreground">{stats.currentStreak}</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Longest streak: <span className="font-medium text-foreground">{stats.longestStreak}</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
