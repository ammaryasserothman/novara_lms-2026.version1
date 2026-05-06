## 2024-05-18 - Single-pass Memoization for Derived Array State
**Learning:** Multiple consecutive array iterations like `.filter().length` and `.filter(...)` for derived state can be condensed into a single-pass loop within `React.useMemo` to drop the complexity from O(k*N) to O(N).
**Action:** When component derived state involves extracting counts and filtered elements from the same source array, combine the logic into a single `useMemo` pass rather than writing declarative but redundant chain methods.
