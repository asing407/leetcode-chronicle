import { Header } from '@/components/Header';
import { StatsSection } from '@/components/StatsSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ProblemsTable } from '@/components/ProblemsTable';
import { ActivityHeatmap } from '@/components/ActivityHeatmap';
import { Footer } from '@/components/Footer';
import { GitHubSetup } from '@/components/GitHubSetup';
import { GitHubConfigProvider, useGitHubConfig } from '@/contexts/GitHubConfigContext';
import { useGitHubLeetCode } from '@/hooks/useGitHubLeetCode';
import { RefreshCw, Settings, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

function DashboardContent() {
  const { config, isConfigured, clearConfig } = useGitHubConfig();
  const { problems, stats, isLoading, error, lastFetched, refresh } = useGitHubLeetCode(config);

  if (!isConfigured) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-16">
          <div className="container mx-auto px-6">
            <GitHubSetup />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Status Bar */}
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4 p-4 bg-card rounded-xl border border-border">
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                Connected to: <span className="text-foreground font-medium">{config?.owner}/{config?.repo}</span>
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
                onClick={clearConfig}
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
        />
        
        {/* Activity Heatmap Section */}
        <section id="activity" className="py-8 pb-16">
          <div className="container mx-auto px-6">
            <ActivityHeatmap />
          </div>
        </section>
        
        <SkillsSection />
        <ProblemsTable 
          githubProblems={problems}
          isLoading={isLoading}
        />
      </main>
      <Footer />
    </div>
  );
}

const Index = () => {
  return (
    <GitHubConfigProvider>
      <DashboardContent />
    </GitHubConfigProvider>
  );
};

export default Index;
