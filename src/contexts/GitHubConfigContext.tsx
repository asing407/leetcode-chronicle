import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface GitHubConfig {
  owner: string;
  repo: string;
}

interface GitHubConfigContextType {
  config: GitHubConfig | null;
  setConfig: (config: GitHubConfig) => void;
  clearConfig: () => void;
  isConfigured: boolean;
}

const GitHubConfigContext = createContext<GitHubConfigContextType | undefined>(undefined);

const STORAGE_KEY = 'leetcode-github-config';

export function GitHubConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfigState] = useState<GitHubConfig | null>(null);

  useEffect(() => {
    // Load config from localStorage on mount
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.owner && parsed.repo) {
          setConfigState(parsed);
        }
      } catch {
        // Invalid stored config, ignore
      }
    }
  }, []);

  const setConfig = (newConfig: GitHubConfig) => {
    setConfigState(newConfig);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
  };

  const clearConfig = () => {
    setConfigState(null);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('leetcode-github-cache');
  };

  return (
    <GitHubConfigContext.Provider
      value={{
        config,
        setConfig,
        clearConfig,
        isConfigured: config !== null,
      }}
    >
      {children}
    </GitHubConfigContext.Provider>
  );
}

export function useGitHubConfig() {
  const context = useContext(GitHubConfigContext);
  if (context === undefined) {
    throw new Error('useGitHubConfig must be used within a GitHubConfigProvider');
  }
  return context;
}
