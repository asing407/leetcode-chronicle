import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, CheckCircle, Clock, Code2 } from 'lucide-react';
import { problems, type Problem, type Difficulty } from '@/data/mockProblems';
import { ProblemModal } from './ProblemModal';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const languageIcons: Record<string, string> = {
  Python: '🐍',
  JavaScript: '🟨',
  TypeScript: '🔷',
  Java: '☕',
  'C++': '⚡',
  Go: '🐹',
};

const difficultyStyles: Record<Difficulty, string> = {
  Easy: 'bg-easy/10 text-easy border-easy/30',
  Medium: 'bg-medium/10 text-medium border-medium/30',
  Hard: 'bg-hard/10 text-hard border-hard/30',
};

export function ProblemsTable() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'All'>('All');
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);

  const filteredProblems = useMemo(() => {
    return problems.filter((problem) => {
      const matchesSearch = 
        problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        problem.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesDifficulty = 
        selectedDifficulty === 'All' || problem.difficulty === selectedDifficulty;

      return matchesSearch && matchesDifficulty;
    });
  }, [searchQuery, selectedDifficulty]);

  return (
    <section id="problems" className="py-16">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-foreground mb-2">Solved Problems</h2>
          <p className="text-muted-foreground">Click any problem to view the solution</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <div className="flex gap-2">
              {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-all
                    ${selectedDifficulty === diff 
                      ? diff === 'All' 
                        ? 'bg-primary text-primary-foreground' 
                        : difficultyStyles[diff as Difficulty]
                      : 'bg-card border border-border text-muted-foreground hover:text-foreground'
                    }
                  `}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Problems Table */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-card rounded-2xl border border-border overflow-hidden"
        >
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-border bg-muted/30 text-sm font-medium text-muted-foreground">
            <div className="col-span-1">Status</div>
            <div className="col-span-4">Problem</div>
            <div className="col-span-2">Difficulty</div>
            <div className="col-span-2">Time</div>
            <div className="col-span-2">Space</div>
            <div className="col-span-1">Lang</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-border">
            <AnimatePresence>
              {filteredProblems.map((problem, index) => (
                <motion.div
                  key={problem.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => setSelectedProblem(problem)}
                  className="grid grid-cols-12 gap-4 px-6 py-4 cursor-pointer hover:bg-muted/30 transition-colors group"
                >
                  {/* Status */}
                  <div className="col-span-1 flex items-center">
                    {problem.status === 'Accepted' ? (
                      <CheckCircle className="w-5 h-5 text-easy" />
                    ) : (
                      <Clock className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>

                  {/* Problem Name & Tags */}
                  <div className="col-span-4">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground text-sm">#{problem.id}</span>
                      <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {problem.title}
                      </span>
                    </div>
                    <div className="flex gap-1 mt-1 flex-wrap">
                      {problem.tags.slice(0, 2).map((tag) => (
                        <span 
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                      {problem.tags.length > 2 && (
                        <span className="text-xs text-muted-foreground">
                          +{problem.tags.length - 2}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Difficulty */}
                  <div className="col-span-2 flex items-center">
                    <Badge 
                      variant="outline" 
                      className={difficultyStyles[problem.difficulty]}
                    >
                      {problem.difficulty}
                    </Badge>
                  </div>

                  {/* Time Complexity */}
                  <div className="col-span-2 flex items-center">
                    <code className="text-sm font-mono text-muted-foreground">
                      {problem.timeComplexity}
                    </code>
                  </div>

                  {/* Space Complexity */}
                  <div className="col-span-2 flex items-center">
                    <code className="text-sm font-mono text-muted-foreground">
                      {problem.spaceComplexity}
                    </code>
                  </div>

                  {/* Language */}
                  <div className="col-span-1 flex items-center">
                    <span className="text-lg" title={problem.language}>
                      {languageIcons[problem.language] || <Code2 className="w-5 h-5" />}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty State */}
          {filteredProblems.length === 0 && (
            <div className="px-6 py-16 text-center">
              <p className="text-muted-foreground">No problems found matching your criteria</p>
            </div>
          )}
        </motion.div>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground mt-4">
          Showing {filteredProblems.length} of {problems.length} problems
        </p>
      </div>

      {/* Problem Modal */}
      <ProblemModal 
        problem={selectedProblem} 
        onClose={() => setSelectedProblem(null)} 
      />
    </section>
  );
}
