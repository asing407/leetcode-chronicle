import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, CheckCircle, ExternalLink, Code2, Loader2 } from 'lucide-react';
import { problems as mockProblems, type Problem, type Difficulty } from '@/data/mockProblems';
import { ProblemModal } from './ProblemModal';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import type { LeetCodeProblem } from '@/hooks/useGitHubLeetCode';

const languageIcons: Record<string, string> = {
  Python: '🐍',
  JavaScript: '🟨',
  TypeScript: '🔷',
  Java: '☕',
  'C++': '⚡',
  Go: '🐹',
  C: '🔧',
  Rust: '🦀',
  Ruby: '💎',
  Swift: '🍎',
  Kotlin: '🟣',
  'C#': '🟩',
  PHP: '🐘',
  Scala: '🔴',
  Shell: '🐚',
  SQL: '🗃️',
};

const difficultyStyles: Record<Difficulty, string> = {
  Easy: 'bg-easy/10 text-easy border-easy/30',
  Medium: 'bg-medium/10 text-medium border-medium/30',
  Hard: 'bg-hard/10 text-hard border-hard/30',
};

interface ProblemsTableProps {
  githubProblems?: LeetCodeProblem[];
  isLoading?: boolean;
}

export function ProblemsTable({ githubProblems, isLoading }: ProblemsTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'All'>('All');
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);

  // Convert GitHub problems to display format or use mock data
  const displayProblems = useMemo(() => {
    if (githubProblems && githubProblems.length > 0) {
      return githubProblems.map((p): Problem & { solutionUrl?: string } => ({
        id: parseInt(p.id) || 0,
        title: p.title,
        slug: p.slug,
        difficulty: p.difficulty,
        status: 'Accepted' as const,
        timeComplexity: '-',
        spaceComplexity: '-',
        language: p.language as any,
        tags: [],
        code: '',
        explanation: '',
        solutionUrl: p.solutionUrl,
      }));
    }
    return mockProblems;
  }, [githubProblems]);

  const filteredProblems = useMemo(() => {
    return displayProblems.filter((problem) => {
      const matchesSearch = 
        problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        problem.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesDifficulty = 
        selectedDifficulty === 'All' || problem.difficulty === selectedDifficulty;

      return matchesSearch && matchesDifficulty;
    });
  }, [searchQuery, selectedDifficulty, displayProblems]);

  const isUsingGitHub = githubProblems && githubProblems.length > 0;

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
          <p className="text-muted-foreground">
            {isUsingGitHub 
              ? 'Synced from your LeetHub repository' 
              : 'Click any problem to view the solution'}
          </p>
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
              placeholder="Search by name..."
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

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <span className="ml-3 text-muted-foreground">Fetching problems from GitHub...</span>
          </div>
        )}

        {/* Problems Table */}
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl border border-border overflow-hidden"
          >
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-border bg-muted/30 text-sm font-medium text-muted-foreground">
              <div className="col-span-1">Status</div>
              <div className={isUsingGitHub ? "col-span-6" : "col-span-4"}>Problem</div>
              <div className="col-span-2">Difficulty</div>
              {!isUsingGitHub && (
                <>
                  <div className="col-span-2">Time</div>
                  <div className="col-span-2">Space</div>
                </>
              )}
              <div className="col-span-1">Lang</div>
              {isUsingGitHub && <div className="col-span-2">Link</div>}
            </div>

            {/* Table Body */}
            <div className="divide-y divide-border">
              <AnimatePresence>
                {filteredProblems.map((problem, index) => (
                  <motion.div
                    key={`${problem.id}-${problem.title}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: Math.min(index * 0.02, 0.5) }}
                    onClick={() => !isUsingGitHub && setSelectedProblem(problem)}
                    className={`grid grid-cols-12 gap-4 px-6 py-4 transition-colors group ${
                      !isUsingGitHub ? 'cursor-pointer hover:bg-muted/30' : ''
                    }`}
                  >
                    {/* Status */}
                    <div className="col-span-1 flex items-center">
                      <CheckCircle className="w-5 h-5 text-easy" />
                    </div>

                    {/* Problem Name */}
                    <div className={isUsingGitHub ? "col-span-6" : "col-span-4"}>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground text-sm">#{problem.id}</span>
                        <span className={`font-medium text-foreground ${!isUsingGitHub ? 'group-hover:text-primary' : ''} transition-colors`}>
                          {problem.title}
                        </span>
                      </div>
                      {problem.tags && problem.tags.length > 0 && (
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
                      )}
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

                    {/* Time/Space Complexity - only for mock data */}
                    {!isUsingGitHub && (
                      <>
                        <div className="col-span-2 flex items-center">
                          <code className="text-sm font-mono text-muted-foreground">
                            {problem.timeComplexity}
                          </code>
                        </div>
                        <div className="col-span-2 flex items-center">
                          <code className="text-sm font-mono text-muted-foreground">
                            {problem.spaceComplexity}
                          </code>
                        </div>
                      </>
                    )}

                    {/* Language */}
                    <div className="col-span-1 flex items-center">
                      <span className="text-lg" title={problem.language}>
                        {languageIcons[problem.language] || <Code2 className="w-5 h-5" />}
                      </span>
                    </div>

                    {/* GitHub Link */}
                    {isUsingGitHub && 'solutionUrl' in problem && problem.solutionUrl && (
                      <div className="col-span-2 flex items-center">
                        <a
                          href={problem.solutionUrl as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1 text-sm text-primary hover:underline"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View
                        </a>
                      </div>
                    )}
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
        )}

        {/* Results Count */}
        {!isLoading && (
          <p className="text-sm text-muted-foreground mt-4">
            Showing {filteredProblems.length} of {displayProblems.length} problems
          </p>
        )}
      </div>

      {/* Problem Modal - only for mock data */}
      {!isUsingGitHub && (
        <ProblemModal 
          problem={selectedProblem} 
          onClose={() => setSelectedProblem(null)} 
        />
      )}
    </section>
  );
}
