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
  tags: string[];
  timeComplexity?: string;
  spaceComplexity?: string;
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

// Parse tags/topics from README content
function parseTagsFromReadme(content: string): string[] {
  const tags: Set<string> = new Set();
  
  // Pattern 1: "Related Topics" section with links (LeetHub format)
  // e.g., [![](https://img.shields.io/badge/Array-...)]
  const badgePattern = /badge[/%-]([A-Za-z0-9%20-]+?)[%-]/gi;
  let match;
  while ((match = badgePattern.exec(content)) !== null) {
    const tag = decodeURIComponent(match[1].replace(/%20/g, ' ').replace(/-/g, ' '))
      .replace(/\s+/g, ' ')
      .trim();
    // Filter out difficulty badges and common non-tags
    if (!['Easy', 'Medium', 'Hard', 'Difficulty', 'LeetCode', ''].includes(tag) && tag.length < 30) {
      tags.add(tag);
    }
  }
  
  // Pattern 2: Topics listed in markdown (e.g., "**Topics:** Array, Hash Table")
  const topicsMatch = content.match(/(?:topics?|tags?|related\s*topics?)[:\s]*([^\n]+)/i);
  if (topicsMatch) {
    const topicList = topicsMatch[1]
      .replace(/\*\*/g, '')
      .replace(/`/g, '')
      .split(/[,;|]/)
      .map(t => t.trim())
      .filter(t => t.length > 0 && t.length < 30);
    topicList.forEach(t => tags.add(t));
  }
  
  // Pattern 3: Common DSA keywords in the content
  const dsaKeywords = [
    'Array', 'String', 'Hash Table', 'Hash Map', 'Linked List', 'Stack', 'Queue',
    'Tree', 'Binary Tree', 'Binary Search Tree', 'BST', 'Heap', 'Priority Queue',
    'Graph', 'DFS', 'BFS', 'Depth-First Search', 'Breadth-First Search',
    'Dynamic Programming', 'DP', 'Greedy', 'Backtracking', 'Recursion',
    'Sorting', 'Binary Search', 'Two Pointers', 'Sliding Window',
    'Divide and Conquer', 'Bit Manipulation', 'Math', 'Trie',
    'Union Find', 'Topological Sort', 'Matrix', 'Simulation',
    'Design', 'Counting', 'Prefix Sum', 'Memoization'
  ];
  
  const lowerContent = content.toLowerCase();
  dsaKeywords.forEach(keyword => {
    if (lowerContent.includes(keyword.toLowerCase())) {
      tags.add(keyword);
    }
  });
  
  return Array.from(tags).slice(0, 10); // Limit to 10 tags
}

// Parse complexity from README content
function parseComplexityFromReadme(content: string): { time?: string; space?: string } {
  const result: { time?: string; space?: string } = {};
  
  // Time complexity patterns
  const timeMatch = content.match(/time\s*(?:complexity)?[:\s]*[`*]*([OoΘθΩω]\s*\([^)]+\))/i);
  if (timeMatch) {
    result.time = timeMatch[1].trim();
  }
  
  // Space complexity patterns
  const spaceMatch = content.match(/space\s*(?:complexity)?[:\s]*[`*]*([OoΘθΩω]\s*\([^)]+\))/i);
  if (spaceMatch) {
    result.space = spaceMatch[1].trim();
  }
  
  return result;
}

// Parse difficulty from README content
function parseDifficultyFromReadme(content: string): 'Easy' | 'Medium' | 'Hard' {
  const lowerContent = content.toLowerCase();
  
  // LeetHub 3.0 uses Shields.io badges - check these first (most reliable)
  // Easy: badge/-Easy-brightgreen or badge/-Easy-green
  if (lowerContent.includes('badge/-easy-brightgreen') || 
      lowerContent.includes('badge/-easy-green') ||
      lowerContent.includes('badge/easy-brightgreen') ||
      lowerContent.includes('badge/easy-green')) {
    return 'Easy';
  }
  
  // Hard: badge/-Hard-red
  if (lowerContent.includes('badge/-hard-red') ||
      lowerContent.includes('badge/hard-red')) {
    return 'Hard';
  }
  
  // Medium: badge/-Medium-orange or badge/-Medium-blue or badge/-Medium-yellow
  if (lowerContent.includes('badge/-medium-') ||
      lowerContent.includes('badge/medium-')) {
    return 'Medium';
  }
  
  // Fallback patterns for other README formats
  // Check for difficulty text patterns
  if (lowerContent.includes('difficulty: easy') || 
      lowerContent.includes('difficulty</strong>: easy') ||
      lowerContent.includes('| easy |') ||
      lowerContent.includes('>easy<')) {
    return 'Easy';
  }
  
  if (lowerContent.includes('difficulty: hard') || 
      lowerContent.includes('difficulty</strong>: hard') ||
      lowerContent.includes('| hard |') ||
      lowerContent.includes('>hard<')) {
    return 'Hard';
  }
  
  if (lowerContent.includes('difficulty: medium') || 
      lowerContent.includes('difficulty</strong>: medium') ||
      lowerContent.includes('| medium |') ||
      lowerContent.includes('>medium<')) {
    return 'Medium';
  }
  
  // Check for emoji indicators
  if (lowerContent.includes('🟢')) return 'Easy';
  if (lowerContent.includes('🔴')) return 'Hard';
  if (lowerContent.includes('🟡') || lowerContent.includes('🟠')) return 'Medium';
  
  // Log when we can't determine difficulty for debugging
  console.log('Could not determine difficulty from README, defaulting to Medium');
  
  // Default to Medium if nothing matches
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
          let tags: string[] = [];
          let timeComplexity: string | undefined;
          let spaceComplexity: string | undefined;
          
          if (readmeFile?.download_url) {
            try {
              const readmeResponse = await fetch(readmeFile.download_url);
              if (readmeResponse.ok) {
                const readmeContent = await readmeResponse.text();
                difficulty = parseDifficultyFromReadme(readmeContent);
                tags = parseTagsFromReadme(readmeContent);
                const complexity = parseComplexityFromReadme(readmeContent);
                timeComplexity = complexity.time;
                spaceComplexity = complexity.space;
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
            tags,
            timeComplexity,
            spaceComplexity,
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
