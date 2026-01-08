import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardHeader } from '@/components/DashboardHeader';
import { StatsSection } from '@/components/StatsSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ProblemsTable } from '@/components/ProblemsTable';
import { CategorizedProblems } from '@/components/CategorizedProblems';
import { ActivityHeatmap } from '@/components/ActivityHeatmap';
import { Footer } from '@/components/Footer';
import { GitHubSetup } from '@/components/GitHubSetup';
import { useAuth } from '@/contexts/AuthContext';
import { useGitHubLeetCode } from '@/hooks/useGitHubLeetCode';
import { RefreshCw, Settings, AlertCircle, Loader2, List, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type DifficultyFilter = 'all' | 'Easy' | 'Medium' | 'Hard';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, profile, isLoading: authLoading, updateProfile } = useAuth();
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('all');
  
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

  const { problems, stats, isLoading, error, lastFetched, refresh } = useGitHubLeetCode(githubConfig);

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  // Mark onboarding as complete when user connects repo
  useEffect(() => {
    if (profile && githubConfig && !profile.onboarding_completed) {
      updateProfile({ onboarding_completed: true });
    }
  }, [profile, githubConfig, updateProfile]);

  const handleClearConfig = async () => {
    await updateProfile({ 
      github_repo_url: null, 
      github_username: null,
      onboarding_completed: false 
    });
  };

  const handleRepoConnected = async (repoUrl: string, username: string) => {
    await updateProfile({
      github_repo_url: repoUrl,
      github_username: username,
      onboarding_completed: true
    });
    // Refresh to load data
    refresh();
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

  // Show setup if no repo configured
  if (!githubConfig) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <main className="py-16">
          <div className="container mx-auto px-6">
            <GitHubSetup onConnected={handleRepoConnected} />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Filter problems by difficulty
  const filteredProblems = difficultyFilter === 'all' 
    ? problems 
    : problems.filter(p => p.difficulty === difficultyFilter);

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main>
        {/* Status Bar */}
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4 p-4 bg-card rounded-xl border border-border">
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                Connected to: <span className="text-foreground font-medium">{githubConfig.owner}/{githubConfig.repo}</span>
              </div>
              {lastFetched && (
                <div className="text-xs text-muted-foreground">
                  Last updated: {lastFetched.toLocaleTimeString()}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => refresh()}
                disabled={isLoading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                {isLoading ? 'Syncing...' : 'Sync'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearConfig}
              >
                <Settings className="w-4 h-4 mr-2" />
                Change Repo
              </Button>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="container mx-auto px-6 pb-4">
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-destructive">Failed to fetch data</p>
                <p className="text-xs text-muted-foreground mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        <StatsSection 
          stats={stats} 
          isLoading={isLoading}
          onDifficultyClick={setDifficultyFilter}
          activeDifficulty={difficultyFilter}
        />
        
        {/* Activity Heatmap Section */}
        <section id="activity" className="py-8 pb-16">
          <div className="container mx-auto px-6">
            <ActivityHeatmap problems={problems} />
          </div>
        </section>
        
        <SkillsSection problems={problems} />
        
        {/* Problems View with Tabs */}
        <section className="py-8">
          <div className="container mx-auto px-6">
            <Tabs defaultValue="table" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="table" className="gap-2">
                  <List className="w-4 h-4" />
                  Table View
                </TabsTrigger>
                <TabsTrigger value="categorized" className="gap-2">
                  <Layers className="w-4 h-4" />
                  By Category
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="table">
                <ProblemsTable 
                  githubProblems={filteredProblems}
                  isLoading={isLoading}
                  difficultyFilter={difficultyFilter}
                  onDifficultyFilterChange={setDifficultyFilter}
                />
              </TabsContent>
              
              <TabsContent value="categorized">
                <CategorizedProblems 
                  problems={problems}
                  isLoading={isLoading}
                />
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
