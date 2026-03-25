## 2025-03-25 - [Optimize Array Operations in GlobalContext]
**Learning:** O(N*M) nested loops caused by `.find` and `.includes` inside `.filter` can significantly degrade performance in React context selectors.
**Action:** Always pre-calculate an O(1) lookup map (using `Map` or `Set`) keyed by ID and pre-compute aggregated metrics before iterating. Wrap the resulting derivation in `useMemo` to prevent redundant calculations on re-renders, and use `useCallback` to preserve function-based APIs.
