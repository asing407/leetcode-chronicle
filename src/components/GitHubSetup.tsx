import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';

interface GitHubSetupProps {
  onConnected?: (repoUrl: string, username: string) => void;
}

export function GitHubSetup({ onConnected }: GitHubSetupProps) {
  const [repoUrl, setRepoUrl] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  const parseGitHubUrl = (url: string): { owner: string; repo: string } | null => {
    const patterns = [
      /github\.com\/([^\/]+)\/([^\/\s]+)/,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const parsed = parseGitHubUrl(repoUrl);
    if (!parsed) {
      setError('Invalid GitHub repository URL. Use: owner/repo or full URL');
      return;
    }

    if (!username.trim()) {
      setError('Please enter your GitHub username');
      return;
    }

    setIsValidating(true);

    try {
      // Validate the repository exists by calling our edge function
      const { data, error: fetchError } = await supabase.functions.invoke('github-leetcode', {
        body: { owner: parsed.owner, repo: parsed.repo }
      });

      if (fetchError) {
        throw new Error(fetchError.message);
      }

      if (data?.error) {
        setError(data.error);
        return;
      }

      // Repository is valid - save config
      const fullUrl = `https://github.com/${parsed.owner}/${parsed.repo}`;
      onConnected?.(fullUrl, username.trim());
    } catch (err) {
      console.error('Validation error:', err);
      setError('Failed to validate repository. Please check the URL and try again.');
    } finally {
      setIsValidating(false);
    }
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
          <div className="space-y-4">
            <div>
              <Label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
                GitHub Username
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your GitHub username"
                className="bg-muted/50"
              />
            </div>

            <div>
              <Label htmlFor="repoUrl" className="block text-sm font-medium text-foreground mb-2">
                GitHub Repository
              </Label>
              <Input
                id="repoUrl"
                type="text"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="username/leetcode-solutions or https://github.com/username/leetcode-solutions"
                className="bg-muted/50"
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {error}
            </p>
          )}

          <Button type="submit" className="w-full" size="lg" disabled={isValidating}>
            {isValidating ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Validating...
              </>
            ) : (
              <>
                <Github className="w-5 h-5 mr-2" />
                Connect Repository
              </>
            )}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-border">
          <h3 className="text-sm font-medium text-foreground mb-4">
            Don't have LeetHub set up?
          </h3>
          <div className="space-y-3">
            <a
              href="https://chromewebstore.google.com/detail/leethub-v3/kdkgpjpenaeoodajljkflmlnkoihkmda"
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
