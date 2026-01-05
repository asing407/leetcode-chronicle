import { motion } from 'framer-motion';
import { Code2, Brain, Layers } from 'lucide-react';
import type { LeetCodeProblem } from '@/hooks/useGitHubLeetCode';
import { useMemo } from 'react';

interface SkillsSectionProps {
  problems?: LeetCodeProblem[];
}

interface SkillTag {
  name: string;
  count: number;
  level: 'advanced' | 'intermediate' | 'beginner';
}

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

export function SkillsSection({ problems = [] }: SkillsSectionProps) {
  // Calculate skills from problems
  const { skillTags, languages, topStrength, mostSolved } = useMemo(() => {
    // Count languages
    const langCount: Record<string, number> = {};
    problems.forEach(p => {
      langCount[p.language] = (langCount[p.language] || 0) + 1;
    });
    
    const languages = Object.keys(langCount).sort((a, b) => langCount[b] - langCount[a]);
    
    // For now, generate skill tags based on languages since we don't have problem tags
    // In a full implementation, you'd parse tags from the problems
    const skillTags: SkillTag[] = languages.map((lang, idx) => ({
      name: lang,
      count: langCount[lang],
      level: idx === 0 ? 'advanced' : idx < 3 ? 'intermediate' : 'beginner'
    }));

    const topStrength = languages[0] || 'N/A';
    const mostSolved = problems.length;

    return { skillTags, languages, topStrength, mostSolved };
  }, [problems]);

  return (
    <section id="skills" className="py-16 bg-card/50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-foreground mb-2">Technical Skills</h2>
          <p className="text-muted-foreground">Languages and patterns from your solutions</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Skills Cloud */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-card rounded-3xl border border-border p-8"
          >
            <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-primary" />
              Languages Used
            </h3>
            
            {skillTags.length > 0 ? (
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
            ) : (
              <p className="text-muted-foreground text-sm">
                Connect your LeetHub repository to see your language usage.
              </p>
            )}
            
            {/* Legend */}
            {skillTags.length > 0 && (
              <div className="flex items-center gap-6 mt-8 pt-6 border-t border-border">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full gradient-primary" />
                  <span className="text-sm text-muted-foreground">Primary</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-secondary" />
                  <span className="text-sm text-muted-foreground">Secondary</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-muted" />
                  <span className="text-sm text-muted-foreground">Exploring</span>
                </div>
              </div>
            )}
          </motion.div>

          {/* Skill Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg gradient-primary">
                  <Brain className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground">Primary Language</h3>
              </div>
              <p className="text-2xl font-bold text-foreground mb-1">{topStrength}</p>
              <p className="text-sm text-muted-foreground">
                Most used language in your solutions
              </p>
            </div>

            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-easy/20">
                  <Layers className="w-5 h-5 text-easy" />
                </div>
                <h3 className="font-semibold text-foreground">Total Solved</h3>
              </div>
              <p className="text-2xl font-bold text-foreground mb-1">{mostSolved} Problems</p>
              <p className="text-sm text-muted-foreground">
                Across all difficulty levels
              </p>
            </div>

            {languages.length > 0 && (
              <div className="bg-gradient-to-br from-primary/10 to-transparent rounded-2xl border border-primary/20 p-6">
                <h3 className="font-semibold text-foreground mb-3">All Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang) => (
                    <span 
                      key={lang}
                      className="px-3 py-1.5 rounded-lg bg-background/50 text-sm text-foreground border border-border"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
