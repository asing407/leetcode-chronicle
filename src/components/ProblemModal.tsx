import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Copy, Check, Clock, Cpu, HardDrive } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState } from 'react';
import type { Problem, Difficulty } from '@/data/mockProblems';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ProblemModalProps {
  problem: Problem | null;
  onClose: () => void;
}

const difficultyStyles: Record<Difficulty, string> = {
  Easy: 'bg-easy/10 text-easy border-easy/30',
  Medium: 'bg-medium/10 text-medium border-medium/30',
  Hard: 'bg-hard/10 text-hard border-hard/30',
};

const languageMap: Record<string, string> = {
  Python: 'python',
  JavaScript: 'javascript',
  TypeScript: 'typescript',
  Java: 'java',
  'C++': 'cpp',
  Go: 'go',
};

export function ProblemModal({ problem, onClose }: ProblemModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (problem) {
      await navigator.clipboard.writeText(problem.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {problem && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-2xl bg-card border-l border-border z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-card/95 backdrop-blur border-b border-border p-6 z-10">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm text-muted-foreground">#{problem.id}</span>
                    <Badge 
                      variant="outline" 
                      className={difficultyStyles[problem.difficulty]}
                    >
                      {problem.difficulty}
                    </Badge>
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">{problem.title}</h2>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="rounded-full"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {problem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-muted text-sm text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Complexity Info */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Time:</span>
                  <code className="font-mono text-foreground">{problem.timeComplexity}</code>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <HardDrive className="w-4 h-4 text-easy" />
                  <span className="text-muted-foreground">Space:</span>
                  <code className="font-mono text-foreground">{problem.spaceComplexity}</code>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Cpu className="w-4 h-4 text-medium" />
                  <span className="text-muted-foreground">Language:</span>
                  <span className="text-foreground">{problem.language}</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              {/* Explanation */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Approach</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {problem.explanation}
                </p>
              </div>

              {/* Code */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-foreground">Solution</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    className="gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-easy" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy Code
                      </>
                    )}
                  </Button>
                </div>
                <div className="rounded-xl overflow-hidden border border-border">
                  <SyntaxHighlighter
                    language={languageMap[problem.language] || 'python'}
                    style={oneDark}
                    customStyle={{
                      margin: 0,
                      padding: '1.5rem',
                      background: 'hsl(var(--muted))',
                      fontSize: '0.875rem',
                    }}
                    showLineNumbers
                    lineNumberStyle={{
                      color: 'hsl(var(--muted-foreground))',
                      opacity: 0.5,
                    }}
                  >
                    {problem.code}
                  </SyntaxHighlighter>
                </div>
              </div>

              {/* LeetCode Link */}
              <a
                href={`https://leetcode.com/problems/${problem.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-border bg-muted/50 text-foreground hover:bg-muted transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                View on LeetCode
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
