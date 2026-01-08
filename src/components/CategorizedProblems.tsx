import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  ChevronRight, 
  ExternalLink, 
  Clock, 
  HardDrive, 
  CheckCircle,
  Layers,
  Code2,
  Search
} from 'lucide-react';
import type { LeetCodeProblem } from '@/hooks/useGitHubLeetCode';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface CategorizedProblemsProps {
  problems: LeetCodeProblem[];
  isLoading?: boolean;
}

// DSA category definitions with icons and semantic colors
const DSA_CATEGORIES = {
  'Array': { icon: '📊', color: 'bg-primary/10 text-primary border-primary/30' },
  'String': { icon: '📝', color: 'bg-accent text-accent-foreground border-accent-foreground/30' },
  'Hash Table': { icon: '🗂️', color: 'bg-primary/10 text-primary border-primary/30' },
  'Linked List': { icon: '🔗', color: 'bg-medium/10 text-medium border-medium/30' },
  'Stack': { icon: '📚', color: 'bg-hard/10 text-hard border-hard/30' },
  'Queue': { icon: '📋', color: 'bg-medium/10 text-medium border-medium/30' },
  'Tree': { icon: '🌳', color: 'bg-easy/10 text-easy border-easy/30' },
  'Binary Tree': { icon: '🌲', color: 'bg-easy/10 text-easy border-easy/30' },
  'Graph': { icon: '🕸️', color: 'bg-primary/10 text-primary border-primary/30' },
  'Dynamic Programming': { icon: '🧮', color: 'bg-hard/10 text-hard border-hard/30' },
  'Greedy': { icon: '💰', color: 'bg-medium/10 text-medium border-medium/30' },
  'Binary Search': { icon: '🔍', color: 'bg-primary/10 text-primary border-primary/30' },
  'Two Pointers': { icon: '👆', color: 'bg-easy/10 text-easy border-easy/30' },
  'Sliding Window': { icon: '🪟', color: 'bg-primary/10 text-primary border-primary/30' },
  'Backtracking': { icon: '🔙', color: 'bg-hard/10 text-hard border-hard/30' },
  'Recursion': { icon: '🔄', color: 'bg-medium/10 text-medium border-medium/30' },
  'Sorting': { icon: '📈', color: 'bg-primary/10 text-primary border-primary/30' },
  'Math': { icon: '🔢', color: 'bg-muted text-muted-foreground border-border' },
  'Bit Manipulation': { icon: '💻', color: 'bg-muted text-muted-foreground border-border' },
  'Heap': { icon: '⛰️', color: 'bg-medium/10 text-medium border-medium/30' },
  'DFS': { icon: '🔽', color: 'bg-easy/10 text-easy border-easy/30' },
  'BFS': { icon: '➡️', color: 'bg-primary/10 text-primary border-primary/30' },
  'Trie': { icon: '🌿', color: 'bg-easy/10 text-easy border-easy/30' },
  'Union Find': { icon: '🔀', color: 'bg-primary/10 text-primary border-primary/30' },
  'Matrix': { icon: '🔲', color: 'bg-muted text-muted-foreground border-border' },
  'Design': { icon: '🏗️', color: 'bg-medium/10 text-medium border-medium/30' },
  'Simulation': { icon: '🎮', color: 'bg-primary/10 text-primary border-primary/30' },
  'Divide and Conquer': { icon: '✂️', color: 'bg-hard/10 text-hard border-hard/30' },
  'Memoization': { icon: '📝', color: 'bg-hard/10 text-hard border-hard/30' },
  'Other': { icon: '📦', color: 'bg-muted text-muted-foreground border-border' },
};

type CategoryKey = keyof typeof DSA_CATEGORIES;

const difficultyStyles = {
  Easy: 'bg-easy/10 text-easy border-easy/30',
  Medium: 'bg-medium/10 text-medium border-medium/30',
  Hard: 'bg-hard/10 text-hard border-hard/30',
};

