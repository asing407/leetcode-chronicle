import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface LeetCodeProblem {
  id: string;
  title: string;
  slug: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  language: string;
  solutionUrl: string;
  folderPath: string;
  lastUpdated?: string;
}

export interface LeetCodeStats {
  totalSolved: number;
  easy: number;
  medium: number;
  hard: number;
  languages: string[];
}

interface GitHubConfig {
  owner: string;
  repo: string;
}

interface CachedData {
  problems: LeetCodeProblem[];
  stats: LeetCodeStats;
  timestamp: number;
}

const CACHE_KEY = 'leetcode-github-cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function useGitHubLeetCode(config: GitHubConfig | null) {
  const [problems, setProblems] = useState<LeetCodeProblem[]>([]);
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);

  const getCachedData = useCallback((): CachedData | null => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return null;
      
      const data: CachedData = JSON.parse(cached);
      const now = Date.now();
      
      // Check if cache is still valid
      if (now - data.timestamp < CACHE_DURATION) {
        return data;
      }
      
      return null;
    } catch {
      return null;
    }
  }, []);

  const setCachedData = useCallback((problems: LeetCodeProblem[], stats: LeetCodeStats) => {
    const cacheData: CachedData = {
      problems,
      stats,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  }, []);

  const fetchData = useCallback(async (forceRefresh = false) => {
    if (!config?.owner || !config?.repo) {
      setError('GitHub repository configuration is missing');
      return;
    }

    // Check cache first (unless force refresh)
    if (!forceRefresh) {
      const cached = getCachedData();
      if (cached) {
        setProblems(cached.problems);
        setStats(cached.stats);
        setLastFetched(new Date(cached.timestamp));
        return;
      }
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('github-leetcode', {
        body: { owner: config.owner, repo: config.repo },
      });

      if (fnError) {
        throw new Error(fnError.message || 'Failed to fetch data from GitHub');
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setProblems(data.problems);
      setStats(data.stats);
      setLastFetched(new Date());
      setCachedData(data.problems, data.stats);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(message);
      console.error('Error fetching GitHub LeetCode data:', err);
    } finally {
      setIsLoading(false);
    }
  }, [config, getCachedData, setCachedData]);

  const refresh = useCallback(() => {
    return fetchData(true);
  }, [fetchData]);

  useEffect(() => {
    if (config?.owner && config?.repo) {
      fetchData();
    }
  }, [config?.owner, config?.repo, fetchData]);

  return {
    problems,
    stats,
    isLoading,
    error,
    lastFetched,
    refresh,
  };
}
