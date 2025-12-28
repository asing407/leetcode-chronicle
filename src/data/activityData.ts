// Generate mock activity data for the past year
export interface ActivityDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

function generateMockActivity(): ActivityDay[] {
  const days: ActivityDay[] = [];
  const today = new Date();
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  // Start from the beginning of the week
  const startDate = new Date(oneYearAgo);
  startDate.setDate(startDate.getDate() - startDate.getDay());

  const endDate = new Date(today);
  
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0];
    
    // Generate random activity with some patterns
    const dayOfWeek = d.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    // Base probability influenced by day of week
    let probability = isWeekend ? 0.3 : 0.6;
    
    // Add some streaks
    const weekNum = Math.floor((d.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
    if (weekNum % 4 < 2) probability += 0.2; // More active every other 2 weeks
    
    const hasActivity = Math.random() < probability;
    let count = 0;
    
    if (hasActivity) {
      // Generate 1-5 problems solved
      const rand = Math.random();
      if (rand < 0.4) count = 1;
      else if (rand < 0.7) count = 2;
      else if (rand < 0.85) count = 3;
      else if (rand < 0.95) count = 4;
      else count = 5;
    }
    
    // Determine intensity level
    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (count === 1) level = 1;
    else if (count === 2) level = 2;
    else if (count <= 4) level = 3;
    else if (count >= 5) level = 4;
    
    days.push({
      date: dateStr,
      count,
      level,
    });
  }
  
  return days;
}

export const activityData = generateMockActivity();

// Group by week for calendar display
export function groupByWeeks(data: ActivityDay[]): ActivityDay[][] {
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

// Get month labels
export function getMonthLabels(data: ActivityDay[]): { month: string; index: number }[] {
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

// Calculate stats
export function getActivityStats(data: ActivityDay[]) {
  const totalProblems = data.reduce((sum, day) => sum + day.count, 0);
  const activeDays = data.filter(day => day.count > 0).length;
  
  // Current streak
  let currentStreak = 0;
  const today = new Date().toISOString().split('T')[0];
  
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i].date === today && data[i].count === 0) continue;
    if (data[i].count > 0) {
      currentStreak++;
    } else {
      break;
    }
  }
  
  // Longest streak
  let longestStreak = 0;
  let tempStreak = 0;
  
  data.forEach(day => {
    if (day.count > 0) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  });
  
  return {
    totalProblems,
    activeDays,
    currentStreak,
    longestStreak,
  };
}
