import { Github, Linkedin, Flame, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { stats } from '@/data/mockProblems';

export function Header() {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 glass border-b border-border/50"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo / Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
              <span className="font-bold text-lg text-primary-foreground">LC</span>
            </div>
            <div>
              <h1 className="font-semibold text-lg text-foreground">LeetCode Portfolio</h1>
              <p className="text-xs text-muted-foreground">by Alex Developer</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a 
              href="#stats" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Statistics
            </a>
            <a 
              href="#skills" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Skills
            </a>
            <a 
              href="#problems" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Problems
            </a>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Streak Counter */}
            <motion.div 
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Flame className="w-4 h-4 text-medium" />
              <span className="text-sm font-medium text-foreground">{stats.currentStreak}</span>
              <span className="text-xs text-muted-foreground">day streak</span>
            </motion.div>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-5 h-5 text-foreground" />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="w-5 h-5 text-foreground" />
              </motion.a>
              <motion.a
                href="https://leetcode.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink className="w-5 h-5 text-foreground" />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
