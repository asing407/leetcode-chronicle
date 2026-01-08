import { motion } from 'framer-motion';

type DifficultyType = 'Easy' | 'Medium' | 'Hard';

interface DifficultyCardProps {
  difficulty: DifficultyType;
  count: number;
  total: number;
  delay?: number;
  isActive?: boolean;
  onClick?: () => void;
}

const difficultyConfig = {
  Easy: {
    gradient: 'gradient-easy',
    textColor: 'text-easy',
    bgColor: 'bg-easy/10',
    borderColor: 'border-easy/30',
    activeBorder: 'border-easy',
    total: 800,
  },
  Medium: {
    gradient: 'gradient-medium',
    textColor: 'text-medium',
    bgColor: 'bg-medium/10',
    borderColor: 'border-medium/30',
    activeBorder: 'border-medium',
    total: 1700,
  },
  Hard: {
    gradient: 'gradient-hard',
    textColor: 'text-hard',
    bgColor: 'bg-hard/10',
    borderColor: 'border-hard/30',
    activeBorder: 'border-hard',
    total: 500,
  },
};

export function DifficultyCard({ 
  difficulty, 
  count, 
  total, 
  delay = 0,
  isActive = false,
  onClick
}: DifficultyCardProps) {
  const config = difficultyConfig[difficulty];
  const percentage = total > 0 ? Math.round((count / total) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ scale: 1.02, y: -4 }}
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-2xl border-2 p-6 transition-all backdrop-blur-xl shadow-lg
        ${config.bgColor} bg-opacity-70
        ${isActive ? config.activeBorder : config.borderColor}
        ${onClick ? 'cursor-pointer' : ''}
      `}
    >
      {/* Gradient accent */}
      <div className={`absolute top-0 left-0 w-full h-1 ${config.gradient}`} />
      
      <div className="flex items-center justify-between mb-4">
        <span className={`text-lg font-semibold ${config.textColor}`}>
          {difficulty}
        </span>
        <span className={`text-xs ${config.bgColor} ${config.textColor} px-2 py-1 rounded-full`}>
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
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: delay + 0.3, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}
