export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type Language = 'Python' | 'JavaScript' | 'TypeScript' | 'Java' | 'C++' | 'Go';

export interface Problem {
  id: number;
  title: string;
  slug: string;
  difficulty: Difficulty;
  status: 'Accepted' | 'Attempted' | 'Todo';
  timeComplexity: string;
  spaceComplexity: string;
  language: Language;
  tags: string[];
  code: string;
  explanation: string;
  solvedDate?: string;
}

export const problems: Problem[] = [
  {
    id: 1,
    title: "Two Sum",
    slug: "two-sum",
    difficulty: "Easy",
    status: "Accepted",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    language: "Python",
    tags: ["Array", "Hash Table"],
    solvedDate: "2024-01-15",
    code: `def twoSum(nums: List[int], target: int) -> List[int]:
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
    explanation: "Use a hash map to store seen numbers and their indices. For each number, check if its complement (target - num) exists in the map. This gives us O(n) time instead of O(n²) brute force."
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    slug: "longest-substring-without-repeating-characters",
    difficulty: "Medium",
    status: "Accepted",
    timeComplexity: "O(n)",
    spaceComplexity: "O(min(m,n))",
    language: "Python",
    tags: ["Hash Table", "String", "Sliding Window"],
    solvedDate: "2024-01-18",
    code: `def lengthOfLongestSubstring(s: str) -> int:
    char_index = {}
    max_length = start = 0
    
    for i, char in enumerate(s):
        if char in char_index and char_index[char] >= start:
            start = char_index[char] + 1
        char_index[char] = i
        max_length = max(max_length, i - start + 1)
    
    return max_length`,
    explanation: "Sliding window technique with a hash map to track character positions. When we encounter a repeat, we slide the window start to just after the previous occurrence."
  },
  {
    id: 4,
    title: "Median of Two Sorted Arrays",
    slug: "median-of-two-sorted-arrays",
    difficulty: "Hard",
    status: "Accepted",
    timeComplexity: "O(log(min(m,n)))",
    spaceComplexity: "O(1)",
    language: "Python",
    tags: ["Array", "Binary Search", "Divide and Conquer"],
    solvedDate: "2024-01-22",
    code: `def findMedianSortedArrays(nums1: List[int], nums2: List[int]) -> float:
    if len(nums1) > len(nums2):
        nums1, nums2 = nums2, nums1
    
    m, n = len(nums1), len(nums2)
    low, high = 0, m
    
    while low <= high:
        px = (low + high) // 2
        py = (m + n + 1) // 2 - px
        
        x1 = nums1[px - 1] if px > 0 else float('-inf')
        x2 = nums1[px] if px < m else float('inf')
        y1 = nums2[py - 1] if py > 0 else float('-inf')
        y2 = nums2[py] if py < n else float('inf')
        
        if x1 <= y2 and y1 <= x2:
            if (m + n) % 2 == 0:
                return (max(x1, y1) + min(x2, y2)) / 2
            return max(x1, y1)
        elif x1 > y2:
            high = px - 1
        else:
            low = px + 1`,
    explanation: "Binary search on the smaller array to find the correct partition point. We ensure elements on the left of partition are smaller than elements on the right."
  },
  {
    id: 5,
    title: "Longest Palindromic Substring",
    slug: "longest-palindromic-substring",
    difficulty: "Medium",
    status: "Accepted",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    language: "TypeScript",
    tags: ["String", "Dynamic Programming"],
    solvedDate: "2024-01-25",
    code: `function longestPalindrome(s: string): string {
    let start = 0, maxLen = 0;
    
    const expandFromCenter = (l: number, r: number) => {
        while (l >= 0 && r < s.length && s[l] === s[r]) {
            if (r - l + 1 > maxLen) {
                start = l;
                maxLen = r - l + 1;
            }
            l--; r++;
        }
    };
    
    for (let i = 0; i < s.length; i++) {
        expandFromCenter(i, i);     // Odd length
        expandFromCenter(i, i + 1); // Even length
    }
    
    return s.substring(start, start + maxLen);
}`,
    explanation: "Expand around center approach. For each position, try expanding outwards for both odd and even length palindromes. Track the longest found."
  },
  {
    id: 11,
    title: "Container With Most Water",
    slug: "container-with-most-water",
    difficulty: "Medium",
    status: "Accepted",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    language: "Python",
    tags: ["Array", "Two Pointers", "Greedy"],
    solvedDate: "2024-02-01",
    code: `def maxArea(height: List[int]) -> int:
    left, right = 0, len(height) - 1
    max_water = 0
    
    while left < right:
        width = right - left
        h = min(height[left], height[right])
        max_water = max(max_water, width * h)
        
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    
    return max_water`,
    explanation: "Two pointer approach starting from both ends. Always move the pointer with the smaller height, as that's the limiting factor for water capacity."
  },
  {
    id: 15,
    title: "3Sum",
    slug: "3sum",
    difficulty: "Medium",
    status: "Accepted",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    language: "Python",
    tags: ["Array", "Two Pointers", "Sorting"],
    solvedDate: "2024-02-05",
    code: `def threeSum(nums: List[int]) -> List[List[int]]:
    nums.sort()
    result = []
    
    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i-1]:
            continue
        
        left, right = i + 1, len(nums) - 1
        while left < right:
            total = nums[i] + nums[left] + nums[right]
            if total < 0:
                left += 1
            elif total > 0:
                right -= 1
            else:
                result.append([nums[i], nums[left], nums[right]])
                while left < right and nums[left] == nums[left+1]:
                    left += 1
                while left < right and nums[right] == nums[right-1]:
                    right -= 1
                left += 1
                right -= 1
    
    return result`,
    explanation: "Sort the array, then fix one element and use two pointers to find pairs that sum to the negative of that element. Skip duplicates to avoid duplicate triplets."
  },
  {
    id: 20,
    title: "Valid Parentheses",
    slug: "valid-parentheses",
    difficulty: "Easy",
    status: "Accepted",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    language: "JavaScript",
    tags: ["String", "Stack"],
    solvedDate: "2024-02-08",
    code: `function isValid(s) {
    const stack = [];
    const pairs = { ')': '(', '}': '{', ']': '[' };
    
    for (const char of s) {
        if (char in pairs) {
            if (stack.pop() !== pairs[char]) return false;
        } else {
            stack.push(char);
        }
    }
    
    return stack.length === 0;
}`,
    explanation: "Use a stack to track opening brackets. When we encounter a closing bracket, pop from the stack and check if it matches. Stack should be empty at the end."
  },
  {
    id: 21,
    title: "Merge Two Sorted Lists",
    slug: "merge-two-sorted-lists",
    difficulty: "Easy",
    status: "Accepted",
    timeComplexity: "O(n + m)",
    spaceComplexity: "O(1)",
    language: "Python",
    tags: ["Linked List", "Recursion"],
    solvedDate: "2024-02-10",
    code: `def mergeTwoLists(l1: ListNode, l2: ListNode) -> ListNode:
    dummy = ListNode(0)
    current = dummy
    
    while l1 and l2:
        if l1.val <= l2.val:
            current.next = l1
            l1 = l1.next
        else:
            current.next = l2
            l2 = l2.next
        current = current.next
    
    current.next = l1 or l2
    return dummy.next`,
    explanation: "Use a dummy node to simplify edge cases. Compare heads of both lists and attach the smaller one. Continue until one list is exhausted, then attach the remaining list."
  },
  {
    id: 23,
    title: "Merge k Sorted Lists",
    slug: "merge-k-sorted-lists",
    difficulty: "Hard",
    status: "Accepted",
    timeComplexity: "O(n log k)",
    spaceComplexity: "O(k)",
    language: "Python",
    tags: ["Linked List", "Divide and Conquer", "Heap", "Merge Sort"],
    solvedDate: "2024-02-15",
    code: `import heapq

def mergeKLists(lists: List[ListNode]) -> ListNode:
    heap = []
    for i, node in enumerate(lists):
        if node:
            heapq.heappush(heap, (node.val, i, node))
    
    dummy = ListNode(0)
    current = dummy
    
    while heap:
        val, i, node = heapq.heappop(heap)
        current.next = node
        current = current.next
        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))
    
    return dummy.next`,
    explanation: "Use a min-heap to efficiently get the smallest element among all list heads. Push/pop operations are O(log k), and we process n total elements."
  },
  {
    id: 42,
    title: "Trapping Rain Water",
    slug: "trapping-rain-water",
    difficulty: "Hard",
    status: "Accepted",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    language: "Python",
    tags: ["Array", "Two Pointers", "Dynamic Programming", "Stack"],
    solvedDate: "2024-02-20",
    code: `def trap(height: List[int]) -> int:
    if not height:
        return 0
    
    left, right = 0, len(height) - 1
    left_max, right_max = height[left], height[right]
    water = 0
    
    while left < right:
        if left_max < right_max:
            left += 1
            left_max = max(left_max, height[left])
            water += left_max - height[left]
        else:
            right -= 1
            right_max = max(right_max, height[right])
            water += right_max - height[right]
    
    return water`,
    explanation: "Two pointer approach. Water at any position is determined by min(left_max, right_max) - height. Move the pointer with smaller max value since that side limits water capacity."
  },
  {
    id: 53,
    title: "Maximum Subarray",
    slug: "maximum-subarray",
    difficulty: "Medium",
    status: "Accepted",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    language: "Java",
    tags: ["Array", "Divide and Conquer", "Dynamic Programming"],
    solvedDate: "2024-02-25",
    code: `public int maxSubArray(int[] nums) {
    int maxSum = nums[0];
    int currentSum = nums[0];
    
    for (int i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}`,
    explanation: "Kadane's algorithm. At each position, decide whether to extend the current subarray or start fresh. The maximum sum ending at each position gives us the global maximum."
  },
  {
    id: 70,
    title: "Climbing Stairs",
    slug: "climbing-stairs",
    difficulty: "Easy",
    status: "Accepted",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    language: "Python",
    tags: ["Math", "Dynamic Programming", "Memoization"],
    solvedDate: "2024-03-01",
    code: `def climbStairs(n: int) -> int:
    if n <= 2:
        return n
    
    prev, curr = 1, 2
    for _ in range(3, n + 1):
        prev, curr = curr, prev + curr
    
    return curr`,
    explanation: "This is essentially the Fibonacci sequence. Ways to reach step n = ways to reach (n-1) + ways to reach (n-2). Use two variables to avoid O(n) space."
  },
  {
    id: 121,
    title: "Best Time to Buy and Sell Stock",
    slug: "best-time-to-buy-and-sell-stock",
    difficulty: "Easy",
    status: "Accepted",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    language: "Python",
    tags: ["Array", "Dynamic Programming"],
    solvedDate: "2024-03-05",
    code: `def maxProfit(prices: List[int]) -> int:
    min_price = float('inf')
    max_profit = 0
    
    for price in prices:
        min_price = min(min_price, price)
        max_profit = max(max_profit, price - min_price)
    
    return max_profit`,
    explanation: "Track the minimum price seen so far. At each day, calculate potential profit if we sold today (price - min_price). Keep track of the maximum profit found."
  },
  {
    id: 146,
    title: "LRU Cache",
    slug: "lru-cache",
    difficulty: "Medium",
    status: "Accepted",
    timeComplexity: "O(1)",
    spaceComplexity: "O(capacity)",
    language: "Python",
    tags: ["Hash Table", "Linked List", "Design", "Doubly-Linked List"],
    solvedDate: "2024-03-10",
    code: `class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = OrderedDict()
    
    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)
        return self.cache[key]
    
    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)`,
    explanation: "Use OrderedDict which maintains insertion order and provides O(1) move_to_end. On access, move to end. On insert, evict from front if over capacity."
  },
  {
    id: 200,
    title: "Number of Islands",
    slug: "number-of-islands",
    difficulty: "Medium",
    status: "Accepted",
    timeComplexity: "O(m × n)",
    spaceComplexity: "O(m × n)",
    language: "Python",
    tags: ["Array", "DFS", "BFS", "Union Find", "Matrix"],
    solvedDate: "2024-03-15",
    code: `def numIslands(grid: List[List[str]]) -> int:
    if not grid:
        return 0
    
    rows, cols = len(grid), len(grid[0])
    islands = 0
    
    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == '0':
            return
        grid[r][c] = '0'  # Mark as visited
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)
    
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                islands += 1
                dfs(r, c)
    
    return islands`,
    explanation: "For each unvisited land cell, increment island count and flood-fill (DFS) to mark all connected land cells as visited. This counts distinct connected components."
  },
  {
    id: 206,
    title: "Reverse Linked List",
    slug: "reverse-linked-list",
    difficulty: "Easy",
    status: "Accepted",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    language: "Python",
    tags: ["Linked List", "Recursion"],
    solvedDate: "2024-03-18",
    code: `def reverseList(head: ListNode) -> ListNode:
    prev = None
    current = head
    
    while current:
        next_node = current.next
        current.next = prev
        prev = current
        current = next_node
    
    return prev`,
    explanation: "Iterative approach. Keep three pointers: prev, current, next. At each step, reverse the link, then advance all pointers. Finally, prev points to new head."
  },
  {
    id: 322,
    title: "Coin Change",
    slug: "coin-change",
    difficulty: "Medium",
    status: "Accepted",
    timeComplexity: "O(amount × n)",
    spaceComplexity: "O(amount)",
    language: "Python",
    tags: ["Array", "Dynamic Programming", "BFS"],
    solvedDate: "2024-03-22",
    code: `def coinChange(coins: List[int], amount: int) -> int:
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    
    for coin in coins:
        for x in range(coin, amount + 1):
            dp[x] = min(dp[x], dp[x - coin] + 1)
    
    return dp[amount] if dp[amount] != float('inf') else -1`,
    explanation: "Bottom-up DP. dp[i] = minimum coins to make amount i. For each coin, update all amounts >= coin. The answer is dp[amount] or -1 if impossible."
  },
  {
    id: 739,
    title: "Daily Temperatures",
    slug: "daily-temperatures",
    difficulty: "Medium",
    status: "Accepted",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    language: "TypeScript",
    tags: ["Array", "Stack", "Monotonic Stack"],
    solvedDate: "2024-03-28",
    code: `function dailyTemperatures(temperatures: number[]): number[] {
    const n = temperatures.length;
    const result = new Array(n).fill(0);
    const stack: number[] = []; // Store indices
    
    for (let i = 0; i < n; i++) {
        while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {
            const prevIndex = stack.pop()!;
            result[prevIndex] = i - prevIndex;
        }
        stack.push(i);
    }
    
    return result;
}`,
    explanation: "Monotonic decreasing stack of indices. When we find a warmer day, pop all cooler days from stack and calculate their wait time. Push current day's index."
  },
  {
    id: 1143,
    title: "Longest Common Subsequence",
    slug: "longest-common-subsequence",
    difficulty: "Medium",
    status: "Accepted",
    timeComplexity: "O(m × n)",
    spaceComplexity: "O(m × n)",
    language: "Python",
    tags: ["String", "Dynamic Programming"],
    solvedDate: "2024-04-02",
    code: `def longestCommonSubsequence(text1: str, text2: str) -> int:
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    
    return dp[m][n]`,
    explanation: "2D DP where dp[i][j] = LCS of text1[:i] and text2[:j]. If chars match, add 1 to diagonal. Otherwise, take max of excluding either character."
  }
];

export const stats = {
  totalSolved: problems.filter(p => p.status === 'Accepted').length,
  totalProblems: 3000, // Total LeetCode problems (approximate)
  easy: problems.filter(p => p.difficulty === 'Easy' && p.status === 'Accepted').length,
  medium: problems.filter(p => p.difficulty === 'Medium' && p.status === 'Accepted').length,
  hard: problems.filter(p => p.difficulty === 'Hard' && p.status === 'Accepted').length,
  currentStreak: 42,
  maxStreak: 67,
};

export const skillTags = [
  { name: "Dynamic Programming", count: 6, level: "advanced" },
  { name: "Array", count: 10, level: "advanced" },
  { name: "Two Pointers", count: 5, level: "advanced" },
  { name: "Hash Table", count: 6, level: "advanced" },
  { name: "String", count: 4, level: "intermediate" },
  { name: "Stack", count: 3, level: "intermediate" },
  { name: "Linked List", count: 4, level: "intermediate" },
  { name: "Binary Search", count: 2, level: "intermediate" },
  { name: "Sliding Window", count: 2, level: "intermediate" },
  { name: "Greedy", count: 2, level: "intermediate" },
  { name: "DFS", count: 2, level: "intermediate" },
  { name: "BFS", count: 2, level: "beginner" },
  { name: "Divide and Conquer", count: 2, level: "beginner" },
  { name: "Heap", count: 1, level: "beginner" },
  { name: "Design", count: 1, level: "beginner" },
  { name: "Union Find", count: 1, level: "beginner" },
] as const;
