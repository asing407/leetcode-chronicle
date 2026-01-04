import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGitHubConfig } from '@/contexts/GitHubConfigContext';

export function GitHubSetup() {
  const { setConfig } = useGitHubConfig();
  const [repoUrl, setRepoUrl] = useState('');
  const [error, setError] = useState('');

  const parseGitHubUrl = (url: string): { owner: string; repo: string } | null => {
    // Handle various GitHub URL formats
    const patterns = [
      // https://github.com/owner/repo
      /github\.com\/([^\/]+)\/([^\/\s]+)/,
      // owner/repo
      /^([^\/\s]+)\/([^\/\s]+)$/,
    ];

    for (const pattern of patterns) {
      const match = url.trim().replace(/\.git$/, '').match(pattern);
      if (match) {
        return { owner: match[1], repo: match[2] };
      }
    }

    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const parsed = parseGitHubUrl(repoUrl);
    if (!parsed) {
      setError('Invalid GitHub repository URL or format. Use: owner/repo or full URL');
      return;
    }

    setConfig(parsed);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-card border border-border rounded-2xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Github className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Connect Your LeetHub Repository
          </h2>
          <p className="text-muted-foreground">
            Enter your GitHub repository URL where LeetHub 3.0 pushes your LeetCode solutions
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              GitHub Repository
            </label>
            <Input
              type="text"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="username/leetcode-solutions or https://github.com/username/leetcode-solutions"
              className="bg-muted/50"
            />
            {error && (
              <p className="mt-2 text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {error}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" size="lg">
            <Github className="w-5 h-5 mr-2" />
            Connect Repository
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-border">
          <h3 className="text-sm font-medium text-foreground mb-4">
            Don't have LeetHub set up?
          </h3>
          <div className="space-y-3">
            <a
              href="https://chromewebstore.google.com/detail/leethub-v3/kfcdmpkfpjliomhbjbppobfdmdngdoek"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
            >
              <div className="p-2 rounded-lg bg-primary/10">
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Install LeetHub 3.0</p>
                <p className="text-xs text-muted-foreground">Chrome extension to auto-sync solutions</p>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
