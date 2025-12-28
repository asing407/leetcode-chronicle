import { motion } from 'framer-motion';
import { SkillsCloud } from './SkillsCloud';
import { Code2, Brain, Layers } from 'lucide-react';

export function SkillsSection() {
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
          <p className="text-muted-foreground">Topics mastered through problem solving</p>
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
              Problem Tags
            </h3>
            <SkillsCloud />
            
            {/* Legend */}
            <div className="flex items-center gap-6 mt-8 pt-6 border-t border-border">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full gradient-primary" />
                <span className="text-sm text-muted-foreground">Advanced</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-secondary" />
                <span className="text-sm text-muted-foreground">Intermediate</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-muted" />
                <span className="text-sm text-muted-foreground">Learning</span>
              </div>
            </div>
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
                <h3 className="font-semibold text-foreground">Top Strength</h3>
              </div>
              <p className="text-2xl font-bold text-foreground mb-1">Dynamic Programming</p>
              <p className="text-sm text-muted-foreground">
                Mastered bottom-up and top-down approaches with memoization
              </p>
            </div>

            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-easy/20">
                  <Layers className="w-5 h-5 text-easy" />
                </div>
                <h3 className="font-semibold text-foreground">Most Solved</h3>
              </div>
              <p className="text-2xl font-bold text-foreground mb-1">Array Problems</p>
              <p className="text-sm text-muted-foreground">
                10 problems solved using various array manipulation techniques
              </p>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-transparent rounded-2xl border border-primary/20 p-6">
              <h3 className="font-semibold text-foreground mb-3">Languages Used</h3>
              <div className="flex flex-wrap gap-2">
                {['Python', 'TypeScript', 'JavaScript', 'Java', 'C++'].map((lang) => (
                  <span 
                    key={lang}
                    className="px-3 py-1.5 rounded-lg bg-background/50 text-sm text-foreground border border-border"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
