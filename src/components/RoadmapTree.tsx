import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TreeNode {
  name: string;
  children: TreeNode[];
}

interface RoadmapTreeProps {
  onTopicClick: (topic: string) => void;
  activeTopic: string | null;
  solvedByTopic: Record<string, { solved: number; total: number }>;
}

// Tree structure based on NeetCode roadmap
const TREE_STRUCTURE: TreeNode = {
  name: 'Arrays & Hashing',
  children: [
    {
      name: 'Two Pointers',
      children: [
        {
          name: 'Binary Search',
          children: [
            {
              name: 'Trees',
              children: [
                {
                  name: 'Tries',
                  children: [
                    {
                      name: 'Heap / Priority Queue',
                      children: [
                        { name: 'Intervals', children: [] },
                        { name: 'Greedy', children: [] }
                      ]
                    }
                  ]
                },
                {
                  name: 'Backtracking',
                  children: [
                    {
                      name: 'Graphs',
                      children: [
                        { name: 'Advanced Graphs', children: [] }
                      ]
                    },
                    {
                      name: '1-D DP',
                      children: [
                        {
                          name: '2-D DP',
                          children: [
                            { name: 'Math & Geometry', children: [] }
                          ]
                        },
                        { name: 'Bit Manipulation', children: [] }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        { name: 'Sliding Window', children: [] },
        { name: 'Linked List', children: [] }
      ]
    },
    { name: 'Stack', children: [] }
  ]
};

function TopicNode({ 
  name, 
  onClick, 
  isActive,
  stats 
}: { 
  name: string; 
  onClick: () => void;
  isActive: boolean;
  stats: { solved: number; total: number };
}) {
  const progress = stats.total > 0 ? (stats.solved / stats.total) * 100 : 0;
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "relative px-4 py-2 rounded-lg font-medium text-sm transition-all",
        "border-2 min-w-[120px]",
        isActive 
          ? "bg-primary text-primary-foreground border-primary shadow-glow" 
          : "bg-card text-foreground border-primary/50 hover:border-primary hover:bg-primary/10"
      )}
    >
      <span>{name}</span>
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted rounded-b-md overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={cn(
            "h-full",
            progress === 100 ? "bg-easy" : progress > 0 ? "bg-primary" : "bg-transparent"
          )}
        />
      </div>
    </motion.button>
  );
}

export function RoadmapTree({ onTopicClick, activeTopic, solvedByTopic }: RoadmapTreeProps) {
  const getStats = (name: string) => solvedByTopic[name] || { solved: 0, total: 0 };

  return (
    <div className="w-full overflow-x-auto pb-8">
      <div className="min-w-[900px] px-4">
        {/* SVG for connecting lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ minWidth: '900px', minHeight: '800px' }}>
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="hsl(var(--primary) / 0.5)" />
            </marker>
          </defs>
        </svg>

        {/* Tree Layout */}
        <div className="relative flex flex-col items-center gap-8 py-8">
          {/* Level 0: Arrays & Hashing */}
          <div className="flex justify-center">
            <TopicNode 
              name="Arrays & Hashing" 
              onClick={() => onTopicClick("Arrays & Hashing")}
              isActive={activeTopic === "Arrays & Hashing"}
              stats={getStats("Arrays & Hashing")}
            />
          </div>

          {/* Connector line */}
          <div className="w-px h-6 bg-primary/50" />
          <div className="w-48 h-px bg-primary/50" />

          {/* Level 1: Two Pointers + Stack */}
          <div className="flex justify-center gap-24">
            <TopicNode 
              name="Two Pointers" 
              onClick={() => onTopicClick("Two Pointers")}
              isActive={activeTopic === "Two Pointers"}
              stats={getStats("Two Pointers")}
            />
            <TopicNode 
              name="Stack" 
              onClick={() => onTopicClick("Stack")}
              isActive={activeTopic === "Stack"}
              stats={getStats("Stack")}
            />
          </div>

          {/* Connector */}
          <div className="w-px h-6 bg-primary/50 -mt-4 ml-[-12rem]" />
          <div className="w-72 h-px bg-primary/50 -mt-4 ml-[-6rem]" />

          {/* Level 2: Binary Search, Sliding Window, Linked List */}
          <div className="flex justify-center gap-12">
            <TopicNode 
              name="Binary Search" 
              onClick={() => onTopicClick("Binary Search")}
              isActive={activeTopic === "Binary Search"}
              stats={getStats("Binary Search")}
            />
            <TopicNode 
              name="Sliding Window" 
              onClick={() => onTopicClick("Sliding Window")}
              isActive={activeTopic === "Sliding Window"}
              stats={getStats("Sliding Window")}
            />
            <TopicNode 
              name="Linked List" 
              onClick={() => onTopicClick("Linked List")}
              isActive={activeTopic === "Linked List"}
              stats={getStats("Linked List")}
            />
          </div>

          {/* Connector to Trees */}
          <div className="w-px h-8 bg-primary/50" />

          {/* Level 3: Trees */}
          <div className="flex justify-center">
            <TopicNode 
              name="Trees" 
              onClick={() => onTopicClick("Trees")}
              isActive={activeTopic === "Trees"}
              stats={getStats("Trees")}
            />
          </div>

          {/* Split to Tries and Backtracking */}
          <div className="w-px h-6 bg-primary/50" />
          <div className="w-96 h-px bg-primary/50" />

          {/* Level 4: Tries + Backtracking */}
          <div className="flex justify-center gap-48">
            <TopicNode 
              name="Tries" 
              onClick={() => onTopicClick("Tries")}
              isActive={activeTopic === "Tries"}
              stats={getStats("Tries")}
            />
            <TopicNode 
              name="Backtracking" 
              onClick={() => onTopicClick("Backtracking")}
              isActive={activeTopic === "Backtracking"}
              stats={getStats("Backtracking")}
            />
          </div>

          {/* Connectors */}
          <div className="flex justify-center gap-48 -mt-4">
            <div className="w-px h-8 bg-primary/50" />
            <div className="w-48 h-px bg-primary/50 mt-4" />
          </div>

          {/* Level 5: Heap, Graphs, 1-D DP */}
          <div className="flex justify-center gap-16">
            <TopicNode 
              name="Heap / Priority Queue" 
              onClick={() => onTopicClick("Heap / Priority Queue")}
              isActive={activeTopic === "Heap / Priority Queue"}
              stats={getStats("Heap / Priority Queue")}
            />
            <TopicNode 
              name="Graphs" 
              onClick={() => onTopicClick("Graphs")}
              isActive={activeTopic === "Graphs"}
              stats={getStats("Graphs")}
            />
            <TopicNode 
              name="1-D DP" 
              onClick={() => onTopicClick("1-D DP")}
              isActive={activeTopic === "1-D DP"}
              stats={getStats("1-D DP")}
            />
          </div>

          {/* More connectors */}
          <div className="flex justify-center gap-32 -mt-4">
            <div className="w-40 h-px bg-primary/50 mt-4" />
            <div className="w-px h-8 bg-primary/50" />
            <div className="w-40 h-px bg-primary/50 mt-4" />
          </div>

          {/* Level 6: Intervals, Greedy, Advanced Graphs, 2-D DP, Bit Manipulation */}
          <div className="flex justify-center gap-8">
            <TopicNode 
              name="Intervals" 
              onClick={() => onTopicClick("Intervals")}
              isActive={activeTopic === "Intervals"}
              stats={getStats("Intervals")}
            />
            <TopicNode 
              name="Greedy" 
              onClick={() => onTopicClick("Greedy")}
              isActive={activeTopic === "Greedy"}
              stats={getStats("Greedy")}
            />
            <TopicNode 
              name="Advanced Graphs" 
              onClick={() => onTopicClick("Advanced Graphs")}
              isActive={activeTopic === "Advanced Graphs"}
              stats={getStats("Advanced Graphs")}
            />
            <TopicNode 
              name="2-D DP" 
              onClick={() => onTopicClick("2-D DP")}
              isActive={activeTopic === "2-D DP"}
              stats={getStats("2-D DP")}
            />
            <TopicNode 
              name="Bit Manipulation" 
              onClick={() => onTopicClick("Bit Manipulation")}
              isActive={activeTopic === "Bit Manipulation"}
              stats={getStats("Bit Manipulation")}
            />
          </div>

          {/* Connector to Math & Geometry */}
          <div className="w-px h-8 bg-primary/50 ml-8" />

          {/* Level 7: Math & Geometry */}
          <div className="flex justify-center">
            <TopicNode 
              name="Math & Geometry" 
              onClick={() => onTopicClick("Math & Geometry")}
              isActive={activeTopic === "Math & Geometry"}
              stats={getStats("Math & Geometry")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
