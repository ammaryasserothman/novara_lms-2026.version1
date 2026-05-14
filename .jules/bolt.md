## 2024-05-14 - Initialize Bolt Journal
**Learning:** Initializing journal to log critical learning.
**Action:** Always start with checking the journal and update if there are any critical learnings during the process.

## 2024-05-14 - Optimize Array Iterations
**Learning:** React components often use multiple `.filter()` or `.map()` methods on the same array to derive different state pieces (e.g. `filteredList` and `count`), leading to O(k*N) complexity.
**Action:** Replace multiple `.filter()` calls with a single-pass loop inside a `React.useMemo` to simultaneously calculate all derived states, reducing complexity to O(N).
