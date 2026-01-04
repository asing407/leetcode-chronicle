import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface GitHubContent {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string | null;
  type: 'file' | 'dir';
  content?: string;
  encoding?: string;
}

interface ProblemData {
  id: string;
  title: string;
  slug: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  language: string;
  solutionUrl: string;
  folderPath: string;
  lastUpdated?: string;
}

// Language extension mapping
const languageMap: Record<string, string> = {
  'py': 'Python',
  'python': 'Python',
  'js': 'JavaScript',
  'javascript': 'JavaScript',
  'ts': 'TypeScript',
  'typescript': 'TypeScript',
  'java': 'Java',
  'cpp': 'C++',
  'c++': 'C++',
  'c': 'C',
  'go': 'Go',
  'rs': 'Rust',
  'rust': 'Rust',
  'rb': 'Ruby',
  'ruby': 'Ruby',
  'swift': 'Swift',
  'kt': 'Kotlin',
  'kotlin': 'Kotlin',
  'scala': 'Scala',
  'php': 'PHP',
  'cs': 'C#',
  'sql': 'SQL',
  'sh': 'Shell',
  'bash': 'Shell',
};

// Parse difficulty from README content
function parseDifficultyFromReadme(content: string): 'Easy' | 'Medium' | 'Hard' {
  const lowerContent = content.toLowerCase();
  
  // Check for common LeetHub difficulty patterns
  if (lowerContent.includes('difficulty: easy') || 
      lowerContent.includes('🟢') || 
      lowerContent.includes('easy</h2>') ||
      lowerContent.includes('| easy |') ||
      lowerContent.match(/\beasy\b.*difficulty/i) ||
      lowerContent.match(/difficulty.*\beasy\b/i)) {
    return 'Easy';
  }
  if (lowerContent.includes('difficulty: hard') || 
      lowerContent.includes('🔴') || 
      lowerContent.includes('hard</h2>') ||
      lowerContent.includes('| hard |') ||
      lowerContent.match(/\bhard\b.*difficulty/i) ||
      lowerContent.match(/difficulty.*\bhard\b/i)) {
    return 'Hard';
  }
  // Default to Medium if not clearly easy or hard
  return 'Medium';
}

// Parse folder name to extract problem info
function parseFolderName(folderName: string): { id: string; slug: string; title: string } | null {
  // Pattern 1: "0001-two-sum" or "1-two-sum"
  const pattern1 = /^(\d+)-(.+)$/;
  // Pattern 2: "1. Two Sum" or "0001. Two Sum"
  const pattern2 = /^(\d+)\.\s*(.+)$/;
  
  let match = folderName.match(pattern1);
  if (match) {
    const id = match[1].replace(/^0+/, '') || '0';
    const slug = match[2];
    const title = slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    return { id, slug, title };
  }
  
  match = folderName.match(pattern2);
  if (match) {
    const id = match[1].replace(/^0+/, '') || '0';
    const title = match[2];
    const slug = title.toLowerCase().replace(/\s+/g, '-');
    return { id, slug, title };
  }
  
  return null;
}

