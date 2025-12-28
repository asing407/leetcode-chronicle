import { motion } from 'framer-motion';
import { skillTags } from '@/data/mockProblems';

const levelColors = {
  advanced: 'gradient-primary',
  intermediate: 'bg-secondary',
  beginner: 'bg-muted',
};

const levelTextColors = {
  advanced: 'text-primary-foreground',
  intermediate: 'text-secondary-foreground',
  beginner: 'text-muted-foreground',
};

export function SkillsCloud() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-wrap gap-3"
    >
      {skillTags.map((tag, index) => (
        <motion.div
          key={tag.name}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.3, 
            delay: index * 0.05,
            type: "spring",
            stiffness: 200 
          }}
          whileHover={{ scale: 1.05, y: -2 }}
          className={`
            px-4 py-2 rounded-full 
            ${levelColors[tag.level]} 
            ${levelTextColors[tag.level]}
            border border-border/50
            cursor-default
            transition-shadow hover:shadow-md
          `}
        >
          <span className="text-sm font-medium">{tag.name}</span>
          <span className="ml-2 text-xs opacity-70">×{tag.count}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}
