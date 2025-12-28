import { motion } from 'framer-motion';
import type { Difficulty } from '@/data/mockProblems';

interface DifficultyCardProps {
  difficulty: Difficulty;
  count: number;
  total: number;
  delay?: number;
}

const difficultyConfig = {
  Easy: {
    gradient: 'gradient-easy',
    textColor: 'text-easy',
    bgColor: 'bg-easy/10',
    borderColor: 'border-easy/30',
    total: 800,
  },
  Medium: {
    gradient: 'gradient-medium',
    textColor: 'text-medium',
    bgColor: 'bg-medium/10',
    borderColor: 'border-medium/30',
    total: 1700,
  },
  Hard: {
    gradient: 'gradient-hard',
    textColor: 'text-hard',
    bgColor: 'bg-hard/10',
    borderColor: 'border-hard/30',
    total: 500,
  },
};

export function DifficultyCard({ difficulty, count, total, delay = 0 }: DifficultyCardProps) {
  const config = difficultyConfig[difficulty];
  const percentage = Math.round((count / total) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -4 }}
      className={`relative overflow-hidden rounded-2xl border ${config.borderColor} ${config.bgColor} p-6`}
    >
      {/* Gradient accent */}
      <div className={`absolute top-0 left-0 w-full h-1 ${config.gradient}`} />
      
      <div className="flex items-center justify-between mb-4">
        <span className={`text-lg font-semibold ${config.textColor}`}>
          {difficulty}
        </span>
        <span className="text-xs text-muted-foreground">
          {percentage}%
        </span>
      </div>

      <div className="flex items-baseline gap-2 mb-4">
        <motion.span 
          className="text-3xl font-bold text-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.2 }}
        >
          {count}
        </motion.span>
        <span className="text-muted-foreground">/ {total}</span>
      </div>

      {/* Progress bar */}
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <motion.div
          className={`h-full ${config.gradient}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: delay + 0.3, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}