export function CategorizedProblems({ problems, isLoading }: CategorizedProblemsProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [selectedProblem, setSelectedProblem] = useState<LeetCodeProblem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Categorize problems by their tags
  const categorizedProblems = useMemo(() => {
    const categories: Record<string, LeetCodeProblem[]> = {};
    
    problems.forEach(problem => {
      const tags = problem.tags?.length > 0 ? problem.tags : ['Other'];
      
      tags.forEach(tag => {
        // Normalize tag name
        const normalizedTag = Object.keys(DSA_CATEGORIES).find(
          cat => cat.toLowerCase() === tag.toLowerCase() || 
                 tag.toLowerCase().includes(cat.toLowerCase())
        ) || tag;
        
        if (!categories[normalizedTag]) {
          categories[normalizedTag] = [];
        }
        // Avoid duplicates in the same category
        if (!categories[normalizedTag].some(p => p.id === problem.id)) {
          categories[normalizedTag].push(problem);
        }
      });
    });

    // Sort categories by problem count (descending)
    const sortedCategories = Object.entries(categories)
      .sort((a, b) => b[1].length - a[1].length);

    return sortedCategories;
  }, [problems]);

  // Filter categories and problems based on search
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categorizedProblems;
    
    const query = searchQuery.toLowerCase();
    return categorizedProblems
      .map(([category, probs]) => {
        const filteredProblems = probs.filter(p => 
          p.title.toLowerCase().includes(query) ||
          p.id.includes(query) ||
          category.toLowerCase().includes(query)
        );
        return [category, filteredProblems] as [string, LeetCodeProblem[]];
      })
      .filter(([_, probs]) => probs.length > 0);
  }, [categorizedProblems, searchQuery]);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const getCategoryStyle = (category: string): typeof DSA_CATEGORIES[CategoryKey] => {
    const key = Object.keys(DSA_CATEGORIES).find(
      k => k.toLowerCase() === category.toLowerCase()
    ) as CategoryKey | undefined;
    return key ? DSA_CATEGORIES[key] : DSA_CATEGORIES['Other'];
  };

  const totalProblems = problems.length;
  const totalCategories = filteredCategories.length;

  if (isLoading) {
    return (
      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center py-20">
            <div className="animate-pulse text-muted-foreground">Loading categories...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Layers className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Problems by Category</h2>
          </div>
          <p className="text-muted-foreground">
            {totalProblems} problems organized across {totalCategories} DSA categories
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by category or problem..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredCategories.map(([category, categoryProblems]) => {
            const isExpanded = expandedCategories.has(category);
            const categoryStyle = getCategoryStyle(category);
            const easyCount = categoryProblems.filter(p => p.difficulty === 'Easy').length;
            const mediumCount = categoryProblems.filter(p => p.difficulty === 'Medium').length;
            const hardCount = categoryProblems.filter(p => p.difficulty === 'Hard').length;

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card/70 backdrop-blur-xl rounded-xl border border-border/50 overflow-hidden shadow-lg"
              >
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{categoryStyle.icon}</span>
                    <div className="text-left">
                      <h3 className="font-semibold text-foreground">{category}</h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{categoryProblems.length} problems</span>
                        <span className="text-easy">E:{easyCount}</span>
                        <span className="text-medium">M:{mediumCount}</span>
                        <span className="text-hard">H:{hardCount}</span>
                      </div>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  </motion.div>
                </button>

                {/* Expanded Problems List */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-border divide-y divide-border">
                        {categoryProblems.slice(0, 20).map((problem) => (
                          <div
                            key={problem.id}
                            className={cn(
                              "p-4 hover:bg-muted/30 transition-colors cursor-pointer",
                              selectedProblem?.id === problem.id && "bg-primary/5"
                            )}
                            onClick={() => setSelectedProblem(
                              selectedProblem?.id === problem.id ? null : problem
                            )}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex items-start gap-3 flex-1 min-w-0">
                                <CheckCircle className="w-5 h-5 text-easy flex-shrink-0 mt-0.5" />
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-sm text-muted-foreground">#{problem.id}</span>
                                    <h4 className="font-medium text-foreground truncate">
                                      {problem.title}
                                    </h4>
                                  </div>
                                  
                                  {/* Expanded Details */}
                                  <AnimatePresence>
                                    {selectedProblem?.id === problem.id && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="mt-3 space-y-3"
                                      >
                                        {/* Tags */}
                                        {problem.tags && problem.tags.length > 0 && (
                                          <div className="flex flex-wrap gap-1.5">
                                            {problem.tags.map(tag => (
                                              <span
                                                key={tag}
                                                className={cn(
                                                  "px-2 py-0.5 rounded-full text-xs border",
                                                  getCategoryStyle(tag).color
                                                )}
                                              >
                                                {tag}
                                              </span>
                                            ))}
                                          </div>
                                        )}

                                        {/* Complexity Info */}
                                        <div className="flex flex-wrap gap-4 text-sm">
                                          {problem.timeComplexity && (
                                            <div className="flex items-center gap-1.5">
                                              <Clock className="w-4 h-4 text-primary" />
                                              <span className="text-muted-foreground">Time:</span>
                                              <code className="font-mono text-foreground bg-muted px-1.5 py-0.5 rounded">
                                                {problem.timeComplexity}
                                              </code>
                                            </div>
                                          )}
                                          {problem.spaceComplexity && (
                                            <div className="flex items-center gap-1.5">
                                              <HardDrive className="w-4 h-4 text-easy" />
                                              <span className="text-muted-foreground">Space:</span>
                                              <code className="font-mono text-foreground bg-muted px-1.5 py-0.5 rounded">
                                                {problem.spaceComplexity}
                                              </code>
                                            </div>
                                          )}
                                          <div className="flex items-center gap-1.5">
                                            <Code2 className="w-4 h-4 text-medium" />
                                            <span className="text-muted-foreground">Lang:</span>
                                            <span className="text-foreground">{problem.language}</span>
                                          </div>
                                        </div>

                                        {/* Action Links */}
                                        <div className="flex gap-2 pt-1">
                                          <a
                                            href={problem.solutionUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                                          >
                                            <ExternalLink className="w-4 h-4" />
                                            View Solution
                                          </a>
                                          <a
                                            href={`https://leetcode.com/problems/${problem.slug}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-border rounded-lg hover:bg-muted transition-colors"
                                          >
                                            <ExternalLink className="w-4 h-4" />
                                            LeetCode
                                          </a>
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              </div>

                              <Badge 
                                variant="outline" 
                                className={cn("flex-shrink-0", difficultyStyles[problem.difficulty])}
                              >
                                {problem.difficulty}
                              </Badge>
                            </div>
                          </div>
                        ))}
                        
                        {categoryProblems.length > 20 && (
                          <div className="p-3 text-center text-sm text-muted-foreground">
                            +{categoryProblems.length - 20} more problems
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Layers className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No categories found matching your search.</p>
          </div>
        )}
      </div>
    </section>
  );
}