// Get language from file extension
function getLanguageFromFile(fileName: string): string | null {
  const ext = fileName.split('.').pop()?.toLowerCase();
  if (!ext) return null;
  return languageMap[ext] || null;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const githubToken = Deno.env.get('GITHUB_TOKEN');
    if (!githubToken) {
      console.error('GITHUB_TOKEN is not configured');
      return new Response(
        JSON.stringify({ error: 'GitHub token not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { owner, repo } = await req.json();
    
    if (!owner || !repo) {
      return new Response(
        JSON.stringify({ error: 'Missing owner or repo parameter' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Fetching LeetCode data from ${owner}/${repo}`);

    // Fetch repo contents
    const repoUrl = `https://api.github.com/repos/${owner}/${repo}/contents`;
    const repoResponse = await fetch(repoUrl, {
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'LeetCode-Chronicle',
      },
    });

    if (!repoResponse.ok) {
      const errorText = await repoResponse.text();
      console.error(`GitHub API error: ${repoResponse.status} - ${errorText}`);
      
      if (repoResponse.status === 403) {
        return new Response(
          JSON.stringify({ error: 'GitHub API rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (repoResponse.status === 404) {
        return new Response(
          JSON.stringify({ error: 'Repository not found. Check owner/repo name.' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: `GitHub API error: ${repoResponse.status}` }),
        { status: repoResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const contents: GitHubContent[] = await repoResponse.json();
    console.log(`Found ${contents.length} items in repo root`);

    // Filter to only problem folders
    const problemFolders = contents.filter(item => {
      if (item.type !== 'dir') return false;
      // Skip common non-problem folders
      if (['.github', 'node_modules', '.git', 'assets', 'images'].includes(item.name)) return false;
      return parseFolderName(item.name) !== null;
    });

    console.log(`Found ${problemFolders.length} problem folders`);

    const problems: ProblemData[] = [];
    const batchSize = 10; // Process in batches to avoid rate limits
    
    for (let i = 0; i < problemFolders.length; i += batchSize) {
      const batch = problemFolders.slice(i, i + batchSize);
      
      const batchPromises = batch.map(async (folder): Promise<ProblemData | null> => {
        try {
          const parsed = parseFolderName(folder.name);
          if (!parsed) return null;

          // Fetch folder contents
          const folderUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(folder.name)}`;
          const folderResponse = await fetch(folderUrl, {
            headers: {
              'Authorization': `Bearer ${githubToken}`,
              'Accept': 'application/vnd.github.v3+json',
              'User-Agent': 'LeetCode-Chronicle',
            },
          });

          if (!folderResponse.ok) {
            console.error(`Failed to fetch folder ${folder.name}: ${folderResponse.status}`);
            return null;
          }

          const folderContents: GitHubContent[] = await folderResponse.json();
          
          // Find solution file (not README or NOTES)
          const solutionFile = folderContents.find(file => {
            if (file.type !== 'file') return false;
            const name = file.name.toLowerCase();
            if (name === 'readme.md' || name === 'notes.md') return false;
            return getLanguageFromFile(file.name) !== null;
          });

          // Find README for difficulty parsing
          const readmeFile = folderContents.find(file => 
            file.type === 'file' && file.name.toLowerCase() === 'readme.md'
          );

          let difficulty: 'Easy' | 'Medium' | 'Hard' = 'Medium';
          
          if (readmeFile?.download_url) {
            try {
              const readmeResponse = await fetch(readmeFile.download_url);
              if (readmeResponse.ok) {
                const readmeContent = await readmeResponse.text();
                difficulty = parseDifficultyFromReadme(readmeContent);
              }
            } catch (e) {
              console.error(`Failed to parse README for ${folder.name}:`, e);
            }
          }

          const language = solutionFile ? getLanguageFromFile(solutionFile.name) || 'Unknown' : 'Unknown';

          return {
            id: parsed.id,
            title: parsed.title,
            slug: parsed.slug,
            difficulty,
            language,
            solutionUrl: solutionFile?.html_url || folder.html_url,
            folderPath: folder.path,
          };
        } catch (error) {
          console.error(`Error processing folder ${folder.name}:`, error);
          return null;
        }
      });

      const batchResults = await Promise.all(batchPromises);
      problems.push(...batchResults.filter((p): p is ProblemData => p !== null));
      
      // Small delay between batches to be respectful of rate limits
      if (i + batchSize < problemFolders.length) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    // Sort by problem ID
    problems.sort((a, b) => parseInt(a.id) - parseInt(b.id));

    // Calculate stats
    const stats = {
      totalSolved: problems.length,
      easy: problems.filter(p => p.difficulty === 'Easy').length,
      medium: problems.filter(p => p.difficulty === 'Medium').length,
      hard: problems.filter(p => p.difficulty === 'Hard').length,
      languages: [...new Set(problems.map(p => p.language))],
    };

    console.log(`Processed ${problems.length} problems successfully`);
    console.log(`Stats: Easy=${stats.easy}, Medium=${stats.medium}, Hard=${stats.hard}`);

    return new Response(
      JSON.stringify({ problems, stats }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in github-leetcode function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
