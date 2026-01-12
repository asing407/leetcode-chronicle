export interface NeetCodeProblem {
  id: number;
  title: string;
  slug: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  leetcodeUrl: string;
}

export interface TopicProblems {
  topic: string;
  icon: string;
  problems: NeetCodeProblem[];
}

// Topic hierarchy for visual tree
export const TOPIC_HIERARCHY = {
  root: 'Arrays & Hashing',
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
        {
          name: 'Sliding Window',
          children: []
        },
        {
          name: 'Linked List',
          children: []
        }
      ]
    },
    {
      name: 'Stack',
      children: []
    }
  ]
};

// NeetCode Blind 75 Problems
export const BLIND_75: TopicProblems[] = [
  {
    topic: 'Arrays & Hashing',
    icon: '🗃️',
    problems: [
      { id: 217, title: 'Contains Duplicate', slug: 'contains-duplicate', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/contains-duplicate/' },
      { id: 242, title: 'Valid Anagram', slug: 'valid-anagram', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/valid-anagram/' },
      { id: 1, title: 'Two Sum', slug: 'two-sum', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/two-sum/' },
      { id: 49, title: 'Group Anagrams', slug: 'group-anagrams', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/group-anagrams/' },
      { id: 347, title: 'Top K Frequent Elements', slug: 'top-k-frequent-elements', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/top-k-frequent-elements/' },
      { id: 238, title: 'Product of Array Except Self', slug: 'product-of-array-except-self', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/product-of-array-except-self/' },
      { id: 128, title: 'Longest Consecutive Sequence', slug: 'longest-consecutive-sequence', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/longest-consecutive-sequence/' },
    ]
  },
  {
    topic: 'Two Pointers',
    icon: '👆',
    problems: [
      { id: 125, title: 'Valid Palindrome', slug: 'valid-palindrome', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/valid-palindrome/' },
      { id: 15, title: '3Sum', slug: '3sum', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/3sum/' },
      { id: 11, title: 'Container With Most Water', slug: 'container-with-most-water', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/container-with-most-water/' },
    ]
  },
  {
    topic: 'Sliding Window',
    icon: '🪟',
    problems: [
      { id: 121, title: 'Best Time to Buy and Sell Stock', slug: 'best-time-to-buy-and-sell-stock', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/' },
      { id: 3, title: 'Longest Substring Without Repeating Characters', slug: 'longest-substring-without-repeating-characters', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/' },
      { id: 424, title: 'Longest Repeating Character Replacement', slug: 'longest-repeating-character-replacement', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/longest-repeating-character-replacement/' },
      { id: 76, title: 'Minimum Window Substring', slug: 'minimum-window-substring', difficulty: 'Hard', leetcodeUrl: 'https://leetcode.com/problems/minimum-window-substring/' },
    ]
  },
  {
    topic: 'Stack',
    icon: '📚',
    problems: [
      { id: 20, title: 'Valid Parentheses', slug: 'valid-parentheses', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/valid-parentheses/' },
    ]
  },
  {
    topic: 'Binary Search',
    icon: '🔍',
    problems: [
      { id: 33, title: 'Search in Rotated Sorted Array', slug: 'search-in-rotated-sorted-array', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/search-in-rotated-sorted-array/' },
      { id: 153, title: 'Find Minimum in Rotated Sorted Array', slug: 'find-minimum-in-rotated-sorted-array', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/' },
    ]
  },
  {
    topic: 'Linked List',
    icon: '🔗',
    problems: [
      { id: 206, title: 'Reverse Linked List', slug: 'reverse-linked-list', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/reverse-linked-list/' },
      { id: 21, title: 'Merge Two Sorted Lists', slug: 'merge-two-sorted-lists', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/merge-two-sorted-lists/' },
      { id: 141, title: 'Linked List Cycle', slug: 'linked-list-cycle', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/linked-list-cycle/' },
      { id: 19, title: 'Remove Nth Node From End of List', slug: 'remove-nth-node-from-end-of-list', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/' },
      { id: 143, title: 'Reorder List', slug: 'reorder-list', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/reorder-list/' },
      { id: 23, title: 'Merge K Sorted Lists', slug: 'merge-k-sorted-lists', difficulty: 'Hard', leetcodeUrl: 'https://leetcode.com/problems/merge-k-sorted-lists/' },
    ]
  },
  {
    topic: 'Trees',
    icon: '🌳',
    problems: [
      { id: 226, title: 'Invert Binary Tree', slug: 'invert-binary-tree', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/invert-binary-tree/' },
      { id: 104, title: 'Maximum Depth of Binary Tree', slug: 'maximum-depth-of-binary-tree', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/' },
      { id: 100, title: 'Same Tree', slug: 'same-tree', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/same-tree/' },
      { id: 572, title: 'Subtree of Another Tree', slug: 'subtree-of-another-tree', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/subtree-of-another-tree/' },
      { id: 235, title: 'Lowest Common Ancestor of a Binary Search Tree', slug: 'lowest-common-ancestor-of-a-binary-search-tree', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/' },
      { id: 102, title: 'Binary Tree Level Order Traversal', slug: 'binary-tree-level-order-traversal', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/binary-tree-level-order-traversal/' },
      { id: 98, title: 'Validate Binary Search Tree', slug: 'validate-binary-search-tree', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/validate-binary-search-tree/' },
      { id: 230, title: 'Kth Smallest Element in a BST', slug: 'kth-smallest-element-in-a-bst', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/' },
      { id: 105, title: 'Construct Binary Tree from Preorder and Inorder Traversal', slug: 'construct-binary-tree-from-preorder-and-inorder-traversal', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/' },
      { id: 124, title: 'Binary Tree Maximum Path Sum', slug: 'binary-tree-maximum-path-sum', difficulty: 'Hard', leetcodeUrl: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/' },
      { id: 297, title: 'Serialize and Deserialize Binary Tree', slug: 'serialize-and-deserialize-binary-tree', difficulty: 'Hard', leetcodeUrl: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/' },
    ]
  },
  {
    topic: 'Tries',
    icon: '🔤',
    problems: [
      { id: 208, title: 'Implement Trie (Prefix Tree)', slug: 'implement-trie-prefix-tree', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/implement-trie-prefix-tree/' },
      { id: 211, title: 'Design Add and Search Words Data Structure', slug: 'design-add-and-search-words-data-structure', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/' },
      { id: 212, title: 'Word Search II', slug: 'word-search-ii', difficulty: 'Hard', leetcodeUrl: 'https://leetcode.com/problems/word-search-ii/' },
    ]
  },
  {
    topic: 'Heap / Priority Queue',
    icon: '⛰️',
    problems: [
      { id: 295, title: 'Find Median from Data Stream', slug: 'find-median-from-data-stream', difficulty: 'Hard', leetcodeUrl: 'https://leetcode.com/problems/find-median-from-data-stream/' },
    ]
  },
  {
    topic: 'Backtracking',
    icon: '🔙',
    problems: [
      { id: 39, title: 'Combination Sum', slug: 'combination-sum', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/combination-sum/' },
      { id: 79, title: 'Word Search', slug: 'word-search', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/word-search/' },
    ]
  },
  {
    topic: 'Graphs',
    icon: '📊',
    problems: [
      { id: 200, title: 'Number of Islands', slug: 'number-of-islands', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/number-of-islands/' },
      { id: 133, title: 'Clone Graph', slug: 'clone-graph', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/clone-graph/' },
      { id: 417, title: 'Pacific Atlantic Water Flow', slug: 'pacific-atlantic-water-flow', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/pacific-atlantic-water-flow/' },
      { id: 207, title: 'Course Schedule', slug: 'course-schedule', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/course-schedule/' },
      { id: 323, title: 'Number of Connected Components in an Undirected Graph', slug: 'number-of-connected-components-in-an-undirected-graph', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/' },
      { id: 261, title: 'Graph Valid Tree', slug: 'graph-valid-tree', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/graph-valid-tree/' },
    ]
  },
  {
    topic: 'Advanced Graphs',
    icon: '🗺️',
    problems: [
      { id: 269, title: 'Alien Dictionary', slug: 'alien-dictionary', difficulty: 'Hard', leetcodeUrl: 'https://leetcode.com/problems/alien-dictionary/' },
    ]
  },
  {
    topic: '1-D DP',
    icon: '📈',
    problems: [
      { id: 70, title: 'Climbing Stairs', slug: 'climbing-stairs', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/climbing-stairs/' },
      { id: 198, title: 'House Robber', slug: 'house-robber', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/house-robber/' },
      { id: 213, title: 'House Robber II', slug: 'house-robber-ii', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/house-robber-ii/' },
      { id: 5, title: 'Longest Palindromic Substring', slug: 'longest-palindromic-substring', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/longest-palindromic-substring/' },
      { id: 647, title: 'Palindromic Substrings', slug: 'palindromic-substrings', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/palindromic-substrings/' },
      { id: 91, title: 'Decode Ways', slug: 'decode-ways', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/decode-ways/' },
      { id: 322, title: 'Coin Change', slug: 'coin-change', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/coin-change/' },
      { id: 152, title: 'Maximum Product Subarray', slug: 'maximum-product-subarray', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/maximum-product-subarray/' },
      { id: 139, title: 'Word Break', slug: 'word-break', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/word-break/' },
      { id: 300, title: 'Longest Increasing Subsequence', slug: 'longest-increasing-subsequence', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/longest-increasing-subsequence/' },
    ]
  },
  {
    topic: '2-D DP',
    icon: '🧮',
    problems: [
      { id: 62, title: 'Unique Paths', slug: 'unique-paths', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/unique-paths/' },
      { id: 1143, title: 'Longest Common Subsequence', slug: 'longest-common-subsequence', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/longest-common-subsequence/' },
    ]
  },
  {
    topic: 'Greedy',
    icon: '🎯',
    problems: [
      { id: 53, title: 'Maximum Subarray', slug: 'maximum-subarray', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/maximum-subarray/' },
      { id: 55, title: 'Jump Game', slug: 'jump-game', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/jump-game/' },
    ]
  },
  {
    topic: 'Intervals',
    icon: '📅',
    problems: [
      { id: 57, title: 'Insert Interval', slug: 'insert-interval', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/insert-interval/' },
      { id: 56, title: 'Merge Intervals', slug: 'merge-intervals', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/merge-intervals/' },
      { id: 435, title: 'Non-overlapping Intervals', slug: 'non-overlapping-intervals', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/non-overlapping-intervals/' },
      { id: 252, title: 'Meeting Rooms', slug: 'meeting-rooms', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/meeting-rooms/' },
      { id: 253, title: 'Meeting Rooms II', slug: 'meeting-rooms-ii', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/meeting-rooms-ii/' },
    ]
  },
  {
    topic: 'Math & Geometry',
    icon: '📐',
    problems: [
      { id: 48, title: 'Rotate Image', slug: 'rotate-image', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/rotate-image/' },
      { id: 54, title: 'Spiral Matrix', slug: 'spiral-matrix', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/spiral-matrix/' },
      { id: 73, title: 'Set Matrix Zeroes', slug: 'set-matrix-zeroes', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/set-matrix-zeroes/' },
    ]
  },
  {
    topic: 'Bit Manipulation',
    icon: '🔢',
    problems: [
      { id: 191, title: 'Number of 1 Bits', slug: 'number-of-1-bits', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/number-of-1-bits/' },
      { id: 338, title: 'Counting Bits', slug: 'counting-bits', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/counting-bits/' },
      { id: 190, title: 'Reverse Bits', slug: 'reverse-bits', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/reverse-bits/' },
      { id: 268, title: 'Missing Number', slug: 'missing-number', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/missing-number/' },
      { id: 371, title: 'Sum of Two Integers', slug: 'sum-of-two-integers', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/sum-of-two-integers/' },
    ]
  },
];

// NeetCode 150 Problems (includes Blind 75 + additional)
export const NEETCODE_150: TopicProblems[] = [
  {
    topic: 'Arrays & Hashing',
    icon: '🗃️',
    problems: [
      { id: 217, title: 'Contains Duplicate', slug: 'contains-duplicate', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/contains-duplicate/' },
      { id: 242, title: 'Valid Anagram', slug: 'valid-anagram', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/valid-anagram/' },
      { id: 1, title: 'Two Sum', slug: 'two-sum', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/two-sum/' },
      { id: 49, title: 'Group Anagrams', slug: 'group-anagrams', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/group-anagrams/' },
      { id: 347, title: 'Top K Frequent Elements', slug: 'top-k-frequent-elements', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/top-k-frequent-elements/' },
      { id: 238, title: 'Product of Array Except Self', slug: 'product-of-array-except-self', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/product-of-array-except-self/' },
      { id: 36, title: 'Valid Sudoku', slug: 'valid-sudoku', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/valid-sudoku/' },
      { id: 271, title: 'Encode and Decode Strings', slug: 'encode-and-decode-strings', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/encode-and-decode-strings/' },
      { id: 128, title: 'Longest Consecutive Sequence', slug: 'longest-consecutive-sequence', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/longest-consecutive-sequence/' },
    ]
  },
  {
    topic: 'Two Pointers',
    icon: '👆',
    problems: [
      { id: 125, title: 'Valid Palindrome', slug: 'valid-palindrome', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/valid-palindrome/' },
      { id: 167, title: 'Two Sum II', slug: 'two-sum-ii-input-array-is-sorted', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/' },
      { id: 15, title: '3Sum', slug: '3sum', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/3sum/' },
      { id: 11, title: 'Container With Most Water', slug: 'container-with-most-water', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/container-with-most-water/' },
      { id: 42, title: 'Trapping Rain Water', slug: 'trapping-rain-water', difficulty: 'Hard', leetcodeUrl: 'https://leetcode.com/problems/trapping-rain-water/' },
    ]
  },
  {
    topic: 'Sliding Window',
    icon: '🪟',
    problems: [
      { id: 121, title: 'Best Time to Buy and Sell Stock', slug: 'best-time-to-buy-and-sell-stock', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/' },
      { id: 3, title: 'Longest Substring Without Repeating Characters', slug: 'longest-substring-without-repeating-characters', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/' },
      { id: 424, title: 'Longest Repeating Character Replacement', slug: 'longest-repeating-character-replacement', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/longest-repeating-character-replacement/' },
      { id: 567, title: 'Permutation in String', slug: 'permutation-in-string', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/permutation-in-string/' },
      { id: 76, title: 'Minimum Window Substring', slug: 'minimum-window-substring', difficulty: 'Hard', leetcodeUrl: 'https://leetcode.com/problems/minimum-window-substring/' },
      { id: 239, title: 'Sliding Window Maximum', slug: 'sliding-window-maximum', difficulty: 'Hard', leetcodeUrl: 'https://leetcode.com/problems/sliding-window-maximum/' },
    ]
  },
  {
    topic: 'Stack',
    icon: '📚',
    problems: [
      { id: 20, title: 'Valid Parentheses', slug: 'valid-parentheses', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/valid-parentheses/' },
      { id: 155, title: 'Min Stack', slug: 'min-stack', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/min-stack/' },
      { id: 150, title: 'Evaluate Reverse Polish Notation', slug: 'evaluate-reverse-polish-notation', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/' },
      { id: 22, title: 'Generate Parentheses', slug: 'generate-parentheses', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/generate-parentheses/' },
      { id: 739, title: 'Daily Temperatures', slug: 'daily-temperatures', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/daily-temperatures/' },
      { id: 853, title: 'Car Fleet', slug: 'car-fleet', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/car-fleet/' },
      { id: 84, title: 'Largest Rectangle in Histogram', slug: 'largest-rectangle-in-histogram', difficulty: 'Hard', leetcodeUrl: 'https://leetcode.com/problems/largest-rectangle-in-histogram/' },
    ]
  },
  {
    topic: 'Binary Search',
    icon: '🔍',
    problems: [
      { id: 704, title: 'Binary Search', slug: 'binary-search', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/binary-search/' },
      { id: 74, title: 'Search a 2D Matrix', slug: 'search-a-2d-matrix', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/search-a-2d-matrix/' },
      { id: 875, title: 'Koko Eating Bananas', slug: 'koko-eating-bananas', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/koko-eating-bananas/' },
      { id: 33, title: 'Search in Rotated Sorted Array', slug: 'search-in-rotated-sorted-array', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/search-in-rotated-sorted-array/' },
      { id: 153, title: 'Find Minimum in Rotated Sorted Array', slug: 'find-minimum-in-rotated-sorted-array', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/' },
      { id: 981, title: 'Time Based Key-Value Store', slug: 'time-based-key-value-store', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/time-based-key-value-store/' },
      { id: 4, title: 'Median of Two Sorted Arrays', slug: 'median-of-two-sorted-arrays', difficulty: 'Hard', leetcodeUrl: 'https://leetcode.com/problems/median-of-two-sorted-arrays/' },
    ]
  },
  {
    topic: 'Linked List',
    icon: '🔗',
    problems: [
      { id: 206, title: 'Reverse Linked List', slug: 'reverse-linked-list', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/reverse-linked-list/' },
      { id: 21, title: 'Merge Two Sorted Lists', slug: 'merge-two-sorted-lists', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/merge-two-sorted-lists/' },
      { id: 141, title: 'Linked List Cycle', slug: 'linked-list-cycle', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/linked-list-cycle/' },
      { id: 143, title: 'Reorder List', slug: 'reorder-list', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/reorder-list/' },
      { id: 19, title: 'Remove Nth Node From End of List', slug: 'remove-nth-node-from-end-of-list', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/' },
      { id: 138, title: 'Copy List with Random Pointer', slug: 'copy-list-with-random-pointer', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/copy-list-with-random-pointer/' },
      { id: 2, title: 'Add Two Numbers', slug: 'add-two-numbers', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/add-two-numbers/' },
      { id: 287, title: 'Find the Duplicate Number', slug: 'find-the-duplicate-number', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/find-the-duplicate-number/' },
      { id: 146, title: 'LRU Cache', slug: 'lru-cache', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/lru-cache/' },
      { id: 23, title: 'Merge K Sorted Lists', slug: 'merge-k-sorted-lists', difficulty: 'Hard', leetcodeUrl: 'https://leetcode.com/problems/merge-k-sorted-lists/' },
      { id: 25, title: 'Reverse Nodes in K-Group', slug: 'reverse-nodes-in-k-group', difficulty: 'Hard', leetcodeUrl: 'https://leetcode.com/problems/reverse-nodes-in-k-group/' },
    ]
  },
  {
    topic: 'Trees',
    icon: '🌳',
    problems: [
      { id: 226, title: 'Invert Binary Tree', slug: 'invert-binary-tree', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/invert-binary-tree/' },
      { id: 104, title: 'Maximum Depth of Binary Tree', slug: 'maximum-depth-of-binary-tree', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/' },
      { id: 543, title: 'Diameter of Binary Tree', slug: 'diameter-of-binary-tree', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/diameter-of-binary-tree/' },
      { id: 110, title: 'Balanced Binary Tree', slug: 'balanced-binary-tree', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/balanced-binary-tree/' },
      { id: 100, title: 'Same Tree', slug: 'same-tree', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/same-tree/' },
      { id: 572, title: 'Subtree of Another Tree', slug: 'subtree-of-another-tree', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/subtree-of-another-tree/' },
      { id: 235, title: 'Lowest Common Ancestor of a Binary Search Tree', slug: 'lowest-common-ancestor-of-a-binary-search-tree', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/' },
      { id: 102, title: 'Binary Tree Level Order Traversal', slug: 'binary-tree-level-order-traversal', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/binary-tree-level-order-traversal/' },
      { id: 199, title: 'Binary Tree Right Side View', slug: 'binary-tree-right-side-view', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/binary-tree-right-side-view/' },
      { id: 1448, title: 'Count Good Nodes in Binary Tree', slug: 'count-good-nodes-in-binary-tree', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/count-good-nodes-in-binary-tree/' },
      { id: 98, title: 'Validate Binary Search Tree', slug: 'validate-binary-search-tree', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/validate-binary-search-tree/' },
      { id: 230, title: 'Kth Smallest Element in a BST', slug: 'kth-smallest-element-in-a-bst', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/' },
      { id: 105, title: 'Construct Binary Tree from Preorder and Inorder Traversal', slug: 'construct-binary-tree-from-preorder-and-inorder-traversal', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/' },
      { id: 124, title: 'Binary Tree Maximum Path Sum', slug: 'binary-tree-maximum-path-sum', difficulty: 'Hard', leetcodeUrl: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/' },
      { id: 297, title: 'Serialize and Deserialize Binary Tree', slug: 'serialize-and-deserialize-binary-tree', difficulty: 'Hard', leetcodeUrl: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/' },
    ]
  },
  {
    topic: 'Tries',
    icon: '🔤',
    problems: [
      { id: 208, title: 'Implement Trie (Prefix Tree)', slug: 'implement-trie-prefix-tree', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/implement-trie-prefix-tree/' },
      { id: 211, title: 'Design Add and Search Words Data Structure', slug: 'design-add-and-search-words-data-structure', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/' },
      { id: 212, title: 'Word Search II', slug: 'word-search-ii', difficulty: 'Hard', leetcodeUrl: 'https://leetcode.com/problems/word-search-ii/' },
    ]
  },
  {
    topic: 'Heap / Priority Queue',
    icon: '⛰️',
    problems: [
      { id: 703, title: 'Kth Largest Element in a Stream', slug: 'kth-largest-element-in-a-stream', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/kth-largest-element-in-a-stream/' },
      { id: 1046, title: 'Last Stone Weight', slug: 'last-stone-weight', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/last-stone-weight/' },
      { id: 973, title: 'K Closest Points to Origin', slug: 'k-closest-points-to-origin', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/k-closest-points-to-origin/' },
      { id: 215, title: 'Kth Largest Element in an Array', slug: 'kth-largest-element-in-an-array', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/kth-largest-element-in-an-array/' },
      { id: 621, title: 'Task Scheduler', slug: 'task-scheduler', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/task-scheduler/' },
      { id: 355, title: 'Design Twitter', slug: 'design-twitter', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/design-twitter/' },
      { id: 295, title: 'Find Median from Data Stream', slug: 'find-median-from-data-stream', difficulty: 'Hard', leetcodeUrl: 'https://leetcode.com/problems/find-median-from-data-stream/' },
    ]
  },
  {
    topic: 'Backtracking',
    icon: '🔙',
    problems: [
      { id: 78, title: 'Subsets', slug: 'subsets', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/subsets/' },
      { id: 39, title: 'Combination Sum', slug: 'combination-sum', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/combination-sum/' },
      { id: 46, title: 'Permutations', slug: 'permutations', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/permutations/' },
      { id: 90, title: 'Subsets II', slug: 'subsets-ii', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/subsets-ii/' },
      { id: 40, title: 'Combination Sum II', slug: 'combination-sum-ii', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/combination-sum-ii/' },
      { id: 79, title: 'Word Search', slug: 'word-search', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/word-search/' },
      { id: 131, title: 'Palindrome Partitioning', slug: 'palindrome-partitioning', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/palindrome-partitioning/' },
      { id: 17, title: 'Letter Combinations of a Phone Number', slug: 'letter-combinations-of-a-phone-number', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/' },
      { id: 51, title: 'N-Queens', slug: 'n-queens', difficulty: 'Hard', leetcodeUrl: 'https://leetcode.com/problems/n-queens/' },
    ]
  },
  {
    topic: 'Graphs',
    icon: '📊',
    problems: [
      { id: 200, title: 'Number of Islands', slug: 'number-of-islands', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/number-of-islands/' },
      { id: 695, title: 'Max Area of Island', slug: 'max-area-of-island', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/max-area-of-island/' },
      { id: 133, title: 'Clone Graph', slug: 'clone-graph', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/clone-graph/' },
      { id: 286, title: 'Walls and Gates', slug: 'walls-and-gates', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/walls-and-gates/' },
      { id: 994, title: 'Rotting Oranges', slug: 'rotting-oranges', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/rotting-oranges/' },
      { id: 417, title: 'Pacific Atlantic Water Flow', slug: 'pacific-atlantic-water-flow', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/pacific-atlantic-water-flow/' },
      { id: 130, title: 'Surrounded Regions', slug: 'surrounded-regions', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/surrounded-regions/' },
      { id: 207, title: 'Course Schedule', slug: 'course-schedule', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/course-schedule/' },
      { id: 210, title: 'Course Schedule II', slug: 'course-schedule-ii', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/course-schedule-ii/' },
      { id: 684, title: 'Redundant Connection', slug: 'redundant-connection', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/redundant-connection/' },
      { id: 323, title: 'Number of Connected Components in an Undirected Graph', slug: 'number-of-connected-components-in-an-undirected-graph', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/' },
      { id: 261, title: 'Graph Valid Tree', slug: 'graph-valid-tree', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/graph-valid-tree/' },
      { id: 127, title: 'Word Ladder', slug: 'word-ladder', difficulty: 'Hard', leetcodeUrl: 'https://leetcode.com/problems/word-ladder/' },
    ]
  },
  {
    topic: 'Advanced Graphs',
    icon: '🗺️',
    problems: [
      { id: 332, title: 'Reconstruct Itinerary', slug: 'reconstruct-itinerary', difficulty: 'Hard', leetcodeUrl: 'https://leetcode.com/problems/reconstruct-itinerary/' },
      { id: 1584, title: 'Min Cost to Connect All Points', slug: 'min-cost-to-connect-all-points', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/min-cost-to-connect-all-points/' },
      { id: 743, title: 'Network Delay Time', slug: 'network-delay-time', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/network-delay-time/' },
      { id: 787, title: 'Cheapest Flights Within K Stops', slug: 'cheapest-flights-within-k-stops', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/cheapest-flights-within-k-stops/' },
      { id: 778, title: 'Swim in Rising Water', slug: 'swim-in-rising-water', difficulty: 'Hard', leetcodeUrl: 'https://leetcode.com/problems/swim-in-rising-water/' },
      { id: 269, title: 'Alien Dictionary', slug: 'alien-dictionary', difficulty: 'Hard', leetcodeUrl: 'https://leetcode.com/problems/alien-dictionary/' },
    ]
  },
  {
    topic: '1-D DP',
    icon: '📈',
    problems: [
      { id: 70, title: 'Climbing Stairs', slug: 'climbing-stairs', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/climbing-stairs/' },
      { id: 746, title: 'Min Cost Climbing Stairs', slug: 'min-cost-climbing-stairs', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/min-cost-climbing-stairs/' },
      { id: 198, title: 'House Robber', slug: 'house-robber', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/house-robber/' },
      { id: 213, title: 'House Robber II', slug: 'house-robber-ii', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/house-robber-ii/' },
      { id: 5, title: 'Longest Palindromic Substring', slug: 'longest-palindromic-substring', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/longest-palindromic-substring/' },
      { id: 647, title: 'Palindromic Substrings', slug: 'palindromic-substrings', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/palindromic-substrings/' },
      { id: 91, title: 'Decode Ways', slug: 'decode-ways', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/decode-ways/' },
      { id: 322, title: 'Coin Change', slug: 'coin-change', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/coin-change/' },
      { id: 152, title: 'Maximum Product Subarray', slug: 'maximum-product-subarray', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/maximum-product-subarray/' },
      { id: 139, title: 'Word Break', slug: 'word-break', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/word-break/' },
      { id: 300, title: 'Longest Increasing Subsequence', slug: 'longest-increasing-subsequence', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/longest-increasing-subsequence/' },
      { id: 416, title: 'Partition Equal Subset Sum', slug: 'partition-equal-subset-sum', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/partition-equal-subset-sum/' },
    ]
  },
  {
    topic: '2-D DP',
    icon: '🧮',
    problems: [
      { id: 62, title: 'Unique Paths', slug: 'unique-paths', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/unique-paths/' },
      { id: 1143, title: 'Longest Common Subsequence', slug: 'longest-common-subsequence', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/longest-common-subsequence/' },
      { id: 309, title: 'Best Time to Buy and Sell Stock with Cooldown', slug: 'best-time-to-buy-and-sell-stock-with-cooldown', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/' },
      { id: 518, title: 'Coin Change II', slug: 'coin-change-ii', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/coin-change-ii/' },
      { id: 494, title: 'Target Sum', slug: 'target-sum', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/target-sum/' },
      { id: 97, title: 'Interleaving String', slug: 'interleaving-string', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/interleaving-string/' },
      { id: 329, title: 'Longest Increasing Path in a Matrix', slug: 'longest-increasing-path-in-a-matrix', difficulty: 'Hard', leetcodeUrl: 'https://leetcode.com/problems/longest-increasing-path-in-a-matrix/' },
      { id: 115, title: 'Distinct Subsequences', slug: 'distinct-subsequences', difficulty: 'Hard', leetcodeUrl: 'https://leetcode.com/problems/distinct-subsequences/' },
      { id: 72, title: 'Edit Distance', slug: 'edit-distance', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/edit-distance/' },
      { id: 312, title: 'Burst Balloons', slug: 'burst-balloons', difficulty: 'Hard', leetcodeUrl: 'https://leetcode.com/problems/burst-balloons/' },
      { id: 10, title: 'Regular Expression Matching', slug: 'regular-expression-matching', difficulty: 'Hard', leetcodeUrl: 'https://leetcode.com/problems/regular-expression-matching/' },
    ]
  },
  {
    topic: 'Greedy',
    icon: '🎯',
    problems: [
      { id: 53, title: 'Maximum Subarray', slug: 'maximum-subarray', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/maximum-subarray/' },
      { id: 55, title: 'Jump Game', slug: 'jump-game', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/jump-game/' },
      { id: 45, title: 'Jump Game II', slug: 'jump-game-ii', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/jump-game-ii/' },
      { id: 134, title: 'Gas Station', slug: 'gas-station', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/gas-station/' },
      { id: 846, title: 'Hand of Straights', slug: 'hand-of-straights', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/hand-of-straights/' },
      { id: 1899, title: 'Merge Triplets to Form Target Triplet', slug: 'merge-triplets-to-form-target-triplet', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/merge-triplets-to-form-target-triplet/' },
      { id: 763, title: 'Partition Labels', slug: 'partition-labels', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/partition-labels/' },
      { id: 678, title: 'Valid Parenthesis String', slug: 'valid-parenthesis-string', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/valid-parenthesis-string/' },
    ]
  },
  {
    topic: 'Intervals',
    icon: '📅',
    problems: [
      { id: 57, title: 'Insert Interval', slug: 'insert-interval', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/insert-interval/' },
      { id: 56, title: 'Merge Intervals', slug: 'merge-intervals', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/merge-intervals/' },
      { id: 435, title: 'Non-overlapping Intervals', slug: 'non-overlapping-intervals', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/non-overlapping-intervals/' },
      { id: 252, title: 'Meeting Rooms', slug: 'meeting-rooms', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/meeting-rooms/' },
      { id: 253, title: 'Meeting Rooms II', slug: 'meeting-rooms-ii', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/meeting-rooms-ii/' },
      { id: 1851, title: 'Minimum Interval to Include Each Query', slug: 'minimum-interval-to-include-each-query', difficulty: 'Hard', leetcodeUrl: 'https://leetcode.com/problems/minimum-interval-to-include-each-query/' },
    ]
  },
  {
    topic: 'Math & Geometry',
    icon: '📐',
    problems: [
      { id: 48, title: 'Rotate Image', slug: 'rotate-image', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/rotate-image/' },
      { id: 54, title: 'Spiral Matrix', slug: 'spiral-matrix', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/spiral-matrix/' },
      { id: 73, title: 'Set Matrix Zeroes', slug: 'set-matrix-zeroes', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/set-matrix-zeroes/' },
      { id: 202, title: 'Happy Number', slug: 'happy-number', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/happy-number/' },
      { id: 66, title: 'Plus One', slug: 'plus-one', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/plus-one/' },
      { id: 50, title: 'Pow(x, n)', slug: 'powx-n', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/powx-n/' },
      { id: 43, title: 'Multiply Strings', slug: 'multiply-strings', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/multiply-strings/' },
      { id: 2013, title: 'Detect Squares', slug: 'detect-squares', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/detect-squares/' },
    ]
  },
  {
    topic: 'Bit Manipulation',
    icon: '🔢',
    problems: [
      { id: 136, title: 'Single Number', slug: 'single-number', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/single-number/' },
      { id: 191, title: 'Number of 1 Bits', slug: 'number-of-1-bits', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/number-of-1-bits/' },
      { id: 338, title: 'Counting Bits', slug: 'counting-bits', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/counting-bits/' },
      { id: 190, title: 'Reverse Bits', slug: 'reverse-bits', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/reverse-bits/' },
      { id: 268, title: 'Missing Number', slug: 'missing-number', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/missing-number/' },
      { id: 371, title: 'Sum of Two Integers', slug: 'sum-of-two-integers', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/sum-of-two-integers/' },
      { id: 7, title: 'Reverse Integer', slug: 'reverse-integer', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/reverse-integer/' },
    ]
  },
];

// All unique topics for the tree view
export const ALL_TOPICS = [
  'Arrays & Hashing',
  'Two Pointers',
  'Stack',
  'Binary Search',
  'Sliding Window',
  'Linked List',
  'Trees',
  'Tries',
  'Heap / Priority Queue',
  'Backtracking',
  'Graphs',
  'Advanced Graphs',
  '1-D DP',
  '2-D DP',
  'Greedy',
  'Intervals',
  'Math & Geometry',
  'Bit Manipulation',
];
