import { motion } from 'framer-motion';
import { TrendingUp, Target, Zap, Calendar, Loader2 } from 'lucide-react';
import { CircularProgress } from './CircularProgress';
import { DifficultyCard } from './DifficultyCard';
import { stats as mockStats } from '@/data/mockProblems';
import type { LeetCodeStats } from '@/hooks/useGitHubLeetCode';

interface StatsSectionProps {
  stats?: LeetCodeStats | null;
  isLoading?: boolean;
}

export function StatsSection({ stats: githubStats, isLoading }: StatsSectionProps) {
  // Use GitHub stats if available, otherwise fall back to mock data
  const stats = githubStats ? {
    totalSolved: githubStats.totalSolved,
    totalProblems: 3500, // Approximate total LeetCode problems
    easy: githubStats.easy,
    medium: githubStats.medium,
    hard: githubStats.hard,
    currentStreak: mockStats.currentStreak,
    maxStreak: mockStats.maxStreak,
  } : mockStats;

  return (
    <section id="stats" className="py-16">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-foreground mb-2">Statistics</h2>
          <p className="text-muted-foreground">My LeetCode journey at a glance</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Progress Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-5 bg-card rounded-3xl border border-border p-8 flex flex-col items-center justify-center relative"
          >
            {isLoading && (
              <div className="absolute inset-0 bg-card/80 backdrop-blur-sm rounded-3xl flex items-center justify-center z-10">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            )}
            <CircularProgress 
              value={stats.totalSolved} 
              max={stats.totalProblems} 
              size={200}
              label="problems solved"
            />
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-6 mt-8 w-full">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.currentStreak}</p>
                  <p className="text-xs text-muted-foreground">Current Streak</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                <div className="p-2 rounded-lg bg-medium/10">
                  <TrendingUp className="w-5 h-5 text-medium" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.maxStreak}</p>
                  <p className="text-xs text-muted-foreground">Max Streak</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Difficulty Breakdown */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <DifficultyCard 
              difficulty="Easy" 
              count={stats.easy} 
              total={800}
              delay={0.1}
            />
            <DifficultyCard 
              difficulty="Medium" 
              count={stats.medium} 
              total={1700}
              delay={0.2}
            />
            <DifficultyCard 
              difficulty="Hard" 
              count={stats.hard} 
              total={500}
              delay={0.3}
            />
            
            {/* Additional Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="sm:col-span-3 bg-card rounded-2xl border border-border p-6"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-foreground">
                      {Math.round((stats.totalSolved / stats.totalProblems) * 100)}%
                    </p>
                    <p className="text-sm text-muted-foreground">Completion</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-easy/10">
                    <Calendar className="w-6 h-6 text-easy" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-foreground">127</p>
                    <p className="text-sm text-muted-foreground">Active Days</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-medium/10">
                    <TrendingUp className="w-6 h-6 text-medium" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-foreground">2.3</p>
                    <p className="text-sm text-muted-foreground">Avg/Day</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-hard/10">
                    <Zap className="w-6 h-6 text-hard" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-foreground">Top 8%</p>
                    <p className="text-sm text-muted-foreground">Global Rank</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
