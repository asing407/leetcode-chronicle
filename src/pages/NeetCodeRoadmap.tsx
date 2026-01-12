import { useState, useMemo, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardHeader } from '@/components/DashboardHeader';
import { Footer } from '@/components/Footer';
import { RoadmapTree } from '@/components/RoadmapTree';
import { BLIND_75, NEETCODE_150, type TopicProblems, type NeetCodeProblem } from '@/data/neetcodeData';
import { useAuth } from '@/contexts/AuthContext';
import { useGitHubLeetCode } from '@/hooks/useGitHubLeetCode';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  ExternalLink, 
  Check, 
  Circle, 
  ChevronRight, 
  Trophy, 
  Target,
  Loader2,
  ArrowLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function NeetCodeRoadmap() {
  const navigate = useNavigate();
  const { user, profile, isLoading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<'blind75' | 'neetcode150'>('blind75');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  // Get GitHub config from profile
  const githubConfig = profile?.github_repo_url ? (() => {
    try {
      const url = new URL(profile.github_repo_url);
      const parts = url.pathname.split('/').filter(Boolean);
      if (parts.length >= 2) {
        return { owner: parts[0], repo: parts[1] };
      }
    } catch {
      // Invalid URL
    }
    return null;
  })() : null;

  const { problems: solvedProblems, isLoading } = useGitHubLeetCode(githubConfig);

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  // Create a set of solved problem slugs for quick lookup
  const solvedSlugs = useMemo(() => {
    const slugs = new Set<string>();
    solvedProblems.forEach(p => {
      slugs.add(p.slug.toLowerCase());
      // Also add without hyphens for flexible matching
      slugs.add(p.slug.toLowerCase().replace(/-/g, ''));
    });
    return slugs;
  }, [solvedProblems]);

  // Check if a problem is solved
  const isProblemSolved = (problem: NeetCodeProblem) => {
    const slug = problem.slug.toLowerCase();
    return solvedSlugs.has(slug) || solvedSlugs.has(slug.replace(/-/g, ''));
  };

  // Get current roadmap data
  const currentRoadmap = activeTab === 'blind75' ? BLIND_75 : NEETCODE_150;

  // Calculate stats by topic
  const solvedByTopic = useMemo(() => {
    const stats: Record<string, { solved: number; total: number }> = {};
    currentRoadmap.forEach(topic => {
      const solved = topic.problems.filter(p => isProblemSolved(p)).length;
      stats[topic.topic] = { solved, total: topic.problems.length };
    });
    return stats;
  }, [currentRoadmap, solvedSlugs]);

  // Calculate overall progress
  const overallStats = useMemo(() => {
    const total = currentRoadmap.reduce((acc, t) => acc + t.problems.length, 0);
    const solved = currentRoadmap.reduce((acc, t) => 
      acc + t.problems.filter(p => isProblemSolved(p)).length, 0);
    return { total, solved };
  }, [currentRoadmap, solvedSlugs]);

  // Get selected topic data
  const selectedTopicData = selectedTopic 
    ? currentRoadmap.find(t => t.topic === selectedTopic) 
    : null;

  // Difficulty color classes
  const getDifficultyClass = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-easy bg-easy/10 border-easy/20';
      case 'Medium': return 'text-medium bg-medium/10 border-medium/20';
      case 'Hard': return 'text-hard bg-hard/10 border-hard/20';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="py-8">
        <div className="container mx-auto px-6">
          {/* Back button and title */}
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/dashboard')}
              className="shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">NeetCode Roadmaps</h1>
              <p className="text-muted-foreground">
                Structured learning paths for coding interviews
              </p>
            </div>
          </div>

          {/* Tab switcher */}
          <Tabs value={activeTab} onValueChange={(v) => {
            setActiveTab(v as 'blind75' | 'neetcode150');
            setSelectedTopic(null);
          }}>
            <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
              <TabsList className="h-12">
                <TabsTrigger value="blind75" className="px-6 gap-2">
                  <Trophy className="w-4 h-4" />
                  Blind 75
                </TabsTrigger>
                <TabsTrigger value="neetcode150" className="px-6 gap-2">
                  <Target className="w-4 h-4" />
                  NeetCode 150
                </TabsTrigger>
              </TabsList>

              {/* Overall progress */}
              <Card className="border-primary/20">
                <CardContent className="py-3 px-4 flex items-center gap-4">
                  <div className="text-sm text-muted-foreground">Progress:</div>
                  <div className="flex items-center gap-3">
                    <Progress 
                      value={(overallStats.solved / overallStats.total) * 100} 
                      className="w-32 h-2"
                    />
                    <span className="font-semibold text-foreground">
                      {overallStats.solved}/{overallStats.total}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      ({Math.round((overallStats.solved / overallStats.total) * 100)}%)
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <TabsContent value="blind75" className="mt-0">
              <RoadmapContent 
                selectedTopic={selectedTopic}
                setSelectedTopic={setSelectedTopic}
                solvedByTopic={solvedByTopic}
                selectedTopicData={selectedTopicData}
                isProblemSolved={isProblemSolved}
                getDifficultyClass={getDifficultyClass}
                isLoading={isLoading}
              />
            </TabsContent>
            
            <TabsContent value="neetcode150" className="mt-0">
              <RoadmapContent 
                selectedTopic={selectedTopic}
                setSelectedTopic={setSelectedTopic}
                solvedByTopic={solvedByTopic}
                selectedTopicData={selectedTopicData}
                isProblemSolved={isProblemSolved}
                getDifficultyClass={getDifficultyClass}
                isLoading={isLoading}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

// Separate component for roadmap content to avoid duplication
function RoadmapContent({
  selectedTopic,
  setSelectedTopic,
  solvedByTopic,
  selectedTopicData,
  isProblemSolved,
  getDifficultyClass,
  isLoading
}: {
  selectedTopic: string | null;
  setSelectedTopic: (topic: string | null) => void;
  solvedByTopic: Record<string, { solved: number; total: number }>;
  selectedTopicData: TopicProblems | null | undefined;
  isProblemSolved: (p: NeetCodeProblem) => boolean;
  getDifficultyClass: (d: string) => string;
  isLoading: boolean;
}) {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Tree visualization */}
      <Card className="overflow-hidden">
        <CardHeader className="border-b border-border">
          <CardTitle className="flex items-center gap-2">
            <span>Topic Roadmap</span>
            <Badge variant="outline" className="ml-2">Click a topic</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[700px]">
            <div className="p-4">
              <RoadmapTree 
                onTopicClick={setSelectedTopic}
                activeTopic={selectedTopic}
                solvedByTopic={solvedByTopic}
              />
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Problems list */}
      <Card>
        <CardHeader className="border-b border-border">
          <CardTitle className="flex items-center justify-between">
            <span>
              {selectedTopic ? (
                <span className="flex items-center gap-2">
                  {selectedTopicData?.icon} {selectedTopic}
                </span>
              ) : (
                'Select a Topic'
              )}
            </span>
            {selectedTopic && solvedByTopic[selectedTopic] && (
              <Badge variant="secondary">
                {solvedByTopic[selectedTopic].solved}/{solvedByTopic[selectedTopic].total} solved
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[650px]">
            <AnimatePresence mode="wait">
              {!selectedTopic ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-[400px] text-center p-8"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <ChevronRight className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Choose a Topic</h3>
                  <p className="text-muted-foreground max-w-xs">
                    Click on any topic in the roadmap tree to see its problems and track your progress.
                  </p>
                </motion.div>
              ) : isLoading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center h-[400px]"
                >
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </motion.div>
              ) : selectedTopicData ? (
                <motion.div
                  key={selectedTopic}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="divide-y divide-border"
                >
                  {selectedTopicData.problems.map((problem, index) => {
                    const solved = isProblemSolved(problem);
                    return (
                      <motion.a
                        key={problem.id}
                        href={problem.leetcodeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className={cn(
                          "flex items-center gap-4 p-4 hover:bg-accent/50 transition-colors group",
                          solved && "bg-easy/5"
                        )}
                      >
                        {/* Solved indicator */}
                        <div className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2",
                          solved 
                            ? "bg-easy border-easy text-easy-foreground" 
                            : "border-muted-foreground/30"
                        )}>
                          {solved ? (
                            <Check className="w-4 h-4 text-white" />
                          ) : (
                            <Circle className="w-3 h-3 text-muted-foreground/50" />
                          )}
                        </div>

                        {/* Problem info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground text-sm font-mono">
                              #{problem.id}
                            </span>
                            <span className={cn(
                              "font-medium truncate",
                              solved ? "text-foreground" : "text-foreground"
                            )}>
                              {problem.title}
                            </span>
                          </div>
                        </div>

                        {/* Difficulty badge */}
                        <Badge 
                          variant="outline" 
                          className={cn("shrink-0", getDifficultyClass(problem.difficulty))}
                        >
                          {problem.difficulty}
                        </Badge>

                        {/* External link icon */}
                        <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      </motion.a>
                    );
                  })}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
